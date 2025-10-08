export enum LightingType {
    Natural = 'Natural Light',
    Studio = 'Studio Light',
    GoldenHour = 'Golden Hour',
    BlueHour = 'Blue Hour',
    Cinematic = 'Cinematic',
    Dramatic = 'Dramatic',
}

export enum CameraAngle {
    FrontView = 'Front View',
    SideView = 'Side View',
    TopView = 'Top View',
    Angle45 = '45-Degree Angle',
    CloseUp = 'Close-Up',
    WideShot = 'Wide Shot',
}

export enum AspectRatio {
    Square = '1:1',
    Vertical = '9:16',
    Horizontal = '16:9',
}

export enum ImageFilter {
    None = 'None',
    Sepia = 'Sepia',
    Grayscale = 'Grayscale',
    Invert = 'Invert',
    Vintage = 'Vintage',
    Glow = 'Glow',
    Sharpen = 'Sharpen',
}

export interface Preset {
    label: string;
    lighting: LightingType;
    cameraAngle: CameraAngle;
    backgroundPrompt: string;
    fruitVariety: string;
}

export interface TransformImageParams {
    imageData: string;
    mimeType: string;
    lighting: LightingType;
    cameraAngle: CameraAngle;
    aspectRatio: AspectRatio;
    backgroundPrompt: string;
    isTransparent: boolean;
    fruitVariety: string;
}

export interface UpscaleImageParams {
    imageData: string;
    mimeType: string;
    filter?: ImageFilter;
}

export interface Option<T> {
    value: T;
    label: string;
}

export interface BackgroundGalleryOption {
    label: string;
    prompt: string;
    imageUrl: string;
}

export interface BackgroundOption {
    label: string;
    prompt: string;
}

export interface ColorAdjustments {
    brightness: number;
    contrast: number;
    saturation: number;
    hue: number;
}