import React, { useState, useEffect } from 'react';
import { useContent } from '../services/contentContext';
import { Edit2, Check, X, Upload } from 'lucide-react';

interface EditableTextProps {
  id: string;
  defaultText: string;
  className?: string;
  multiline?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export const EditableText: React.FC<EditableTextProps> = ({ id, defaultText, className, multiline = false, tag: Tag = 'div' }) => {
  const { content, isAdmin, updateContent } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(content[id] || defaultText);

  // Sync with context updates
  useEffect(() => {
    if (content[id]) setValue(content[id]);
  }, [content, id]);

  const handleSave = () => {
    updateContent(id, value);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(content[id] || defaultText);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="relative group">
        {multiline ? (
          <textarea
            className={`w-full p-2 border-2 border-brand-blue rounded bg-white text-black min-h-[100px] ${className}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <input
            type="text"
            className={`w-full p-2 border-2 border-brand-blue rounded bg-white text-black ${className}`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        )}
        <div className="absolute top-0 right-0 -mt-8 flex gap-2 bg-white p-1 rounded shadow z-50">
          <button onClick={handleSave} className="p-1 text-green-600 hover:bg-green-100 rounded"><Check size={16}/></button>
          <button onClick={handleCancel} className="p-1 text-red-600 hover:bg-red-100 rounded"><X size={16}/></button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative group ${isAdmin ? 'hover:outline hover:outline-2 hover:outline-dashed hover:outline-brand-orange cursor-text rounded' : ''}`}>
      <Tag className={className}>{content[id] || defaultText}</Tag>
      {isAdmin && (
        <button 
          onClick={() => setIsEditing(true)} 
          className="absolute top-0 right-0 hidden group-hover:block bg-brand-orange text-white p-1 rounded-full shadow-lg transform translate-x-1/2 -translate-y-1/2"
        >
          <Edit2 size={12} />
        </button>
      )}
    </div>
  );
};

interface EditableImageProps {
  id: string;
  defaultSrc: string;
  alt: string;
  className?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({ id, defaultSrc, alt, className }) => {
  const { content, isAdmin, updateContent } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [src, setSrc] = useState(content[id] || defaultSrc);

   useEffect(() => {
    if (content[id]) setSrc(content[id]);
  }, [content, id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateContent(id, src);
    setIsEditing(false);
  };

  return (
    <div className={`relative group ${className}`}>
      <img src={src} alt={alt} className={`w-full h-full object-cover ${isAdmin ? 'group-hover:opacity-80' : ''}`} />
      
      {isAdmin && (
        <div className="absolute inset-0 hidden group-hover:flex flex-col items-center justify-center bg-black/40 text-white">
          {!isEditing ? (
             <button onClick={() => setIsEditing(true)} className="bg-brand-orange px-4 py-2 rounded-lg flex items-center gap-2">
               <Edit2 size={16} /> Edit Image
             </button>
          ) : (
            <div className="bg-white p-4 rounded-lg text-black w-3/4 max-w-sm">
               <h4 className="font-bold mb-2">Update Image</h4>
               <p className="text-xs text-gray-500 mb-2">Paste URL or Upload (Base64)</p>
               <input 
                  type="text" 
                  placeholder="Image URL..." 
                  value={src} 
                  onChange={(e) => setSrc(e.target.value)}
                  className="w-full border p-1 rounded mb-2 text-sm"
               />
               <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs">OR</span>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm" />
               </div>
               <div className="flex justify-end gap-2">
                 <button onClick={() => setIsEditing(false)} className="px-2 py-1 text-sm bg-gray-200 rounded">Cancel</button>
                 <button onClick={handleSave} className="px-2 py-1 text-sm bg-brand-orange text-white rounded">Save</button>
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};