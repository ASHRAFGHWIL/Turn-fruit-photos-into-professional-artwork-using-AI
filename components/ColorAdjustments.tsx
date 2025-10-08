import React from 'react';
import { ColorAdjustments } from '../types';

interface ColorAdjustmentsPanelProps {
    adjustments: ColorAdjustments;
    setAdjustments: (adjustments: ColorAdjustments) => void;
    onReset: () => void;
    disabled: boolean;
}

const Slider: React.FC<{
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (value: number) => void;
    disabled: boolean;
}> = ({ label, value, min, max, step = 1, onChange, disabled }) => (
    <div className="flex items-center space-x-2">
        <label htmlFor={label} className="text-sm font-medium text-gray-400 w-16 text-right">{label}</label>
        <input
            type="range"
            id={label}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <span className="text-xs font-mono text-gray-300 w-10 text-center">{value}</span>
    </div>
);


const ColorAdjustmentsPanel: React.FC<ColorAdjustmentsPanelProps> = ({
    adjustments,
    setAdjustments,
    onReset,
    disabled
}) => {
    const handleChange = (key: keyof ColorAdjustments, value: number) => {
        setAdjustments({ ...adjustments, [key]: value });
    };

    return (
        <div className="space-y-3">
            <Slider
                label="السطوع"
                value={adjustments.brightness}
                min={0}
                max={200}
                onChange={(v) => handleChange('brightness', v)}
                disabled={disabled}
            />
            <Slider
                label="التباين"
                value={adjustments.contrast}
                min={0}
                max={200}
                onChange={(v) => handleChange('contrast', v)}
                disabled={disabled}
            />
            <Slider
                label="التشبع"
                value={adjustments.saturation}
                min={0}
                max={200}
                onChange={(v) => handleChange('saturation', v)}
                disabled={disabled}
            />
            <Slider
                label="درجة اللون"
                value={adjustments.hue}
                min={-180}
                max={180}
                onChange={(v) => handleChange('hue', v)}
                disabled={disabled}
            />
            <div className="pt-2">
                <button
                    onClick={onReset}
                    disabled={disabled}
                    className="w-full text-center bg-gray-700 text-white font-semibold py-1.5 px-3 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    إعادة تعيين الألوان
                </button>
            </div>
        </div>
    );
};

export default ColorAdjustmentsPanel;
