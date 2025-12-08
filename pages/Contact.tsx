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
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-brand-blue">{labels.get_in_touch}</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">{language === 'th' ? 'ข้อมูลการติดต่อ' : 'Contact Information'}</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-brand-light p-3 rounded-full text-brand-orange"><MapPin /></div>
                <div>
                  <h3 className="font-bold">{language === 'th' ? 'ที่อยู่' : 'Address'}</h3>
                  <EditableText id={`contact_address${suffix}`} defaultText="บริษัท 108WOW จำกัด xxx ถนน xxx แขวง xxx เขต xxx กรุงเทพฯ" />
                </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-brand-light p-3 rounded-full text-brand-orange"><Phone /></div>
                 <div>
                   <h3 className="font-bold">{language === 'th' ? 'โทรศัพท์' : 'Phone'}</h3>
                   <EditableText id="contact_phone" defaultText="02-xxx-xxxx" />
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-brand-light p-3 rounded-full text-brand-orange"><Mail /></div>
                 <div>
                   <h3 className="font-bold">Email / Line</h3>
                   <EditableText id="contact_email" defaultText="info@108wow.com" />
                   <EditableText id="contact_line" defaultText="@108wow" />
                 </div>
              </div>
            </div>

            <div className="mt-8 h-64 bg-gray-200 rounded-xl overflow-hidden">
              {/* Mock Map */}
              <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100">
                Google Map Embedded Area
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">{language === 'th' ? 'ส่งข้อความถึงเรา' : 'Send us a message'}</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'th' ? 'ชื่อ - นามสกุล' : 'Full Name'}</label>
                <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" placeholder="Your Name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'th' ? 'เบอร์โทร' : 'Phone'}</label>
                  <input type="tel" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" placeholder="Phone" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-orange outline-none" placeholder="Email" />
                </div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'th' ? 'ประเภทงานที่สนใจ' : 'Interested Service'}</label>
                 <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-orange outline-none">
                   <option>Sport Day</option>
                   <option>Party</option>
                   <option>Equipment Rental</option>
                   <option>Other</option>
                 </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'th' ? 'ข้อความเพิ่มเติม' : 'Message'}</label>
                <textarea className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-brand-orange outline-none" placeholder="Tell us about your event..."></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-orange text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition shadow-lg">
                {language === 'th' ? 'ส่งข้อความ' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};