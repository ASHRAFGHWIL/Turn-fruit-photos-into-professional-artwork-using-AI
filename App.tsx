import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { CameraAngle, LightingType, AspectRatio, ImageFilter, Preset, ColorAdjustments } from './types';
import { LIGHTING_OPTIONS, CAMERA_ANGLE_OPTIONS, ASPECT_RATIO_OPTIONS, FILTER_OPTIONS, FRUIT_VARIETY_OPTIONS, BACKGROUND_GALLERY_OPTIONS, PRESET_OPTIONS } from './constants';
import { transformImage, upscaleImage } from './services/geminiService';
import ImageWorkspace from './components/ImageWorkspace';
import BackgroundSelector from './components/BackgroundSelector';
import ColorAdjustmentsPanel from './components/ColorAdjustments';
import { DownloadIcon, SwitchImageIcon, UpscaleIcon, SaveIcon, LoadIcon } from './components/icons';

interface GeneratedImageData {
    url: string;
    filename: string;
}

interface SavedSettings {
    lighting: LightingType;
    cameraAngle: CameraAngle;
    fruitVariety: string;
    aspectRatio: AspectRatio;
    backgroundPrompt: string;
    isTransparent: boolean;
}

const initialColorAdjustments: ColorAdjustments = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
};

const App: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [originalImageMime, setOriginalImageMime] = useState<string>('');
    const [generatedImage, setGeneratedImage] = useState<GeneratedImageData | null>(null);

    const [lighting, setLighting] = useState<LightingType>(LightingType.Studio);
    const [cameraAngle, setCameraAngle] = useState<CameraAngle>(CameraAngle.FrontView);
    const [fruitVariety, setFruitVariety] = useState<string>(FRUIT_VARIETY_OPTIONS[0].value);
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.Square);
    const [backgroundPrompt, setBackgroundPrompt] = useState<string>(BACKGROUND_GALLERY_OPTIONS[0].prompt);
    const [isTransparent, setIsTransparent] = useState<boolean>(false);
    const [activeFilter, setActiveFilter] = useState<ImageFilter>(ImageFilter.None);
    const [colorAdjustments, setColorAdjustments] = useState<ColorAdjustments>(initialColorAdjustments);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEnhancing, setIsEnhancing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const [saveMessage, setSaveMessage] = useState<string>('');
    const [hasSavedSettings, setHasSavedSettings] = useState<boolean>(false);
    
    const SETTINGS_KEY = 'ghwilStudioSettings';
    
    const colorFilterStyle = useMemo(() => {
        return {
            filter: `brightness(${colorAdjustments.brightness / 100}) contrast(${colorAdjustments.contrast / 100}) saturate(${colorAdjustments.saturation / 100}) hue-rotate(${colorAdjustments.hue}deg)`
        };
    }, [colorAdjustments]);

    const loadSettings = useCallback(() => {
        const savedSettingsJSON = localStorage.getItem(SETTINGS_KEY);
        if (savedSettingsJSON) {
            try {
                const savedSettings: SavedSettings = JSON.parse(savedSettingsJSON);
                setLighting(savedSettings.lighting);
                setCameraAngle(savedSettings.cameraAngle);
                setFruitVariety(savedSettings.fruitVariety);
                setAspectRatio(savedSettings.aspectRatio);
                setBackgroundPrompt(savedSettings.backgroundPrompt);
                setIsTransparent(savedSettings.isTransparent);
            } catch (e) {
                console.error("Failed to parse saved settings:", e);
                localStorage.removeItem(SETTINGS_KEY); // Clear corrupted data
            }
        }
    }, []);

    useEffect(() => {
        const settingsExist = !!localStorage.getItem(SETTINGS_KEY);
        setHasSavedSettings(settingsExist);
        if (settingsExist) {
            loadSettings();
        }
    }, [loadSettings]);

    const handleSaveSettings = () => {
        const settings: SavedSettings = {
            lighting,
            cameraAngle,
            fruitVariety,
            aspectRatio,
            backgroundPrompt,
            isTransparent,
        };
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        setHasSavedSettings(true);
        setSaveMessage('تم الحفظ!');
        setTimeout(() => setSaveMessage(''), 2000);
    };

    const handlePresetSelect = (preset: Preset) => {
        setLighting(preset.lighting);
        setCameraAngle(preset.cameraAngle);
        setFruitVariety(preset.fruitVariety);
        setBackgroundPrompt(preset.backgroundPrompt);
        setIsTransparent(false); // Presets have backgrounds
    };

    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setOriginalImage(reader.result as string);
            setOriginalImageMime(file.type);
            setGeneratedImage(null);
            setError(null);
        };
        reader.onerror = () => {
            setError('فشل في قراءة ملف الصورة.');
        };
        reader.readAsDataURL(file);
    };
    
    const handleClearImage = () => {
        setOriginalImage(null);
        setOriginalImageMime('');
        setGeneratedImage(null);
        setError(null);
        setActiveFilter(ImageFilter.None);
        setColorAdjustments(initialColorAdjustments);
    };

    const handleTransform = useCallback(async () => {
        if (!originalImage) {
            setError('الرجاء رفع صورة أولاً.');
            return;
        }

        setIsLoading(true);
        setGeneratedImage(null);
        setError(null);
        setActiveFilter(ImageFilter.None);
        setColorAdjustments(initialColorAdjustments);

        try {
            const base64Data = originalImage.split(',')[1];
            if (!base64Data) {
                throw new Error("Invalid base64 image data.");
            }
            const result = await transformImage({
                imageData: base64Data,
                mimeType: originalImageMime,
                lighting,
                cameraAngle,
                aspectRatio,
                backgroundPrompt: isTransparent ? 'transparent' : backgroundPrompt,
                isTransparent,
                fruitVariety,
            });
            
            const filename = `ghwil-studio-${Date.now()}.png`;
            setGeneratedImage({
                url: `data:image/png;base64,${result}`,
                filename: filename
            });

        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع أثناء تحويل الصورة.');
        } finally {
            setIsLoading(false);
        }
    }, [originalImage, originalImageMime, lighting, cameraAngle, aspectRatio, backgroundPrompt, isTransparent, fruitVariety]);

    const handleEnhance = useCallback(async () => {
        if (!generatedImage) {
            setError('لا توجد صورة مُنشأة لتحسينها.');
            return;
        }

        setIsEnhancing(true);
        setError(null);

        try {
            const base64Data = generatedImage.url.split(',')[1];
            if (!base64Data) {
                throw new Error("Invalid base64 image data for enhancing.");
            }
            const result = await upscaleImage({
                imageData: base64Data,
                mimeType: 'image/png',
                filter: activeFilter,
            });
            
            const filename = `ghwil-studio-enhanced-${Date.now()}.png`;
            setGeneratedImage({
                url: `data:image/png;base64,${result}`,
                filename: filename
            });
            setActiveFilter(ImageFilter.None); // Reset filter as it's now baked into the image
            setColorAdjustments(initialColorAdjustments); // Reset color adjustments for the new base image

        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع أثناء تحسين الصورة.');
        } finally {
            setIsEnhancing(false);
        }
    }, [generatedImage, activeFilter]);

    const handleDownloadWithFilters = () => {
        if (!generatedImage) return;

        const image = new Image();
        image.crossOrigin = 'anonymous'; 
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const filterString = `
                brightness(${colorAdjustments.brightness / 100})
                contrast(${colorAdjustments.contrast / 100})
                saturate(${colorAdjustments.saturation / 100})
                hue-rotate(${colorAdjustments.hue}deg)
            `;

            ctx.filter = filterString.trim();
            ctx.drawImage(image, 0, 0);

            const link = document.createElement('a');
            link.download = generatedImage.filename.replace('.png', '-adjusted.png');
            link.href = canvas.toDataURL('image/png');
            link.click();
        };
        image.src = generatedImage.url;
    };


    const enhanceButtonText = activeFilter === ImageFilter.None 
        ? 'تحسين وتكبير الصورة' 
        : 'تطبيق الفلتر والتحسين';

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <header className="w-full max-w-7xl text-center mb-8">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    استوديو غويل
                </h1>
                <p className="text-lg text-gray-400 mt-2">
                    حوّل صور الفواكه إلى أعمال فنية احترافية باستخدام الذكاء الاصطناعي
                </p>
            </header>

            <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
                <aside className="lg:col-span-1 bg-gray-800/50 rounded-2xl p-6 shadow-lg border border-gray-700">
                    <h2 className="text-2xl font-bold mb-6 border-b-2 border-purple-500 pb-2">لوحة التحكم</h2>
                    <div className="space-y-6">

                        {/* Presets Section */}
                        <div>
                            <label htmlFor="presets" className="block text-sm font-medium text-gray-300 mb-2">ابدأ بإعداد مسبق</label>
                            <select
                                id="presets"
                                className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                value=""
                                onChange={(e) => {
                                    const selectedLabel = e.target.value;
                                    const selectedPreset = PRESET_OPTIONS.find(p => p.label === selectedLabel);
                                    if (selectedPreset) {
                                        handlePresetSelect(selectedPreset);
                                    }
                                }}
                            >
                                <option value="" disabled>اختر إعدادًا مسبقًا...</option>
                                {PRESET_OPTIONS.map(preset => (
                                    <option key={preset.label} value={preset.label}>
                                        {preset.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-600" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-gray-800/50 px-2 text-sm text-gray-400">أو خصص</span>
                            </div>
                        </div>

                        {/* Lighting Type */}
                        <div>
                            <label htmlFor="lighting" className="block text-sm font-medium text-gray-300 mb-2">نوع الإضاءة</label>
                            <select id="lighting" value={lighting} onChange={(e) => setLighting(e.target.value as LightingType)} className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                                {LIGHTING_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                        </div>
                        {/* Camera Angle */}
                        <div>
                            <label htmlFor="cameraAngle" className="block text-sm font-medium text-gray-300 mb-2">زاوية الكاميرا</label>
                            <select id="cameraAngle" value={cameraAngle} onChange={(e) => setCameraAngle(e.target.value as CameraAngle)} className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                                {CAMERA_ANGLE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                        </div>
                        {/* Fruit Variety */}
                        <div>
                            <label htmlFor="fruitVariety" className="block text-sm font-medium text-gray-300 mb-2">نوع الفاكهة</label>
                            <select id="fruitVariety" value={fruitVariety} onChange={(e) => setFruitVariety(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                                {FRUIT_VARIETY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                        </div>
                        {/* Aspect Ratio */}
                        <div>
                            <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-300 mb-2">أبعاد الصورة</label>
                             <select 
                                id="aspectRatio" 
                                value={aspectRatio} 
                                onChange={(e) => setAspectRatio(e.target.value as AspectRatio)} 
                                className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            >
                                {ASPECT_RATIO_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                        </div>
                        {/* Background */}
                        <BackgroundSelector
                            backgroundPrompt={backgroundPrompt}
                            setBackgroundPrompt={setBackgroundPrompt}
                            isTransparent={isTransparent}
                            setIsTransparent={setIsTransparent}
                        />

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-2">
                             <div className="pt-2 border-t border-gray-700/50">
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <button
                                        onClick={handleSaveSettings}
                                        disabled={isLoading || isEnhancing}
                                        className="w-full flex justify-center items-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <SaveIcon />
                                        {saveMessage || 'حفظ الإعدادات'}
                                    </button>
                                    <button
                                        onClick={loadSettings}
                                        disabled={isLoading || isEnhancing || !hasSavedSettings}
                                        className="w-full flex justify-center items-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <LoadIcon />
                                        تحميل الإعدادات
                                    </button>
                                </div>
                            </div>
                             <button onClick={handleTransform} disabled={isLoading || isEnhancing || !originalImage} className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                                {isLoading ? 'جاري التحويل...' : 'حوّل الصورة'}
                            </button>
                             {originalImage && (
                                <button
                                    onClick={handleClearImage}
                                    disabled={isLoading || isEnhancing}
                                    className="w-full flex justify-center items-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <SwitchImageIcon />
                                    اختر صورة مختلفة
                                </button>
                            )}
                        </div>
                    </div>
                </aside>

                <div className="lg:col-span-2">
                    <ImageWorkspace
                        originalImage={originalImage}
                        generatedImage={generatedImage?.url ?? null}
                        isLoading={isLoading}
                        isEnhancing={isEnhancing}
                        error={error}
                        onImageUpload={handleImageUpload}
                        activeFilter={activeFilter}
                        colorFilterStyle={colorFilterStyle}
                    />
                     {generatedImage && !isLoading && !error && (
                         <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-bold mb-4 text-gray-200">اللمسات النهائية</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {/* Artistic Filters */}
                                <div>
                                    <label htmlFor="filter" className="block text-base font-medium text-gray-300 mb-3">1. تطبيق فلتر فني (معاينة)</label>
                                     <select 
                                        id="filter" 
                                        value={activeFilter} 
                                        onChange={(e) => setActiveFilter(e.target.value as ImageFilter)} 
                                        disabled={isEnhancing} 
                                        className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50"
                                    >
                                        {FILTER_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                    </select>
                                </div>
                                {/* Color Adjustments */}
                                <div>
                                    <label className="block text-base font-medium text-gray-300 mb-3">2. ضبط الألوان</label>
                                    <ColorAdjustmentsPanel
                                        adjustments={colorAdjustments}
                                        setAdjustments={setColorAdjustments}
                                        onReset={() => setColorAdjustments(initialColorAdjustments)}
                                        disabled={isEnhancing}
                                    />
                                </div>
                            </div>
                            <div className="pt-6 mt-6 border-t border-gray-700/50 grid grid-cols-1 sm:grid-cols-2 gap-3">
                               <button
                                   onClick={handleEnhance}
                                   disabled={isEnhancing}
                                   className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                               >
                                   <UpscaleIcon />
                                   {isEnhancing ? 'جاري التحسين...' : enhanceButtonText}
                               </button>
                               <button
                                    onClick={handleDownloadWithFilters}
                                    className="w-full flex justify-center items-center gap-2 bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-green-700 transform hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <DownloadIcon />
                                    تحميل الصورة النهائية
                                </button>
                           </div>
                         </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;