import React from 'react';
import { EditableText, EditableImage } from '../components/Editable';
import { useContent } from '../services/contentContext';
import { UI_LABELS } from '../constants';

export const About: React.FC = () => {
  const { language } = useContent();
  const suffix = language === 'en' ? '_en' : '';
  const labels = UI_LABELS[language];

  return (
    <div className="py-12 bg-brand-dark min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <EditableText 
            id={`about_headline${suffix}`}
            tag="h1"
            defaultText="รู้จักกับทีมงาน 108WOW"
            className="text-4xl font-bold text-brand-lime mb-4"
          />
          <div className="w-24 h-1 bg-brand-orange mx-auto"></div>
        </div>

        {/* Story & Mission */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <EditableImage 
              id="img_about_main" 
              defaultSrc="https://picsum.photos/800/600?grayscale" 
              alt="Our Team" 
              className="rounded-xl shadow-2xl border border-gray-700"
            />
          </div>
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-brand-orange mb-3">Our Story</h2>
              <EditableText 
                id={`about_story${suffix}`}
                tag="p"
                multiline
                defaultText="ประวัติความเป็นมาสั้นๆ ก่อตั้งขึ้นจากความหลงใหลในการสร้างความสุขและรอยยิ้มผ่านกิจกรรม..."
                className="text-gray-300 leading-relaxed"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand-orange mb-3">Our Mission</h2>
              <EditableText 
                id={`about_mission${suffix}`}
                tag="p"
                multiline
                defaultText="มุ่งมั่นที่จะเป็นผู้นำด้านการจัดกิจกรรม Sport Day และ Event ที่สร้างสรรค์ ปลอดภัย และคุ้มค่าที่สุดสำหรับลูกค้า"
                className="text-gray-300 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-brand-light p-12 rounded-2xl border border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">{language === 'th' ? 'ทีมงานมืออาชีพของเรา' : 'Our Professional Team'}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4 border-4 border-brand-lime shadow-lg">
                  <EditableImage 
                    id={`img_team_${i}`}
                    defaultSrc={`https://i.pravatar.cc/300?img=${i + 10}`} 
                    alt="Team Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <EditableText 
                  id={`team_name_${i}${suffix}`}
                  tag="h3"
                  defaultText={language === 'th' ? "ชื่อทีมงาน" : "Name"}
                  className="font-bold text-xl text-white"
                />
                <EditableText 
                  id={`team_role_${i}${suffix}`}
                  tag="p"
                  defaultText={language === 'th' ? "ตำแหน่ง" : "Position"}
                  className="text-brand-orange"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};