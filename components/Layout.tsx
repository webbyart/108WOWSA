import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, User as UserIcon, Facebook, Instagram, Youtube } from 'lucide-react';
import { useContent } from '../services/contentContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { content, isAdmin, logout } = useContent();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-brand-orange font-bold' : 'text-gray-700 hover:text-brand-orange';

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Admin Bar */}
      {isAdmin && (
        <div className="bg-gray-800 text-white text-xs py-1 px-4 flex justify-between items-center sticky top-0 z-50">
          <span>Admin Mode Active</span>
          <button onClick={logout} className="underline hover:text-brand-yellow">Logout</button>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        {/* Top Bar */}
        <div className="bg-brand-blue text-white py-1">
          <div className="container mx-auto px-4 flex justify-end items-center text-sm gap-4">
            <div className="flex items-center gap-1">
              <Phone size={14} />
              <span>{content['contact_phone'] || '02-XXX-XXXX'}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Line: {content['contact_line'] || '@108wow'}</span>
            </div>
            <Link to="/admin" className="flex items-center gap-1 hover:text-brand-yellow">
              <UserIcon size={14} />
              <span>Admin</span>
            </Link>
          </div>
        </div>

        {/* Navbar */}
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-brand-orange flex items-center">
             <span className="text-brand-blue mr-1">108WOW</span> Sport & Activity
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/" className={isActive('/')}>Home</Link>
            
            <div className="relative group cursor-pointer">
              <span className={`flex items-center gap-1 ${location.pathname.includes('/services') ? 'text-brand-orange font-bold' : 'text-gray-700'}`}>
                Services
              </span>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-xl rounded-md overflow-hidden hidden group-hover:block border-t-2 border-brand-orange">
                <Link to="/services" className="block px-4 py-2 hover:bg-gray-50 text-sm">All Services</Link>
                <Link to="/services/sport-day" className="block px-4 py-2 hover:bg-gray-50 text-sm">Sport Day</Link>
                <Link to="/services/party" className="block px-4 py-2 hover:bg-gray-50 text-sm">Party & Events</Link>
                <Link to="/services/management" className="block px-4 py-2 hover:bg-gray-50 text-sm">Event Management</Link>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <span className={`flex items-center gap-1 ${location.pathname.includes('/equipment') ? 'text-brand-orange font-bold' : 'text-gray-700'}`}>
                Equipment
              </span>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-xl rounded-md overflow-hidden hidden group-hover:block border-t-2 border-brand-orange">
                <Link to="/equipment" className="block px-4 py-2 hover:bg-gray-50 text-sm">All Equipment</Link>
                <Link to="/equipment/sport" className="block px-4 py-2 hover:bg-gray-50 text-sm">Sport & Games</Link>
                <Link to="/equipment/booth" className="block px-4 py-2 hover:bg-gray-50 text-sm">Booths & Fair</Link>
                <Link to="/equipment/rentals" className="block px-4 py-2 hover:bg-gray-50 text-sm">Rentals</Link>
              </div>
            </div>

            <Link to="/projects" className={isActive('/projects')}>Projects</Link>
            <Link to="/about" className={isActive('/about')}>About</Link>
            <Link to="/knowledge" className={isActive('/knowledge')}>Knowledge</Link>
            <Link to="/contact" className={`px-4 py-2 bg-brand-orange text-white rounded-full hover:bg-orange-600 transition ${location.pathname === '/contact' ? 'ring-2 ring-offset-1 ring-brand-orange' : ''}`}>Contact Us</Link>
          </nav>

          {/* Mobile Toggle */}
          <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link to="/equipment" onClick={() => setIsMenuOpen(false)}>Equipment</Link>
            <Link to="/projects" onClick={() => setIsMenuOpen(false)}>Projects</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-brand-orange font-bold">Contact Us</Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-brand-orange mb-4">108WOW</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              ผู้เชี่ยวชาญด้านจัดกีฬาสี ปาร์ตี้ และกิจกรรมสร้างทีมสัมพันธ์ครบวงจร มุ่งมั่นสร้างความสุขและรอยยิ้มผ่านกิจกรรมคุณภาพ
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li><Link to="/equipment" className="hover:text-white">Equipment</Link></li>
              <li><Link to="/projects" className="hover:text-white">Our Works</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
            <div className="flex gap-4 mb-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-brand-blue"><Facebook size={20} /></a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-pink-600"><Instagram size={20} /></a>
              <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-red-600"><Youtube size={20} /></a>
            </div>
            <p className="text-gray-400 text-sm">Tel: {content['contact_phone']}</p>
            <p className="text-gray-400 text-sm">Line: {content['contact_line']}</p>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          &copy; 2024 108WOW Sport Day & Activity Expert. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};