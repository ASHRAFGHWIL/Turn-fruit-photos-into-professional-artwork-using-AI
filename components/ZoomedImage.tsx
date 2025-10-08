import React, { useEffect } from 'react';
import { CloseIcon } from './icons';

interface ZoomedImageProps {
    imageUrl: string;
    onClose: () => void;
}

const ZoomedImage: React.FC<ZoomedImageProps> = ({ imageUrl, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Zoomed image view"
        >
            <style>
            {`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
            `}
            </style>
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Close zoomed image"
            >
                <CloseIcon />
            </button>
            <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
                <img
                    src={imageUrl}
                    alt="Zoomed generated result"
                    className="block max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                />
            </div>
        </div>
    );
};

export default ZoomedImage;
