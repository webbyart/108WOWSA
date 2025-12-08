import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, PartyPopper, Gamepad2, CheckCircle } from 'lucide-react';
import { EditableText, EditableImage } from '../components/Editable';
import { useContent } from '../services/contentContext';
import { UI_LABELS } from '../constants';

export const Home: React.FC = () => {
  const { language } = useContent();
  const labels = UI_LABELS[language];
  const suffix = language === 'en' ? '_en' : '';

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <EditableImage 
          id="img_hero_main"
          defaultSrc="https://picsum.photos/1920/1080" 
          alt="Sport Day Activity" 
          className="absolute inset-0 w-full h-full z-0"
        />
        <div className="absolute inset-0 bg-black/50 z-10 flex flex-col justify-center items-center text-center px-4">
          <EditableText 
            id={`home_hero_title${suffix}`}
            tag="h1"
            defaultText="สร้างปรากฏการณ์ความสนุกสุด WOW! ให้กับทุกอีเว้นท์ของคุณ"
            className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
          />
          <EditableText 
            id={`home_hero_subtitle${suffix}`}
            tag="p"
            defaultText="ผู้เชี่ยวชาญด้านจัดกีฬาสี ปาร์ตี้ และกิจกรรมสร้างทีมสัมพันธ์ครบวงจร อันดับ 1"
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl"
          />
          <Link to="/contact" className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg transition shadow-lg transform hover:scale-105">
            {labels.consult_free}
          </Link>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <EditableText 
            id={`home_intro_title${suffix}`}
            tag="h2"
            defaultText="ยินดีต้อนรับสู่โลกแห่งกิจกรรม 108WOW"
            className="text-3xl font-bold text-brand-blue mb-6"
          />
          <EditableText 
            id={`home_intro_text${suffix}`}
            tag="p"
            multiline
            defaultText="เราคือทีมงานมืออาชีพที่พร้อมเนรมิตงานกีฬาสีบริษัท..."
            className="text-gray-600 text-lg leading-relaxed"
          />
        </div>
      </section>

      {/* Services Highlight */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">{labels.services}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col">
              <div className="h-48 overflow-hidden relative">
                 <EditableImage id="img_service_sport" defaultSrc="https://picsum.photos/800/600?random=1" alt="Sport Day" className="w-full h-full object-cover"/>
                 <div className="absolute top-4 right-4 bg-brand-orange text-white p-2 rounded-full shadow">
                   <Trophy size={24} />
                 </div>
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2">{labels.sport_day}</h3>
                <p className="text-gray-600 mb-4">{language === 'th' ? 'กีฬาสีสุดมันส์ เกมส์ฮาเฮ สร้างทีมเวิร์คที่แข็งแกร่ง' : 'Fun sports day, funny games, building strong teamwork.'}</p>
                <Link to="/services/sport-day" className="text-brand-blue font-bold hover:underline">{labels.read_more} &rarr;</Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col">
               <div className="h-48 overflow-hidden relative">
                 <EditableImage id="img_service_party" defaultSrc="https://picsum.photos/800/600?random=2" alt="Party" className="w-full h-full object-cover"/>
                 <div className="absolute top-4 right-4 bg-purple-600 text-white p-2 rounded-full shadow">
                   <PartyPopper size={24} />
                 </div>
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2">{labels.party}</h3>
                <p className="text-gray-600 mb-4">{language === 'th' ? 'งานเลี้ยงบริษัท ปาร์ตี้ธีมต่างๆ แสงสีเสียงจัดเต็ม' : 'Corporate parties, various themes, full light and sound.'}</p>
                <Link to="/services/party" className="text-brand-blue font-bold hover:underline">{labels.read_more} &rarr;</Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition flex flex-col">
              <div className="h-48 overflow-hidden relative">
                 <EditableImage id="img_service_equip" defaultSrc="https://picsum.photos/800/600?random=3" alt="Equipment" className="w-full h-full object-cover"/>
                 <div className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full shadow">
                   <Gamepad2 size={24} />
                 </div>
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2">{labels.rentals}</h3>
                <p className="text-gray-600 mb-4">{language === 'th' ? 'บริการให้เช่าเกมส์ยักษ์ ซุ้มเกมส์งานวัด และอุปกรณ์จัดงานครบครัน' : 'Rental service for giant games, carnival booths, and event equipment.'}</p>
                <Link to="/equipment" className="text-brand-blue font-bold hover:underline">{labels.read_more} &rarr;</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-brand-blue text-white">
        <div className="container mx-auto px-4">
           <h2 className="text-3xl font-bold text-center mb-12">{labels.why_choose}</h2>
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'One-Stop Service', desc: language === 'th' ? 'ครบจบในที่เดียว ตั้งแต่วางแผนจนถึงวันงาน' : 'Complete in one place, from planning to event day.' },
                { title: 'Creative & Fun', desc: language === 'th' ? 'รูปแบบเกมส์และกิจกรรมที่แปลกใหม่ ไม่จำเจ' : 'Unique and creative games and activities.' },
                { title: 'Safety First', desc: language === 'th' ? 'อุปกรณ์ได้มาตรฐาน และทีมงานดูแลความปลอดภัย' : 'Standard equipment and safety team.' },
                { title: 'Professional Team', desc: language === 'th' ? 'ทีมงานเชี่ยวชาญ ประสบการณ์สูง คุมงบประมาณได้' : 'Experienced team, high expertise, budget control.' }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20">
                  <CheckCircle className="text-brand-yellow mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-200">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};