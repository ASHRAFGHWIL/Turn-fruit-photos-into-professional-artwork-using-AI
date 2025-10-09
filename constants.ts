import { LightingType, CameraAngle, AspectRatio, ImageFilter, Option, OptionGroup, Preset, BackgroundGalleryOption, BackgroundOption, OutputQuality, TextureEffect, SubjectType } from './types';

export const LIGHTING_OPTIONS: Option<LightingType>[] = [
    // Natural Light
    { value: LightingType.Natural, label: 'إضاءة طبيعية' },
    { value: LightingType.GoldenHour, label: 'الساعة الذهبية' },
    { value: LightingType.BlueHour, label: 'الساعة الزرقاء' },
    // Studio General
    { value: LightingType.Studio, label: 'إضاءة استوديو عامة' },
    { value: LightingType.Softbox, label: 'إضاءة سوفت بوكس (ناعمة)' },
    { value: LightingType.Hard, label: 'إضاءة حادة (مباشرة)' },
    // Professional Techniques
    { value: LightingType.Butterfly, label: 'إضاءة الفراشة' },
    { value: LightingType.Split, label: 'إضاءة منقسمة' },
    { value: LightingType.Rembrandt, label: 'إضاءة رامبرانت' },
    { value: LightingType.Rim, label: 'إضاءة حافة' },
    // Artistic/Mood
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

export const FRUIT_VARIETY_OPTIONS: OptionGroup<string>[] = [
    {
        label: 'General',
        options: [
            { value: 'any high-quality fruit', label: 'فاكهة عامة عالية الجودة' },
            { value: 'Red Apple', label: 'تفاح أحمر' },
            { value: 'Green Pear', label: 'كمثرى خضراء' },
            { value: 'Strawberry', label: 'فراولة' },
            { value: 'Blueberry', label: 'توت أزرق' },
        ]
    },
    {
        label: 'American Items',
        options: [
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
        ]
    },
    {
        label: 'European Items',
        options: [
            { value: 'Mediterranean Lemon', label: 'ليمون متوسطي' },
            { value: 'Italian Fig', label: 'تين إيطالي' },
            { value: 'Spanish Olives', label: 'زيتون إسباني' },
            { value: 'Italian Blood Orange', label: 'برتقال دم الزغلول (إيطاليا)' },
            { value: 'French Agen Prune', label: 'برقوق أجين (فرنسا)' },
            { value: 'Greek Kalamata Olives', label: 'زيتون كالاماتا (اليونان)' },
            { value: 'Portuguese Rocha Pear', label: 'كمثرى روشا (البرتغال)' },
            { value: 'Spanish Persimmon', label: 'كاكي (إسبانيا)' },
        ]
    },
    {
        label: 'Asian Items',
        options: [
            { value: 'Lychee', label: 'ليتشي' },
            { value: 'Philippine Mango', label: 'مانجو فلبيني' },
            { value: 'Dragon Fruit (Pitaya)', label: 'فاكهة التنين (بيتايا)' },
            { value: 'Rambutan', label: 'رامبوتان' },
            { value: 'Durian', label: 'دوريان' },
            { value: 'Japanese Yuzu', label: 'يوزو ياباني' },
            { value: 'Mangosteen', label: 'مانغوستين' },
            { value: 'Jackfruit', label: 'جاك فروت' },
            { value: 'Persimmon', label: 'برسيمون (كاكي)' },
            { value: 'Star Fruit (Carambola)', label: 'فاكهة النجمة (كارامبولا)' },
            { value: 'Longan', label: 'لونجان' },
        ]
    },
    {
        label: 'Arab Items',
        options: [
            { value: 'a bowl of luscious Medjool Dates', label: 'تمر مجدول' },
            { value: 'a ripe Pomegranate, cut open to show the seeds', label: 'رمان' },
            { value: 'fresh Figs on a plate', label: 'تين طازج' },
            { value: 'a sweet Guava, sliced', label: 'جوافة' },
            { value: 'a prickly pear (Sabr)', label: 'صبر (تين شوكي)' },
            { value: 'a bowl of fresh Apricots (Mishmish)', label: 'مشمش' },
            { value: 'a bunch of green Grapes', label: 'عنب' },
            { value: 'a slice of juicy Watermelon', label: 'بطيخ' },
            { value: 'a sliced Cantaloupe melon (Shammam)', label: 'شمام' },
        ]
    }
];

export const VEGETABLE_VARIETY_OPTIONS: OptionGroup<string>[] = [
    {
        label: 'General',
        options: [
            { value: 'any high-quality vegetable', label: 'خضار عام عالي الجودة' },
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
        ]
    },
    {
        label: 'American Items',
        options: [
            { value: 'Idaho Potato', label: 'بطاطس أيداهو' },
            { value: 'California Artichoke', label: 'خرشوف كاليفورنيا' },
            { value: 'Vidalia Onion', label: 'بصل فيداليا (جورجيا)' },
            { value: 'New England Pumpkin', label: 'يقطين نيو إنجلاند' },
            { value: 'Michigan Asparagus', label: 'هليون ميشيغان' },
            { value: 'North Carolina Sweet Potato', label: 'بطاطا حلوة (كارولاينا الشمالية)' },
        ]
    },
    {
        label: 'European Items',
        options: [
            { value: 'San Marzano Tomato', label: 'طماطم سان مارزانو (إيطاليا)' },
            { value: 'Belgian Endive', label: 'الهندباء البلجيكية' },
            { value: 'Tuscan Kale (Cavolo Nero)', label: 'كيل توسكاني (كافولو نيرو)' },
            { value: 'French Leek', label: 'الكراث الفرنسي' },
            { value: 'Italian Fennel', label: 'الشمر الإيطالي' },
            { value: 'Romanesco Broccoli', label: 'بروكلي رومانسكي' },
        ]
    },
    {
        label: 'Asian Items',
        options: [
            { value: 'Bok Choy', label: 'بوك تشوي' },
            { value: 'Daikon Radish', label: 'فجل دايكون' },
            { value: 'Shiitake Mushroom', label: 'فطر شيتاكي' },
            { value: 'Edamame pods', label: 'إدامامي' },
            { value: 'Napa Cabbage', label: 'ملفوف نابا' },
            { value: 'Thai Chili Pepper', label: 'فلفل حار تايلاندي' },
            { value: 'Japanese Eggplant', label: 'باذنجان ياباني' },
            { value: 'Ginger root', label: 'جذر الزنجبيل' },
            { value: 'Lemongrass stalks', label: 'أعواد عشبة الليمون' },
            { value: 'Chinese Broccoli (Gai Lan)', label: 'بروكلي صيني (جاي لان)' },
            { value: 'Bitter Melon', label: 'القرع المر' },
        ]
    },
    {
        label: 'Arab Items',
        options: [
            { value: 'a bowl of cooked Okra stew (Bamia)', label: 'بامية' },
            { value: 'fresh Molokhia leaves', label: 'ملوخية' },
            { value: 'a bowl of cooked Fava Beans (Ful Medames)', label: 'فول مدمس' },
            { value: 'a bowl of Hummus topped with chickpeas and olive oil', label: 'حمص' },
            { value: 'stuffed grape leaves (Warak Enab)', label: 'ورق عنب' },
            { value: 'a plate of Tabbouleh salad', label: 'تبولة' },
            { value: 'a plate of Stuffed Zucchini (Kousa Mahshi)', label: 'كوسا محشي' },
            { value: 'a vibrant Fattoush salad with fried pita bread', label: 'فتوش' },
            { value: 'a bowl of smoky Baba Ghanoush dip', label: 'بابا غنوج' },
            { value: 'a warm bowl of Lentil soup (Shorbat Adas)', label: 'شوربة عدس' },
        ]
    }
];

export const SANDWICH_VARIETY_OPTIONS: OptionGroup<string>[] = [
    {
        label: 'General',
        options: [
            { value: 'any high-quality sandwich', label: 'ساندويتش عام عالي الجودة' },
        ]
    },
    {
        label: 'American Items',
        options: [
            { value: 'Classic Philly Cheesesteak sandwich', label: 'فيلي تشيز ستيك' },
            { value: 'Reuben sandwich with corned beef and sauerkraut', label: 'ساندويتش روبن' },
            { value: 'BLT (Bacon, Lettuce, Tomato) sandwich', label: 'ساندويتش بي إل تي' },
            { value: 'Classic American Club Sandwich', label: 'كلوب ساندويتش' },
            { value: 'Pulled Pork Sandwich with barbecue sauce', label: 'ساندويتش اللحم المسحوب' },
            { value: 'New England Lobster Roll', label: 'لوبستر رول' },
        ]
    },
    {
        label: 'European Items',
        options: [
            { value: 'Italian Panini with prosciutto and mozzarella', label: 'بانيني إيطالي' },
            { value: 'French Croque Monsieur', label: 'كروك موسيو الفرنسي' },
            { value: 'Danish Smørrebrød (open-faced sandwich)', label: 'سموربرود دنماركي' },
            { value: 'Spanish Bocadillo de Calamares', label: 'بوكاديو كالاماري الإسباني' },
            { value: 'German Doner Kebab in pita bread', label: 'دونر كباب ألماني' },
            { value: 'Greek Gyro in pita bread', label: 'جيرو يوناني' },
        ]
    },
    {
        label: 'Asian Items',
        options: [
            { value: 'Vietnamese Banh Mi sandwich', label: 'بانه مي فيتنامي' },
            { value: 'Japanese Katsu Sando (pork cutlet sandwich)', label: 'كاتسو ساندو ياباني' },
            { value: 'Chinese Roujiamo (braised pork belly bun)', label: 'روجيا مو صيني' },
            { value: 'Korean Gilgeori Toast (street toast)', label: 'توست الشارع الكوري' },
            { value: 'Indian Vada Pav', label: 'فادا باف هندي' },
            { value: 'Thai Roti Gluay (Banana Roti Wrap)', label: 'روتي الموز التايلاندي' },
            { value: 'Japanese Yakisoba Pan (Noodle Sandwich)', label: 'ياكيسوبا بان (ساندويتش نودلز)' },
        ]
    },
    {
        label: 'Arab Items',
        options: [
            { value: 'a fresh Falafel sandwich in pita bread', label: 'ساندويتش فلافل' },
            { value: 'a classic Chicken Shawarma wrap', label: 'شاورما دجاج' },
            { value: 'a juicy Beef Shawarma wrap', label: 'شاورما لحم' },
            { value: 'a grilled Halloumi cheese sandwich with mint and tomato', label: 'ساندويتش حلوم مشوي' },
            { value: 'a savory Kofta kebab sandwich', label: 'ساندويتش كفتة' },
            { value: 'a Labneh sandwich with olive oil and zaatar', label: 'ساندويتش لبنة وزعتر' },
            { value: 'a delicious Arayes (pita bread stuffed with minced meat)', label: 'عرايس' },
        ]
    }
];

export const JUICE_VARIETY_OPTIONS: OptionGroup<string>[] = [
    {
        label: 'General',
        options: [
            { value: 'a glass of any high-quality juice', label: 'عصير عام عالي الجودة' },
        ]
    },
    {
        label: 'American Items',
        options: [
            { value: 'a glass of fresh Florida Orange Juice', label: 'عصير برتقال فلوريدا' },
            { value: 'a glass of deep red Cranberry Juice', label: 'عصير توت بري أحمر' },
            { value: 'a tall glass of classic American Lemonade with a lemon slice', label: 'ليموناضة أمريكية كلاسيكية' },
            { value: 'a glass of Concord Grape Juice', label: 'عصير عنب كونكورد' },
            { value: 'a glass of crisp Apple Juice', label: 'عصير تفاح' },
        ]
    },
    {
        label: 'European Items',
        options: [
            { value: 'a glass of rich Italian Peach Nectar', label: 'رحيق الخوخ الإيطالي' },
            { value: 'a glass of British Blackcurrant cordial (Ribena style)', label: 'شراب الكشمش الأسود البريطاني' },
            { value: 'a glass of refreshing Elderflower Cordial with a sprig of mint', label: 'شراب زهرة البيلسان المنعش' },
            { value: 'a glass of vibrant Spanish Tomato Juice (Gazpacho style)', label: 'عصير طماطم إسباني (غازباتشو)' },
            { value: 'a glass of healthy German Carrot Juice', label: 'عصير جزر ألماني' },
        ]
    },
    {
        label: 'Asian Items',
        options: [
            { value: 'a glass of Taiwanese Bubble Tea with tapioca pearls', label: 'شاي الفقاعات التايواني' },
            { value: 'a glass of Indian Mango Lassi', label: 'مانجو لاسي هندي' },
            { value: 'a glass of fresh Sugarcane Juice with a hint of lime', label: 'عصير قصب السكر' },
            { value: 'a glass of refreshing Lychee Juice', label: 'عصير ليتشي' },
            { value: 'a glass of Thai Iced Tea', label: 'شاي مثلج تايلاندي' },
            { value: 'a glass of Vietnamese Iced Coffee (Ca Phe Sua Da)', label: 'قهوة فيتنامية مثلجة' },
            { value: 'a cup of Japanese Matcha Latte', label: 'ماتشا لاتيه ياباني' },
            { value: 'a glass of Hong Kong Style Milk Tea', label: 'شاي بالحليب على طريقة هونغ كونغ' },
        ]
    },
    {
        label: 'Arab Items',
        options: [
            { value: 'a glass of Jallab with pine nuts and raisins', label: 'جلاب' },
            { value: 'a glass of sweet Qamar al-Din (apricot juice)', label: 'قمر الدين' },
            { value: 'a refreshing glass of Tamarind juice (Tamar Hindi)', label: 'تمر هندي' },
            { value: 'a tall glass of fresh Lemonade with Mint (Limonana)', label: 'ليمون بالنعناع' },
            { value: 'a glass of Karkadeh (hibiscus iced tea)', label: 'كركديه' },
            { value: 'a cool glass of Ayran (Laban yogurt drink)', label: 'عيران (لبن)' },
            { value: 'a warm, comforting mug of Sahlab topped with cinnamon', label: 'سحلب' },
            { value: 'a traditional cup of Arabic coffee (Qahwa) in a finjan', label: 'قهوة عربية' },
        ]
    }
];

export const PIE_VARIETY_OPTIONS: OptionGroup<string>[] = [
    {
        label: 'General',
        options: [
            { value: 'any high-quality pie', label: 'فطيرة عامة عالية الجودة' },
        ]
    },
    {
        label: 'American Items',
        options: [
            { value: 'a classic American Apple Pie with a lattice crust', label: 'فطيرة تفاح أمريكية كلاسيكية' },
            { value: 'a slice of Southern Pecan Pie', label: 'فطيرة جوز البقان الجنوبية' },
            { value: 'a slice of Florida Key Lime Pie with whipped cream', label: 'فطيرة ليمون (كي لايم)' },
            { value: 'a rich Pumpkin Pie for Thanksgiving', label: 'فطيرة يقطين (عيد الشكر)' },
        ]
    },
    {
        label: 'European Items',
        options: [
            { value: 'a slice of British Banoffee Pie', label: 'فطيرة بانوفي بريطانية' },
            { value: 'a rustic French Tarte Tatin with caramelized apples', label: 'تارت تاتان فرنسية' },
            { value: 'a traditional Austrian Apfelstrudel with powdered sugar', label: 'فطيرة التفاح النمساوية (أبفل شترودل)' },
            { value: 'a slice of English Lemon Meringue Pie', label: 'فطيرة ليمون بالمرينغ إنجليزية' },
        ]
    },
    {
        label: 'Asian Items',
        options: [
            { value: 'a Chinese Egg Tart with a flaky crust', label: 'تارت البيض الصيني' },
            { value: 'a Filipino Buko Pie (young coconut pie)', label: 'فطيرة بوكو الفلبينية' },
            { value: 'a slice of Japanese sweet potato pie', label: 'فطيرة البطاطا الحلوة اليابانية' },
            { value: 'a savory Indian Samosa', label: 'سمبوسة هندية' },
            { value: 'a savory Japanese Curry Pie', label: 'فطيرة الكاري اليابانية' },
        ]
    },
    {
        label: 'Arab Items',
        options: [
            { value: 'a freshly baked Spinach Fatayer (savory pie)', label: 'فطاير سبانخ' },
            { value: 'a savory meat pie (Sfiha)', label: 'صفيحة' },
            { value: 'a savory Lahm bi Ajeen (Arab meat pie)', label: 'لحم بعجين' },
            { value: 'a cheese-filled savory pie (Cheese Fatayer)', label: 'فطاير جبنة' },
            { value: 'a classic Chicken Pastilla (B\'stilla)', label: 'بسطيلة دجاج' },
            { value: 'a savory, layered Mutabbaq filled with vegetables', label: 'مطبق' },
        ]
    }
];

export const BAKED_GOODS_VARIETY_OPTIONS: OptionGroup<string>[] = [
    {
        label: 'General',
        options: [
            { value: 'any high-quality baked good', label: 'مخبوزات عامة عالية الجودة' },
        ]
    },
    {
        label: 'American Items',
        options: [
            { value: 'a warm, fluffy Blueberry Muffin', label: 'مافن التوت الأزرق' },
            { value: 'a classic Chocolate Chip Cookie', label: 'كوكيز رقائق الشوكولاتة' },
            { value: 'a freshly baked New York Style Bagel with cream cheese', label: 'بيغل على طريقة نيويورك' },
            { value: 'a gooey Cinnamon Roll with frosting', label: 'لفافة القرفة (سينابون)' },
            { value: 'a rich, fudgy Chocolate Brownie', label: 'براوني الشوكولاتة' },
            { value: 'a classic Glazed Donut', label: 'دونات كلاسيكي' },
            { value: 'a Red Velvet Cupcake with cream cheese frosting', label: 'كب كيك ريد فيلفيت' },
            { value: 'a slice of golden American Cornbread', label: 'خبز الذرة الأمريكي' },
        ]
    },
    {
        label: 'European Items',
        options: [
            { value: 'a flaky, buttery French Croissant', label: 'كرواسان فرنسي' },
            { value: 'a traditional British Scone with clotted cream and jam', label: 'سكون بريطاني' },
            { value: 'a crisp Italian Cannoli with a sweet ricotta filling', label: 'كانولي إيطالي' },
            { value: 'a Portuguese Pastel de Nata with a caramelized top', label: 'باستيل دي ناتا برتغالي' },
            { value: 'a classic German Pretzel with salt crystals', label: 'بريتزل ألماني' },
            { value: 'a delicate French Macaron', label: 'ماكرون فرنسي' },
            { value: 'a Chocolate Éclair with cream filling', label: 'إكلير الشوكولاتة' },
            // FIX: Completed the value string and added the missing label property.
            { value: 'a slice of German Black Forest Cake (Schwarzwälder Kirschtorte)', label: 'كعكة الغابة السوداء' },
            { value: 'a shell-shaped French Madeleine cookie', label: 'كعكة المادلين' },
        ]
    },
    {
        label: 'Asian Items',
        options: [
            { value: 'a Chinese Pineapple Bun (Bolo Bao)', label: 'خبز الأناناس الصيني' },
            { value: 'a fluffy Japanese Melonpan', label: 'ميلون بان ياباني' },
            { value: 'a sweet Korean Soboro Bread with a crumbly topping', label: 'خبز سوبورو الكوري' },
            { value: 'a soft Filipino Pandesal roll', label: 'بانديسال فلبيني' },
            { value: 'a single fluffy, steamed Chinese Bao Bun', label: 'خبز الباو الصيني' },
            { value: 'an ornate Chinese Mooncake', label: 'كعكة القمر الصينية' },
            { value: 'a warm Korean Gyeran-ppang (Egg Bread)', label: 'خبز البيض الكوري' },
            { value: 'a Japanese Anpan (sweet red bean bun)', label: 'أنبان ياباني (خبز الفاصوليا الحمراء)' },
            { value: 'a soft Filipino Ensaymada with cheese', label: 'إنسيمادا فلبينية' },
        ]
    },
    {
        label: 'Arab Items',
        options: [
            { value: 'a piece of rich, sweet Baklava with pistachios', label: 'بقلاوة' },
            { value: 'a golden, syrupy slice of Kunafa with cheese', label: 'كنافة' },
            { value: 'a plate of date-filled Ma\'amoul cookies', label: 'معمول' },
            { value: 'a slice of semolina cake, Basbousa', label: 'بسبوسة' },
            { value: 'a sesame ring bread, Ka\'ak', label: 'كعك' },
            { value: 'a savory Zaatar Manakish', label: 'منقوشة زعتر' },
            { value: 'a sweet, cheese-filled Qatayef pancake, folded', label: 'قطايف' },
            { value: 'a plate of golden-brown, syrupy Luqaimat dumplings', label: 'لقيمات' },
            { value: 'delicate Ghorayeba shortbread cookies', label: 'غريبة' },
        ]
    }
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
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].options[0].value,
        juiceVariety: JUICE_VARIETY_OPTIONS[0].options[0].value,
        pieVariety: PIE_VARIETY_OPTIONS[0].options[0].value,
        bakedGoodsVariety: BAKED_GOODS_VARIETY_OPTIONS[0].options[0].value,
        backgroundPrompt: 'in a lush orchard during a warm sunset, with soft, glowing light filtering through the leaves',
    },
    {
        label: 'مطبخ عصري',
        lighting: LightingType.Studio,
        cameraAngle: CameraAngle.TopView,
        subjectType: SubjectType.Fruit,
        fruitVariety: 'Hass Avocado',
        vegetableVariety: 'Cucumber',
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].options[0].value,
        juiceVariety: JUICE_VARIETY_OPTIONS[0].options[0].value,
        pieVariety: PIE_VARIETY_OPTIONS[0].options[0].value,
        bakedGoodsVariety: BAKED_GOODS_VARIETY_OPTIONS[0].options[0].value,
        backgroundPrompt: 'sliced neatly on a clean, white marble countertop next to a chef\'s knife',
    },
    {
        label: 'دفقة حمضيات',
        lighting: LightingType.Cinematic,
        cameraAngle: CameraAngle.CloseUp,
        subjectType: SubjectType.Fruit,
        fruitVariety: 'Florida Orange',
        vegetableVariety: 'Carrot',
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].options[0].value,
        juiceVariety: JUICE_VARIETY_OPTIONS[0].options[0].value,
        pieVariety: PIE_VARIETY_OPTIONS[0].options[0].value,
        bakedGoodsVariety: BAKED_GOODS_VARIETY_OPTIONS[0].options[0].value,
        backgroundPrompt: 'a dynamic splash of water frozen in time against a vibrant, abstract blue and orange background',
    },
    {
        label: 'توت الغابة',
        lighting: LightingType.Natural,
        cameraAngle: CameraAngle.Angle45,
        subjectType: SubjectType.Fruit,
        fruitVariety: 'Blueberry',
        vegetableVariety: 'Mushroom',
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].options[0].value,
        juiceVariety: JUICE_VARIETY_OPTIONS[0].options[0].value,
        pieVariety: PIE_VARIETY_OPTIONS[0].options[0].value,
        bakedGoodsVariety: BAKED_GOODS_VARIETY_OPTIONS[0].options[0].value,
        backgroundPrompt: 'a handful of fresh blueberries resting on a mossy log in a misty forest setting',
    },
    {
        label: 'جنة استوائية',
        lighting: LightingType.Natural,
        cameraAngle: CameraAngle.LowAngle,
        subjectType: SubjectType.Fruit,
        fruitVariety: 'Hawaiian Pineapple',
        vegetableVariety: 'Corn on the cob',
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].options[0].value,
        juiceVariety: JUICE_VARIETY_OPTIONS[0].options[0].value,
        pieVariety: PIE_VARIETY_OPTIONS[0].options[0].value,
        bakedGoodsVariety: BAKED_GOODS_VARIETY_OPTIONS[0].options[0].value,
        backgroundPrompt: 'on a sandy beach with a blurred turquoise ocean and palm leaves in the background',
    },
    {
        label: 'طبيعة صامتة درامية',
        lighting: LightingType.Dramatic,
        cameraAngle: CameraAngle.SideView,
        subjectType: SubjectType.Fruit,
        fruitVariety: 'California Grapes',
        vegetableVariety: 'Eggplant',
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].options[0].value,
        juiceVariety: JUICE_VARIETY_OPTIONS[0].options[0].value,
        pieVariety: PIE_VARIETY_OPTIONS[0].options[0].value,
        bakedGoodsVariety: BAKED_GOODS_VARIETY_OPTIONS[0].options[0].value,
        backgroundPrompt: 'spilling out of a silver goblet onto a dark, draped velvet cloth, reminiscent of a classic Dutch still life painting',
    },
    {
        label: 'صفاء وبساطة',
        lighting: LightingType.Studio,
        cameraAngle: CameraAngle.FrontView,
        subjectType: SubjectType.Fruit,
        fruitVariety: 'Green Pear',
        vegetableVariety: 'Lettuce Head',
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].options[0].value,
        juiceVariety: JUICE_VARIETY_OPTIONS[0].options[0].value,
        pieVariety: PIE_VARIETY_OPTIONS[0].options[0].value,
        bakedGoodsVariety: BAKED_GOODS_VARIETY_OPTIONS[0].options[0].value,
        backgroundPrompt: 'perfectly placed on a simple slate plate against a soft, out-of-focus gray background',
    },
    {
        label: 'سوق المزارعين',
        lighting: LightingType.Natural,
        cameraAngle: CameraAngle.HighAngle,
        subjectType: SubjectType.Fruit,
        fruitVariety: 'Red Apple',
        vegetableVariety: 'Red Tomato on the Vine',
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].options[0].value,
        juiceVariety: JUICE_VARIETY_OPTIONS[0].options[0].value,
        pieVariety: PIE_VARIETY_OPTIONS[0].options[0].value,
        bakedGoodsVariety: BAKED_GOODS_VARIETY_OPTIONS[0].options[0].value,
        backgroundPrompt: 'in a rustic wooden crate at a bustling farmers market, with other produce softly blurred in the background',
    },
    {
        label: 'وجبة ديلي نيويورك',
        lighting: LightingType.Dramatic,
        cameraAngle: CameraAngle.Angle45,
        subjectType: SubjectType.Sandwich,
        fruitVariety: FRUIT_VARIETY_OPTIONS[0].options[0].value,
        vegetableVariety: VEGETABLE_VARIETY_OPTIONS[0].options[0].value,
        sandwichVariety: 'Reuben sandwich with corned beef and sauerkraut',
        juiceVariety: JUICE_VARIETY_OPTIONS[0].options[0].value,
        pieVariety: PIE_VARIETY_OPTIONS[0].options[0].value,
        bakedGoodsVariety: BAKED_GOODS_VARIETY_OPTIONS[0].options[0].value,
        backgroundPrompt: 'on a dark wooden table in a classic New York deli, with a pickle spear on the side',
    },
    {
        label: 'مقهى باريسي',
        lighting: LightingType.Natural,
        cameraAngle: CameraAngle.SideView,
        subjectType: SubjectType.Sandwich,
        fruitVariety: FRUIT_VARIETY_OPTIONS[0].options[0].value,
        vegetableVariety: VEGETABLE_VARIETY_OPTIONS[0].options[0].value,
        sandwichVariety: 'French Croque Monsieur',
        juiceVariety: JUICE_VARIETY_OPTIONS[0].options[0].value,
        pieVariety: PIE_VARIETY_OPTIONS[0].options[0].value,
        bakedGoodsVariety: BAKED_GOODS_VARIETY_OPTIONS[0].options[0].value,
        backgroundPrompt: 'on a small marble cafe table in Paris, with a blurred street scene in the background',
    },
    {
        label: 'صباح فلوريدا',
        lighting: LightingType.Natural,
        cameraAngle: CameraAngle.Angle45,
        subjectType: SubjectType.Juice,
        fruitVariety: FRUIT_VARIETY_OPTIONS[0].options[0].value,
        vegetableVariety: VEGETABLE_VARIETY_OPTIONS[0].options[0].value,
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].options[0].value,
        juiceVariety: 'a glass of fresh Florida Orange Juice',
        pieVariety: PIE_VARIETY_OPTIONS[0].options[0].value,
        bakedGoodsVariety: BAKED_GOODS_VARIETY_OPTIONS[0].options[0].value,
        backgroundPrompt: 'on a bright kitchen table with morning sunlight streaming in, next to a pitcher of orange juice',
    },
    {
        label: 'حديقة إنجليزية',
        lighting: LightingType.GoldenHour,
        cameraAngle: CameraAngle.LowAngle,
        subjectType: SubjectType.Juice,
        fruitVariety: FRUIT_VARIETY_OPTIONS[0].options[0].value,
        vegetableVariety: VEGETABLE_VARIETY_OPTIONS[0].options[0].value,
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].options[0].value,
        juiceVariety: 'a glass of refreshing Elderflower Cordial with a sprig of mint',
        pieVariety: PIE_VARIETY_OPTIONS[0].options[0].value,
        bakedGoodsVariety: BAKED_GOODS_VARIETY_OPTIONS[0].options[0].value,
        backgroundPrompt: 'on a rustic wooden bench in an english garden during sunset, with flowers blurred in the background',
    },
    {
        label: 'حلوى عيد الشكر',
        lighting: LightingType.GoldenHour,
        cameraAngle: CameraAngle.Angle45,
        subjectType: SubjectType.Pie,
        fruitVariety: FRUIT_VARIETY_OPTIONS[0].options[0].value,
        vegetableVariety: VEGETABLE_VARIETY_OPTIONS[0].options[0].value,
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].options[0].value,
        juiceVariety: JUICE_VARIETY_OPTIONS[0].options[0].value,
        pieVariety: 'a rich Pumpkin Pie for Thanksgiving',
        bakedGoodsVariety: BAKED_GOODS_VARIETY_OPTIONS[0].options[0].value,
        backgroundPrompt: 'on a rustic wooden table, surrounded by autumn leaves and a warm, cozy fireplace in the background',
    },
    {
        label: 'مخبز أوروبي',
        lighting: LightingType.Natural,
        cameraAngle: CameraAngle.CloseUp,
        subjectType: SubjectType.Pie,
        fruitVariety: FRUIT_VARIETY_OPTIONS[0].options[0].value,
        vegetableVariety: VEGETABLE_VARIETY_OPTIONS[0].options[0].value,
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].options[0].value,
        juiceVariety: JUICE_VARIETY_OPTIONS[0].options[0].value,
        pieVariety: 'a rustic French Tarte Tatin with caramelized apples',
        bakedGoodsVariety: BAKED_GOODS_VARIETY_OPTIONS[0].options[0].value,
        backgroundPrompt: 'on a marble pastry counter in a classic European patisserie, with soft window light',
    },
    {
        label: 'مخبز بروكلين',
        lighting: LightingType.Natural,
        cameraAngle: CameraAngle.Angle45,
        subjectType: SubjectType.BakedGoods,
        fruitVariety: FRUIT_VARIETY_OPTIONS[0].options[0].value,
        vegetableVariety: VEGETABLE_VARIETY_OPTIONS[0].options[0].value,
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].options[0].value,
        juiceVariety: JUICE_VARIETY_OPTIONS[0].options[0].value,
        pieVariety: PIE_VARIETY_OPTIONS[0].options[0].value,
        bakedGoodsVariety: 'a freshly baked New York Style Bagel with cream cheese',
        backgroundPrompt: 'on a rustic wooden board with a blurred background of a bustling Brooklyn bakery',
    },
    {
        label: 'فطور باريسي',
        lighting: LightingType.GoldenHour,
        cameraAngle: CameraAngle.CloseUp,
        subjectType: SubjectType.BakedGoods,
        fruitVariety: FRUIT_VARIETY_OPTIONS[0].options[0].value,
        vegetableVariety: VEGETABLE_VARIETY_OPTIONS[0].options[0].value,
        sandwichVariety: SANDWICH_VARIETY_OPTIONS[0].options[0].value,
        juiceVariety: JUICE_VARIETY_OPTIONS[0].options[0].value,
        pieVariety: PIE_VARIETY_OPTIONS[0].options[0].value,
        bakedGoodsVariety: 'a flaky, buttery French Croissant',
        backgroundPrompt: 'on a white ceramic plate next to a cup of coffee on a Parisian cafe table',
    },
    {
        label: 'سوق طوكيو',
        lighting: LightingType.Natural,
        cameraAngle: CameraAngle.CloseUp,
        subjectType: SubjectType.BakedGoods,
        fruitVariety: 'Japanese Yuzu',
        vegetableVariety: 'Daikon Radish',
        sandwichVariety: 'Japanese Katsu Sando (pork cutlet sandwich)',
        juiceVariety: 'a glass of Taiwanese Bubble Tea with tapioca pearls',
        pieVariety: 'a Chinese Egg Tart with a flaky crust',
        bakedGoodsVariety: 'a fluffy Japanese Melonpan',
        backgroundPrompt: 'on a wooden tray at a bustling Tokyo street market, with a softly blurred background of lanterns and food stalls',
    },
    {
        label: 'إفطار رمضان',
        lighting: LightingType.GoldenHour,
        cameraAngle: CameraAngle.Angle45,
        subjectType: SubjectType.BakedGoods,
        fruitVariety: 'a bowl of luscious Medjool Dates',
        vegetableVariety: 'a plate of Tabbouleh salad',
        sandwichVariety: 'a fresh Falafel sandwich in pita bread',
        juiceVariety: 'a glass of sweet Qamar al-Din (apricot juice)',
        pieVariety: 'a savory meat pie (Sfiha)',
        bakedGoodsVariety: 'a golden, syrupy slice of Kunafa with cheese',
        backgroundPrompt: 'on an elegant table setting for a Ramadan Iftar, with ornate lanterns and a warm, inviting atmosphere',
    },
];