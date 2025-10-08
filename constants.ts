
import { LightingType, CameraAngle, AspectRatio, Option } from './types';

export const LIGHTING_OPTIONS: Option<LightingType>[] = [
    { value: LightingType.Studio, label: 'إضاءة استوديو' },
    { value: LightingType.Natural, label: 'إضاءة طبيعية' },
    { value: LightingType.GoldenHour, label: 'الساعة الذهبية' },
    { value: LightingType.BlueHour, label: 'الساعة الزرقاء' },
    { value: LightingType.Cinematic, label: 'سينمائية' },
    { value: LightingType.Dramatic, label: 'درامية' },
];

export const CAMERA_ANGLE_OPTIONS: Option<CameraAngle>[] = [
    { value: CameraAngle.FrontView, label: 'มุมมองด้านหน้า' },
    { value: CameraAngle.SideView, label: 'มุมมองด้านข้าง' },
    { value: CameraAngle.TopView, label: 'มุมมองด้านบน' },
    { value: CameraAngle.Angle45, label: 'زاوية 45 درجة' },
    { value: CameraAngle.CloseUp, label: 'لقطة قريبة' },
    { value: CameraAngle.WideShot, label: 'لقطة واسعة' },
];

export const ASPECT_RATIO_OPTIONS: Option<AspectRatio>[] = [
    { value: AspectRatio.Square, label: 'مربع' },
    { value: AspectRatio.Vertical, label: 'عمودي' },
    { value: AspectRatio.Horizontal, label: 'أفقي' },
];
