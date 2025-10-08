import { LightingType, CameraAngle, AspectRatio, ImageFilter, Option, Preset, BackgroundGalleryOption, BackgroundOption, OutputQuality, TextureEffect, SubjectType } from './types';

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
    { value: CameraAngle.Angle45, label: 'زاوية 45 درجة' },
    { value: CameraAngle.TopView, label: 'منظر علوي' },
    { value: CameraAngle.BirdsEyeView, label: 'منظور عين الطائر' },
    { value: CameraAngle.LowAngle, label: 'زاوية منخفضة' },
    { value: CameraAngle.HighAngle, label: 'زاوية مرتفعة' },
    { value: CameraAngle.WideShot, label: 'لقطة واسعة' },
    { value: CameraAngle.CloseUp, label: 'لقطة قريبة' },
    { value: CameraAngle.MacroShot, label: 'لقطة ماكرو' },
    { value: CameraAngle.DutchAngle, label: 'زاوية هولندية' },
];

export const ASPECT_RATIO_OPTIONS: Option<AspectRatio>[] = [
    { value: AspectRatio.Square, label: 'مربع' },
    { value: AspectRatio.Vertical, label: 'عمودي' },
    { value: AspectRatio.Horizontal, label: 'أفقي' },
];

export const FILTER_OPTIONS: Option<ImageFilter>[] = [
    { value: ImageFilter.None, label: 'بدون فلتر' },
    { value: ImageFilter.Grayscale, label: 'رمادي' },
    { value: ImageFilter.Noir, label: 'نوار' },
    { value: ImageFilter.Sepia, label: 'بني داكن' },
    { value: ImageFilter.Vintage, label: 'عتيق' },
    { value: ImageFilter.Cool, label: 'درجة لون باردة' },
    { value: ImageFilter.Glow, label: 'توهج' },
    { value: ImageFilter.Sharpen, label: 'زيادة الحدة' },
    { value: ImageFilter.NightMode, label: 'وضع ليلي' },
    { value: ImageFilter.Invert, label: 'عكس الألوان' },
];

export const TEXTURE_OPTIONS: Option<TextureEffect>[] = [
    { value: TextureEffect.None, label: 'بدون ملمس' },
    { value: TextureEffect.Grainy, label: 'محبب' },
    { value: TextureEffect.Canvas, label: 'قماشي' },
    { value: TextureEffect.Rough, label: 'خشن' },
    { value: TextureEffect.Smooth, label: 'ناعم' },
];


export const OUTPUT_QUALITY_OPTIONS: Option<OutputQuality>[] = [
    { value: OutputQuality.Standard, label: 'تحسين قياسي (للشاشة)' },
    { value: OutputQuality.HighPrint, label: 'تحسين للطباعة (600 DPI)' },
];

export const FRUIT_VARIETY_OPTIONS: Option<string>[] = [
    { value: 'any high-quality fruit', label: 'فاكهة عامة عالية الجودة' },
    // Common Fruits
    { value: 'Red Apple', label: 'تفاح أحمر' },
    { value: 'Green Pear', label: 'كمثرى خضراء' },
    { value: 'Strawberry', label: 'فراولة' },
    { value: 'Blueberry', label: 'توت أزرق' },
    // American Varieties
    { value: 'Florida Orange', label: 'برتقال فلوريدا' },
    { value: 'California Grapes', label: 'عنب كاليفورنيا' },
    { value: 'Georgia Peach', label: 'خوخ جورجيا' },
    { value: 'Washington Cherry', label: 'كرز واشنطن' },
    { value: 'Hass Avocado', label: 'أفوكادو هاس' },
    { value: 'Wisconsin Cranberry', label: 'توت بري (ويسكونسن)' },
    { value: 'Florida Key Lime', label: 'ليمون أخضر (فلوريدا)' },
    { value: 'Honeycrisp Apple', label: 'تفاح هني كريسب' },
    { value: 'Concord Grapes', label: 'عنب كونكورد' },
    { value: 'Oregon Marionberry', label: 'توت ماريون (أوريغون)' },
    { value: 'Hawaiian Pineapple', label: 'أناناس هاواي' },
    // European Varieties
    { value: 'Mediterranean Lemon', label: 'ليمون متوسطي' },
    { value: 'Italian Fig', label: 'تين إيطالي' },
    { value: 'Spanish Olives', label: 'زيتون إسباني' },
    { value: 'Italian Blood Orange', label: 'برتقال دم الزغلول (إيطاليا)' },
    { value: 'French Agen Prune', label: 'برقوق أجين (فرنسا)' },
    { value: 'Greek Kalamata Olives', label: 'زيتون كالاماتا (اليونان)' },
    { value: 'Portuguese Rocha Pear', label: 'كمثرى روشا (البرتغال)' },
    { value: 'Spanish Persimmon', label: 'كاكي (إسبانيا)' },
];

export const VEGETABLE_VARIETY_OPTIONS: Option<string>[] = [
    { value: 'any high-quality vegetable', label: 'خضار عام عالي الجودة' },
    // Common Vegetables
    { value: 'Red Tomato on the Vine', label: 'طماطم حمراء (عنقود)' },
    { value: 'Carrot', label: 'جزر' },
    { value: 'Cucumber', label: 'خيار' },
    { value: 'Red Bell Pepper', label: 'فلفل أحمر' },
    { value: 'Broccoli', label: 'بروكلي' },
    { value: 'Eggplant', label: 'باذنجان' },
    { value: 'Corn on the cob', label: 'ذرة' },
    { value: 'Lettuce Head', label: 'خس' },
    { value: 'Mushroom', label: 'فطر' },
    { value: 'Potato', label: 'بطاطس' },
    { value: 'Onion', label: 'بصل' },
    // American Varieties
    { value: 'Idaho Potato', label: 'بطاطس أيداهو' },
    { value: 'California Artichoke', label: 'خرشوف كاليفورنيا' },
    { value: 'Vidalia Onion', label: 'بصل فيداليا (جورجيا)' },
    { value: 'New England Pumpkin', label: 'يقطين نيو إنجلاند' },
    { value: 'Michigan Asparagus', label: 'هليون ميشيغان' },
    { value: 'North Carolina Sweet Potato', label: 'بطاطا حلوة (كارولاينا الشمالية)' },
    // European Varieties
    { value: 'San Marzano Tomato', label: 'طماطم سان مارزانو (إيطاليا)' },
    { value: 'Belgian Endive', label: 'الهندباء البلجيكية' },
    { value: 'Tuscan Kale (Cavolo Nero)', label: 'كيل توسكاني (كافولو نيرو)' },
    { value: 'French Leek', label: 'الكراث الفرنسي' },
    { value: 'Italian Fennel', label: 'الشمر الإيطالي' },
    { value: 'Romanesco Broccoli', label: 'بروكلي رومانسكي' },
];

export const SANDWICH_VARIETY_OPTIONS: Option<string>[] = [
    { value: 'any high-quality sandwich', label: 'ساندويتش عام عالي الجودة' },
    // American Sandwiches
    { value: 'Classic Philly Cheesesteak sandwich', label: 'فيلي تشيز ستيك' },
    { value: 'Reuben sandwich with corned beef and sauerkraut', label: 'ساندويتش روبن' },
    { value: 'BLT (Bacon, Lettuce, Tomato) sandwich', label: 'ساندويتش بي إل تي' },
    { value: 'Classic American Club Sandwich', label: 'كلوب ساندويتش' },
    { value: 'Pulled Pork Sandwich with barbecue sauce', label: 'ساندويتش اللحم المسحوب' },
    { value: 'New England Lobster Roll', label: 'لوبستر رول' },
    // European Sandwiches
    { value: 'Italian Panini with prosciutto and mozzarella', label: 'بانيني إيطالي' },
    { value: 'French Croque Monsieur', label: 'كروك موسيو الفرنسي' },
    { value: 'Danish Smørrebrød (open-faced sandwich)', label: 'سموربرود دنماركي' },
    { value: 'Spanish Bocadillo de Calamares', label: 'بوكاديو كالاماري الإسباني' },
    { value: 'German Doner Kebab in pita bread', label: 'دونر كباب ألماني' },
    { value: 'Greek Gyro in pita bread', label: 'جيرو يوناني' },
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
    // FIX: Corrected syntax error by removing extraneous Arabic text and fixing the map function.
    ...BACKGROUND_GALLERY_OPTIONS.map(({ label, prompt }) => ({ label, prompt })),
    ...EXPANDED_BACKGROUND_OPTIONS,
];

export const PRESET_OPTIONS: Preset[] = [
    {
        label: 'بستان الغروب',
        lighting: LightingType.GoldenHour,
        cameraAngle: CameraAngle.WideShot,
        subjectType: SubjectType.Fruit,
        fruitVariety: 'Washington Cherry',
        vegetableVariety: 'Red Bell Pepper',
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].value,
        backgroundPrompt: 'in a lush orchard during a warm sunset, with soft, glowing light filtering through the leaves',
    },
    {
        label: 'مطبخ عصري',
        lighting: LightingType.Studio,
        cameraAngle: CameraAngle.TopView,
        subjectType: SubjectType.Fruit,
        fruitVariety: 'Hass Avocado',
        vegetableVariety: 'Cucumber',
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].value,
        backgroundPrompt: 'sliced neatly on a clean, white marble countertop next to a chef\'s knife',
    },
    {
        label: 'دفقة حمضيات',
        lighting: LightingType.Cinematic,
        cameraAngle: CameraAngle.CloseUp,
        subjectType: SubjectType.Fruit,
        fruitVariety: 'Florida Orange',
        vegetableVariety: 'Carrot',
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].value,
        backgroundPrompt: 'a dynamic splash of water frozen in time against a vibrant, abstract blue and orange background',
    },
    {
        label: 'توت الغابة',
        lighting: LightingType.Natural,
        cameraAngle: CameraAngle.Angle45,
        subjectType: SubjectType.Fruit,
        fruitVariety: 'Blueberry',
        vegetableVariety: 'Mushroom',
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].value,
        backgroundPrompt: 'a handful of fresh blueberries resting on a mossy log in a misty forest setting',
    },
    {
        label: 'جنة استوائية',
        lighting: LightingType.Natural,
        cameraAngle: CameraAngle.LowAngle,
        subjectType: SubjectType.Fruit,
        fruitVariety: 'Hawaiian Pineapple',
        vegetableVariety: 'Corn on the cob',
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].value,
        backgroundPrompt: 'on a sandy beach with a blurred turquoise ocean and palm leaves in the background',
    },
    {
        label: 'طبيعة صامتة درامية',
        lighting: LightingType.Dramatic,
        cameraAngle: CameraAngle.SideView,
        subjectType: SubjectType.Fruit,
        fruitVariety: 'California Grapes',
        vegetableVariety: 'Eggplant',
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].value,
        backgroundPrompt: 'spilling out of a silver goblet onto a dark, draped velvet cloth, reminiscent of a classic Dutch still life painting',
    },
    {
        label: 'صفاء وبساطة',
        lighting: LightingType.Studio,
        cameraAngle: CameraAngle.FrontView,
        subjectType: SubjectType.Fruit,
        fruitVariety: 'Green Pear',
        vegetableVariety: 'Lettuce Head',
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].value,
        backgroundPrompt: 'perfectly placed on a simple slate plate against a soft, out-of-focus gray background',
    },
    {
        label: 'سوق المزارعين',
        lighting: LightingType.Natural,
        cameraAngle: CameraAngle.HighAngle,
        subjectType: SubjectType.Fruit,
        fruitVariety: 'Red Apple',
        vegetableVariety: 'Red Tomato on the Vine',
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].value,
        backgroundPrompt: 'in a rustic wooden crate at a bustling farmers market, with other produce softly blurred in the background',
    },
    {
        label: 'وجبة ديلي نيويورك',
        lighting: LightingType.Dramatic,
        cameraAngle: CameraAngle.Angle45,
        subjectType: SubjectType.Sandwich,
        fruitVariety: FRUIT_VARIETY_OPTIONS[0].value,
        vegetableVariety: VEGETABLE_VARIETY_OPTIONS[0].value,
        sandwichVariety: 'Reuben sandwich with corned beef and sauerkraut',
        backgroundPrompt: 'on a dark wooden table in a classic New York deli, with a pickle spear on the side',
    },
    {
        label: 'مقهى باريسي',
        lighting: LightingType.Natural,
        cameraAngle: CameraAngle.SideView,
        subjectType: SubjectType.Sandwich,
        fruitVariety: FRUIT_VARIETY_OPTIONS[0].value,
        vegetableVariety: VEGETABLE_VARIETY_OPTIONS[0].value,
        sandwichVariety: 'French Croque Monsieur',
        backgroundPrompt: 'on a small marble cafe table in Paris, with a blurred street scene in the background',
    },
];