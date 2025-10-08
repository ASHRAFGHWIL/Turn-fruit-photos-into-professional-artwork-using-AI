import React from 'react';
import { ALL_BACKGROUND_OPTIONS } from '../constants';

interface BackgroundSelectorProps {
    backgroundPrompt: string;
    setBackgroundPrompt: (prompt: string) => void;
    isTransparent: boolean;
    setIsTransparent: (isTransparent: boolean) => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
    backgroundPrompt,
    setBackgroundPrompt,
    isTransparent,
    setIsTransparent
}) => {

    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPrompt = e.target.value;
        if (selectedPrompt && !isTransparent) {
            setBackgroundPrompt(selectedPrompt);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">الخلفية</label>
            <p className="text-xs text-gray-400 mb-3">اختر من القائمة، أو اكتب وصفًا مخصصًا أدناه.</p>

            <div className="mb-4">
                <select
                    value={ALL_BACKGROUND_OPTIONS.some(o => o.prompt === backgroundPrompt) ? backgroundPrompt : ""}
                    onChange={handleDropdownChange}
                    disabled={isTransparent}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <option value="" disabled>اختر خلفية جاهزة...</option>
                    {ALL_BACKGROUND_OPTIONS.map((option) => (
                        <option key={option.prompt} value={option.prompt}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <textarea 
                id="background" 
                rows={2} 
                value={backgroundPrompt} 
                onChange={(e) => setBackgroundPrompt(e.target.value)} 
                disabled={isTransparent} 
                className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed" 
                placeholder="مثال: على طاولة خشبية عتيقة"
            />
            
            <div className="flex items-center mt-3">
                <input 
                    id="transparent" 
                    type="checkbox" 
                    checked={isTransparent} 
                    onChange={(e) => setIsTransparent(e.target.checked)} 
                    className="h-4 w-4 rounded border-gray-500 text-purple-600 focus:ring-purple-500 bg-gray-700" 
                />
                <label htmlFor="transparent" className="mr-2 block text-sm text-gray-300">خلفية شفافة (PNG)</label>
            </div>
        </div>
    );
};

export default BackgroundSelector;