export interface ScholarLecture {
  id: string;
  title: string;
  duration: string;
  category: string;
  date: string;
  views?: string;
}

export interface ScholarBook {
  id: string;
  title: string;
  category: string;
  year: string;
}

export interface ScholarArticle {
  id: string;
  title: string;
  journal: string;
  year: string;
}

export interface Scholar {
  id: string;
  name: string;
  nameUrdu: string;
  title: string;
  position: string;
  department: string;
  specialization: string;
  location: string;
  languages: string[];
  yearsOfService: number;
  isVerified: boolean;
  isFeatured: boolean;
  category: 'Leadership' | 'Senior' | 'Research' | 'Teachers' | 'Youth' | 'Womens' | 'Guest';
  photoUrl: string;
  bio: string;
  education: string[];
  researchInterests: string[];
  lectures: ScholarLecture[];
  books: ScholarBook[];
  articles: ScholarArticle[];
}

export const mockScholarsList: Scholar[] = [
  {
    id: "sch-1",
    name: "Agha Syed Hassan Al-Moosavi Al-Safavi",
    nameUrdu: "آغا سید حسن الموسوی الصفوی",
    title: "President & Senior Religious Authority",
    position: "President, Anjuman-e-Sharie Shian Jammu & Kashmir",
    department: "Executive Leadership & Central Fatwa Board",
    specialization: "Islamic Jurisprudence (Fiqh), Theology & Community Guidance",
    location: "Budgam, Kashmir",
    languages: ["Kashmiri", "Urdu", "Arabic", "Persian", "English"],
    yearsOfService: 35,
    isVerified: true,
    isFeatured: true,
    category: "Leadership",
    photoUrl: "/logo.png",
    bio: "Agha Syed Hassan Al-Moosavi Al-Safavi is a revered Shia Islamic scholar, religious leader, and President of Anjuman-e-Sharie Shian Jammu and Kashmir. For over three decades, he has spearheaded religious education, social welfare, unity councils, and youth leadership initiatives across the region.",
    education: [
      "Advanced Dars-e-Kharij Studies in Islamic Seminary of Hawza Qom, Iran",
      "Higher Jurisprudence & Usul-ul-Fiqh Certification",
      "Diploma in Comparative Islamic Philosophy"
    ],
    researchInterests: [
      "Wilayah & Islamic Governance",
      "Socio-Religious Harmony in Kashmir",
      "Contemporary Shia Jurisprudential Decrees"
    ],
    lectures: [
      { id: "l1", title: "Subhey Ashura Assembly Sermon", duration: "52 min", category: "Majlis", date: "10 Muharram 1448", views: "14.2K" },
      { id: "l2", title: "Philosophy of Karbala & Social Reform", duration: "45 min", category: "Sermon", date: "05 Safar 1448", views: "9.8K" },
      { id: "l3", title: "Unity of the Ummah & Ethical Leadership", duration: "38 min", category: "Friday Khutbah", date: "Last Friday", views: "6.5K" }
    ],
    books: [
      { id: "b1", title: "Guidance of the Safavi Lineage in Kashmir", category: "History & Theology", year: "2018" },
      { id: "b2", title: "Compendium of Daily Fiqh Decrees", category: "Jurisprudence", year: "2021" }
    ],
    articles: [
      { id: "a1", title: "The Role of Shia Seminaries in Preservation of Kashmir Heritage", journal: "Al-Huda Journal", year: "2020" },
      { id: "a2", title: "Ethical Responsibilities of Youth in Modern Times", journal: "Al-Fajr Studies", year: "2023" }
    ]
  },
  {
    id: "sch-2",
    name: "Aga Syed Arshad Al-Moosavi",
    nameUrdu: "آغا سید ارشد الموسوی",
    title: "Senior Khateeb & Scholar",
    position: "Senior Scholar & Central Majlis Speaker",
    department: "Preaching & Educational Outreach",
    specialization: "Islamic History, Philosophy & Azadari Discourse",
    location: "Srinagar, Kashmir",
    languages: ["Urdu", "Kashmiri", "Persian", "Arabic"],
    yearsOfService: 24,
    isVerified: true,
    isFeatured: true,
    category: "Senior",
    photoUrl: "/logo.png",
    bio: "Aga Syed Arshad Al-Moosavi is a prominent Shia orator, Khateeb, and scholar known for his analytical sermons on Islamic history, the battle of doctrines, and spiritual purification during Muharram assemblies.",
    education: [
      "Hawza Ilmiyya Studies in Qom and Najaf al-Ashraf",
      "Specialization in Islamic History & Quranic Exegesis (Tafseer)"
    ],
    researchInterests: [
      "Comparative Theological Doctrines",
      "Philosophy of Hussaini Sacrifice",
      "Youth Spiritual Mentorship"
    ],
    lectures: [
      { id: "l4", title: "Battle of Doctrines // Analytical Sermon", duration: "48 min", category: "Lecture", date: "02 Muharram 1448", views: "18.5K" },
      { id: "l5", title: "Exegesis of Surah An-Nahl Verse 90", duration: "35 min", category: "Tafseer", date: "22 Muharram 1448", views: "7.1K" }
    ],
    books: [
      { id: "b3", title: "Doctrinal Safeguards for the Contemporary Believer", category: "Theology", year: "2022" }
    ],
    articles: [
      { id: "a3", title: "Anonymity & Piety in Azadari Assemblies", journal: "Al-Miraj Review", year: "2022" }
    ]
  },
  {
    id: "sch-3",
    name: "Aga Syed Mujtaba Abbas Al-Moosavi",
    nameUrdu: "آغا سید مجتبیٰ عباس الموسوی",
    title: "Religious Scholar & Lecturer",
    position: "Scholar & Resident Khateeb, Astan Chadoora",
    department: "Maktab Curricula & Youth Mentorship",
    specialization: "Quranic Exegesis, Akhlaq (Ethics) & Youth Welfare",
    location: "Chadoora, Budgam",
    languages: ["Urdu", "Kashmiri", "English", "Arabic"],
    yearsOfService: 16,
    isVerified: true,
    isFeatured: true,
    category: "Youth",
    photoUrl: "/logo.png",
    bio: "Aga Syed Mujtaba Abbas Al-Moosavi is a dynamic young scholar and Khateeb actively serving at Astan Aliya Mir Shams-ud-Din Iraqi Chadoora. He leads youth religious circles, Maktab curricula reform, and community welfare programs.",
    education: [
      "Advanced Islamic Studies from Najaf Seminary",
      "Bachelor's in Humanities & Islamic Philosophy"
    ],
    researchInterests: [
      "Maktab Pedagogy & Early Islamic Learning",
      "Ethics (Akhlaq) for Digital Age Youth",
      "Life of Mir Shams-ud-Din Iraqi"
    ],
    lectures: [
      { id: "l6", title: "Majlis E Aza (02 Safar) | Astan Mir Shams-ud-Din Iraqi", duration: "42 min", category: "Majlis", date: "02 Safar 1448", views: "11.4K" },
      { id: "l7", title: "Youth Responsibilities & Moral Character", duration: "30 min", category: "Youth Circle", date: "14 Safar 1448", views: "5.8K" }
    ],
    books: [
      { id: "b4", title: "Lessons from Mir Shams-ud-Din Iraqi's Mission", category: "Biography & Heritage", year: "2024" }
    ],
    articles: [
      { id: "a4", title: "Reforming Youth Character through Maktab Education", journal: "Kashmir Islamic Digest", year: "2024" }
    ]
  }
];
