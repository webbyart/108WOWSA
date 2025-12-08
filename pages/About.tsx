import React from 'react';
import { EditableText, EditableImage } from '../components/Editable';

export const About: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <EditableText 
            id="about_headline"
            tag="h1"
            defaultText="รู้จักกับทีมงาน 108WOW"
            className="text-4xl font-bold text-brand-blue mb-4"
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
              className="rounded-xl shadow-2xl"
            />
          </div>
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-brand-orange mb-3">Our Story</h2>
              <EditableText 
                id="about_story"
                tag="p"
                multiline
                defaultText="ประวัติความเป็นมาสั้นๆ ก่อตั้งขึ้นจากความหลงใหลในการสร้างความสุขและรอยยิ้มผ่านกิจกรรม..."
                className="text-gray-600 leading-relaxed"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-brand-orange mb-3">Our Mission</h2>
              <EditableText 
                id="about_mission"
                tag="p"
                multiline
                defaultText="มุ่งมั่นที่จะเป็นผู้นำด้านการจัดกิจกรรม Sport Day และ Event ที่สร้างสรรค์ ปลอดภัย และคุ้มค่าที่สุดสำหรับลูกค้า"
                className="text-gray-600 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-50 p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-center mb-12">ทีมงานมืออาชีพของเรา</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                  <EditableImage 
                    id={`img_team_${i}`}
                    defaultSrc={`https://i.pravatar.cc/300?img=${i + 10}`} 
                    alt="Team Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <EditableText 
                  id={`team_name_${i}`}
                  tag="h3"
                  defaultText="ชื่อทีมงาน"
                  className="font-bold text-xl text-gray-800"
                />
                <EditableText 
                  id={`team_role_${i}`}
                  tag="p"
                  defaultText="ตำแหน่ง"
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