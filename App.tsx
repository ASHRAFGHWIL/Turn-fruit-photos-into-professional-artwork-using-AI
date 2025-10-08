import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { CameraAngle, LightingType, AspectRatio, ImageFilter, Preset, ColorAdjustments, OutputQuality, TextureEffect, SubjectType } from './types';
import { LIGHTING_OPTIONS, CAMERA_ANGLE_OPTIONS, ASPECT_RATIO_OPTIONS, FILTER_OPTIONS, FRUIT_VARIETY_OPTIONS, VEGETABLE_VARIETY_OPTIONS, BACKGROUND_GALLERY_OPTIONS, PRESET_OPTIONS, OUTPUT_QUALITY_OPTIONS, TEXTURE_OPTIONS, SANDWICH_VARIETY_OPTIONS, JUICE_VARIETY_OPTIONS, PIE_VARIETY_OPTIONS, BAKED_GOODS_VARIETY_OPTIONS } from './constants';
// FIX: Removed ApiKeyError and initializeAi as they are no longer needed. The service now initializes the AI client directly.
import { transformImage, upscaleImage, generateImageFromScratch, generateAltText, translateText } from './services/geminiService';
import ImageWorkspace from './components/ImageWorkspace';
import BackgroundSelector from './components/BackgroundSelector';
import ColorAdjustmentsPanel from './components/ColorAdjustments';
import ZoomedImage from './components/ZoomedImage';
// FIX: Removed KeyIcon and CheckCircleIcon as the API key UI is removed.
import { DownloadIcon, SwitchImageIcon, UpscaleIcon, SaveIcon, LoadIcon, CopyIcon, SparklesIcon, TranslateIcon } from './components/icons';

interface GeneratedImageData {
    url: string;
    filename: string;
}

interface SavedSettings {
    lighting: LightingType;
    cameraAngle: CameraAngle;
    subjectType: SubjectType;
    fruitVariety: string;
    vegetableVariety: string;
    sandwichVariety: string;
    juiceVariety: string;
    pieVariety: string;
    bakedGoodsVariety: string;
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
    const [subjectType, setSubjectType] = useState<SubjectType>(SubjectType.Fruit);
    const [fruitVariety, setFruitVariety] = useState<string>(FRUIT_VARIETY_OPTIONS[0].value);
    const [vegetableVariety, setVegetableVariety] = useState<string>(VEGETABLE_VARIETY_OPTIONS[0].value);
    const [sandwichVariety, setSandwichVariety] = useState<string>(SANDWICH_VARIETY_OPTIONS[0].value);
    const [juiceVariety, setJuiceVariety] = useState<string>(JUICE_VARIETY_OPTIONS[0].value);
    const [pieVariety, setPieVariety] = useState<string>(PIE_VARIETY_OPTIONS[0].value);
    const [bakedGoodsVariety, setBakedGoodsVariety] = useState<string>(BAKED_GOODS_VARIETY_OPTIONS[0].value);
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.Square);
    const [previewAspectRatio, setPreviewAspectRatio] = useState<AspectRatio | null>(null);
    const [backgroundPrompt, setBackgroundPrompt] = useState<string>(BACKGROUND_GALLERY_OPTIONS[0].prompt);
    const [isTransparent, setIsTransparent] = useState<boolean>(false);
    const [activeFilter, setActiveFilter] = useState<ImageFilter>(ImageFilter.None);
    const [previewFilter, setPreviewFilter] = useState<ImageFilter | null>(null);
    const [activeTexture, setActiveTexture] = useState<TextureEffect>(TextureEffect.None);
    const [previewTexture, setPreviewTexture] = useState<TextureEffect | null>(null);
    const [colorAdjustments, setColorAdjustments] = useState<ColorAdjustments>(initialColorAdjustments);
    const [outputQuality, setOutputQuality] = useState<OutputQuality>(OutputQuality.Standard);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEnhancing, setIsEnhancing] = useState<boolean>(false);
    const [loadingAction, setLoadingAction] = useState<'transform' | 'generate' | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const [saveMessage, setSaveMessage] = useState<string>('');
    const [hasSavedSettings, setHasSavedSettings] = useState<boolean>(false);
    const [zoomedImageUrl, setZoomedImageUrl] = useState<string | null>(null);


    // FIX: Removed API key related state as it's now handled by environment variables.
    // const [apiKeyInput, setApiKeyInput] = useState<string>('');
    // const [isKeySet, setIsKeySet] = useState<boolean>(false);
    // const [apiKeyError, setApiKeyError] = useState<string | null>(null);

    const [altText, setAltText] = useState<string>('');
    const [translatedAltText, setTranslatedAltText] = useState<string>('');
    const [isGeneratingAltText, setIsGeneratingAltText] = useState<boolean>(false);
    const [isTranslating, setIsTranslating] = useState<boolean>(false);
    const [copyButtonTextAR, setCopyButtonTextAR] = useState<string>('نسخ AR');
    const [copyButtonTextEN, setCopyButtonTextEN] = useState<string>('نسخ EN');
    
    const SETTINGS_KEY = 'ghwilStudioSettings';
    // FIX: Removed API key storage key.
    // const API_KEY_STORAGE_KEY = 'ghwilStudioApiKey';
    
    // FIX: Removed useEffect for loading API key from local storage.
    
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
                setSubjectType(savedSettings.subjectType || SubjectType.Fruit);
                setFruitVariety(savedSettings.fruitVariety);
                setVegetableVariety(savedSettings.vegetableVariety || VEGETABLE_VARIETY_OPTIONS[0].value);
                setSandwichVariety(savedSettings.sandwichVariety || SANDWICH_VARIETY_OPTIONS[0].value);
                setJuiceVariety(savedSettings.juiceVariety || JUICE_VARIETY_OPTIONS[0].value);
                setPieVariety(savedSettings.pieVariety || PIE_VARIETY_OPTIONS[0].value);
                setBakedGoodsVariety(savedSettings.bakedGoodsVariety || BAKED_GOODS_VARIETY_OPTIONS[0].value);
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
    
    // FIX: Removed handleApiKeySave function.
    
    const handleSaveSettings = () => {
        const settings: SavedSettings = {
            lighting,
            cameraAngle,
            subjectType,
            fruitVariety,
            vegetableVariety,
            sandwichVariety,
            juiceVariety,
            pieVariety,
            bakedGoodsVariety,
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
        setSubjectType(preset.subjectType);
        setFruitVariety(preset.fruitVariety);
        setVegetableVariety(preset.vegetableVariety);
        setSandwichVariety(preset.sandwichVariety);
        setJuiceVariety(preset.juiceVariety);
        setPieVariety(preset.pieVariety);
        setBakedGoodsVariety(preset.bakedGoodsVariety);
        setBackgroundPrompt(preset.backgroundPrompt);
        setIsTransparent(false); // Presets have backgrounds
    };
    
    const resetFinalTouches = () => {
        setActiveFilter(ImageFilter.None);
        setActiveTexture(TextureEffect.None);
        setColorAdjustments(initialColorAdjustments);
        resetAltText();
    }

    const resetAltText = () => {
        setAltText('');
        setTranslatedAltText('');
    };

    const handleImageUpload = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setOriginalImage(reader.result as string);
            setOriginalImageMime(file.type);
            setGeneratedImage(null);
            setError(null);
            resetAltText();
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
        resetFinalTouches();
    };
    
    const handleGenerateFromScratch = useCallback(async () => {
        setIsLoading(true);
        setLoadingAction('generate');
        setGeneratedImage(null);
        setError(null);
        // FIX: Removed API key error reset.
        setOriginalImage(null);
        setOriginalImageMime('');
        resetFinalTouches();

        try {
            let activeVariety: string;
            switch(subjectType) {
                case SubjectType.Fruit:
                    activeVariety = fruitVariety;
                    break;
                case SubjectType.Vegetable:
                    activeVariety = vegetableVariety;
                    break;
                case SubjectType.Sandwich:
                    activeVariety = sandwichVariety;
                    break;
                case SubjectType.Juice:
                    activeVariety = juiceVariety;
                    break;
                case SubjectType.Pie:
                    activeVariety = pieVariety;
                    break;
                case SubjectType.BakedGoods:
                    activeVariety = bakedGoodsVariety;
                    break;
                default:
                    activeVariety = fruitVariety;
            }
            
            const result = await generateImageFromScratch({
                lighting,
                cameraAngle,
                aspectRatio,
                backgroundPrompt: isTransparent ? 'transparent' : backgroundPrompt,
                isTransparent,
                subjectVariety: activeVariety,
            });
            
            const filename = `ghwil-studio-generated-${Date.now()}.png`;
            setGeneratedImage({
                url: `data:image/png;base64,${result}`,
                filename: filename
            });

        } catch (err) {
            // FIX: Simplified error handling, removed ApiKeyError check.
            console.error(err);
            setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع أثناء توليد الصورة.');
        } finally {
            setIsLoading(false);
            setLoadingAction(null);
        }
    }, [lighting, cameraAngle, aspectRatio, backgroundPrompt, isTransparent, fruitVariety, vegetableVariety, sandwichVariety, juiceVariety, pieVariety, bakedGoodsVariety, subjectType]);


    const handleTransform = useCallback(async () => {
        if (!originalImage) {
            setError('الرجاء رفع صورة أولاً.');
            return;
        }

        setIsLoading(true);
        setLoadingAction('transform');
        setGeneratedImage(null);
        setError(null);
        // FIX: Removed API key error reset.
        resetFinalTouches();

        try {
            const base64Data = originalImage.split(',')[1];
            if (!base64Data) {
                throw new Error("Invalid base64 image data.");
            }
            let activeVariety: string;
            switch(subjectType) {
                case SubjectType.Fruit:
                    activeVariety = fruitVariety;
                    break;
                case SubjectType.Vegetable:
                    activeVariety = vegetableVariety;
                    break;
                case SubjectType.Sandwich:
                    activeVariety = sandwichVariety;
                    break;
                case SubjectType.Juice:
                    activeVariety = juiceVariety;
                    break;
                case SubjectType.Pie:
                    activeVariety = pieVariety;
                    break;
                case SubjectType.BakedGoods:
                    activeVariety = bakedGoodsVariety;
                    break;
                default:
                    activeVariety = fruitVariety;
            }
            const result = await transformImage({
                imageData: base64Data,
                mimeType: originalImageMime,
                lighting,
                cameraAngle,
                aspectRatio,
                backgroundPrompt: isTransparent ? 'transparent' : backgroundPrompt,
                isTransparent,
                subjectVariety: activeVariety,
            });
            
            const filename = `ghwil-studio-${Date.now()}.png`;
            setGeneratedImage({
                url: `data:image/png;base64,${result}`,
                filename: filename
            });

        } catch (err) {
            // FIX: Simplified error handling, removed ApiKeyError check.
            console.error(err);
            setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع أثناء تحويل الصورة.');
        } finally {
            setIsLoading(false);
            setLoadingAction(null);
        }
    }, [originalImage, originalImageMime, lighting, cameraAngle, aspectRatio, backgroundPrompt, isTransparent, fruitVariety, vegetableVariety, sandwichVariety, juiceVariety, pieVariety, bakedGoodsVariety, subjectType]);

    const handleEnhance = useCallback(async () => {
        if (!generatedImage) {
            setError('لا توجد صورة مُنشأة لتحسينها.');
            return;
        }

        setIsEnhancing(true);
        setError(null);
        // FIX: Removed API key error reset.

        try {
            const base64Data = generatedImage.url.split(',')[1];
            if (!base64Data) {
                throw new Error("Invalid base64 image data for enhancing.");
            }
            const result = await upscaleImage({
                imageData: base64Data,
                mimeType: 'image/png',
                filter: activeFilter,
                texture: activeTexture,
                outputQuality: outputQuality,
            });
            
            const filename = `ghwil-studio-enhanced-${Date.now()}.png`;
            setGeneratedImage({
                url: `data:image/png;base64,${result}`,
                filename: filename
            });
            resetFinalTouches();

        } catch (err) {
            // FIX: Simplified error handling, removed ApiKeyError check.
            console.error(err);
            setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع أثناء تحسين الصورة.');
        } finally {
            setIsEnhancing(false);
        }
    }, [generatedImage, activeFilter, activeTexture, outputQuality]);

    const handleGenerateAltText = useCallback(async () => {
        if (!generatedImage) return;
        setIsGeneratingAltText(true);
        setTranslatedAltText('');
        setError(null);
        // FIX: Removed API key error reset.
        try {
            const base64Data = generatedImage.url.split(',')[1];
            const generatedText = await generateAltText({ imageData: base64Data, mimeType: 'image/png' });
            setAltText(generatedText);
        } catch (err) {
            // FIX: Simplified error handling, removed ApiKeyError check.
            setAltText(`فشل توليد الوصف: ${err instanceof Error ? err.message : 'خطأ غير معروف'}`);
        } finally {
            setIsGeneratingAltText(false);
        }
    }, [generatedImage]);
    
    const handleTranslateAltText = useCallback(async () => {
        if (!altText || isTranslating) return;
        setIsTranslating(true);
        // FIX: Removed API key error reset.
        try {
            const translated = await translateText({ text: altText, targetLanguage: 'English' });
            setTranslatedAltText(translated);
        } catch (err) {
            // FIX: Simplified error handling, removed ApiKeyError check.
            setTranslatedAltText(`Translation failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setIsTranslating(false);
        }
    }, [altText, isTranslating]);

    const handleCopyAltTextAR = () => {
        if (!altText) return;
        navigator.clipboard.writeText(altText).then(() => {
            setCopyButtonTextAR('تم النسخ!');
            setTimeout(() => setCopyButtonTextAR('نسخ AR'), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };
    
    const handleCopyAltTextEN = () => {
        if (!translatedAltText) return;
        navigator.clipboard.writeText(translatedAltText).then(() => {
            setCopyButtonTextEN('Copied!');
            setTimeout(() => setCopyButtonTextEN('نسخ EN'), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

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
    
            let artisticFilterString = '';
            switch (activeFilter) {
                case ImageFilter.Sepia: 
                    artisticFilterString = 'sepia(1)'; 
                    break;
                case ImageFilter.Grayscale: 
                    artisticFilterString = 'grayscale(1)'; 
                    break;
                case ImageFilter.Invert: 
                    artisticFilterString = 'invert(1)'; 
                    break;
                case ImageFilter.Vintage: 
                    artisticFilterString = 'sepia(0.6) contrast(1.1) brightness(0.9) saturate(1.2)'; 
                    break;
                case ImageFilter.Glow: 
                    artisticFilterString = 'brightness(1.1) contrast(1.1) saturate(1.2) drop-shadow(0 0 5px rgba(255, 255, 200, 0.5))'; 
                    break;
                case ImageFilter.Sharpen: 
                    artisticFilterString = 'contrast(1.4) brightness(0.95)'; 
                    break;
                case ImageFilter.NightMode:
                    artisticFilterString = 'brightness(0.8) contrast(1.4) sepia(0.3) hue-rotate(-15deg)';
                    break;
                case ImageFilter.Noir:
                    artisticFilterString = 'grayscale(1) contrast(1.6) brightness(0.9)';
                    break;
                case ImageFilter.Cool:
                    artisticFilterString = 'sepia(0.3) hue-rotate(185deg) contrast(1.1) saturate(1.3)';
                    break;
            }
    
            const colorAdjustmentsFilterString = `
                brightness(${colorAdjustments.brightness / 100})
                contrast(${colorAdjustments.contrast / 100})
                saturate(${colorAdjustments.saturation / 100})
                hue-rotate(${colorAdjustments.hue}deg)
            `;
    
            ctx.filter = `${artisticFilterString} ${colorAdjustmentsFilterString}`.trim();
            ctx.drawImage(image, 0, 0);
    
            const link = document.createElement('a');
            link.download = generatedImage.filename.replace('.png', '-adjusted.png');
            link.href = canvas.toDataURL('image/png');
            link.click();
        };
        image.src = generatedImage.url;
    };


    const enhanceButtonText = useMemo(() => {
        const hasFilter = activeFilter !== ImageFilter.None;
        const hasTexture = activeTexture !== TextureEffect.None;
        const isForPrint = outputQuality === OutputQuality.HighPrint;

        let baseText = 'تطبيق وتحسين';
        if(isForPrint) baseText = 'تطبيق والتحسين للطباعة';
        if(!hasFilter && !hasTexture) {
            return isForPrint ? 'تحسين وتكبير للطباعة (600 DPI)' : 'تحسين وتكبير قياسي';
        }
        
        const effects = [];
        if (hasFilter) effects.push('الفلتر');
        if (hasTexture) effects.push('الملمس');
        
        return `${baseText} (${effects.join(' و ')})`;
    }, [activeFilter, activeTexture, outputQuality]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <header className="w-full max-w-7xl text-center mb-8">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-orange-500 text-stroke-white">
                    استوديو غويل فود
                </h1>
                <p className="text-lg text-gray-400 mt-2">
                    حوّل صور منتجاتك إلى أعمال فنية احترافية باستخدام الذكاء الاصطناعي
                </p>
            </header>

            <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
                <aside className="lg:col-span-1 bg-gray-800/50 rounded-2xl p-6 shadow-lg border border-gray-700">
                    <h2 className="text-2xl font-bold mb-6 border-b-2 border-purple-500 pb-2">لوحة التحكم</h2>
                    
                    {/* FIX: Removed API key input section to comply with guidelines. */}

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

                        {/* Subject Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">نوع العنصر</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => setSubjectType(SubjectType.Fruit)}
                                    className={`w-full py-2 px-3 rounded-md text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-purple-500
                                        ${subjectType === SubjectType.Fruit ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`
                                    }
                                >
                                    فاكهة
                                </button>
                                <button
                                    onClick={() => setSubjectType(SubjectType.Vegetable)}
                                    className={`w-full py-2 px-3 rounded-md text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-purple-500
                                        ${subjectType === SubjectType.Vegetable ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`
                                    }
                                >
                                    خضروات
                                </button>
                                <button
                                    onClick={() => setSubjectType(SubjectType.Sandwich)}
                                    className={`w-full py-2 px-3 rounded-md text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-purple-500
                                        ${subjectType === SubjectType.Sandwich ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`
                                    }
                                >
                                    ساندويتش
                                </button>
                                <button
                                    onClick={() => setSubjectType(SubjectType.Juice)}
                                    className={`w-full py-2 px-3 rounded-md text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-purple-500
                                        ${subjectType === SubjectType.Juice ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`
                                    }
                                >
                                    عصير
                                </button>
                                <button
                                    onClick={() => setSubjectType(SubjectType.Pie)}
                                    className={`w-full py-2 px-3 rounded-md text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-purple-500
                                        ${subjectType === SubjectType.Pie ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`
                                    }
                                >
                                    فطيرة
                                </button>
                                <button
                                    onClick={() => setSubjectType(SubjectType.BakedGoods)}
                                    className={`w-full py-2 px-3 rounded-md text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-purple-500
                                        ${subjectType === SubjectType.BakedGoods ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`
                                    }
                                >
                                    مخبوزات
                                </button>
                            </div>
                        </div>

                        {/* Fruit/Vegetable/Sandwich/Juice/Pie/BakedGoods Variety */}
                        {subjectType === SubjectType.Fruit && (
                            <div>
                                <label htmlFor="fruitVariety" className="block text-sm font-medium text-gray-300 mb-2">نوع الفاكهة</label>
                                <select id="fruitVariety" value={fruitVariety} onChange={(e) => setFruitVariety(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                                    {FRUIT_VARIETY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </div>
                        )}
                        {subjectType === SubjectType.Vegetable && (
                            <div>
                                <label htmlFor="vegetableVariety" className="block text-sm font-medium text-gray-300 mb-2">نوع الخضروات</label>
                                <select id="vegetableVariety" value={vegetableVariety} onChange={(e) => setVegetableVariety(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                                    {VEGETABLE_VARIETY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </div>
                        )}
                        {subjectType === SubjectType.Sandwich && (
                             <div>
                                <label htmlFor="sandwichVariety" className="block text-sm font-medium text-gray-300 mb-2">نوع الساندويتش</label>
                                <select id="sandwichVariety" value={sandwichVariety} onChange={(e) => setSandwichVariety(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                                    {SANDWICH_VARIETY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </div>
                        )}
                        {subjectType === SubjectType.Juice && (
                             <div>
                                <label htmlFor="juiceVariety" className="block text-sm font-medium text-gray-300 mb-2">نوع العصير</label>
                                <select id="juiceVariety" value={juiceVariety} onChange={(e) => setJuiceVariety(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                                    {JUICE_VARIETY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </div>
                        )}
                        {subjectType === SubjectType.Pie && (
                             <div>
                                <label htmlFor="pieVariety" className="block text-sm font-medium text-gray-300 mb-2">نوع الفطيرة</label>
                                <select id="pieVariety" value={pieVariety} onChange={(e) => setPieVariety(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                                    {PIE_VARIETY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </div>
                        )}
                         {subjectType === SubjectType.BakedGoods && (
                             <div>
                                <label htmlFor="bakedGoodsVariety" className="block text-sm font-medium text-gray-300 mb-2">نوع المخبوزات</label>
                                <select id="bakedGoodsVariety" value={bakedGoodsVariety} onChange={(e) => setBakedGoodsVariety(e.target.value)} className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                                    {BAKED_GOODS_VARIETY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </div>
                        )}

                        {/* Aspect Ratio */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">أبعاد الصورة</label>
                            <div className="flex justify-between items-center gap-2">
                                {ASPECT_RATIO_OPTIONS.map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => {
                                            setAspectRatio(opt.value);
                                            setPreviewAspectRatio(null);
                                        }}
                                        onMouseEnter={() => setPreviewAspectRatio(opt.value)}
                                        onMouseLeave={() => setPreviewAspectRatio(null)}
                                        className={`w-full py-2 px-3 rounded-md text-sm font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-purple-500
                                            ${aspectRatio === opt.value
                                                ? 'bg-purple-600 text-white shadow-md'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            }
                                        `}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Background */}
                        <BackgroundSelector
                            backgroundPrompt={backgroundPrompt}
                            setBackgroundPrompt={setBackgroundPrompt}
                            isTransparent={isTransparent}
                            setIsTransparent={setIsTransparent}
                        />

                        {/* Action Buttons */}
                        <div className="space-y-3 pt-4 border-t border-gray-700/50">
                             <p className="text-center text-sm text-gray-400 pb-2">اختر طريقة الإنشاء</p>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                 <button 
                                     onClick={handleGenerateFromScratch}
                                     // FIX: Removed !isKeySet from disabled check.
                                     disabled={isLoading || isEnhancing} 
                                     className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                     // FIX: Removed title related to API key.
                                 >
                                     {(isLoading && loadingAction === 'generate') ? 'جاري التوليد...' : 'توليد صورة جديدة'}
                                 </button>
                                 <button 
                                     onClick={handleTransform}
                                     // FIX: Removed !isKeySet from disabled check.
                                     disabled={isLoading || isEnhancing || !originalImage} 
                                     className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                     // FIX: Removed title related to API key.
                                     title={!originalImage ? "الرجاء رفع صورة أولاً" : ""}
                                 >
                                     {(isLoading && loadingAction === 'transform') ? 'جاري التحويل...' : 'تحويل صورتك'}
                                 </button>
                             </div>
                             {originalImage && (
                                 <button
                                     onClick={handleClearImage}
                                     disabled={isLoading || isEnhancing}
                                     className="w-full flex justify-center items-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                 >
                                     <SwitchImageIcon />
                                     مسح الصورة وبدء من جديد
                                 </button>
                             )}
                            <div className="grid grid-cols-2 gap-3 pt-2">
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
                        aspectRatio={aspectRatio}
                        previewAspectRatio={previewAspectRatio}
                        activeFilter={activeFilter}
                        previewFilter={previewFilter}
                        activeTexture={activeTexture}
                        previewTexture={previewTexture}
                        colorFilterStyle={colorFilterStyle}
                        subjectType={subjectType}
                        onZoomRequest={setZoomedImageUrl}
                    />
                     {generatedImage && !isLoading && !error && (
                         <>
                         <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-bold mb-4 text-gray-200">اللمسات النهائية</h3>
                            <div className="space-y-6">
                                {/* Artistic Filters */}
                                <div>
                                    <label className="block text-base font-medium text-gray-300 mb-3">1. اختر فلترًا فنيًا</label>
                                    <div className="filter-carousel flex items-center gap-4 overflow-x-auto pb-4 pt-1 -mx-4 px-4">
                                        {FILTER_OPTIONS.map(opt => (
                                            <button
                                                key={opt.value}
                                                onClick={() => {
                                                    setActiveFilter(opt.value);
                                                    setPreviewFilter(null);
                                                }}
                                                onMouseEnter={() => setPreviewFilter(opt.value)}
                                                onMouseLeave={() => setPreviewFilter(null)}
                                                disabled={isEnhancing}
                                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-purple-500
                                                    ${activeFilter === opt.value
                                                        ? 'bg-purple-600 text-white shadow-lg scale-110'
                                                        : 'bg-gray-700 text-gray-300 opacity-70 hover:opacity-100 hover:scale-105 hover:bg-gray-600'
                                                    }
                                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                                                `}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
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
                                 {/* Texture Effects */}
                                 <div>
                                    <label className="block text-base font-medium text-gray-300 mb-3">3. أضف تأثير الملمس</label>
                                    <div className="filter-carousel flex items-center gap-4 overflow-x-auto pb-4 pt-1 -mx-4 px-4">
                                        {TEXTURE_OPTIONS.map(opt => (
                                            <button
                                                key={opt.value}
                                                onClick={() => {
                                                    setActiveTexture(opt.value);
                                                    setPreviewTexture(null);
                                                }}
                                                onMouseEnter={() => setPreviewTexture(opt.value)}
                                                onMouseLeave={() => setPreviewTexture(null)}
                                                disabled={isEnhancing}
                                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-purple-500
                                                    ${activeTexture === opt.value
                                                        ? 'bg-purple-600 text-white shadow-lg scale-110'
                                                        : 'bg-gray-700 text-gray-300 opacity-70 hover:opacity-100 hover:scale-105 hover:bg-gray-600'
                                                    }
                                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                                                `}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8">
                                <label htmlFor="quality" className="block text-base font-medium text-gray-300 mb-3">4. تحديد جودة التحسين</label>
                                <select 
                                    id="quality" 
                                    value={outputQuality} 
                                    onChange={(e) => setOutputQuality(e.target.value as OutputQuality)} 
                                    disabled={isEnhancing}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50"
                                >
                                    {OUTPUT_QUALITY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </div>

                            <div className="pt-6 mt-6 border-t border-gray-700/50 grid grid-cols-1 sm:grid-cols-2 gap-3">
                               <button
                                   onClick={handleEnhance}
                                   // FIX: Removed !isKeySet from disabled check.
                                   disabled={isEnhancing}
                                   className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                   // FIX: Removed title related to API key.
                               >
                                   <UpscaleIcon />
                                   {isEnhancing ? 'جاري التحسين...' : enhanceButtonText}
                               </button>
                               <button
                                    onClick={handleDownloadWithFilters}
                                    className="w-full flex justify-center items-center gap-2 bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-green-700 transform hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <DownloadIcon />
                                    تحميل الصورة (بفلاتر المعاينة)
                                </button>
                           </div>
                         </div>
                         <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                             <h3 className="text-xl font-bold mb-4 text-gray-200">الوصف التعريفي (Alt Text)</h3>
                             <p className="text-sm text-gray-400 mb-4">
                                 قم بإنشاء وصف احترافي للصورة لتحسين محركات البحث وإمكانية الوصول.
                             </p>
                             <div className="relative mb-4">
                                 <label className="block text-xs font-medium text-gray-400 mb-1">AR (العربية)</label>
                                 <textarea
                                     readOnly
                                     value={altText}
                                     placeholder={isGeneratingAltText ? 'جاري الكتابة بواسطة الذكاء الاصطناعي...' : 'سيظهر الوصف هنا...'}
                                     className="w-full h-28 bg-gray-900 border border-gray-600 rounded-md p-3 pr-4 text-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                                     aria-label="Generated Alt Text in Arabic"
                                 />
                                 {altText && !isGeneratingAltText && (
                                     <button
                                         onClick={handleCopyAltTextAR}
                                         className="absolute top-8 left-3 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-xs flex items-center gap-1.5 transition-colors"
                                         aria-label="Copy arabic alt text"
                                     >
                                         <CopyIcon />
                                         {copyButtonTextAR}
                                     </button>
                                 )}
                             </div>
                              {(isTranslating || translatedAltText) && (
                                <div className="relative">
                                    <label className="block text-xs font-medium text-gray-400 mb-1">EN (English)</label>
                                    <textarea
                                        readOnly
                                        value={translatedAltText}
                                        placeholder={isTranslating ? 'Translating with AI...' : ''}
                                        className="w-full h-28 bg-gray-900 border border-gray-600 rounded-md p-3 pr-4 text-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                                        aria-label="Generated Alt Text in English"
                                    />
                                    {translatedAltText && !isTranslating && (
                                        <button
                                            onClick={handleCopyAltTextEN}
                                            className="absolute top-8 left-3 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-xs flex items-center gap-1.5 transition-colors"
                                            aria-label="Copy english alt text"
                                        >
                                            <CopyIcon />
                                            {copyButtonTextEN}
                                        </button>
                                    )}
                                </div>
                            )}
                             <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                 <button
                                     onClick={handleGenerateAltText}
                                     // FIX: Removed !isKeySet from disabled check.
                                     disabled={isGeneratingAltText || isTranslating}
                                     className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                     // FIX: Removed title related to API key.
                                 >
                                     <SparklesIcon />
                                     {isGeneratingAltText ? 'جاري الإنشاء...' : 'إنشاء وصف (AR)'}
                                 </button>
                                  <button
                                     onClick={handleTranslateAltText}
                                     // FIX: Removed !isKeySet from disabled check.
                                     disabled={!altText || isGeneratingAltText || isTranslating}
                                     className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                     // FIX: Removed title related to API key.
                                     title={!altText ? "يجب إنشاء الوصف العربي أولاً" : ""}
                                 >
                                     <TranslateIcon />
                                     {isTranslating ? 'جاري الترجمة...' : 'ترجمة إلى (EN)'}
                                 </button>
                             </div>
                         </div>
                         </>
                    )}
                </div>
            </main>
            {zoomedImageUrl && (
                <ZoomedImage imageUrl={zoomedImageUrl} onClose={() => setZoomedImageUrl(null)} />
            )}
        </div>
    );
};

export default App;