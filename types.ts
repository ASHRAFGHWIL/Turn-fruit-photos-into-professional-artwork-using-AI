
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

export interface TransformImageParams {
    imageData: string;
    mimeType: string;
    lighting: LightingType;
    cameraAngle: CameraAngle;
    aspectRatio: AspectRatio;
    backgroundPrompt: string;
    isTransparent: boolean;
}

export interface Option<T> {
    value: T;
    label: string;
}
