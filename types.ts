

export enum LightingType {
    Studio = 'studio lighting',
    Natural = 'natural lighting',
    GoldenHour = 'golden hour lighting',
    BlueHour = 'blue hour lighting',
    Cinematic = 'cinematic lighting',
    Dramatic = 'dramatic lighting',
}

export enum CameraAngle {
    // Standard Views
    FrontView = 'front view',
    SideView = 'side view',
    Angle45 = '45-degree angle',
    // Top/Bottom Views
    TopView = 'top view',
    BirdsEyeView = "bird's eye view",
    LowAngle = 'low angle shot',
    HighAngle = 'high angle shot',
    // Shot types
    WideShot = 'wide shot',
    CloseUp = 'close-up shot',
    MacroShot = 'macro shot',
    // Artistic
    DutchAngle = 'dutch angle shot',
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
    NightMode = 'night mode',
    Noir = 'noir',
    Cool = 'cool tone',
}

export enum TextureEffect {
    None = 'none',
    Rough = 'rough',
    Smooth = 'smooth',
    Grainy = 'grainy',
    Canvas = 'canvas',
}

export enum OutputQuality {
    Standard = 'standard',
    HighPrint = 'high_print',
}

export enum SubjectType {
    Fruit = 'fruit',
    Vegetable = 'vegetable',
    Sandwich = 'sandwich',
    Juice = 'juice',
    Pie = 'pie',
    BakedGoods = 'baked_goods',
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
    subjectType: SubjectType;
    fruitVariety: string;
    vegetableVariety: string;
    sandwichVariety: string;
    juiceVariety: string;
    pieVariety: string;
    bakedGoodsVariety: string;
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
    subjectVariety: string;
}

export interface UpscaleImageParams {
    imageData: string;
    mimeType: string;
    filter: ImageFilter;
    texture: TextureEffect;
    outputQuality: OutputQuality;
}

export interface GenerateImageParams {
    lighting: LightingType;
    cameraAngle: CameraAngle;
    aspectRatio: AspectRatio;
    backgroundPrompt: string;
    isTransparent: boolean;
    subjectVariety: string;
}

export interface GenerateAltTextParams {
    imageData: string;
    mimeType: string;
}

export interface TranslateTextParams {
    text: string;
    targetLanguage: string;
}