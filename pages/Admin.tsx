import React, { useState } from 'react';
import { useContent } from '../services/contentContext';
import { GOOGLE_SCRIPT_URL } from '../constants';
import { Lock } from 'lucide-react';

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
      <div className="py-20 container mx-auto px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto border-t-4 border-brand-orange">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Lock className="text-brand-orange"/> Admin Dashboard
          </h1>
          <p className="mb-6 text-gray-600">
            Welcome back! You are now in editing mode. 
            Navigate to any page on the website, and you will see edit buttons on text and images.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-8 text-sm text-blue-800">
             <strong>How to use:</strong>
             <ul className="list-disc ml-5 mt-2 space-y-1">
               <li>Go to pages like Home, Services, etc.</li>
               <li>Hover over texts or images to see the Edit pencil icon.</li>
               <li>Click to update content directly.</li>
               <li>Changes are saved to Google Sheets automatically (if configured).</li>
             </ul>
          </div>

          <button 
            onClick={logout} 
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-brand-blue">Admin Login</h1>
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-brand-blue outline-none" 
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-brand-blue outline-none" 
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-blue text-white font-bold py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-gray-400">
          Demo: admin@admin.com / 123456
        </p>
      </div>
    </div>
  );
};