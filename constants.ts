import { LightingType, CameraAngle, AspectRatio, ImageFilter, Option, Preset, BackgroundGalleryOption, BackgroundOption } from './types';

export const LIGHTING_OPTIONS: Option<LightingType>[] = [
    { value: LightingType.Studio, label: 'إضاءة استوديو' },
    { value: LightingType.Natural, label: 'إضاءة طبيعية' },
    { value: LightingType.GoldenHour, label: 'الساعة الذهبية' },
    { value: LightingType.BlueHour, label: 'الساعة الزرقاء' },
    { value: LightingType.Cinematic, label: 'سينمائية' },
    { value: LightingType.Dramatic, label: 'درامية' },
];

export const CAMERA_ANGLE_OPTIONS: Option<CameraAngle>[] = [
    { value: CameraAngle.FrontView, label: 'منظر أمامي' },
    { value: CameraAngle.SideView, label: 'منظر جانبي' },
    { value: CameraAngle.TopView, label: 'منظر علوي' },
    { value: CameraAngle.Angle45, label: 'زاوية 45 درجة' },
    { value: CameraAngle.CloseUp, label: 'لقطة قريبة' },
    { value: CameraAngle.WideShot, label: 'لقطة واسعة' },
];

export const ASPECT_RATIO_OPTIONS: Option<AspectRatio>[] = [
    { value: AspectRatio.Square, label: 'مربع' },
    { value: AspectRatio.Vertical, label: 'عمودي' },
    { value: AspectRatio.Horizontal, label: 'أفقي' },
];

export const FILTER_OPTIONS: Option<ImageFilter>[] = [
    { value: ImageFilter.None, label: 'بدون فلتر' },
    { value: ImageFilter.Sepia, label: 'بني داكن' },
    { value: ImageFilter.Grayscale, label: 'رمادي' },
    { value: ImageFilter.Invert, label: 'عكس الألوان' },
    { value: ImageFilter.Vintage, label: 'عتيق' },
    { value: ImageFilter.Glow, label: 'توهج' },
    { value: ImageFilter.Sharpen, label: 'زيادة الحدة' },
];

// Expanded the list of fruit varieties
export const FRUIT_VARIETY_OPTIONS: Option<string>[] = [
    { value: 'any high-quality fruit', label: 'فاكهة عامة عالية الجودة' },
    { value: 'Red Apple', label: 'تفاح أحمر' },
    { value: 'Green Pear', label: 'كمثرى خضراء' },
    { value: 'Strawberry', label: 'فراولة' },
    { value: 'Blueberry', label: 'توت أزرق' },
    { value: 'Florida Orange', label: 'برتقال فلوريدا' },
    { value: 'California Grapes', label: 'عنب كاليفورنيا' },
    { value: 'Georgia Peach', label: 'خوخ جورجيا' },
    { value: 'Washington Cherry', label: 'كرز واشنطن' },
    { value: 'Mediterranean Lemon', label: 'ليمون متوسطي' },
    { value: 'Italian Fig', label: 'تين إيطالي' },
    { value: 'Spanish Olives', label: 'زيتون إسباني' },
    { value: 'Hass Avocado', label: 'أفوكادو هاس' },
];

export const BACKGROUND_GALLERY_OPTIONS: BackgroundGalleryOption[] = [
    {
        label: 'رخام أنيق',
        prompt: 'on a clean, polished white marble countertop with soft, diffused light',
        imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c362ea42e?q=80&w=400&auto=format&fit=crop'
    },
    {
        label: 'خشب ريفي',
        prompt: 'on a rustic, weathered wooden table with warm, directional light',
        imageUrl: 'https://images.unsplash.com/photo-1542848373-9911b3c850af?q=80&w=400&auto=format&fit=crop'
    },
    {
        label: 'طبيعة خضراء',
        prompt: 'in a natural outdoor setting with soft, blurred green foliage in the background',
        imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop'
    },
    {
        label: 'مجردة حديثة',
        prompt: 'against a modern, abstract background with soft, colorful gradients',
        imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=400&auto=format&fit=crop'
    },
    {
        label: 'استوديو أبيض',
        prompt: 'on a clean, professional, seamless white studio background',
        imageUrl: 'https://images.unsplash.com/photo-1593902636254-472352528753?q=80&w=400&auto=format&fit=crop'
    },
];

export const EXPANDED_BACKGROUND_OPTIONS: BackgroundOption[] = [
    { label: 'سطح معدني مصقول', prompt: 'on a brushed metal surface with cool, reflective light' },
    { label: 'قماش ساتان أسود', prompt: 'on a black satin cloth background, creating elegant reflections' },
    { label: 'طبق سيراميك أبيض', prompt: 'arranged in a minimalist white ceramic bowl' },
    { label: 'خلفية إسمنتية داكنة', prompt: 'against a dark, textured concrete background for a moody, industrial feel' },
    { label: 'طاولة نزهة صيفية', prompt: 'on a red and white checkered picnic blanket under bright summer sun' },
    { label: 'قطرات ماء منعشة', prompt: 'covered in fresh, glistening water droplets against a vibrant, out-of-focus background' },
    { label: 'لوح تقطيع حجري', prompt: 'on a slate cutting board with scattered herbs' },
    { label: 'خلفية جليدية', prompt: 'encased in clear ice or resting on a frosty surface' },
    { label: 'دوامة ألوان مائية', prompt: 'against a soft, swirling watercolor background of complementary colors' },
    { label: 'مشهد شاطئي', prompt: 'on a sandy beach with a blurred ocean background during daytime' },
];

export const ALL_BACKGROUND_OPTIONS: BackgroundOption[] = [
    ...BACKGROUND_GALLERY_OPTIONS.map(({ label, prompt }) => ({ label, prompt })),
    ...EXPANDED_BACKGROUND_OPTIONS,
];

export const PRESET_OPTIONS: Preset[] = [
    {
        label: 'بستان الغروب',
        lighting: LightingType.GoldenHour,
        cameraAngle: CameraAngle.WideShot,
        fruitVariety: 'Washington Cherry',
        backgroundPrompt: 'in a lush orchard during a warm sunset, with soft, glowing light filtering through the leaves',
    },
    {
        label: 'مطبخ عصري',
        lighting: LightingType.Studio,
        cameraAngle: CameraAngle.TopView,
        fruitVariety: 'Hass Avocado',
        backgroundPrompt: 'sliced neatly on a clean, white marble countertop next to a chef\'s knife',
    },
    {
        label: 'دفقة حمضيات',
        lighting: LightingType.Cinematic,
        cameraAngle: CameraAngle.CloseUp,
        fruitVariety: 'Florida Orange',
        backgroundPrompt: 'a dynamic splash of water frozen in time against a vibrant, abstract blue and orange background',
    },
    {
        label: 'توت الغابة',
        lighting: LightingType.Natural,
        cameraAngle: CameraAngle.Angle45,
        fruitVariety: 'Blueberry',
        backgroundPrompt: 'a handful of fresh blueberries resting on a mossy log in a misty forest setting',
    },
];