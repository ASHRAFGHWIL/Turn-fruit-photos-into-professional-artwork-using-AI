
export enum LightingType {
    Studio = 'studio lighting',
    Natural = 'natural lighting',
    GoldenHour = 'golden hour lighting',
    BlueHour = 'blue hour lighting',
    Cinematic = 'cinematic lighting',
    Dramatic = 'dramatic lighting',
}

export enum CameraAngle {
    FrontView = 'front view',
    SideView = 'side view',
    TopView = 'top view',
    Angle45 = '45-degree angle',
    CloseUp = 'close-up shot',
    WideShot = 'wide shot',
}

export enum AspectRatio {
    Square = '1:1',
    Vertical = '3:4',
    Horizontal = '4:3',
}

export enum ImageFilter {
    None = 'none',
    Sepia = 'sepia tone',
    Grayscale = 'grayscale',
    Invert = 'invert colors',
    Vintage = 'vintage',
    Glow = 'soft glow',
    Sharpen = 'sharpen',
}

export enum OutputQuality {
    Standard = 'standard',
    HighPrint = 'high_print',
}

export interface Option<T> {
    value: T;
    label: string;
}

export interface ColorAdjustments {
    brightness: number;
    contrast: number;
    saturation: number;
    hue: number;
}

export interface Preset {
    label: string;
    lighting: LightingType;
    cameraAngle: CameraAngle;
    fruitVariety: string;
    backgroundPrompt: string;
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
    filter: ImageFilter;
    outputQuality: OutputQuality;
}

export interface GenerateImageParams {
    lighting: LightingType;
    cameraAngle: CameraAngle;
    aspectRatio: AspectRatio;
    backgroundPrompt: string;
    isTransparent: boolean;
    fruitVariety: string;
}

export interface GenerateAltTextParams {
    imageData: string;
    mimeType: string;
}

export interface TranslateTextParams {
    text: string;
    targetLanguage: string;
}
