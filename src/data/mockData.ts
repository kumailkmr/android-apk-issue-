export interface Book {
  id: string;
  title: Record<string, string>;
  author: Record<string, string>;
  coverUrl: string;
  category: string;
  pages: number;
}

export interface Lecture {
  id: string;
  title: Record<string, string>;
  speaker: Record<string, string>;
  duration: string;
  views: string;
  date: string;
  category: string;
  isShortClip: boolean;
}

export interface Shrine {
  id: string;
  name: Record<string, string>;
  location: Record<string, string>;
  icon: string;
  color: string;
  imageUrl?: string;
}

export interface DonationCause {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  raised: number;
  goal: number;
  category: string;
}

export interface EventAnnouncement {
  id: string;
  title: Record<string, string>;
  date: string;
  time: string;
  venue: Record<string, string>;
  description: Record<string, string>;
}

export interface Course {
  id: string;
  title: Record<string, string>;
  instructor: Record<string, string>;
  lessons: number;
  duration: string;
  progress: number;
}

export interface MemberProfile {
  id: string;
  name: string;
  parentage: string;
  cardNumber: string;
  bloodGroup: string;
  district: string;
  memberType: 'Life Member' | 'General Member' | 'Volunteer';
  expiryDate: string;
  qrValue: string;
}

export const mockLanguages = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ur', name: 'اردو', dir: 'rtl' },
  { code: 'ps', name: 'فارسی', dir: 'rtl' },
  { code: 'ks', name: 'كأشُر', dir: 'rtl' }
];

export const translations: Record<string, Record<string, string>> = {
  en: {
    appName: "Anjuman Shari e Shian",
    platformName: "Digital Platform",
    home: "Home",
    learn: "Learn",
    community: "Community",
    profile: "Profile",
    lectures: "Lectures",
    series: "Series",
    speakers: "Speakers",
    watchNow: "Watch Now",
    dailyClips: "Daily Short Clips",
    viewAll: "View All",
    holyShrines: "Holy Shrines",
    latestUpdates: "Latest Updates",
    books: "Books",
    courses: "Courses",
    donations: "Donations",
    volunteers: "Volunteers",
    membership: "Membership Card",
    searchPlaceholder: "Search Quran, lectures, books...",
    language: "Language",
    activeTask: "Active Volunteer Tasks",
    donateNow: "Donate Now",
    progress: "Progress",
    scanQR: "Scan Member QR",
    digitalID: "Digital ID Card",
    shrineDesc: "Virtual Ziyarat and details of Holy places.",
    kashmirRelief: "Kashmir Relief Fund",
    educationSupport: "Maktab Education Support",
    orphanCare: "Orphan Care Program",
    more: "More",
    search: "Search",
    myLibrary: "My Library"
  },
  ur: {
    appName: "انجمن شرعی شیعیان",
    platformName: "ڈیجیٹل پلیٹ فارم",
    home: "ہوم",
    learn: "تعلیم",
    community: "برادری",
    profile: "پروفائل",
    lectures: "لیکچرز",
    series: "سلسلہ",
    speakers: "مقررین",
    watchNow: "ابھی دیکھیں",
    dailyClips: "روزانہ کی مختصر ویڈیوز",
    viewAll: "سب دیکھیں",
    holyShrines: "مقدس مقامات",
    latestUpdates: "تازہ ترین خبریں",
    books: "کتابیں",
    courses: "کورسز",
    donations: "عطیات",
    volunteers: "رضاکار",
    membership: "ممبرشپ کارڈ",
    searchPlaceholder: "قرآن، لیکچرز، کتب تلاش کریں...",
    language: "زبان",
    activeTask: "رضاکارانہ سرگرمیاں",
    donateNow: "عطیہ کریں",
    progress: "پیش رفت",
    scanQR: "کیو آر اسکین کریں",
    digitalID: "ڈیجیٹل شناختی کارڈ",
    shrineDesc: "مقدس مقامات کی ورچوئل زیارت اور تفصیلات۔",
    kashmirRelief: "کشمیر ریلیف فنڈ",
    educationSupport: "مکتب تعلیمی امداد",
    orphanCare: "یتیموں کی کفالت کا پروگرام",
    more: "مزید",
    search: "تلاش",
    myLibrary: "میری لائبریری"
  },
  ps: {
    appName: "انجمن شرعی شیعیان",
    platformName: "پلتفرم دیجیتال",
    home: "خانه",
    learn: "آموزش",
    community: "جامعه",
    profile: "پروفایل",
    lectures: "سخنرانی‌ها",
    series: "مجموعه‌ها",
    speakers: "سخنرانان",
    watchNow: "اکنون تماشا کنید",
    dailyClips: "کلیپ‌های کوتاه روزانه",
    viewAll: "مشاهده همه",
    holyShrines: "زیارتگاه‌های مقدس",
    latestUpdates: "آخرین به روز رسانی‌ها",
    books: "کتاب‌ها",
    courses: "دوره‌ها",
    donations: "کمک‌های مالی",
    volunteers: "داوطلبان",
    membership: "کارت عضویت",
    searchPlaceholder: "جستجوی قرآن، سخنرانی‌ها، کتاب‌ها...",
    language: "زبان",
    activeTask: "وظایف فعال داوطلبانه",
    donateNow: "اکنون اهدا کنید",
    progress: "پیشرفت",
    scanQR: "اسکن کیو آر عضویت",
    digitalID: "کارت شناسایی دیجیتال",
    shrineDesc: "زیارت مجازی و جزئیات اماکن مقدسه.",
    kashmirRelief: "صندوق امداد کشمیر",
    educationSupport: "حمایت تحصیلی مکتب",
    orphanCare: "برنامه حمایت از یتیمان",
    more: "بیشتر",
    search: "جستجو",
    myLibrary: "کتابخانه من"
  },
  ks: {
    appName: "انجمن شرعی شیعیان",
    platformName: "ڈیجیٹل پلیٹ فارم",
    home: "ہوم",
    learn: "تعلیم",
    community: "برادری",
    profile: "پروفائل",
    lectures: "لیکچرز",
    series: "سلسلہ",
    speakers: "مقررین",
    watchNow: "ابھی دیکھیں",
    dailyClips: "روزانہ کی مختصر ویڈیوز",
    viewAll: "سب دیکھیں",
    holyShrines: "مقدس مقامات",
    latestUpdates: "تازہ ترین خبریں",
    books: "کتابیں",
    courses: "کورسز",
    donations: "عطیات",
    volunteers: "رضاکار",
    membership: "ممبرشپ کارڈ",
    searchPlaceholder: "تلاش کریں...",
    language: "زبان",
    activeTask: "رضاکارانہ سرگرمیاں",
    donateNow: "عطیہ کریں",
    progress: "پیش رفت",
    scanQR: "کیو آر اسکین کریں",
    digitalID: "ڈیجیٹل شناختی کارڈ",
    shrineDesc: "مقدس مقامات کی زیارت۔",
    kashmirRelief: "کشمیر ریلیف فنڈ",
    educationSupport: "مکتب تعلیمی امداد",
    orphanCare: "یتیموں کی کفالت",
    more: "مزید",
    search: "تلاش",
    myLibrary: "میری لائبریری"
  }
};

export const mockLectures: Lecture[] = [
  {
    id: "l1",
    title: {
      en: "Philosophy of Ashura & Today's Youth",
      ur: "فلسفہ عاشورہ اور آج کا نوجوان",
      ps: "فلسفه عاشورا و جوانان امروز"
    },
    speaker: {
      en: "Aga Syed Hassan Al-Moosvi Al-Safvi",
      ur: "آغا سید حسن الموسوی الصفوی",
      ps: "آقا سید حسن الموسوی الصفوی"
    },
    duration: "45:30",
    views: "12K",
    date: "2026-07-28",
    category: "Muharram 1448",
    isShortClip: false
  },
  {
    id: "l2",
    title: {
      en: "Character of Hazrat Abbas (A.S)",
      ur: "سیرت حضرت ابوالفضل العباسؑ",
      ps: "شخصیت حضرت عباس (ع)"
    },
    speaker: {
      en: "Aga Syed Hadi Al-Moosvi",
      ur: "آغا سید ہادی الموسوی",
      ps: "آقا سید هادی الموسوی"
    },
    duration: "38:15",
    views: "8.5K",
    date: "2026-07-29",
    category: "Muharram 1448",
    isShortClip: false
  },
  {
    id: "l3",
    title: {
      en: "Significance of Ziyarat Arbaeen",
      ur: "زیارت اربعین کی اہمیت و فضیلت",
      ps: "اهمیت زیارت اربعین"
    },
    speaker: {
      en: "Aga Syed Hassan Al-Moosvi Al-Safvi",
      ur: "آغا سید حسن الموسوی الصفوی",
      ps: "آقا سید حسن الموسوی الصفوی"
    },
    duration: "52:10",
    views: "15K",
    date: "2026-07-30",
    category: "Arbaeen 1448",
    isShortClip: false
  },
  {
    id: "c1",
    title: {
      en: "Understanding Quranic Tafseer",
      ur: "قرآنی تفسیر کا فہم",
      ps: "درک تفسیر قرآن"
    },
    speaker: {
      en: "Maulana Syed Mohammad Hadi",
      ur: "مولانا سید محمد ہادی",
      ps: "مولانا سید محمد هادی"
    },
    duration: "1:45 min",
    views: "22K",
    date: "2026-07-30",
    category: "Daily Clips",
    isShortClip: true
  },
  {
    id: "c2",
    title: {
      en: "The Concept of Adalah in Islam",
      ur: "اسلام میں عدل کا تصور",
      ps: "مفهوم عدالت در اسلام"
    },
    speaker: {
      en: "Maulana Syed Mohammad Hadi",
      ur: "مولانا سید محمد ہادی",
      ps: "مولانا سید محمد هادی"
    },
    duration: "1:45 min",
    views: "18K",
    date: "2026-07-29",
    category: "Daily Clips",
    isShortClip: true
  },
  {
    id: "c3",
    title: {
      en: "Self-Purification (Tazkiyah)",
      ur: "تزکیہ نفس کی ضرورت",
      ps: "تزکیه نفس در اسلام"
    },
    speaker: {
      en: "Aga Syed Hadi Al-Moosvi",
      ur: "آغا سید ہادی الموسوی",
      ps: "آقا سید هادی الموسوی"
    },
    duration: "1:45 min",
    views: "9.2K",
    date: "2026-07-28",
    category: "Daily Clips",
    isShortClip: true
  }
];

export const mockShrines: Shrine[] = [
  {
    id: "s1",
    name: {
      en: "Haram Imam Hussain (A)",
      ur: "حرم امام حسینؑ",
      ps: "حرم امام حسین (ع)"
    },
    location: {
      en: "Karbala, Iraq",
      ur: "کربلا، عراق",
      ps: "کربلا، عراق"
    },
    icon: "karbala",
    color: "from-emerald-50 to-teal-50",
    imageUrl: "/mourning_shrine.jpg"
  },
  {
    id: "s2",
    name: {
      en: "Haram Amir al-Mu'minin (A)",
      ur: "حرم امیر المؤمنینؑ",
      ps: "حرم حضرت علی (ع)"
    },
    location: {
      en: "Najaf, Iraq",
      ur: "نجف اشرف، عراق",
      ps: "نجف، عراق"
    },
    icon: "najaf",
    color: "from-amber-50 to-yellow-50",
    imageUrl: "/shrine_imam_ali.jpg"
  },
  {
    id: "s3",
    name: {
      en: "Haram Imam Kadhim & Jawad (A)",
      ur: "حرم کاظمین شریفین",
      ps: "حرم کاظمین"
    },
    location: {
      en: "Kadhimayn, Iraq",
      ur: "کاظمین، عراق",
      ps: "کاظمین، عراق"
    },
    icon: "kadhimayn",
    color: "from-amber-100 to-yellow-100",
    imageUrl: "/shrine_kadhimayn.jpg"
  },
  {
    id: "s4",
    name: {
      en: "Haram Askariyyayn (A)",
      ur: "حرم عسکریینؑ",
      ps: "حرم عسکریین (ع)"
    },
    location: {
      en: "Samarra, Iraq",
      ur: "سامراء، عراق",
      ps: "سامراء، عراق"
    },
    icon: "samarra",
    color: "from-amber-50 to-orange-50",
    imageUrl: "/shrine_askari.jpg"
  },
  {
    id: "s5",
    name: {
      en: "Haram Imam Reza (A)",
      ur: "حرم امام رضاؑ",
      ps: "حرم امام رضا (ع)"
    },
    location: {
      en: "Mashhad, Iran",
      ur: "مشہد، ایران",
      ps: "مشهد، ایران"
    },
    icon: "mashhad",
    color: "from-teal-50 to-emerald-50",
    imageUrl: "/shrine_reza.jpg"
  },
  {
    id: "s6",
    name: {
      en: "Haram Bibi Fatima Ma'souma (S)",
      ur: "حرم بی بی فاطمہ معصومہؑ",
      ps: "حرم حضرت معصومه (س)"
    },
    location: {
      en: "Qom, Iran",
      ur: "قم، ایران",
      ps: "قم، ایران"
    },
    icon: "qom",
    color: "from-emerald-100 to-teal-100",
    imageUrl: "/shrine_masooma.jpg"
  },
  {
    id: "s7",
    name: {
      en: "Haram Sayyida Zaynab (S)",
      ur: "حرم حضرت زینبؑ",
      ps: "حرم حضرت زینب (س)"
    },
    location: {
      en: "Damascus, Syria",
      ur: "دمشق، شام",
      ps: "دمشق، سوریه"
    },
    icon: "damascus",
    color: "from-rose-50 to-pink-50",
    imageUrl: "/arbaeen_walk.jpg"
  },
  {
    id: "s8",
    name: {
      en: "Mir Shams-ud-Din Iraqi",
      ur: "میر شمس الدین عراقیؑ",
      ps: "میر شمس الدین عراقی"
    },
    location: {
      en: "Chadoora, Budgam",
      ur: "چاڑورہ، بڈگام",
      ps: "چادوره، بودگام"
    },
    icon: "jannatul-baqi",
    color: "from-slate-50 to-gray-50",
    imageUrl: "/shrine_iraqi_hd.jpg"
  },
  {
    id: "s9",
    name: {
      en: "Haram Hazrat Abbas (A)",
      ur: "حرم حضرت عباسؑ",
      ps: "حرم حضرت عباس"
    },
    location: {
      en: "Karbala, Iraq",
      ur: "کربلا، عراق",
      ps: "کربلا، عراق"
    },
    icon: "masjid-al-haram",
    color: "from-indigo-50 to-blue-50",
    imageUrl: "/shrine_abbas.jpg"
  },
  {
    id: "s10",
    name: {
      en: "Kashmir Imambara Assembly",
      ur: "امام باڑہ بڈگام",
      ps: "امام بارگاه بودگام"
    },
    location: {
      en: "Budgam, Kashmir",
      ur: "بڈگام، کشمیر",
      ps: "بودگام، کشمیر"
    },
    icon: "masjid-an-nabawi",
    color: "from-emerald-50 to-green-50",
    imageUrl: "/kashmir_majlis.jpg"
  }
];

export const mockDonations: DonationCause[] = [
  {
    id: "d1",
    title: {
      en: "Kashmir Relief Fund",
      ur: "کشمیر ریلیف فنڈ",
      ps: "صندوق امداد کشمیر"
    },
    description: {
      en: "Providing emergency food packs, clothing and shelter to underprivileged families across Jammu & Kashmir.",
      ur: "جموں و کشمیر کے غریب اور نادار خاندانوں کو راشن، لباس اور چھت فراہم کرنا۔",
      ps: "ارائه بسته های غذایی اضطراری، پوشاک و مسکن به خانواده های کم برخوردار در سراسر جامو و کشمیر."
    },
    raised: 4250000,
    goal: 5000000,
    category: "Welfare"
  },
  {
    id: "d2",
    title: {
      en: "Maktab Education Support",
      ur: "مکتب تعلیمی امداد",
      ps: "حمایت تحصیلی مکتب"
    },
    description: {
      en: "Establishing and funding traditional religious schools (Maktab) for children in remote areas.",
      ur: "دور دراز علاقوں میں بچوں کے لیے مکاتب قائم کرنا اور ان کی فنڈنگ کرنا۔",
      ps: "تاسیس و تامین مالی مدارس سنتی مذهبی (مکتب) برای کودکان در مناطق دورافتاده."
    },
    raised: 1850000,
    goal: 3000000,
    category: "Education"
  },
  {
    id: "d3",
    title: {
      en: "Orphan Care & Support",
      ur: "یتیموں کی کفالت",
      ps: "برنامه حمایت از یتیمان"
    },
    description: {
      en: "Covering education, health and living expenses of orphan children.",
      ur: "یتیم بچوں کی تعلیم، صحت اور رہائشی اخراجات کی کفالت۔",
      ps: "پوشش هزینه های تحصیل، بهداشت و زندگی کودکان یتیم."
    },
    raised: 2900000,
    goal: 4000000,
    category: "Social Support"
  }
];

export const mockBooks: Book[] = [
  {
    id: "b1",
    title: {
      en: "Nahjul Balagha (Peak of Eloquence)",
      ur: "نہج البلاغہ (خطبات امیر المومنینؑ)",
      ps: "نهج البلاغه (خطبه های امام علی ع)"
    },
    author: {
      en: "Imam Ali Ibn Abi Talib (A.S)",
      ur: "امام علی ابن ابی طالبؑ",
      ps: "امام علی بن ابی طالب (ع)"
    },
    coverUrl: "/images/nahjul_balagha.jpg",
    category: "Hadith & Sermons",
    pages: 450
  },
  {
    id: "b2",
    title: {
      en: "Sahifa Sajjadiya (Psalms of Islam)",
      ur: "صحیفہ سجادیہ (دعاوں کا مجموعہ)",
      ps: "صحیفه سجادیه (ادعیه امام سجاد ع)"
    },
    author: {
      en: "Imam Ali Ibn Al-Hussain (A.S)",
      ur: "امام علی ابن الحسینؑ",
      ps: "امام علی بن الحسین (ع)"
    },
    coverUrl: "/images/sahifa_sajjadiya.jpg",
    category: "Supplications",
    pages: 280
  },
  {
    id: "b3",
    title: {
      en: "Islamic Jurisprudence (Fiqh)",
      ur: "توضیح المسائل (فقہی مسائل)",
      ps: "توضیح المسائل (احکام فقهی)"
    },
    author: {
      en: "Anjuman Shari e Shian Council",
      ur: "فقہی بورڈ انجمن شرعی شیعیان",
      ps: "شورای فقهی انجمن"
    },
    coverUrl: "/images/fiqh.jpg",
    category: "Jurisprudence",
    pages: 600
  }
];

export const mockCourses: Course[] = [
  {
    id: "c1",
    title: {
      en: "Basic Islamic Beliefs (Aqa'id)",
      ur: "بنیادی اسلامی عقائد (اصول دین)",
      ps: "عقاید اساسی اسلامی (اصول دین)"
    },
    instructor: {
      en: "Aga Syed Hadi Al-Moosvi",
      ur: "آغا سید ہادی الموسوی",
      ps: "آقا سید هادی الموسوی"
    },
    lessons: 12,
    duration: "6 hours",
    progress: 75
  },
  {
    id: "c2",
    title: {
      en: "Quranic Arabic Grammar",
      ur: "قرآنی عربی گرامر",
      ps: "صرف و نحو عربی قرآنی"
    },
    instructor: {
      en: "Maulana Syed Sajad",
      ur: "مولانا سید سجاد",
      ps: "مولانا سید سجاد"
    },
    lessons: 20,
    duration: "10 hours",
    progress: 30
  },
  {
    id: "c3",
    title: {
      en: "History of Shia Islam in Kashmir",
      ur: "کشمیر میں تشیع کی تاریخ",
      ps: "تاریخ تشیع در کشمیر"
    },
    instructor: {
      en: "Aga Syed Hassan Al-Moosvi Al-Safvi",
      ur: "آغا سید حسن الموسوی الصفوی",
      ps: "آقا سید حسن الموسوی"
    },
    lessons: 15,
    duration: "8 hours",
    progress: 0
  }
];

export const mockEvents: EventAnnouncement[] = [
  {
    id: "e1",
    title: {
      en: "Jaloos e Aza",
      ur: "جلوسِ عزا",
      ps: "جلوس عزاداری"
    },
    date: "20 Safar",
    time: "08:00 AM",
    venue: {
      en: "From Astan to Central Budgam Imam Bara",
      ur: "آستان سے مرکزی بڈگام امام بارگاہ",
      ps: "آستان سے مرکزی بڈگام امام بارگاہ"
    },
    description: {
      en: "Procession of Jaloos e Aza from Astan proceeding to the Central Budgam Imam Bara.",
      ur: "آستان سے مرکزی بڈگام امام بارگاہ تک جلوسِ عزا برآمد ہو گا۔",
      ps: "آستان سے مرکزی بڈگام امام بارگاہ تک جلوسِ عزا برآمد ہو گا۔"
    }
  },
  {
    id: "e2",
    title: {
      en: "Majlis e Aza (17th Safar)",
      ur: "مجلسِ عزا (۱۷ صفر)",
      ps: "مجلسِ عزا (۱۷ صفر)"
    },
    date: "17 Safar",
    time: "10:00 AM",
    venue: {
      en: "Nowgam",
      ur: "نوگام",
      ps: "نوگام"
    },
    description: {
      en: "Commemoration of 17th Safar Majlis in Nowgam.",
      ur: "نوگام میں ۱۷ صفر کی مناسبت سے مجلسِ عزا۔",
      ps: "نوگام میں ۱۷ صفر کی مناسبت سے مجلسِ عزا۔"
    }
  }
];

export const mockMember: MemberProfile = {
  id: "m1",
  name: "Aga Syed Mujtaba Hassan",
  parentage: "Aga Syed Al Hassan Mosavi",
  cardNumber: "ASS-2026-8941",
  bloodGroup: "O+ve",
  district: "Budgam",
  memberType: "Life Member",
  expiryDate: "2031-12-31",
  qrValue: "ANJUMAN-SHARI-SHIAN:ASS-2026-8941:AGA-SYED-MUJTABA-HASSAN"
};
