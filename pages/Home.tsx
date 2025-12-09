
import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, PartyPopper, Gamepad2, CheckCircle, ChevronLeft, ChevronRight, Plus, Trash2, Upload, X, Edit2 } from 'lucide-react';
import { EditableText, EditableImage } from '../components/Editable';
import { useContent } from '../services/contentContext';
import { UI_LABELS } from '../constants';

export const Home: React.FC = () => {
  const { language, content, isAdmin, updateContent } = useContent();
  const labels = UI_LABELS[language];
  const suffix = language === 'en' ? '_en' : '';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Slider Logic - Derived directly from content for reliability
  const sliderImages = useMemo(() => {
    try {
      return JSON.parse(content['hero_slider_images'] || '[]');
    } catch {
      return ['https://images.unsplash.com/photo-1472653431158-6364773b2a56'];
    }
  }, [content['hero_slider_images']]);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Client Logos Logic - Derived directly from content
  const clientLogos = useMemo(() => {
    try {
      return JSON.parse(content['client_logos'] || '[]');
    } catch {
      return [];
    }
  }, [content['client_logos']]);

  // Auto-slide effect
  React.useEffect(() => {
    const timer = setInterval(() => {
       if (sliderImages.length > 1) {
         setCurrentSlide(prev => (prev + 1) % sliderImages.length);
       }
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % sliderImages.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + sliderImages.length) % sliderImages.length);

  const addSlide = () => {
    const newUrl = prompt("Enter new image URL:");
    if (newUrl) {
      const newImages = [...sliderImages, newUrl];
      updateContent('hero_slider_images', JSON.stringify(newImages));
    }
  };

  const removeSlide = (index: number) => {
    if (confirm("Remove this slide?")) {
      const newImages = sliderImages.filter((_, i) => i !== index);
      updateContent('hero_slider_images', JSON.stringify(newImages));
      if (currentSlide >= newImages.length) setCurrentSlide(0);
    }
  };

  // --- Client Logo Management ---

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const base64 = await resizeImage(file);
      const newLogos = [...clientLogos, base64];
      updateContent('client_logos', JSON.stringify(newLogos));
    } catch (error) {
      alert("Failed to process image");
      console.error(error);
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const updateClientLogo = (index: number, newSrc: string) => {
    const newLogos = [...clientLogos];
    newLogos[index] = newSrc;
    updateContent('client_logos', JSON.stringify(newLogos));
  };

  const removeClientLogo = (index: number) => {
    if (confirm("Delete this logo?")) {
       const newLogos = clientLogos.filter((_, i) => i !== index);
       updateContent('client_logos', JSON.stringify(newLogos));
    }
  };

  // Helper to resize image client-side to save space
  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 400; // Resize to reasonable logo size
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  return (
    <div>
      {/* Hero Slider Section */}
      <section className="relative h-[600px] w-full overflow-hidden bg-black group">
        {sliderImages.map((src: string, index: number) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
             <img src={src} alt="Hero" className="w-full h-full object-cover" />
             {/* Admin Remove Button */}
             {isAdmin && sliderImages.length > 1 && (
               <button 
                 onClick={() => removeSlide(index)}
                 className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full z-30 hover:bg-red-700"
               >
                 <Trash2 size={20}/>
               </button>
             )}
          </div>
        ))}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-black/50 to-transparent z-10 flex flex-col justify-center items-center text-center px-4">
          <EditableText 
            id={`home_hero_title${suffix}`}
            tag="h1"
            defaultText="สร้างปรากฏการณ์ความสนุกสุด WOW! ให้กับทุกอีเว้นท์ของคุณ"
            className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl uppercase tracking-wider"
          />
          <EditableText 
            id={`home_hero_subtitle${suffix}`}
            tag="p"
            defaultText="ผู้เชี่ยวชาญด้านจัดกีฬาสี ปาร์ตี้ และกิจกรรมสร้างทีมสัมพันธ์ครบวงจร อันดับ 1"
            className="text-xl md:text-2xl text-brand-lime font-medium mb-8 max-w-2xl drop-shadow-md"
          />
          <Link to="/contact" className="bg-brand-lime hover:bg-white text-black font-bold py-4 px-10 rounded-full text-lg transition shadow-lg shadow-lime-500/20 transform hover:scale-105">
            {labels.consult_free}
          </Link>
        </div>

        {/* Navigation Controls */}
        {sliderImages.length > 1 && (
          <>
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-brand-lime hover:text-black text-white p-3 rounded-full transition backdrop-blur-sm">
              <ChevronLeft size={32} />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-brand-lime hover:text-black text-white p-3 rounded-full transition backdrop-blur-sm">
              <ChevronRight size={32} />
            </button>
          </>
        )}

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {sliderImages.map((_: string, idx: number) => (
            <button 
              key={idx} 
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all ${idx === currentSlide ? 'bg-brand-lime w-8' : 'bg-white/50 hover:bg-white'}`}
            />
          ))}
          {isAdmin && (
             <button onClick={addSlide} className="w-8 h-3 rounded-full bg-brand-orange text-white flex items-center justify-center hover:bg-orange-500 text-xs font-bold">
               <Plus size={10} />
             </button>
          )}
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-brand-light">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <EditableText 
            id={`home_intro_title${suffix}`}
            tag="h2"
            defaultText="ยินดีต้อนรับสู่โลกแห่งกิจกรรม 108WOW"
            className="text-3xl font-bold text-brand-lime mb-6 uppercase tracking-wide"
          />
          <EditableText 
            id={`home_intro_text${suffix}`}
            tag="p"
            multiline
            defaultText="เราคือทีมงานมืออาชีพที่พร้อมเนรมิตงานกีฬาสีบริษัท..."
            className="text-gray-300 text-lg leading-relaxed"
          />
        </div>
      </section>

      {/* Services Highlight */}
      <section className="py-20 bg-brand-dark border-y border-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">{labels.services}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-brand-light rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-lime-500/10 transition flex flex-col border border-gray-800 group">
              <div className="h-48 overflow-hidden relative">
                 <EditableImage id="img_service_sport" defaultSrc="https://picsum.photos/800/600?random=1" alt="Sport Day" className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
                 <div className="absolute top-4 right-4 bg-brand-lime text-black p-2 rounded-lg shadow font-bold">
                   <Trophy size={24} />
                 </div>
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-brand-lime transition">{labels.sport_day}</h3>
                <p className="text-gray-400 mb-4">{language === 'th' ? 'กีฬาสีสุดมันส์ เกมส์ฮาเฮ สร้างทีมเวิร์คที่แข็งแกร่ง' : 'Fun sports day, funny games, building strong teamwork.'}</p>
                <Link to="/services/sport-day" className="text-brand-lime font-bold hover:underline">{labels.read_more} &rarr;</Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-brand-light rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-lime-500/10 transition flex flex-col border border-gray-800 group">
               <div className="h-48 overflow-hidden relative">
                 <EditableImage id="img_service_party" defaultSrc="https://picsum.photos/800/600?random=2" alt="Party" className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
                 <div className="absolute top-4 right-4 bg-brand-orange text-black p-2 rounded-lg shadow font-bold">
                   <PartyPopper size={24} />
                 </div>
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-brand-orange transition">{labels.party}</h3>
                <p className="text-gray-400 mb-4">{language === 'th' ? 'งานเลี้ยงบริษัท ปาร์ตี้ธีมต่างๆ แสงสีเสียงจัดเต็ม' : 'Corporate parties, various themes, full light and sound.'}</p>
                <Link to="/services/party" className="text-brand-lime font-bold hover:underline">{labels.read_more} &rarr;</Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-brand-light rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-lime-500/10 transition flex flex-col border border-gray-800 group">
              <div className="h-48 overflow-hidden relative">
                 <EditableImage id="img_service_equip" defaultSrc="https://picsum.photos/800/600?random=3" alt="Equipment" className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
                 <div className="absolute top-4 right-4 bg-brand-blue text-black p-2 rounded-lg shadow font-bold">
                   <Gamepad2 size={24} />
                 </div>
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-brand-blue transition">{labels.rentals}</h3>
                <p className="text-gray-400 mb-4">{language === 'th' ? 'บริการให้เช่าเกมส์ยักษ์ ซุ้มเกมส์งานวัด และอุปกรณ์จัดงานครบครัน' : 'Rental service for giant games, carnival booths, and event equipment.'}</p>
                <Link to="/equipment" className="text-brand-lime font-bold hover:underline">{labels.read_more} &rarr;</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
           <h2 className="text-3xl font-bold text-center mb-12">{labels.why_choose}</h2>
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'One-Stop Service', desc: language === 'th' ? 'ครบจบในที่เดียว ตั้งแต่วางแผนจนถึงวันงาน' : 'Complete in one place, from planning to event day.' },
                { title: 'Creative & Fun', desc: language === 'th' ? 'รูปแบบเกมส์และกิจกรรมที่แปลกใหม่ ไม่จำเจ' : 'Unique and creative games and activities.' },
                { title: 'Safety First', desc: language === 'th' ? 'อุปกรณ์ได้มาตรฐาน และทีมงานดูแลความปลอดภัย' : 'Standard equipment and safety team.' },
                { title: 'Professional Team', desc: language === 'th' ? 'ทีมงานเชี่ยวชาญ ประสบการณ์สูง คุมงบประมาณได้' : 'Experienced team, high expertise, budget control.' }
              ].map((item, index) => (
                <div key={index} className="bg-brand-light p-6 rounded-lg border border-gray-800 hover:border-brand-lime transition duration-300">
                  <CheckCircle className="text-brand-lime mb-4" size={32} />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Our Clients Section - TABLE Layout with Upload Controls */}
      <section className="py-20 bg-brand-dark">
        <div className="container mx-auto px-4 relative z-10">
          {/* Wrapper */}
          <div className="bg-[#101010] rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-6xl mx-auto border border-gray-800 relative overflow-hidden">
            
            {/* Top Gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-lime via-brand-orange to-brand-lime opacity-80"></div>

            {/* Headings */}
            <EditableText 
              id="client_title" 
              tag="h2" 
              defaultText="แบรนด์ชั้นนำกว่า 2,000 ราย ไว้วางใจเลือก 108WOW"
              className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-brand-orange mb-3 drop-shadow-[0_2px_10px_rgba(190,233,13,0.15)]"
            />
            <EditableText 
              id="client_subtitle" 
              tag="p" 
              defaultText="เพราะเรารู้ว่า 'ภาพลักษณ์' และ 'การบริการ' คือหัวใจของงานอีเว้นท์"
              className="text-base md:text-xl font-bold text-brand-orange mb-6 tracking-wide"
            />
            <div className="w-24 h-1 bg-gradient-to-r from-brand-lime to-brand-orange mx-auto mb-8 rounded-full"></div>
            <EditableText 
              id="client_desc" 
              tag="p" 
              multiline
              defaultText="ออแกไนซ์และแบรนด์ชั้นนำกว่า 2,000 ราย วางใจใช้บริการจาก 108WOW..."
              className="text-gray-300 text-sm md:text-base max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            />

            {/* Admin Upload Control */}
            {isAdmin && (
               <div className="mb-6 flex justify-center">
                 <div className="relative">
                   <input 
                     type="file" 
                     ref={fileInputRef}
                     onChange={handleLogoUpload}
                     accept="image/*"
                     className="hidden"
                   />
                   <button 
                     onClick={() => fileInputRef.current?.click()}
                     disabled={isProcessing}
                     className="flex items-center gap-2 bg-brand-lime text-black px-6 py-3 rounded-full font-bold hover:bg-white transition shadow-lg hover:scale-105"
                   >
                     {isProcessing ? (
                       <span className="animate-spin">⏳</span>
                     ) : (
                       <Upload size={20} />
                     )}
                     {isProcessing ? 'Uploading...' : 'Upload New Logo'}
                   </button>
                 </div>
               </div>
            )}

            {/* Table-Like Grid Layout */}
            <div className="border border-gray-700 bg-black/40 rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 divide-x divide-y divide-gray-700">
                {clientLogos.map((logo: string, index: number) => (
                  <div key={index} className="relative group h-32 flex items-center justify-center p-2 bg-black hover:bg-white/5 transition duration-300">
                    
                    {/* Image Container - Fit to Edge */}
                    <div className="w-full h-full flex items-center justify-center overflow-hidden">
                       <EditableImage 
                        id={`client_logo_${index}`} 
                        alt={`Client ${index}`}
                        overrideSrc={logo}
                        onSave={(newSrc) => updateClientLogo(index, newSrc)}
                        // p-0 and object-contain to fit perfectly to edges
                        className="w-full h-full"
                        imgClassName="object-contain w-full h-full filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                      />
                    </div>

                    {/* Admin Controls Overlay */}
                    {isAdmin && (
                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2 z-20">
                         <span className="text-xs text-gray-400 font-mono">Slot {index + 1}</span>
                         <button 
                           onClick={() => removeClientLogo(index)}
                           className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-red-700"
                         >
                           <Trash2 size={12} /> Delete
                         </button>
                         <span className="text-[10px] text-gray-500 mt-1">Click image to edit</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Empty Cells Filler (Optional visual improvement if needed, usually just let grid handle it) */}
              </div>
            </div>
            
            <p className="text-gray-500 text-xs mt-4 text-right">
              {clientLogos.length} Clients Displayed
            </p>

          </div>
        </div>
      </section>
    </div>
  );
};
