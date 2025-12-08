import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { EditableText } from '../components/Editable';
import { useContent } from '../services/contentContext';
import { UI_LABELS } from '../constants';

export const Contact: React.FC = () => {
  const { language } = useContent();
  const suffix = language === 'en' ? '_en' : '';
  const labels = UI_LABELS[language];

  return (
    <div className="py-12 bg-brand-dark min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-brand-lime drop-shadow-sm">{labels.get_in_touch}</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6 text-white border-l-4 border-brand-orange pl-4">{language === 'th' ? 'ข้อมูลการติดต่อ' : 'Contact Information'}</h2>
            
            <div className="bg-brand-light p-6 rounded-2xl space-y-6 border border-gray-700">
              <div className="flex items-start gap-4">
                <div className="bg-black p-3 rounded-full text-brand-lime shadow-sm"><MapPin /></div>
                <div>
                  <h3 className="font-bold text-brand-lime text-lg">{language === 'th' ? 'ที่อยู่' : 'Address'}</h3>
                  <EditableText id={`contact_address${suffix}`} defaultText="บริษัท 108WOW จำกัด xxx ถนน xxx แขวง xxx เขต xxx กรุงเทพฯ" className="text-gray-400" />
                </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-black p-3 rounded-full text-brand-lime shadow-sm"><Phone /></div>
                 <div>
                   <h3 className="font-bold text-brand-lime text-lg">{language === 'th' ? 'โทรศัพท์' : 'Phone'}</h3>
                   <EditableText id="contact_phone" defaultText="02-xxx-xxxx" className="text-gray-400 font-medium" />
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-black p-3 rounded-full text-brand-lime shadow-sm"><Mail /></div>
                 <div>
                   <h3 className="font-bold text-brand-lime text-lg">Email / Line</h3>
                   <EditableText id="contact_email" defaultText="info@108wow.com" className="text-gray-400" />
                   <EditableText id="contact_line" defaultText="@108wow" className="text-brand-orange font-bold" />
                 </div>
              </div>
            </div>

            {/* Embedded Google Map with Pastel Pink Border */}
            <div className="h-80 w-full rounded-2xl overflow-hidden shadow-lg border-4 border-brand-lime">
              <iframe 
                src="https://maps.google.com/maps?q=13.8046876,100.5747924&hl=th&z=16&output=embed" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="108WOW Location"
              ></iframe>
            </div>
          </div>

          {/* Form */}
          <div className="bg-brand-light p-8 rounded-2xl shadow-xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-white">{language === 'th' ? 'ส่งข้อความถึงเรา' : 'Send us a message'}</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">{language === 'th' ? 'ชื่อ - นามสกุล' : 'Full Name'}</label>
                <input type="text" className="w-full p-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-lime outline-none transition bg-black text-white" placeholder="Your Name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">{language === 'th' ? 'เบอร์โทร' : 'Phone'}</label>
                  <input type="tel" className="w-full p-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-lime outline-none transition bg-black text-white" placeholder="Phone" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <input type="email" className="w-full p-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-lime outline-none transition bg-black text-white" placeholder="Email" />
                </div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-400 mb-1">{language === 'th' ? 'ประเภทงานที่สนใจ' : 'Interested Service'}</label>
                 <select className="w-full p-3 border border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-lime outline-none transition bg-black text-white">
                   <option>Sport Day</option>
                   <option>Party</option>
                   <option>Equipment Rental</option>
                   <option>Other</option>
                 </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">{language === 'th' ? 'ข้อความเพิ่มเติม' : 'Message'}</label>
                <textarea className="w-full p-3 border border-gray-700 rounded-xl h-32 focus:ring-2 focus:ring-brand-lime outline-none transition bg-black text-white" placeholder="Tell us about your event..."></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-lime text-black font-bold py-4 rounded-xl hover:bg-white transition shadow-lg transform hover:-translate-y-1">
                {language === 'th' ? 'ส่งข้อความ' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};