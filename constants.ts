
import { SiteContent, Project, Article } from './types';

// Kept for backward compatibility with Admin.tsx logic, though we use Supabase now
export const GOOGLE_SCRIPT_URL = "REPLACE_WITH_YOUR_DEPLOYED_GOOGLE_SCRIPT_URL";

export const UI_LABELS = {
  th: {
    home: 'หน้าแรก',
    services: 'บริการของเรา',
    equipment: 'อุปกรณ์และเกมส์',
    projects: 'ผลงาน',
    about: 'เกี่ยวกับเรา',
    knowledge: 'เกร็ดความรู้',
    contact: 'ติดต่อเรา',
    all_services: 'บริการทั้งหมด',
    all_equipment: 'อุปกรณ์ทั้งหมด',
    sport_day: 'กีฬาสี',
    party: 'งานปาร์ตี้',
    management: 'บริหารงานอีเว้นท์',
    sport_games: 'อุปกรณ์กีฬาและเกมส์',
    booth: 'ซุ้มเกมส์งานวัด',
    rentals: 'อุปกรณ์ให้เช่า',
    quick_links: 'เมนูลัด',
    connect_us: 'ติดต่อเรา',
    rights: 'สงวนลิขสิทธิ์',
    read_more: 'อ่านเพิ่มเติม',
    consult_free: 'ปรึกษาจัดงานฟรี!',
    why_choose: 'ทำไมต้องเลือก 108WOW?',
    view_details: 'ดูรายละเอียด',
    our_projects: 'ผลงานที่ผ่านมา',
    admin_mode: 'โหมดผู้ดูแลระบบ',
    logout: 'ออกจากระบบ',
    login: 'เข้าสู่ระบบ',
    get_in_touch: 'ติดต่อเรา',
    close: 'ปิด'
  },
  en: {
    home: 'Home',
    services: 'Services',
    equipment: 'Equipment',
    projects: 'Projects',
    about: 'About Us',
    knowledge: 'Knowledge',
    contact: 'Contact',
    all_services: 'All Services',
    all_equipment: 'All Equipment',
    sport_day: 'Sport Day',
    party: 'Party & Events',
    management: 'Event Management',
    sport_games: 'Sport & Games',
    booth: 'Carnival Booths',
    rentals: 'Event Rentals',
    quick_links: 'Quick Links',
    connect_us: 'Connect With Us',
    rights: 'All Rights Reserved.',
    read_more: 'Read More',
    consult_free: 'Free Consultation!',
    why_choose: 'Why Choose 108WOW?',
    view_details: 'View Details',
    our_projects: 'Our Projects',
    admin_mode: 'Admin Mode Active',
    logout: 'Logout',
    login: 'Login',
    get_in_touch: 'Get in Touch',
    close: 'Close'
  }
};

export const MOCK_PROJECTS: Project[] = []; // Empty default, will load from Supabase
export const MOCK_ARTICLES: Article[] = []; // Empty default, will load from Supabase

export const DEFAULT_CONTENT: SiteContent = {
  // Global
  'site_logo': 'https://scontent.fbkk12-1.fna.fbcdn.net/v/t39.30808-6/596288433_4376497032627821_223548440002380826_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=-zwKfk6JomIQ7kNvwEwDvaJ&_nc_oc=AdkLul868De9Xq2zVOEcE-D0Pr0PgeOXGu8FAucEhZdUCMUoCfWCKY0LMU4XYGmYKaI&_nc_zt=23&_nc_ht=scontent.fbkk12-1.fna&_nc_gid=wKri6QeCqMaQwtTthEzCrA&oh=00_AfmtM-EWXZ6kMjf8aASa8_abzhxkMnKffRBtKE2B6VAqMQ&oe=693D6D81',
  
  // Header & Footer
  'contact_phone': '089-123-4567',
  'contact_line': '@108wow',
  'contact_address': '123/45 ถนนรัชดาภิเษก แขวงจอมพล เขตจตุจักร กรุงเทพฯ 10900',
  'contact_address_en': '123/45 Ratchadaphisek Rd, Chomphon, Chatuchak, Bangkok 10900',
  
  // Home TH
  'home_hero_title': 'สร้างปรากฏการณ์ความสนุกสุด WOW! ให้กับทุกอีเว้นท์ของคุณ',
  'home_hero_subtitle': 'ผู้เชี่ยวชาญด้านจัดกีฬาสี ปาร์ตี้ และกิจกรรมสร้างทีมสัมพันธ์ครบวงจร อันดับ 1',
  'home_intro_title': 'ยินดีต้อนรับสู่โลกแห่งกิจกรรม 108WOW',
  'home_intro_text': 'เราคือทีมงานมืออาชีพที่พร้อมเนรมิตงานกีฬาสีบริษัท งานปาร์ตี้สังสรรค์ และกิจกรรม Team Building ให้เป็นมากกว่าแค่งานอีเว้นท์ แต่เป็นประสบการณ์ที่น่าจดจำ สร้างความสามัคคี และรอยยิ้มให้กับทุกคน ด้วยอุปกรณ์ที่ทันสมัย ปลอดภัย และทีมงานที่ใส่ใจในทุกรายละเอียด',
  
  // Home EN
  'home_hero_title_en': 'Create a WOW Phenomenon for Your Event!',
  'home_hero_subtitle_en': 'The #1 Expert in Sport Days, Parties, and Team Building Activities.',
  'home_intro_title_en': 'Welcome to the World of 108WOW Activities',
  'home_intro_text_en': 'We are a professional team ready to transform your corporate sport days, parties, and team building activities into more than just events. We create memorable experiences, unity, and smiles with modern, safe equipment and a team that cares about every detail.',

  // Client Section
  'client_title': 'แบรนด์ชั้นนำกว่า 2,000 ราย ไว้วางใจเลือก 108WOW',
  'client_subtitle': 'เพราะเรารู้ว่า "ภาพลักษณ์" และ "การบริการ" คือหัวใจของงานอีเว้นท์',
  'client_desc': 'ออแกไนซ์และแบรนด์ชั้นนำกว่า 2,000 ราย วางใจใช้บริการจาก 108WOW เพราะเราเข้าใจดีว่า "ภาพลักษณ์" และ "การบริการ" คือหัวใจของทุกอีเวนต์ เมื่อพูดถึงการสร้างประสบการณ์ที่น่าประทับใจในงานอีเวนต์หรือกิจกรรมการตลาด 108WOW คือชื่อที่แบรนด์และองค์กรชั้นนำเลือกใช้',
  'client_logos': JSON.stringify([
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/512px-Xiaomi_logo_%282021-%29.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Toyota.svg/1200px-Toyota.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Fujifilm_logo.svg/1200px-Fujifilm_logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Mitsubishi-motors_logo.svg/1200px-Mitsubishi-motors_logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Isuzu_Motors_Logo.svg/1200px-Isuzu_Motors_Logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Caltex_Logo.svg/1200px-Caltex_Logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Bangchak_Corporation_logo.svg/1200px-Bangchak_Corporation_logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Krung_Thai_Bank_logo.svg/1200px-Krung_Thai_Bank_logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Government_Savings_Bank_of_Thailand_Logo.svg/1200px-Government_Savings_Bank_of_Thailand_Logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/NXP_Semiconductors_Logo.svg/1200px-NXP_Semiconductors_Logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1200px-BMW.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%22square%22.png/800px-Facebook_logo_%22square%22.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Benz_Logo_2010.svg/1200px-Mercedes-Benz_Logo_2010.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png'
  ]),

  // REALISTIC IMAGES (Unsplash)
  'hero_slider_images': JSON.stringify([
    'https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?q=80&w=1920&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1920&auto=format&fit=crop'
  ]),
  'img_service_sport': 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop',
  'img_service_party': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop',
  'img_service_equip': 'https://images.unsplash.com/photo-1563299796-b729d0af54a5?q=80&w=800&auto=format&fit=crop',
  'img_svc_sport_landing': 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?q=80&w=800&auto=format&fit=crop',
  'img_svc_party_landing': 'https://images.unsplash.com/photo-1506157786151-b8491531f436?q=80&w=800&auto=format&fit=crop',
  'img_svc_mgmt_landing': 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop',
  'img_eq_sport_landing': 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=800&auto=format&fit=crop',
  'img_eq_booth_landing': 'https://images.unsplash.com/photo-1550951298-5c7b95a66b6c?q=80&w=800&auto=format&fit=crop',
  'img_eq_rentals_landing': 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800&auto=format&fit=crop',

  // Services TH
  'svc_sport-day_title': 'บริการจัดงานกีฬาสีประจำปี (Sport Day Organizer)',
  'svc_sport-day_content': 'ฉีกกฎกีฬาสีแบบเดิมๆ! 108WOW พร้อมสร้างสรรค์กีฬาสีบริษัทของคุณให้สนุกสุดเหวี่ยง สร้างความสามัคคี และประทับใจไม่รู้ลืม เราดูแลครบวงจรตั้งแต่ต้นจนจบ',
  'svc_party_title': 'รับจัดงานปาร์ตี้ และงานเลี้ยงสังสรรค์',
  'svc_party_content': 'เปลี่ยนค่ำคืนธรรมดาให้เป็นปาร์ตี้สุด WOW! ไม่ว่างจะเป็นงานเลี้ยงปีใหม่ (New Year Party), งานฉลองความสำเร็จ, หรืองาน Staff Party เราพร้อมเนรมิตบรรยากาศตามธีมที่คุณต้องการ',
  'svc_management_title': 'บริการบริหารและจัดการงานอีเว้นท์',
  'svc_management_content': 'สำหรับองค์กรที่ต้องการผู้ช่วยมืออาชีพในการดูแลภาพรวมของงานอีเว้นท์ต่างๆ เพื่อให้งานดำเนินไปอย่างราบรื่นตามวัตถุประสงค์ เราพร้อมเป็นพาร์ทเนอร์เคียงข้างคุณ',
  
  // Dynamic Service Lists
  'svc_list_items': JSON.stringify([
    'วาง Concept และ Theme งาน',
    'จัดหาถานที่',
    'ออกแบบเกมส์กีฬา',
    'ทีมงานรันคิว พิธีกร',
    'ระบบเสียง อาหาร เครื่องดื่ม'
  ]),
  'svc_list_items_en': JSON.stringify([
    'Concept and Theme Planning',
    'Venue Sourcing',
    'Game Design',
    'Staff and MC',
    'Sound System, Food, Drinks'
  ]),

  // Services EN
  'svc_sport-day_title_en': 'Annual Sport Day Organizer Services',
  'svc_sport-day_content_en': 'Break the rules of traditional sports days! 108WOW is ready to create a fun, unity-building, and unforgettable corporate sports day for you. We handle everything from start to finish.',
  'svc_party_title_en': 'Party Planner & Theme Events',
  'svc_party_content_en': 'Turn an ordinary night into a WOW party! Whether it\'s a New Year Party, Success Celebration, or Staff Party, we create the atmosphere you desire with full light and sound.',
  'svc_management_title_en': 'Professional Event Management',
  'svc_management_content_en': 'For organizations needing professional assistance in overseeing events to ensure smooth operations according to objectives, we are ready to be your partner.',

  // Equipment TH
  'eq_sport_title': 'ให้เช่าอุปกรณ์กีฬาและเกมส์สร้างทีม',
  'eq_sport_content': 'เพิ่มสีสันให้งานกีฬาสีด้วยเกมส์ที่ไม่เหมือนใคร มีทั้งเกมส์ลมยักษ์, Team Building Props และ Funny Games',
  'eq_booth_title': 'บริการซุ้มเกมส์งานวัด และคาร์นิวัล',
  'eq_booth_content': 'สร้างบรรยากาศความสนุกแบบย้อนยุค หรือสไตล์คาร์นิวัล เหมาะสำหรับงานปาร์ตี้ งานเปิดตัวสินค้า หรือกิจกรรมหน้างาน',
  'eq_rentals_title': 'ให้เช่าอุปกรณ์จัดงานอีเว้นท์',
  'eq_rentals_content': 'อุปกรณ์พื้นฐานที่จำเป็นสำหรับทุกงานอีเว้นท์ ระบบเสียง ไฟ เวที และโครงสร้างทรัส',

  // Equipment EN
  'eq_sport_title_en': 'Sport & Team Building Games Rental',
  'eq_sport_content_en': 'Add color to your sports day with unique games, including Giant Inflatables, Team Building Props, and Funny Games.',
  'eq_booth_title_en': 'Carnival & Fun Fair Booths',
  'eq_booth_content_en': 'Create a retro fun fair or carnival atmosphere, perfect for parties, product launches, or on-site activities.',
  'eq_rentals_title_en': 'Event Equipment Rentals',
  'eq_rentals_content_en': 'Essential equipment for every event: Sound Systems, Lighting, Stages, and Truss Structures.',

  // About TH
  'about_headline': 'รู้จักกับทีมงาน 108WOW',
  'about_story': '108WOW ก่อตั้งขึ้นจากความหลงใหลในการสร้างความสุขและรอยยิ้มผ่านกิจกรรม เราเริ่มต้นจากทีมเล็กๆ ที่รักในความสนุกสนาน จนเติบโตเป็นผู้นำด้านการจัดงานกีฬาสีและปาร์ตี้ระดับประเทศ',
  'about_mission': 'มุ่งมั่นที่จะเป็นผู้นำด้านการจัดกิจกรรม Sport Day และ Event ที่สร้างสรรค์ ปลอดภัย และคุ้มค่าที่สุดสำหรับลูกค้า เพื่อสร้างความทรงจำที่ดีให้กับทุกองค์กร',

  // About EN
  'about_headline_en': 'Meet the 108WOW Team',
  'about_story_en': '108WOW was founded on a passion for creating happiness and smiles through activities. We started as a small team loving fun, growing into a national leader in Sport Days and Parties.',
  'about_mission_en': 'Determined to be the leader in creative, safe, and value-for-money Sport Day and Event organization, creating good memories for every organization.',
};
