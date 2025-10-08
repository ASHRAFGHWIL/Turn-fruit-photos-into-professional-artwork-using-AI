import React, { useCallback, useRef } from 'react';
import { UploadIcon, LoadingSpinner, ErrorIcon, ImageIcon } from './icons';
import { ImageFilter, AspectRatio, TextureEffect } from '../types';

interface ImageWorkspaceProps {
    originalImage: string | null;
    generatedImage: string | null;
    isLoading: boolean;
    isEnhancing: boolean;
    error: string | null;
    onImageUpload: (file: File) => void;
    aspectRatio: AspectRatio;
    previewAspectRatio: AspectRatio | null;
    activeFilter: ImageFilter;
    previewFilter: ImageFilter | null;
    activeTexture: TextureEffect;
    previewTexture: TextureEffect | null;
    colorFilterStyle: React.CSSProperties;
}

const getFilterClassName = (filter: ImageFilter): string => {
    switch (filter) {
        case ImageFilter.Sepia: return 'sepia';
        case ImageFilter.Grayscale: return 'grayscale';
        case ImageFilter.Invert: return 'invert';
        case ImageFilter.Vintage: return 'vintage';
        case ImageFilter.Glow: return 'glow';
        case ImageFilter.Sharpen: return 'sharpen';
        case ImageFilter.NightMode: return 'night-mode';
        case ImageFilter.Noir: return 'noir';
        case ImageFilter.Cool: return 'cool';
        default: return '';
    }
};

const getTextureClassName = (texture: TextureEffect): string => {
    switch (texture) {
        case TextureEffect.Canvas: return 'texture-canvas';
        case TextureEffect.Grainy: return 'texture-grainy';
        case TextureEffect.Rough: return 'texture-rough';
        case TextureEffect.Smooth: return 'texture-smooth';
        default: return '';
    }
};


const getAspectRatioClassName = (ratio: AspectRatio): string => {
    switch (ratio) {
        case AspectRatio.Square:
            return 'aspect-square';
        case AspectRatio.Vertical:
            return 'aspect-[3/4]';
        case AspectRatio.Horizontal:
            return 'aspect-[4/3]';
        default:
            return 'aspect-square'; // Default fallback
    }
};


const ImageWorkspace: React.FC<ImageWorkspaceProps> = ({
    originalImage,
    generatedImage,
    isLoading,
    isEnhancing,
    error,
    onImageUpload,
    aspectRatio,
    previewAspectRatio,
    activeFilter,
    previewFilter,
    activeTexture,
    previewTexture,
    colorFilterStyle,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onImageUpload(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const currentRatio = previewAspectRatio ?? aspectRatio;
    const ratioClass = getAspectRatioClassName(currentRatio);
    const currentTexture = previewTexture ?? activeTexture;
    const textureClass = getTextureClassName(currentTexture);
    const currentFilter = previewFilter ?? activeFilter;
    const filterClass = getFilterClassName(currentFilter);

    const renderPlaceholder = (title: string, content: React.ReactNode) => (
        <div className={`w-full max-w-full bg-gray-800/60 rounded-xl border-2 border-dashed border-gray-600 flex flex-col justify-center items-center p-4 text-center ${ratioClass}`}>
             <h3 className="text-lg font-bold text-gray-300 mb-4">{title}</h3>
            {content}
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[60vh] min-h-[400px] bg-gray-900/50 p-4 rounded-2xl border border-gray-700">
            {/* Original Image */}
            <div className="flex flex-col justify-center items-center">
                {originalImage ? (
                    <div className={`w-full bg-black rounded-lg overflow-hidden flex items-center justify-center ${ratioClass}`}>
                        <img src={originalImage} alt="Original" className="max-w-full max-h-full object-contain" />
                    </div>
                ) : (
                    renderPlaceholder('الصورة الأصلية', (
                         <>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/png, image/jpeg, image/webp"
                            />
                            <button
                                onClick={handleUploadClick}
                                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-purple-700 transition-all transform hover:scale-105"
                            >
                                <UploadIcon />
                                اختر صورة فاكهة
                            </button>
                            <p className="text-xs text-gray-500 mt-2">PNG, JPG, WEBP</p>
                        </>
                    ))
                )}
            </div>

            {/* Generated Image */}
            <div className="flex flex-col justify-center items-center">
                 {isLoading ? (
                    renderPlaceholder('النتيجة', <LoadingSpinner />)
                ) : error ? (
                    renderPlaceholder('خطأ', <div className="flex flex-col items-center"><ErrorIcon /><p className="mt-2 text-red-400">{error}</p></div>)
                ) : generatedImage ? (
                    <div className={`w-full bg-black rounded-lg overflow-hidden flex items-center justify-center relative ${ratioClass}`}>
                        <div className={`w-full h-full relative ${textureClass}`}>
                            <img 
                                src={generatedImage} 
                                alt="Generated" 
                                className={`w-full h-full object-contain transition-all duration-300 ${filterClass}`}
                                style={colorFilterStyle}
                            />
                        </div>
                        {isEnhancing && (
                            <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center rounded-lg">
                                <LoadingSpinner />
                                <p className="text-white mt-2 font-semibold">جاري تحسين الصورة...</p>
                            </div>
                        )}
                    </div>
                ) : (
                    renderPlaceholder('النتيجة', <div className="flex flex-col items-center text-gray-500"><ImageIcon /><p className="mt-2">ستظهر الصورة المُعدلة هنا</p></div>)
                )}
            </div>
        </div>
    );
};

export default ImageWorkspace;