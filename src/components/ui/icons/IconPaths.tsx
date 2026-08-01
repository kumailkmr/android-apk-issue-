export type IconName =
  // Holy Shrines
  | 'karbala'
  | 'najaf'
  | 'kadhimayn'
  | 'samarra'
  | 'mashhad'
  | 'qom'
  | 'damascus'
  | 'jannatul-baqi'
  | 'masjid-al-haram'
  | 'masjid-an-nabawi'
  // Islamic Symbols
  | 'mosque'
  | 'minaret'
  | 'dome'
  | 'quran'
  | 'open-quran'
  | 'prayer-rug'
  | 'tasbih'
  | 'kaaba'
  | 'compass'
  | 'crescent'
  | 'star'
  | 'islamic-geometry'
  | 'prayer-hands'
  | 'calligraphy-frame'
  | 'mihrab'
  | 'lantern'
  | 'islamic-arch'
  | 'shrine'
  | 'rehal'
  | 'islamic-scroll'
  | 'charity-hands'
  | 'islamic-library'
  | 'islamic-calendar'
  // Special / Categories
  | 'ramadan'
  | 'muharram'
  | 'arbaeen'
  | 'ashura'
  | 'eid'
  | 'majlis'
  | 'noha'
  | 'marsiya'
  | 'azadari'
  | 'maktab'
  | 'volunteer'
  | 'digital-id'
  | 'qr'
  | 'certificate'
  | 'shield-check'
  | 'crypto-node'
  // UI Standard
  | 'home'
  | 'book'
  | 'video'
  | 'audio'
  | 'search'
  | 'notifications'
  | 'bookmark'
  | 'heart'
  | 'settings'
  | 'user'
  | 'logout'
  | 'menu'
  | 'close'
  | 'chevron-right'
  | 'chevron-down'
  | 'arrow-left'
  | 'check'
  | 'play'
  | 'clock'
  | 'sparkles';

export const ICON_PATHS: Record<IconName, React.ReactNode> = {
  // --- HOLY SHRINES ---
  'karbala': (
    <g>
      {/* Dome of Imam Hussain (AS) & Minarets */}
      <path d="M12 4c-2.5 0-4 2.5-4 5.5v2.5h8V9.5C16 6.5 14.5 4 12 4z" />
      <path d="M12 2v2" />
      <path d="M11 2h2" />
      <path d="M5 6v13h2V6H5zM17 6v13h2V6h-2z" />
      <path d="M4 6h4M16 6h4" />
      <path d="M3 19h18v3H3v-3z" />
      <path d="M9 19v-4a3 3 0 0 1 6 0v4" />
    </g>
  ),
  'najaf': (
    <g>
      {/* Golden Dome of Imam Ali (AS) */}
      <path d="M12 3c-3 0-5 3-5 7v2h10v-2c0-4-2-7-5-7z" />
      <path d="M12 1.5v1.5" />
      <path d="M6 10v9h2v-9H6zM16 10v9h2v-9h-2z" />
      <path d="M4 19h16v3H4v-3z" />
      <path d="M10 19v-3a2 2 0 0 1 4 0v3" />
    </g>
  ),
  'kadhimayn': (
    <g>
      {/* Twin Domes of Kadhimayn */}
      <path d="M8 5C6 5 5 7 5 9.5V12h6V9.5C11 7 10 5 8 5z" />
      <path d="M16 5c-2 0-3 2-3 4.5V12h6V9.5C19 7 18 5 16 5z" />
      <path d="M3 12h18v7H3v-7z" />
      <path d="M2 19h20v2H2v-2z" />
      <path d="M7 19v-3a1 1 0 0 1 2 0v3M15 19v-3a1 1 0 0 1 2 0v3" />
    </g>
  ),
  'samarra': (
    <g>
      {/* Golden Dome & Malwiya Spiral Minaret silhouette */}
      <path d="M14 6c-2.5 0-4 2.5-4 6v2h8v-2c0-3.5-1.5-6-4-6z" />
      <path d="M5 18V8l2-1v11" />
      <path d="M4 14l4-2M4 10l4-2" />
      <path d="M8 18h13v3H8v-3z" />
      <path d="M12 18v-3a2 2 0 0 1 4 0v3" />
    </g>
  ),
  'mashhad': (
    <g>
      {/* Grand Dome of Imam Reza (AS) */}
      <path d="M12 3c-3.5 0-6 3-6 7v3h12v-3c0-4-2.5-7-6-7z" />
      <path d="M12 1v2" />
      <path d="M4 8v12h2V8H4zM18 8v12h2V8h-2z" />
      <path d="M3 20h18v2H3v-2z" />
      <path d="M9 20v-5c0-1.7 1.3-3 3-3s3 1.3 3 3v5" />
    </g>
  ),
  'qom': (
    <g>
      {/* Shrine of Lady Fatima Masuma (SA) */}
      <path d="M12 4c-2.8 0-4.5 2.5-4.5 6v3h9v-3c0-3.5-1.7-6-4.5-6z" />
      <path d="M6 7v13h1.5V7H6zM16.5 7v13H18V7h-1.5z" />
      <path d="M4 20h16v2H4v-2z" />
      <path d="M10 20v-4a2 2 0 0 1 4 0v4" />
    </g>
  ),
  'damascus': (
    <g>
      {/* Shrine of Sayyida Zaynab (SA) */}
      <path d="M12 3.5c-2.5 0-4.5 2.2-4.5 5.5v3h9v-3c0-3.3-2-5.5-4.5-5.5z" />
      <path d="M12 1.5v2" />
      <path d="M5 5v15h2V5H5zM17 5v15h2V5h-2z" />
      <path d="M3 20h18v2H3v-2z" />
      <path d="M10 20v-4c0-1.1.9-2 2-2s2 .9 2 2v4" />
    </g>
  ),
  'jannatul-baqi': (
    <g>
      {/* Simple Memorial Arch & Crescent */}
      <path d="M12 4a8 8 0 0 0-8 8v8h16v-8a8 8 0 0 0-8-8z" strokeDasharray="2 2" />
      <path d="M12 8v4M10 10h4" />
      <path d="M4 20h16v2H4v-2z" />
    </g>
  ),
  'masjid-al-haram': (
    <g>
      {/* Kaaba Center with Minarets */}
      <rect x="8" y="10" width="8" height="9" rx="1" />
      <path d="M8 13h8" />
      <path d="M4 4v16h1.5V4H4zM18.5 4v16H20V4h-1.5z" />
      <path d="M3 20h18v2H3v-2z" />
    </g>
  ),
  'masjid-an-nabawi': (
    <g>
      {/* Green Dome & Prophet's Minaret */}
      <path d="M12 3c-3 0-5 2.8-5 6.5v3.5h10V9.5C17 5.8 15 3 12 3z" />
      <path d="M12 1v2" />
      <path d="M4 5v16h2V5H4zM18 5v16h2V5h-2z" />
      <path d="M2 20h20v2H2v-2z" />
      <path d="M9 20v-4a3 3 0 0 1 6 0v4" />
    </g>
  ),

  // --- ISLAMIC SYMBOLS ---
  'mosque': (
    <g>
      <path d="M12 3c-3 0-5 2.5-5 6v3h10V9c0-3.5-2-6-5-6z" />
      <path d="M12 1v2" />
      <path d="M4 7v13h2V7H4zM18 7v13h2V7h-2z" />
      <path d="M2 20h20v2H2v-2z" />
      <path d="M9 20v-4a3 3 0 0 1 6 0v4" />
    </g>
  ),
  'minaret': (
    <g>
      <path d="M10 21V6l2-3 2 3v15H10z" />
      <path d="M8 12h8M8 17h8" />
      <path d="M12 1v2" />
      <path d="M6 21h12v2H6v-2z" />
    </g>
  ),
  'dome': (
    <g>
      <path d="M12 3c-4 0-7 3.5-7 8v4h14v-4c0-4.5-3-8-7-8z" />
      <path d="M12 1v2" />
      <path d="M3 15h18v4H3v-4z" />
      <path d="M2 19h20v2H2v-2z" />
    </g>
  ),
  'quran': (
    <g>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <circle cx="13" cy="10" r="3" />
      <path d="M13 8.5v3" />
    </g>
  ),
  'open-quran': (
    <g>
      <path d="M2 6s1.5-2 5-2 5 2 5 2v14s-1.5-2-5-2-5 2-5 2V6z" />
      <path d="M12 6s1.5-2 5-2 5 2 5 2v14s-1.5-2-5-2-5 2-5 2V6z" />
      <path d="M6 8h3M6 11h3M15 8h3M15 11h3" />
    </g>
  ),
  'prayer-rug': (
    <g>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M8 6h8v4L12 7 8 10V6z" />
      <path d="M5 21h14M5 3h14" strokeDasharray="1 1" />
    </g>
  ),
  'tasbih': (
    <g>
      <circle cx="12" cy="5" r="2" />
      <circle cx="17" cy="8" r="2" />
      <circle cx="18" cy="14" r="2" />
      <circle cx="14" cy="18" r="2" />
      <circle cx="10" cy="18" r="2" />
      <circle cx="6" cy="14" r="2" />
      <circle cx="7" cy="8" r="2" />
      <path d="M12 7v4" />
      <path d="M10 11h4l-2 3z" />
    </g>
  ),
  'kaaba': (
    <g>
      <rect x="5" y="6" width="14" height="14" rx="1" />
      <path d="M5 10h14" />
      <path d="M12 10v10" />
      <path d="M5 6l7-3 7 3" />
    </g>
  ),
  'compass': (
    <g>
      <circle cx="12" cy="12" r="9" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </g>
  ),
  'crescent': (
    <g>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </g>
  ),
  'star': (
    <g>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </g>
  ),
  'islamic-geometry': (
    <g>
      <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" />
      <rect x="6" y="6" width="12" height="12" />
      <circle cx="12" cy="12" r="3" />
    </g>
  ),
  'prayer-hands': (
    <g>
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6" />
      <path d="M10 10.5V5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8.5" />
      <path d="M6 13.5V9a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6.5C2 19 5 22 9 22h4c4 0 7-3 7-6.5V11" />
    </g>
  ),
  'calligraphy-frame': (
    <g>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 3v4H3M17 3v4h4M7 21v-4H3M17 21v-4h4" />
      <circle cx="12" cy="12" r="4" />
    </g>
  ),
  'mihrab': (
    <g>
      <path d="M5 21V10a7 7 0 0 1 14 0v11" />
      <path d="M8 21V11a4 4 0 0 1 8 0v10" />
      <path d="M3 21h18" />
    </g>
  ),
  'lantern': (
    <g>
      <path d="M12 2v3" />
      <path d="M9 5h6l1 4H8l1-4z" />
      <path d="M8 9h8v8L12 20 8 17V9z" />
      <path d="M10 9v8M14 9v8" />
      <path d="M10 22h4" />
    </g>
  ),
  'islamic-arch': (
    <g>
      <path d="M4 21V11C4 6.5 7.5 3 12 3s8 3.5 8 8v10" />
      <path d="M7 21V12c0-2.8 2.2-5 5-5s5 2.2 5 5v9" />
      <path d="M2 21h20" />
    </g>
  ),
  'shrine': (
    <g>
      <path d="M12 3c-2.5 0-4.5 2-4.5 5v3h9V8c0-3-2-5-4.5-5z" />
      <path d="M5 6v14h2V6H5zM17 6v14h2V6h-2z" />
      <path d="M3 20h18v2H3v-2z" />
    </g>
  ),
  'rehal': (
    <g>
      <path d="M4 6l8 6 8-6" />
      <path d="M4 18l16-12" />
      <path d="M20 18L4 6" />
      <path d="M9 13.5L5 20M15 13.5l4 6.5" />
    </g>
  ),
  'islamic-scroll': (
    <g>
      <rect x="6" y="4" width="12" height="16" rx="1" />
      <path d="M4 5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5z" />
      <path d="M17 5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V5z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </g>
  ),
  'charity-hands': (
    <g>
      <path d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
      <path d="M4 18c0-2.5 3.5-4 8-4s8 1.5 8 4v3H4v-3z" />
      <path d="M2 12h4M18 12h4" />
    </g>
  ),
  'islamic-library': (
    <g>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 6h8M8 10h8M8 14h5" />
    </g>
  ),
  'islamic-calendar': (
    <g>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4M8 2v4M3 9h18" />
      <path d="M12 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      <path d="M14 13a2.5 2.5 0 0 1-2.5 2.5" />
    </g>
  ),

  // --- SPECIAL & CATEGORIES ---
  'ramadan': (
    <g>
      <path d="M12 2a7 7 0 1 0 7 7 7 7 0 0 0-7-7z" />
      <path d="M19 12l2 2M15 17l2 2M12 19v3" />
    </g>
  ),
  'muharram': (
    <g>
      <path d="M12 2v10" />
      <path d="M12 4l6 3-6 3" />
      <path d="M7 22l5-10 5 10" />
    </g>
  ),
  'arbaeen': (
    <g>
      <path d="M12 21V3" />
      <path d="M12 5l7 3.5L12 12" />
      <path d="M5 21h14" />
    </g>
  ),
  'ashura': (
    <g>
      <path d="M12 2v20M5 12h14" />
      <circle cx="12" cy="12" r="8" strokeDasharray="3 3" />
    </g>
  ),
  'eid': (
    <g>
      <path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z" />
      <polygon points="16 6 17.5 9 21 9.5 18.5 12 19 15.5 16 14 13 15.5 13.5 12 11 9.5 14.5 9 16 6" />
    </g>
  ),
  'majlis': (
    <g>
      <path d="M4 20h16" />
      <path d="M6 20v-5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" />
      <path d="M12 13V4" />
      <path d="M9 7h6" />
    </g>
  ),
  'noha': (
    <g>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </g>
  ),
  'marsiya': (
    <g>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M9 12l2 2 4-4" />
    </g>
  ),
  'azadari': (
    <g>
      <path d="M12 21V3" />
      <path d="M12 4l7 4-7 4" />
      <path d="M8 21h8" />
    </g>
  ),
  'maktab': (
    <g>
      <path d="M22 10L12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
      <path d="M22 10v6" />
    </g>
  ),
  'volunteer': (
    <g>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </g>
  ),
  'digital-id': (
    <g>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="M15 8h3M15 12h3M6 16h12" />
    </g>
  ),
  'qr': (
    <g>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3zM17 17h4v4h-4zM14 19h3v2h-3z" />
    </g>
  ),
  'certificate': (
    <g>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 8h8M8 11h5" />
      <path d="M12 16v5l2.5-1.5L17 21v-5" />
    </g>
  ),
  'shield-check': (
    <g>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </g>
  ),
  'crypto-node': (
    <g>
      <circle cx="12" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M10.5 7.5L7.5 16.5M13.5 7.5l3 9M8 18h8" />
    </g>
  ),

  // --- STANDARD UI ---
  'home': (
    <g>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </g>
  ),
  'book': (
    <g>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </g>
  ),
  'video': (
    <g>
      <rect x="2" y="4" width="15" height="16" rx="2" />
      <path d="M17 9l5-3v12l-5-3" />
    </g>
  ),
  'audio': (
    <g>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </g>
  ),
  'search': (
    <g>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </g>
  ),
  'notifications': (
    <g>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </g>
  ),
  'bookmark': (
    <g>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </g>
  ),
  'heart': (
    <g>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </g>
  ),
  'settings': (
    <g>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </g>
  ),
  'user': (
    <g>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </g>
  ),
  'logout': (
    <g>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </g>
  ),
  'menu': (
    <g>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </g>
  ),
  'close': (
    <g>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </g>
  ),
  'chevron-right': (
    <g>
      <polyline points="9 18 15 12 9 6" />
    </g>
  ),
  'chevron-down': (
    <g>
      <polyline points="6 9 12 15 18 9" />
    </g>
  ),
  'arrow-left': (
    <g>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </g>
  ),
  'check': (
    <g>
      <polyline points="20 6 9 17 4 12" />
    </g>
  ),
  'play': (
    <g>
      <polygon points="5 3 19 12 5 21 5 3" />
    </g>
  ),
  'clock': (
    <g>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </g>
  ),
  'sparkles': (
    <g>
      <path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" />
      <path d="M5 3l.8 1.8L7.5 5.5l-1.8.8L5 8l-.8-1.8L2.5 5.5l1.8-.8z" />
      <path d="M19 15l.8 1.8 1.7.7-1.7.8-.8 1.7-.8-1.7-1.7-.7 1.7-.8z" />
    </g>
  )
};
