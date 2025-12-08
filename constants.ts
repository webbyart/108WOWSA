import { SiteContent, Project } from './types';

// IMPORTANT: Replace this URL with your deployed Web App URL from Google Apps Script
export const GOOGLE_SCRIPT_URL = "REPLACE_WITH_YOUR_DEPLOYED_GOOGLE_SCRIPT_URL"; 
export const GOOGLE_SHEET_ID = "1gpb9RQDNVmqoWMAacwUX_BNYYKol1DtI_3AF4AvoCyg";

export const DEFAULT_CONTENT: SiteContent = {
  // Header & Footer
  'contact_phone': '02-123-4567',
  'contact_line': '@108wow',
  
  // Home
  'home_hero_title': 'สร้างปรากฏการณ์ความสนุกสุด WOW! ให้กับทุกอีเว้นท์ของคุณ',
  'home_hero_subtitle': 'ผู้เชี่ยวชาญด้านจัดกีฬาสี ปาร์ตี้ และกิจกรรมสร้างทีมสัมพันธ์ครบวงจร อันดับ 1',
  'home_intro_title': 'ยินดีต้อนรับสู่โลกแห่งกิจกรรม 108WOW',
  'home_intro_text': 'เราคือทีมงานมืออาชีพที่พร้อมเนรมิตงานกีฬาสีบริษัท งานปาร์ตี้สังสรรค์ และกิจกรรม Team Building ให้เป็นมากกว่าแค่งานอีเว้นท์',

  // Images (Placeholders)
  'img_hero_main': 'https://picsum.photos/1920/1080',
  'img_service_sport': 'https://picsum.photos/800/600?random=1',
  'img_service_party': 'https://picsum.photos/800/600?random=2',
  'img_service_equip': 'https://picsum.photos/800/600?random=3',
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'ABC Company Sport Day',
    category: 'Sport Day',
    imageUrl: 'https://picsum.photos/600/400?random=10',
    description: 'งานกีฬาสีประจำปี บริษัท ABC จำกัด ในธีม Super Hero รวมพนักงานกว่า 500 คน'
  },
  {
    id: '2',
    title: 'Neon Night Party',
    category: 'Party',
    imageUrl: 'https://picsum.photos/600/400?random=11',
    description: 'ปาร์ตี้ส่งท้ายปีเก่าต้อนรับปีใหม่ ธีม Neon Glow'
  },
  {
    id: '3',
    title: 'Outdoor Team Building',
    category: 'Team Building',
    imageUrl: 'https://picsum.photos/600/400?random=12',
    description: 'กิจกรรมละลายพฤติกรรม สานสัมพันธ์องค์กร'
  }
];