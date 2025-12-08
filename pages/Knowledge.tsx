import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { EditableText, EditableImage } from '../components/Editable';
import { useContent } from '../services/contentContext';
import { UI_LABELS } from '../constants';

export const Knowledge: React.FC = () => {
  const { language } = useContent();
  const suffix = language === 'en' ? '_en' : '';
  const labels = UI_LABELS[language];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-brand-blue">{labels.knowledge}</h1>
        <p className="text-center text-gray-600 mb-12">{language === 'th' ? 'บทความและสาระน่ารู้เกี่ยวกับการจัดกิจกรรม' : 'Articles and interesting facts about event organization.'}</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col">
              <div className="h-48">
                 <EditableImage 
                    id={`img_blog_${i}`} 
                    defaultSrc={`https://picsum.photos/600/400?random=${i+20}`} 
                    alt="Blog" 
                    className="w-full h-full object-cover"
                  />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center text-xs text-brand-orange font-bold mb-2 gap-1">
                  <BookOpen size={14} />
                  <span>ARTICLE</span>
                </div>
                <EditableText 
                  id={`blog_title_${i}${suffix}`}
                  tag="h3"
                  defaultText={
                    i === 1 ? "5 ธีมงานกีฬาสีสุดฮิต ปี 2024" :
                    i === 2 ? "เคล็ดลับจัดงานปาร์ตี้บริษัทให้พนักงานประทับใจ" :
                    i === 3 ? "ทำไม Team Building ถึงสำคัญกับองค์กร?" :
                    "วิธีเลือกเกมส์ให้เหมาะกับจำนวนคน"
                  }
                  className="text-xl font-bold mb-3 text-gray-800"
                />
                <EditableText 
                  id={`blog_excerpt_${i}${suffix}`}
                  tag="p"
                  multiline
                  defaultText={language === 'th' ? "เนื้อหาโดยย่อที่จะช่วยให้ผู้อ่านสนใจคลิกเข้ามาอ่านต่อ..." : "Brief content to attract readers to click and read more..."}
                  className="text-gray-600 text-sm mb-4 flex-grow"
                />
                <button className="text-brand-blue font-bold flex items-center gap-1 hover:gap-2 transition-all self-start">
                  {labels.read_more} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};