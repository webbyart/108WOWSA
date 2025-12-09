import React, { useState } from 'react';
import { useContent } from '../services/contentContext';
import { GOOGLE_SCRIPT_URL } from '../constants';
import { Lock, Settings, Image as ImageIcon } from 'lucide-react';
import { EditableImage } from '../components/Editable';

export const Admin: React.FC = () => {
  const { isAdmin, login, logout, content } = useContent();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (GOOGLE_SCRIPT_URL === "REPLACE_WITH_YOUR_DEPLOYED_GOOGLE_SCRIPT_URL") {
         // Local Auth Mock
         if (email === 'admin@admin.com' && password === '123456') {
           login('mock-token');
         } else {
           setError('Invalid credentials (Local Mock Mode)');
         }
      } else {
        // Real GAS Auth
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify({ action: 'login', email, password })
        });
        const data = await response.json();
        if (data.status === 'success') {
            login(data.token);
        } else {
            setError(data.message || 'Login failed');
        }
      }
    } catch (err) {
        setError('Connection error');
    } finally {
        setLoading(false);
    }
  };

  if (isAdmin) {
    return (
      <div className="py-20 container mx-auto px-4 min-h-screen bg-brand-dark">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-brand-light p-8 rounded-xl shadow-lg border-t-4 border-brand-lime text-gray-200 mb-8">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-white">
              <Lock className="text-brand-lime"/> Admin Dashboard
            </h1>
            <p className="mb-6 text-gray-400">
              Welcome back! You are now in editing mode. 
              Navigate to any page on the website, and you will see edit buttons on text and images.
            </p>
            
            <div className="bg-black/30 p-4 rounded-lg mb-8 text-sm text-gray-300 border border-gray-700">
              <strong className="text-brand-orange">How to use:</strong>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                <li>Go to pages like Home, Services, etc.</li>
                <li>Hover over texts or images to see the Edit pencil icon.</li>
                <li>Click to update content directly.</li>
                <li>Use the "Plus" icon on the Home Slider to add new banners.</li>
                <li>Go to "Projects" page to Add New Projects.</li>
              </ul>
            </div>
          </div>

          {/* Global Settings Section */}
          <div className="bg-brand-light p-8 rounded-xl shadow-lg border border-gray-700 mb-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white border-b border-gray-700 pb-2">
              <Settings className="text-brand-lime" size={20}/> Global Configuration
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black/40 p-6 rounded-xl border border-gray-800">
                <div className="flex items-center gap-2 mb-4 text-brand-orange font-bold">
                  <ImageIcon size={18} /> Site Logo
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Upload a new logo here. It will automatically scale and update on the header.
                  (Recommended height: 60-80px)
                </p>
                
                {/* Logo Editor Container */}
                <div className="h-24 bg-white/5 rounded-lg border border-dashed border-gray-600 flex items-center justify-center p-2 relative overflow-hidden group">
                   <div className="h-full w-full flex items-center justify-center">
                     <EditableImage 
                       id="site_logo" 
                       alt="Site Logo" 
                       className="max-h-full max-w-full object-contain"
                       defaultSrc="https://placehold.co/200x60/bee90d/000000?text=LOGO"
                     />
                   </div>
                   <div className="absolute top-2 right-2 pointer-events-none bg-black/50 text-white text-[10px] px-2 py-0.5 rounded">
                      Preview
                   </div>
                </div>
              </div>

              {/* Add more global settings here if needed */}
              <div className="bg-black/40 p-6 rounded-xl border border-gray-800 flex flex-col justify-center">
                <p className="text-sm text-gray-400 mb-4 text-center">
                  Finished editing?
                </p>
                <button 
                  onClick={logout} 
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition w-full"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-brand-dark px-4">
      <div className="bg-brand-light p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-700">
        <h1 className="text-2xl font-bold text-center mb-6 text-brand-lime">Admin Login</h1>
        {error && <div className="bg-red-900/50 text-red-200 p-3 rounded mb-4 text-sm text-center border border-red-800">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded bg-black text-white focus:ring-2 focus:ring-brand-lime outline-none" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded bg-black text-white focus:ring-2 focus:ring-brand-lime outline-none" 
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-lime text-black font-bold py-3 rounded hover:bg-white transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-gray-500">
          Demo: admin@admin.com / 123456
        </p>
      </div>
    </div>
  );
};