import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { EditableText, EditableImage } from '../components/Editable';

export const Equipment: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  const isSpecific = !!type;

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-brand-orange">Home</Link> / 
          <Link to="/equipment" className="hover:text-brand-orange"> Equipment</Link> 
          {isSpecific && <span className="capitalize"> / {type?.replace('-', ' ')}</span>}
        </div>

        {!isSpecific ? (
          // General Equipment Landing
          <div>
            <h1 className="text-4xl font-bold text-center mb-8 text-brand-blue">อุปกรณ์และเกมส์ (Equipment & Games)</h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              108WOW มีคลังอุปกรณ์เกมส์และอุปกรณ์จัดงานขนาดใหญ่ พร้อมให้บริการเช่าสำหรับออแกไนเซอร์ หรือบริษัทที่ต้องการจัดงานเอง
            </p>
            <div className="grid gap-12">
              <EquipmentSection 
                title="Sport & Games / อุปกรณ์กีฬาและเกมส์"
                desc="เพิ่มสีสันให้งานกีฬาสีด้วยเกมส์ที่ไม่เหมือนใคร ทั้งเกมส์ลมยักษ์ และอุปกรณ์ Team Building"
                imgId="img_eq_sport_landing"
                link="/equipment/sport"
              />
              <EquipmentSection 
                title="Booth & Fair Games / ซุ้มเกมส์งานวัด"
                desc="บริการซุ้มเกมส์งานวัด และคาร์นิวัล สร้างบรรยากาศความสนุกแบบย้อนยุค"
                imgId="img_eq_booth_landing"
                link="/equipment/booth"
                reverse
              />
              <EquipmentSection 
                title="Event Rentals / อุปกรณ์อีเว้นท์"
                desc="ให้เช่าอุปกรณ์จัดงานอีเว้นท์ ระบบเสียง ไฟ เวที และโครงสร้าง"
                imgId="img_eq_rentals_landing"
                link="/equipment/rentals"
              />
            </div>
          </div>
        ) : (
          // Specific Equipment Page
          <div>
            <EditableText 
              id={`eq_${type}_title`} 
              tag="h1" 
              defaultText={
                type === 'sport' ? "ให้เช่าอุปกรณ์กีฬาและเกมส์สร้างทีม" : 
                type === 'booth' ? "บริการซุ้มเกมส์งานวัด และคาร์นิวัล" : 
                "ให้เช่าอุปกรณ์จัดงานอีเว้นท์"
              }
              className="text-4xl font-bold text-brand-blue mb-6"
            />
            
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="h-[400px]">
                <EditableImage 
                  id={`img_eq_detail_${type}`}
                  defaultSrc={`https://picsum.photos/800/600?random=${type?.length}`}
                  alt={type || 'Equipment'}
                  className="w-full h-full rounded-lg shadow-lg object-cover"
                />
              </div>
              <div>
                <EditableText 
                  id={`eq_${type}_content`}
                  tag="p"
                  multiline
                  defaultText={
                     type === 'sport' ? "เพิ่มสีสันให้งานกีฬาสีด้วยเกมส์ที่ไม่เหมือนใคร มีทั้งเกมส์ลมยักษ์, Team Building Props และ Funny Games" :
                     type === 'booth' ? "สร้างบรรยากาศความสนุกแบบย้อนยุค หรือสไตล์คาร์นิวัล เหมาะสำหรับงานปาร์ตี้ งานเปิดตัวสินค้า หรือกิจกรรมหน้างาน" :
                     "อุปกรณ์พื้นฐานที่จำเป็นสำหรับทุกงานอีเว้นท์ ระบบเสียง ไฟ เวที และโครงสร้างทรัส"
                  }
                  className="text-lg text-gray-700 leading-relaxed mb-6"
                />
                
                <h3 className="text-2xl font-bold mb-4">Available Items</h3>
                <ul className="space-y-3">
                  {type === 'sport' && [
                    "Inflatable Games: สไลเดอร์ยักษ์, บ้านบอล, สนามมวยทะเล",
                    "Team Building Props: อุปกรณ์เดินตัวหนอน, เกมส์ส่งแป้ง",
                    "Funny Games: ชุดมาสคอตซูโม่, เกมส์ชนแหลก"
                  ].map((item, i) => <li key={i} className="bg-gray-100 p-2 rounded border-l-4 border-brand-orange">{item}</li>)}

                  {type === 'booth' && [
                    "ซุ้มปาโป่ง, ซุ้มยิงปืนจุกน้ำปลา",
                    "ซุ้มโยนห่วง, ซุ้มปากระป๋อง",
                    "ซุ้มตักไข่พาโชค, สอยดาว",
                    "บริการสายไหม ป๊อปคอร์น ไอศกรีมหลอด"
                  ].map((item, i) => <li key={i} className="bg-gray-100 p-2 rounded border-l-4 border-brand-orange">{item}</li>)}

                  {type === 'rentals' && [
                    "ระบบเสียง (Sound System) ชุดเล็ก/กลาง/ใหญ่",
                    "ระบบไฟ (Lighting) ไฟย้อมบรรยากาศ, Moving Head",
                    "เวที (Stage) และโครงสร้างทรัส (Truss)",
                    "โต๊ะ เก้าอี้ เต็นท์ พัดลมไอน้ำ"
                  ].map((item, i) => <li key={i} className="bg-gray-100 p-2 rounded border-l-4 border-brand-orange">{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EquipmentSection: React.FC<{title: string, desc: string, imgId: string, link: string, reverse?: boolean}> = ({ title, desc, imgId, link, reverse }) => (
  <div className={`flex flex-col md:flex-row gap-8 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
    <div className="w-full md:w-1/2 h-[300px]">
      <EditableImage id={imgId} defaultSrc="https://picsum.photos/600/400" alt={title} className="w-full h-full rounded-xl shadow-md object-cover" />
    </div>
    <div className="w-full md:w-1/2">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">{title}</h2>
      <p className="text-gray-600 mb-6 text-lg">{desc}</p>
      <Link to={link} className="inline-block bg-white border-2 border-brand-orange text-brand-orange px-6 py-2 rounded-full font-bold hover:bg-brand-orange hover:text-white transition">
        ดูรายละเอียด
      </Link>
    </div>
  </div>
);