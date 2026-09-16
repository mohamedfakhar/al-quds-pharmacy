/**
 * ============================================================
 * AL-QUDS PHARMACY — CLIENT PREVIEW DEMO DATA
 * Curated for high visual fidelity & realistic pharmacy IA
 * ============================================================
 */

const CATEGORIES = [
  {
    id: "medicines",
    name: "الأدوية والعلاجات",
    count: 142,
    icon: "pill",
    color: "#2E7FD1",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "vitamins",
    name: "الفيتامينات والمكملات",
    count: 98,
    icon: "sparkles",
    color: "#D97706",
    img: "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "skincare",
    name: "العناية بالبشرة",
    count: 165,
    icon: "droplet",
    color: "#0E9E82",
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "hair-care",
    name: "العناية بالشعر",
    count: 76,
    icon: "scissors",
    color: "#2E7FD1",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "baby-care",
    name: "منتجات الأطفال",
    count: 84,
    icon: "baby",
    color: "#D97706",
    img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "personal-care",
    name: "العناية الشخصية",
    count: 110,
    icon: "shield",
    color: "#0E9E82",
    img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "devices",
    name: "الأجهزة الطبية",
    count: 45,
    icon: "activity",
    color: "#2E7FD1",
    img: "https://images.unsplash.com/photo-1583912267670-6575ad472688?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "dental-care",
    name: "العناية بالأسنان",
    count: 52,
    icon: "smile",
    color: "#0E9E82",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=300&auto=format&fit=crop&q=80"
  }
];

const BRANDS = [
  "بانادول",
  "سنتروم",
  "سيرافيه (CeraVe)",
  "لاروش بوزيه (La Roche-Posay)",
  "بيوديرما (Bioderma)",
  "يوسيرين (Eucerin)",
  "فيفادول",
  "أوجمنتين",
  "نيفيا",
  "براون (Braun)",
  "سنسوداين"
];

const PRODUCTS = [
  {
    id: "p1",
    slug: "panadol-extra-24",
    name: "بانادول إكسترا مسكن للصداع والآلام 24 قرص",
    brand: "بانادول",
    category: "medicines",
    price: 34,
    compareAt: 40,
    rating: 4.8,
    reviewsCount: 342,
    stock: 120,
    prescriptionRequired: false,
    badges: ["الأكثر مبيعًا", "خصم 15%"],
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80"
    ],
    short: "مسكن سريع المفعول للصداع الحاد، آلام العضلات، وآلام الأسنان مدعوم بالكافيين لامتصاص أسرع.",
    description: "بانادول إكسترا يحتوي على الباراسيتامول الفعال بالإضافة إلى الكافيين الذي يعزز من قوة تسكين الألم بنسبة تصل إلى 30%. لطيف على المعدة عند تناوله وفقاً للجرعة المحددة.",
    ingredients: "باراسيتامول 500 ملغ + كافيين 65 ملغ لكل قرص.",
    usage: "قرص إلى قرصين كل 4-6 ساعات حسب الحاجة. الحد الأقصى 8 أقراص خلال 24 ساعة.",
    warnings: "لا تتناول الدواء بالتزامن مع مستحضرات أخرى تحتوي على الباراسيتامول لتجنب أضرار الكبد."
  },
  {
    id: "p2",
    slug: "cerave-hydrating-cleanser-236ml",
    name: "سيرافيه غسول مرطب للبشرة العادية إلى الجافة 236 مل",
    brand: "سيرافيه (CeraVe)",
    category: "skincare",
    price: 385,
    compareAt: 450,
    rating: 4.9,
    reviewsCount: 289,
    stock: 45,
    prescriptionRequired: false,
    badges: ["الأكثر مبيعًا", "موصى به من أطباء الجلد"],
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80"
    ],
    short: "غسول لطيف يزيل الأوساخ والشوائب دون تجريد البشرة من رطوبتها الطبيعية بفضل السيراميدات الأساسية.",
    description: "طور بالتعاون مع أطباء الجلدية ليناسب البشرة الحساسة والجافة، غني بـ 3 سيراميدات أساسية وحمض الهيالورونيك، يعمل على ترطيب الحاجز الواقي للبشرة طوال اليوم بفضل تقنية MVE المبتكرة.",
    ingredients: "3 أنواع سيراميدات (1، 3، 6-II)، حمض الهيالورونيك، جليسرين، خالٍ من العطور والصابون.",
    usage: "يدلك على بشرة مبللة صباحاً ومساءً بحركات دائرية ثم يشطف بلطف بالماء الفاتر.",
    warnings: "للاستخدام الخارجي فقط. في حال ملامسة العينين تغسل فوراً بالماء."
  },
  {
    id: "p3",
    slug: "la-roche-posay-anthelios-spf50",
    name: "لاروش بوزيه واقي شمس سائل غير مرئي SPF 50+ 50 مل",
    brand: "لاروش بوزيه (La Roche-Posay)",
    category: "skincare",
    price: 520,
    compareAt: 580,
    rating: 4.9,
    reviewsCount: 415,
    stock: 60,
    prescriptionRequired: false,
    badges: ["عروض مميزة", "حماية فائقة"],
    img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80"
    ],
    short: "حماية واسعة النطاق من أشعة UVA/UVB والأشعة فوق البنفسجية الطويلة للغاية مع ملمس غير دهني ولا يترك أثراً أبيض.",
    description: "تركيبة أنثيليوس المبتكرة بتقنية Mexoryl 400 توفر أعلى حماية للبشرة الحساسة، مقاومة للماء والتعرق والرمل، ولا تسبب حساسية للعينين.",
    ingredients: "مياه الينابيع الحرارية من لاروش بوزيه، تقنية فلترة ميكسوريل 400، فيتامين E.",
    usage: "يرج جيداً قبل الاستخدام، يوضع بسخاء على الوجه والرقبة قبل التعرض للشمس بـ 20 دقيقة ويعاد تطبيقه كل ساعتين.",
    warnings: "تجنب التعرض المباشر للشمس في ساعات الذروة حتى مع استخدام واقي الشمس."
  },
  {
    id: "p4",
    slug: "centrum-adults-multivitamin-100",
    name: "سنتروم ملتي فيتامين للبالغين لدعم المناعة والطاقة 100 قرص",
    brand: "سنتروم",
    category: "vitamins",
    price: 360,
    compareAt: 420,
    rating: 4.7,
    reviewsCount: 198,
    stock: 55,
    prescriptionRequired: false,
    badges: ["الأكثر مبيعًا"],
    img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&auto=format&fit=crop&q=80"
    ],
    short: "تركيبة متوازنة تحتوي على 24 عنصراً غذائياً أساسياً لدعم الطاقة، الحصانة، والتمثيل الغذائي.",
    description: "سنتروم البالغين يدعم الاحتياجات الغذائية اليومية بفيتامينات B لدعم الطاقة والحديد وفيتامين C والزنك لتعزيز المناعة اليومية ضد الإرهاق.",
    ingredients: "فيتامين C، فيتامين D3، فيتامين B المركب، كالسيوم، حديد، زنك، سيلينيوم.",
    usage: "قرص واحد يومياً مع وجبة الطعام الرئيسية مصحوباً بكوب ماء كامل.",
    warnings: "يحفظ بعيداً عن متناول الأطفال لاحتوائه على جرعة مناسبة من الحديد."
  },
  {
    id: "p5",
    slug: "bioderma-sensibio-h2o-500ml",
    name: "بيوديرما سينسيبيو ماء ميسيلار منظف ومزيل للمكياج 500 مل",
    brand: "بيوديرما (Bioderma)",
    category: "skincare",
    price: 395,
    compareAt: 460,
    rating: 4.9,
    reviewsCount: 512,
    stock: 75,
    prescriptionRequired: false,
    badges: ["وصل حديثًا", "الأكثر تقييمًا"],
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80"
    ],
    short: "ماء ميسيلار الأصلي الحائز على جوائز عالمية، ينظف البشرة الحساسة ويلطفها بدون شطف وبدون إحساس بالشد.",
    description: "مستحضر أيقوني يحاكي التركيب الطبيعي لخلايا البشرة، يزيل 99% من المكياج والشوائب وعوادم التلوث مع الحفاظ على التوازن الطبيعي لدرجة حموضة البشرة.",
    ingredients: "جزيئات الميسيلار، خلاصة الخيار المهدئة، مياه نقية صيدلانية، خالٍ تماماً من الكحول والبارابين.",
    usage: "تبلل قطعة قطنية وتمرر بنعومة على الوجه والعينين حتى ينظف تماماً. لا يحتاج لشطف.",
    warnings: "مناسب لجميع أنواع البشرة حتى الأكثر حساسية واعتلالاً."
  },
  {
    id: "p6",
    slug: "augmentin-1g-14-tablets",
    name: "أوجمنتين مضاد حيوي 1 جم 14 قرص",
    brand: "أوجمنتين",
    category: "medicines",
    price: 155,
    compareAt: 155,
    rating: 4.6,
    reviewsCount: 78,
    stock: 25,
    prescriptionRequired: true,
    badges: ["تتطلب روشتة"],
    img: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80"
    ],
    short: "مضاد حيوي واسع المدى لعلاج التهابات الجهاز التنفسي والمسالك البولية والأذن والأسنان.",
    description: "يجمع بين الأموكسيسيلين وحمض الكلافولانيك للتغلب على مقاومة البكتيريا. يصرف هذا الدواء حصرياً بروشتة طبية معتمدة من طبيب مرخص.",
    ingredients: "أموكسيسيلين 875 ملغ + حمض كلافولانيك 125 ملغ.",
    usage: "حسب إرشادات الطبيب المعالج والروشتة المرفقة (عادة قرص واحد كل 12 ساعة مع الطعام).",
    warnings: "يحظر استخدامه للمرضى الذين يعانون من حساسية البنسلين ومشتقاته."
  },
  {
    id: "p7",
    slug: "braun-thermoscan-7-irt6520",
    name: "براون ميزان حرارة الأذن الرقمي عالي الدقة ثيرموسكان 7",
    brand: "براون (Braun)",
    category: "devices",
    price: 1850,
    compareAt: 2150,
    rating: 4.9,
    reviewsCount: 164,
    stock: 18,
    prescriptionRequired: false,
    badges: ["أجهزة طبية", "خصم 14%"],
    img: "https://images.unsplash.com/photo-1583912267670-6575ad472688?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1583912267670-6575ad472688?w=600&auto=format&fit=crop&q=80"
    ],
    short: "مقياس الحرارة رقم 1 موصى به من أطباء الأطفال بتقنية Age Precision المعتمدة على العمر وشاشة ملوّنة ذكية.",
    description: "يوفر قراءة حرارة دقيقة وفورية خلال ثوانٍ معدودة بفضل الرأس المسخن مسبقاً ونظام التوجيه الضوئي ExacTemp الذي يضمن الوضعية الصحيحة داخل الأذن.",
    ingredients: "جهاز قياس إلكتروني، 21 غطاء واقٍ للاستخدام مرة واحدة، علبة حفظ وحماية.",
    usage: "يوضع الغطاء المعقم الجديد، يحدد عمر الطفل على الشاشة، ثم يوضع في القناة السمعية وتضغط زر القياس.",
    warnings: "يجب تغيير الغطاء الصحي بعد كل قياس لمنع انتقال العدوى ولضمان دقة القراءة."
  },
  {
    id: "p8",
    slug: "eucerin-urearepair-plus-10-lotion",
    name: "يوسيرين لوشن ترطيب مكثف يوريا 10% للبشرة شديدة الجفاف 400 مل",
    brand: "يوسيرين (Eucerin)",
    category: "skincare",
    price: 470,
    compareAt: 540,
    rating: 4.8,
    reviewsCount: 172,
    stock: 35,
    prescriptionRequired: false,
    badges: ["عروض مميزة"],
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80"
    ],
    short: "راحة فورية تدوم 48 ساعة للبشرة شديدة الجفاف والخشنة بفضل اليوريا والسيراميد وعوامل الترطيب الطبيعية.",
    description: "لوشن يوسيرين يعيد بناء الحاجز الواقي للبشرة ويمنع فقدان الرطوبة، مناسب للمصابين بجفاف الجلد والصدفية وداء السكري.",
    ingredients: "يوريا 10%، سيراميدات، مركب عوامل الترطيب الطبيعي (NMF).",
    usage: "يدلك بلطف على الجسم بعد الاستحمام أو كلما دعت الحاجة حتى يمتص تماماً.",
    warnings: "استشر الطبيب قبل الاستخدام المتزامن مع الأدوية الموضعية."
  },
  {
    id: "p9",
    slug: "omega-3-triple-strength-1200mg",
    name: "أوميغا 3 زيت سمك نقي تركيز عالي 1200 ملغ 60 كبسولة",
    brand: "سنتروم",
    category: "vitamins",
    price: 245,
    compareAt: 290,
    rating: 4.7,
    reviewsCount: 89,
    stock: 50,
    prescriptionRequired: false,
    badges: ["وصل حديثًا"],
    img: "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&auto=format&fit=crop&q=80"
    ],
    short: "لدعم صحة القلب والأوعية الدموية، تعزيز التركيز ووظائف الدماغ، وصحة المفاصل بدون طعم سمكي مزعج.",
    description: "كبسولات زيت السمك النقي المستخرج من مياه المحيطات العميقة والمعالج بنظام التقطير الجزيئي للتخلص من المعادن الثقيلة والملوثات، مدعوم بنكهة الليمون الطبيعية.",
    ingredients: "زيت سمك نقي 1200 ملغ (EPA 360 ملغ + DHA 240 ملغ)، فيتامين E الطبيعي.",
    usage: "كبسولة إلى كبسولتين يومياً بعد تناول وجبة دسمة.",
    warnings: "يرجى مراجعة الصيدلي إذا كنت تتناول أدوية مسيلة للدم مثل الوارفارين أو الأسبرين."
  },
  {
    id: "p10",
    slug: "sensodyne-rapid-action-75ml",
    name: "سنسوداين معجون أسنان مفعول سريع لراحة من الحساسية 75 مل",
    brand: "سنسوداين",
    category: "dental-care",
    price: 75,
    compareAt: 90,
    rating: 4.8,
    reviewsCount: 220,
    stock: 80,
    prescriptionRequired: false,
    badges: ["الأكثر مبيعًا"],
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80"
    ],
    short: "راحة مثبتة إكلينيكياً من آلام حساسية الأسنان في خلال 60 ثانية فقط مع حماية تدوم طويلاً.",
    description: "يشكل طبقة واقية عازلة سريعة فوق المناطق الحساسة من الأسنان لمنع وصول المحفزات الباردة والساخنة إلى العصب، كما يحارب التسوس وينعش النفس.",
    ingredients: "فلوريد الصوديوم، خلات السترونتيوم، نكهة النعناع المنعش.",
    usage: "تفرش الأسنان مرتين يومياً لمدة دقيقتين على الأقل.",
    warnings: "غير مخصص للأطفال دون سن 12 عاماً إلا باستشارة طبيب الأسنان."
  },
  {
    id: "p11",
    slug: "nivea-rich-nourishing-body-milk",
    name: "نيفيا لوشن ترطيب وتغذية مكثفة للجسم بزيت اللوز 400 مل",
    brand: "نيفيا",
    category: "skincare",
    price: 135,
    compareAt: 160,
    rating: 4.6,
    reviewsCount: 145,
    stock: 95,
    prescriptionRequired: false,
    badges: ["عروض مميزة"],
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80"
    ],
    short: "ترطيب عميق يستمر لمدة 48 ساعة يمنح البشرة الجافة جداً نعومة فائقة ومظهراً صحياً مشرقاً.",
    description: "تركيبة حصرية بـ 'مصل الترطيب العميق' وزيت اللوز الطبيعي وفيتامين E، تروي عطش البشرة الجافة وتحميها من الجفاف والتشقق.",
    ingredients: "زيت اللوز، فيتامين E، مصل الترطيب العميق نيفيا.",
    usage: "يوزع على كافة أنحاء الجسم يومياً ويدلك بلطف.",
    warnings: "يحفظ في مكان بارد وجاف بعيداً عن أشعة الشمس المباشرة."
  },
  {
    id: "p12",
    slug: "beurer-bm28-blood-pressure-monitor",
    name: "جهاز قياس ضغط الدم والنبض الأوتوماتيكي من الذراع من براون",
    brand: "براون (Braun)",
    category: "devices",
    price: 1420,
    compareAt: 1650,
    rating: 4.8,
    reviewsCount: 94,
    stock: 22,
    prescriptionRequired: false,
    badges: ["أجهزة طبية"],
    img: "https://images.unsplash.com/photo-1583912267670-6575ad472688?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1583912267670-6575ad472688?w=600&auto=format&fit=crop&q=80"
    ],
    short: "دقة طبية معتمدة لقياس الضغط ومعدل ضربات القلب مع كاشف لاضطراب نبضات القلب وشاشة واضحة وكفة عالمية.",
    description: "جهاز قياس ضغط دم ذراعي أوتوماتيكي بالكامل، مزود بمؤشر تصنيف منظمة الصحة العالمية الملون وذاكرة تتسع لـ 4 مستخدمين، وسوار مريح قابل للتعديل.",
    ingredients: "جهاز القياس، سوار الذراع المريح (22-42 سم)، بطاريات، حقيبة تخزين فاخرة.",
    usage: "يثبت السوار على الذراع بمستوى القلب، يضغط زر التشغيل ويبقى المستخدم ساكناً حتى اكتمال القراءة.",
    warnings: "ينصح بالجلوس والراحة التامة لمدة 5 دقائق قبل بدء القياس لتفادي القراءات المرتفعة كاذباً."
  },
  {
    id: "p13",
    slug: "effervescent-vitamin-c-zinc-20tabs",
    name: "فيتامين سي 1000 ملغ + زنك فوار بطعم البرتقال الطبيعي 20 قرص",
    brand: "سنتروم",
    category: "vitamins",
    price: 85,
    compareAt: 105,
    rating: 4.8,
    reviewsCount: 310,
    stock: 140,
    prescriptionRequired: false,
    badges: ["الأكثر مبيعًا", "عروض مميزة"],
    img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&auto=format&fit=crop&q=80"
    ],
    short: "دعم قوي وسريع للمناعة ومقاومة نزلات البرد والإنفلونزا بجرعة مركزة من فيتامين سي والزنك العضوي.",
    description: "أقراص فوارة سريعة الذوبان والامتصاص تمنحك الحيوية والنشاط اليومي مع حماية الخلايا من الإجهاد التأكسدي ونزلات البرد الموسمية.",
    ingredients: "حمض الأسكوربيك 1000 ملغ، كبريتات الزنك 10 ملغ، طعم برتقال طبيعي.",
    usage: "يذاب قرص واحد في نصف كوب ماء (150 مل) يومياً بعد وجبة الإفطار.",
    warnings: "لا تتجاوز الجرعة اليومية الموصى بها. يرجى الحذر لدى مرضى حصى الكلى."
  },
  {
    id: "p14",
    slug: "vichy-mineral-89-booster-50ml",
    name: "فيشي مينيرال 89 سيروم الهيالورونيك المعزز للبشرة 50 مل",
    brand: "لاروش بوزيه (La Roche-Posay)",
    category: "skincare",
    price: 610,
    compareAt: 690,
    rating: 4.9,
    reviewsCount: 380,
    stock: 30,
    prescriptionRequired: false,
    badges: ["الأعلى تقييمًا"],
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&auto=format&fit=crop&q=80"
    ],
    short: "جرعة القوة اليومية لبشرتك تجمع 89% من مياه فيشي البركانية وحمض الهيالورونيك لترطيب ممتلئ وحماية من التلوث.",
    description: "سيروم جل خفيف خالي من العطور والكحول والسيليكون يقوي حاجز البشرة الواقي ويجعلها أكثر نضارة ومقاومة لعوامل الإجهاد والبيئة المحيطة.",
    ingredients: "مياه حرارية بركانية 89%، حمض هيالورونيك من أصل طبيعي، جلسرين.",
    usage: "يوضع قطرتان على بشرة نظيفة في الصباح والمساء كخطوة أولى في روتين العناية.",
    warnings: "مناسب تماماً لجميع أنواع البشرة حتى شديدة الحساسية وما بعد الإجراءات الجلدية."
  },
  {
    id: "p15",
    slug: "pampers-premium-care-size-4",
    name: "حفاضات بامبرز عناية مميزة مقاس 4 (9-14 كغم) عبوة 64 حفاضة",
    brand: "فيفادول",
    category: "baby-care",
    price: 320,
    compareAt: 360,
    rating: 4.7,
    reviewsCount: 205,
    stock: 65,
    prescriptionRequired: false,
    badges: ["الأكثر مبيعًا"],
    img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&auto=format&fit=crop&q=80"
    ],
    short: "نعومة فائقة وملمس حريري يلف بشرة طفلك مع طبقة حماية خاصة تحافظ على الجفاف لمدة تصل إلى 12 ساعة.",
    description: "تتميز بقنوات امتصاص مبتكرة توزع البلل بالتساوي ومؤشر بلل ذكي يتغير لونه لإعلامك بموعد تغيير الحفاض، وحواف جانبية ناعمة وقابلة للمط لمنع التسرب.",
    ingredients: "ألياف قطنية ناعمة، حبيبات جل فائقة الامتصاص، لوشن صبار مرطب.",
    usage: "تستخدم يومياً مع تغيير الحفاض دورياً واستخدام كريم منطقة الحفاض للوقاية من التسلخات.",
    warnings: "تحفظ العبوة بعيداً عن متناول الرضع لتجنب خطر الاختناق."
  },
  {
    id: "p16",
    slug: "fever-cooling-gel-patches-baby",
    name: "لصقات جل لتخفيف الحرارة للأطفال والرضع عبوة 6 لصقات",
    brand: "فيفادول",
    category: "baby-care",
    price: 65,
    compareAt: 80,
    rating: 4.8,
    reviewsCount: 118,
    stock: 90,
    prescriptionRequired: false,
    badges: ["عروض مميزة"],
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80"
    ],
    short: "تبريد فوري ولطيف يخفف من الانزعاج الناتج عن الحمى والتسنين يدوم حتى 8 ساعات، آمن للاستخدام مع الأدوية.",
    description: "لصقات مائية هيدروجيل تلتصق بجبهة الطفل برفق دون ألم عند الإزالة، تعطي شعوراً منعشاً ومريحاً ومثالية أثناء الليل.",
    ingredients: "هيدروجيل مائي بارد، منثول طبيعي بتركيز آمن للرضع.",
    usage: "ينزع الغلاف الشفاف وتلصق برفق على الجبهة بعد تنظيفها وتجفيفها.",
    warnings: "للاستخدام الخارجي فقط. لا توضع على الجروح أو الجلد الملتهب."
  }
];

/**
 * Autocomplete Search Engine
 */
function demoSearch(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    (CATEGORIES.find(c => c.id === p.category)?.name || "").toLowerCase().includes(q)
  ).slice(0, 6);
}
