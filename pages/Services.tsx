import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { EditableText, EditableImage } from '../components/Editable';
import { useContent } from '../services/contentContext';
import { UI_LABELS } from '../constants';

export const Services: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  const { language } = useContent();
  const labels = UI_LABELS[language];
  const suffix = language === 'en' ? '_en' : '';

  const isSpecific = !!type;
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-brand-orange">{labels.home}</Link> / 
          <Link to="/services" className="hover:text-brand-orange"> {labels.services}</Link> 
          {isSpecific && <span className="capitalize"> / {type?.replace('-', ' ')}</span>}
        </div>

        {!isSpecific ? (
          // General Service Landing
          <div>
            <h1 className="text-4xl font-bold text-center mb-8 text-brand-blue">{labels.services}</h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
              {language === 'th' ? 'เราให้บริการจัดงานกิจกรรมหลากหลายรูปแบบ ตอบโจทย์ทุกความต้องการขององค์กร' : 'We provide various types of event services to meet every organizational need.'}
            </p>
            <div className="grid gap-12">
              <ServiceSection 
                id={`service_page_sport${suffix}`}
                title={labels.sport_day}
                desc={language === 'th' ? "บริการจัดงานกีฬาสีประจำปี ครบวงจร ตั้งแต่การวางแผนจนถึงวันงาน" : "Annual Sports Day Organizer, complete service from planning to event day."}
                imgId="img_svc_sport_landing"
                link="/services/sport-day"
              />
              <ServiceSection 
                id={`service_page_party${suffix}`}
                title={labels.party}
                desc={language === 'th' ? "รับจัดงานปาร์ตี้ งานเลี้ยงสังสรรค์ งานปีใหม่ พร้อมแสงสีเสียงอลังการ" : "Party organizer, banquets, New Year parties with spectacular light and sound."}
                imgId="img_svc_party_landing"
                link="/services/party"
                reverse
              />
              <ServiceSection 
                id={`service_page_mgmt${suffix}`}
                title={labels.management}
                desc={language === 'th' ? "บริหารและจัดการงานอีเว้นท์ระดับมืออาชีพ" : "Professional Event Management and Administration."}
                imgId="img_svc_mgmt_landing"
                link="/services/management"
              />
            </div>
          </div>
        ) : (
          // Specific Service Page
          <div>
            <EditableText 
              id={`svc_${type}_title${suffix}`} 
              tag="h1" 
              defaultText={type === 'sport-day' ? "บริการจัดงานกีฬาสีประจำปี (Sport Day)" : type === 'party' ? "รับจัดงานปาร์ตี้ (Party Planner)" : "บริหารงานอีเว้นท์"}
              className="text-4xl font-bold text-brand-blue mb-6"
            />
            
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="h-[400px]">
                <EditableImage 
                  id={`img_svc_detail_${type}`}
                  defaultSrc={`https://picsum.photos/800/600?random=${type?.length}`}
                  alt={type || 'Service'}
                  className="w-full h-full rounded-lg shadow-lg"
                />
              </div>
              <div>
                <EditableText 
                  id={`svc_${type}_content${suffix}`}
                  tag="p"
                  multiline
                  defaultText="ฉีกกฎกีฬาสีแบบเดิมๆ! 108WOW พร้อมสร้างสรรค์กีฬาสีบริษัทของคุณให้สนุกสุดเหวี่ยง..."
                  className="text-lg text-gray-700 leading-relaxed mb-6"
                />
                <h3 className="text-2xl font-bold mb-4">What We Offer</h3>
                <ul className="space-y-2">
                  {[
                    language === 'th' ? 'วาง Concept และ Theme งาน' : 'Concept and Theme Planning',
                    language === 'th' ? 'จัดหาถานที่' : 'Venue Sourcing',
                    language === 'th' ? 'ออกแบบเกมส์กีฬา' : 'Game Design',
                    language === 'th' ? 'ทีมงานรันคิว พิธีกร' : 'Staff and MC',
                    language === 'th' ? 'ระบบเสียง อาหาร เครื่องดื่ม' : 'Sound System, Food, Drinks'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-brand-orange mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ServiceSection: React.FC<{id: string, title: string, desc: string, imgId: string, link: string, reverse?: boolean}> = ({ id, title, desc, imgId, link, reverse }) => {
  const { language } = useContent();
  const labels = UI_LABELS[language];
  return (
    <div className={`flex flex-col md:flex-row gap-8 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
      <div className="w-full md:w-1/2 h-[300px]">
        <EditableImage id={imgId} defaultSrc="https://picsum.photos/600/400" alt={title} className="w-full h-full rounded-xl shadow-md" />
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-6 text-lg">{desc}</p>
        <Link to={link} className="inline-block bg-white border-2 border-brand-orange text-brand-orange px-6 py-2 rounded-full font-bold hover:bg-brand-orange hover:text-white transition">
          {labels.view_details}
        </Link>
      </div>
    </div>
  );
};