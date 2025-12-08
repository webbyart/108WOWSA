import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ContentProvider } from './services/contentContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';

// Placeholder for Equipment page which shares similar structure to Services
const Equipment = () => <div className="py-20 text-center text-2xl font-bold text-gray-500">Equipment Catalog Coming Soon (Use Services Template)</div>;
const About = () => <div className="py-20 text-center text-2xl font-bold text-gray-500">About Page Coming Soon</div>;
const Knowledge = () => <div className="py-20 text-center text-2xl font-bold text-gray-500">Knowledge Blog Coming Soon</div>;

function App() {
  return (
    <ContentProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/services" element={<Services />} />
            <Route path="/services/:type" element={<Services />} />
            
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/equipment/:type" element={<Equipment />} />
            
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/admin" element={<Admin />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ContentProvider>
  );
}

export default App;