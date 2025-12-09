import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, User as UserIcon, Facebook, Instagram, Youtube, Globe, ChevronDown, Flame } from 'lucide-react';
import { useContent, Language } from '../services/contentContext';
import { UI_LABELS } from '../constants';
import { EditableImage } from './Editable';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { content, isAdmin, logout, language, switchLanguage } = useContent();
  const location = useLocation();
  const labels = UI_LABELS[language];

  // Updated logic for Dark Theme Navigation
  const isActive = (path: string) => location.pathname === path 
    ? 'text-brand-lime font-bold border-b-2 border-brand-lime' 
    : 'text-gray-300 hover:text-brand-lime transition-colors duration-200';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-dark text-gray-100">
      {/* Admin Bar */}
      {isAdmin && (
        <div className="bg-brand-lime text-black text-xs py-1 px-4 flex justify-between items-center sticky top-0 z-50 font-bold">
          <span>{labels.admin_mode}</span>
          <button onClick={logout} className="underline hover:text-white">{labels.logout}</button>
        </div>
      )}

      {/* Header */}
      <header className="bg-brand-dark shadow-md sticky top-0 z-40 border-b border-gray-800">
        {/* Top Bar - Black/Dark with Lime Accents */}
        <div className="bg-black py-2 border-b border-gray-800">
          <div className="container mx-auto px-4 flex flex-wrap justify-between md:justify-end items-center text-sm gap-4 text-gray-400">
            
            <div className="flex items-center gap-4 mr-auto md:mr-0">
               <div className="flex items-center gap-1 hover:text-brand-lime transition">
                <Phone size={14} className="text-brand-lime" />
                <span>{content['contact_phone'] || '02-XXX-XXXX'}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 hover:text-brand-lime transition">
                <span className="text-brand-lime font-bold">Line:</span>
                <span>{content['contact_line'] || '@108wow'}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Language Switcher Dropdown */}
              <div className="relative group z-50">
                <button className="flex items-center gap-1 hover:text-brand-lime px-2 py-0.5 rounded transition font-semibold">
                  <Globe size={14} />
                  <span>{language === 'th' ? 'TH' : 'EN'}</span>
                  <ChevronDown size={12} />
                </button>
                <div className="absolute right-0 top-full mt-1 bg-brand-light shadow-xl rounded-lg overflow-hidden hidden group-hover:block border border-gray-700 min-w-[120px]">
                  <button 
                    onClick={() => switchLanguage('th')} 
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-gray-200 ${language === 'th' ? 'font-bold text-brand-lime' : ''}`}
                  >
                    ภาษาไทย
                  </button>
                  <button 
                    onClick={() => switchLanguage('en')} 
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-gray-200 ${language === 'en' ? 'font-bold text-brand-lime' : ''}`}
                  >
                    English
                  </button>
                </div>
              </div>

              <div className="h-4 w-px bg-gray-700"></div>

              <Link to="/admin" className="flex items-center gap-1 hover:text-brand-lime transition">
                <UserIcon size={14} />
                <span>{isAdmin ? labels.logout : labels.login}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
             {/* Admin Editable Logo - Dynamic Image */}
             <div className="h-12 md:h-16 w-auto max-w-[200px] md:max-w-[280px] relative flex items-center">
               <EditableImage 
                  id="site_logo" 
                  alt="108WOW Logo" 
                  className="w-full h-full object-contain object-left"
                  defaultSrc="https://placehold.co/200x60/bee90d/000000?text=LOGO"
                />
             </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-8 items-center font-medium">
            <Link to="/" className={isActive('/')}>{labels.home}</Link>
            
            <div className="relative group cursor-pointer py-4">
              <span className={`flex items-center gap-1 ${location.pathname.includes('/services') ? 'text-brand-lime font-bold' : 'text-gray-300 hover:text-brand-lime'}`}>
                {labels.services} <ChevronDown size={14}/>
              </span>
              <div className="absolute left-0 top-full mt-0 w-56 bg-brand-light shadow-xl rounded-b-xl overflow-hidden hidden group-hover:block border-t-2 border-brand-lime z-50">
                <Link to="/services" className="block px-4 py-3 hover:bg-gray-700 text-sm text-gray-200 border-b border-gray-700">{labels.all_services}</Link>
                <Link to="/services/sport-day" className="block px-4 py-3 hover:bg-gray-700 text-sm text-gray-200 border-b border-gray-700">{labels.sport_day}</Link>
                <Link to="/services/party" className="block px-4 py-3 hover:bg-gray-700 text-sm text-gray-200 border-b border-gray-700">{labels.party}</Link>
                <Link to="/services/management" className="block px-4 py-3 hover:bg-gray-700 text-sm text-gray-200">{labels.management}</Link>
              </div>
            </div>

            <div className="relative group cursor-pointer py-4">
              <span className={`flex items-center gap-1 ${location.pathname.includes('/equipment') ? 'text-brand-lime font-bold' : 'text-gray-300 hover:text-brand-lime'}`}>
                {labels.equipment} <ChevronDown size={14}/>
              </span>
              <div className="absolute left-0 top-full mt-0 w-56 bg-brand-light shadow-xl rounded-b-xl overflow-hidden hidden group-hover:block border-t-2 border-brand-lime z-50">
                <Link to="/equipment" className="block px-4 py-3 hover:bg-gray-700 text-sm text-gray-200 border-b border-gray-700">{labels.all_equipment}</Link>
                <Link to="/equipment/sport" className="block px-4 py-3 hover:bg-gray-700 text-sm text-gray-200 border-b border-gray-700">{labels.sport_games}</Link>
                <Link to="/equipment/booth" className="block px-4 py-3 hover:bg-gray-700 text-sm text-gray-200 border-b border-gray-700">{labels.booth}</Link>
                <Link to="/equipment/rentals" className="block px-4 py-3 hover:bg-gray-700 text-sm text-gray-200">{labels.rentals}</Link>
              </div>
            </div>

            <Link to="/projects" className={isActive('/projects')}>{labels.projects}</Link>
            <Link to="/about" className={isActive('/about')}>{labels.about}</Link>
            <Link to="/knowledge" className={isActive('/knowledge')}>{labels.knowledge}</Link>
            <Link to="/contact" className={`px-6 py-2 bg-brand-lime text-black font-bold rounded-full hover:bg-white hover:text-brand-lime transition shadow-md hover:shadow-lg ${location.pathname === '/contact' ? 'ring-2 ring-offset-2 ring-offset-brand-dark ring-brand-lime' : ''}`}>{labels.contact}</Link>
          </nav>

          {/* Mobile Toggle */}
          <button className="md:hidden text-gray-300 hover:text-brand-lime" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-brand-light border-t border-gray-700 p-4 flex flex-col gap-4 shadow-inner">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-300">{labels.home}</Link>
            <Link to="/services" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-300">{labels.services}</Link>
            <Link to="/equipment" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-300">{labels.equipment}</Link>
            <Link to="/projects" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-300">{labels.projects}</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="py-2 text-gray-300">{labels.about}</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="py-2 text-brand-lime font-bold">{labels.contact}</Link>
            {/* Mobile Language Switcher */}
            <div className="flex gap-4 py-2 border-t border-gray-700 pt-4">
              <button onClick={() => switchLanguage('th')} className={`text-sm ${language === 'th' ? 'text-brand-lime font-bold' : 'text-gray-500'}`}>ภาษาไทย</button>
              <button onClick={() => switchLanguage('en')} className={`text-sm ${language === 'en' ? 'text-brand-lime font-bold' : 'text-gray-500'}`}>English</button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer - Dark Theme */}
      <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-800">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
               {/* Footer Logo Minimal */}
               <Flame size={24} className="text-brand-lime" fill="currentColor"/>
               <span className="italic text-brand-lime font-black">108WOW</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {language === 'th' 
               ? 'ผู้เชี่ยวชาญด้านจัดกีฬาสี ปาร์ตี้ และกิจกรรมสร้างทีมสัมพันธ์ครบวงจร มุ่งมั่นสร้างความสุขและรอยยิ้มผ่านกิจกรรมคุณภาพ'
               : 'The expert in Sport Days, Parties, and Team Building activities. Committed to creating happiness and smiles through quality events.'}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-lime">{labels.quick_links}</h4>
            <ul className="text-gray-400 text-sm space-y-3">
              <li><Link to="/services" className="hover:text-brand-lime transition flex items-center gap-2"><span className="w-1 h-1 bg-brand-lime rounded-full"></span>{labels.services}</Link></li>
              <li><Link to="/equipment" className="hover:text-brand-lime transition flex items-center gap-2"><span className="w-1 h-1 bg-brand-lime rounded-full"></span>{labels.equipment}</Link></li>
              <li><Link to="/projects" className="hover:text-brand-lime transition flex items-center gap-2"><span className="w-1 h-1 bg-brand-lime rounded-full"></span>{labels.our_projects}</Link></li>
              <li><Link to="/contact" className="hover:text-brand-lime transition flex items-center gap-2"><span className="w-1 h-1 bg-brand-lime rounded-full"></span>{labels.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-lime">{labels.connect_us}</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-brand-lime hover:text-black transition text-gray-300"><Facebook size={20} /></a>
              <a href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-brand-lime hover:text-black transition text-gray-300"><Instagram size={20} /></a>
              <a href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-brand-lime hover:text-black transition text-gray-300"><Youtube size={20} /></a>
              <a href="#" className="bg-gray-800 p-2.5 rounded-full hover:bg-brand-lime hover:text-black transition text-gray-300 flex items-center justify-center">
                {/* TikTok SVG Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm flex items-center gap-2"><Phone size={14} className="text-brand-lime"/> {content['contact_phone']}</p>
              <p className="text-gray-400 text-sm flex items-center gap-2"><span className="text-black font-bold text-xs bg-brand-lime px-1 rounded">L</span> {content['contact_line']}</p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          &copy; 2024 108WOW Sport Day & Activity Expert. {labels.rights}
        </div>
      </footer>
    </div>
  );
};