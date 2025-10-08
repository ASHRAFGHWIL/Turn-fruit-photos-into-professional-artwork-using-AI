import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { CameraAngle, LightingType, AspectRatio } from './types';
import { LIGHTING_OPTIONS, CAMERA_ANGLE_OPTIONS, ASPECT_RATIO_OPTIONS } from './constants';
import { transformImage } from './services/geminiService';
import ImageWorkspace from './components/ImageWorkspace';
import { DownloadIcon } from './components/icons';

interface GeneratedImageData {
    url: string;
    filename: string;
}

const App: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [originalImageMime, setOriginalImageMime] = useState<string>('');
    const [generatedImage, setGeneratedImage] = useState<GeneratedImageData | null>(null);

    const [lighting, setLighting] = useState<LightingType>(LightingType.Studio);
    const [cameraAngle, setCameraAngle] = useState<CameraAngle>(CameraAngle.FrontView);
    const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.Square);
    const [backgroundPrompt, setBackgroundPrompt] = useState<string>('a clean, professional white background');
    const [isTransparent, setIsTransparent] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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

    const handleTransform = useCallback(async () => {
        if (!originalImage) {
            setError('الرجاء رفع صورة أولاً.');
            return;
        }

        setIsLoading(true);
        setGeneratedImage(null);
        setError(null);

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
    }, [originalImage, originalImageMime, lighting, cameraAngle, aspectRatio, backgroundPrompt, isTransparent]);

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
                        {/* Aspect Ratio */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">أبعاد الصورة</label>
                            <div className="grid grid-cols-3 gap-2">
                                {ASPECT_RATIO_OPTIONS.map(opt => (
                                    <button key={opt.value} onClick={() => setAspectRatio(opt.value)} className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${aspectRatio === opt.value ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-700 hover:bg-gray-600'}`}>
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Background */}
                        <div>
                            <label htmlFor="background" className="block text-sm font-medium text-gray-300 mb-2">وصف الخلفية</label>
                            <textarea id="background" rows={3} value={backgroundPrompt} onChange={(e) => setBackgroundPrompt(e.target.value)} disabled={isTransparent} className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed" placeholder="مثال: على طاولة خشبية عتيقة"></textarea>
                            <div className="flex items-center mt-3">
                                <input id="transparent" type="checkbox" checked={isTransparent} onChange={(e) => setIsTransparent(e.target.checked)} className="h-4 w-4 rounded border-gray-500 text-purple-600 focus:ring-purple-500 bg-gray-700" />
                                <label htmlFor="transparent" className="mr-2 block text-sm text-gray-300">خلفية شفافة (PNG)</label>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button onClick={handleTransform} disabled={isLoading || !originalImage} className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                            {isLoading ? 'جاري التحويل...' : 'حوّل الصورة'}
                        </button>
                    </div>
                </aside>

                <div className="lg:col-span-2">
                    <ImageWorkspace
                        originalImage={originalImage}
                        generatedImage={generatedImage?.url ?? null}
                        isLoading={isLoading}
                        error={error}
                        onImageUpload={handleImageUpload}
                    />
                     {generatedImage && !isLoading && !error && (
                        <a
                            href={generatedImage.url}
                            download={generatedImage.filename}
                            className="mt-4 w-full flex justify-center items-center gap-2 bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-green-700 transform hover:-translate-y-0.5 transition-all duration-300"
                        >
                            <DownloadIcon />
                            تحميل الصورة النهائية
                        </a>
                    )}
                </div>
            </main>
        </div>
    );
};

export default App;