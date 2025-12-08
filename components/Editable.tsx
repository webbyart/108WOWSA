import React, { useState, useEffect } from 'react';
import { useContent } from '../services/contentContext';
import { Edit2, Check, X, Upload } from 'lucide-react';

interface EditableTextProps {
  id: string; // Used for key in global content, or just identifier if overrideValue is present
  defaultText?: string;
  className?: string;
  multiline?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  overrideValue?: string; // Optional: Pass value directly (for lists/arrays)
  onSave?: (newValue: string) => void; // Optional: Callback when saved
}

export const EditableText: React.FC<EditableTextProps> = ({ 
  id, 
  defaultText = '', 
  className, 
  multiline = false, 
  tag: Tag = 'div',
  overrideValue,
  onSave
}) => {
  const { content, isAdmin, updateContent } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  
  // Determine source of truth: Override prop OR Global Context
  const currentValue = overrideValue !== undefined ? overrideValue : (content[id] || defaultText);
  const [editValue, setEditValue] = useState(currentValue);

  // Sync internal state when prop/context changes
  useEffect(() => {
    setEditValue(currentValue);
  }, [currentValue]);

  const handleSave = () => {
    if (onSave) {
      onSave(editValue);
    } else {
      updateContent(id, editValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(currentValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="relative group w-full">
        {multiline ? (
          <textarea
            className={`w-full p-2 border-2 border-brand-blue rounded bg-white text-black min-h-[100px] z-50 relative ${className}`}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
        ) : (
          <input
            type="text"
            className={`w-full p-2 border-2 border-brand-blue rounded bg-white text-black z-50 relative ${className}`}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
        )}
        <div className="absolute top-0 right-0 -mt-8 flex gap-2 bg-white p-1 rounded shadow z-[60]">
          <button onClick={handleSave} className="p-1 text-green-600 hover:bg-green-100 rounded"><Check size={16}/></button>
          <button onClick={handleCancel} className="p-1 text-red-600 hover:bg-red-100 rounded"><X size={16}/></button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative group ${isAdmin ? 'hover:outline hover:outline-2 hover:outline-dashed hover:outline-brand-orange cursor-text rounded transition-all duration-200' : ''}`}>
      <Tag className={className}>{currentValue}</Tag>
      {isAdmin && (
        <button 
          onClick={(e) => { e.preventDefault(); setIsEditing(true); }} 
          className="absolute top-0 right-0 hidden group-hover:block bg-brand-orange text-white p-1 rounded-full shadow-lg transform translate-x-1/2 -translate-y-1/2 z-10"
        >
          <Edit2 size={12} />
        </button>
      )}
    </div>
  );
};

interface EditableImageProps {
  id: string;
  defaultSrc?: string;
  alt: string;
  className?: string;
  overrideSrc?: string;
  onSave?: (newSrc: string) => void;
}

export const EditableImage: React.FC<EditableImageProps> = ({ 
  id, 
  defaultSrc = '', 
  alt, 
  className,
  overrideSrc,
  onSave 
}) => {
  const { content, isAdmin, updateContent } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  
  const currentSrc = overrideSrc !== undefined ? overrideSrc : (content[id] || defaultSrc);
  const [editSrc, setEditSrc] = useState(currentSrc);

   useEffect(() => {
    setEditSrc(currentSrc);
  }, [currentSrc]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(editSrc);
    } else {
      updateContent(id, editSrc);
    }
    setIsEditing(false);
  };

  return (
    <div className={`relative group ${className}`}>
      <img src={currentSrc} alt={alt} className={`w-full h-full object-cover ${isAdmin ? 'group-hover:opacity-80 transition-opacity' : ''}`} />
      
      {isAdmin && (
        <div className="absolute inset-0 hidden group-hover:flex flex-col items-center justify-center bg-black/40 text-white z-10">
          {!isEditing ? (
             <button onClick={() => setIsEditing(true)} className="bg-brand-orange px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition">
               <Edit2 size={16} /> Edit Image
             </button>
          ) : (
            <div className="bg-white p-4 rounded-lg text-black w-3/4 max-w-sm shadow-2xl">
               <h4 className="font-bold mb-2 text-brand-blue">Update Image</h4>
               <p className="text-xs text-gray-500 mb-2">Paste URL or Upload</p>
               <input 
                  type="text" 
                  placeholder="Image URL..." 
                  value={editSrc} 
                  onChange={(e) => setEditSrc(e.target.value)}
                  className="w-full border p-2 rounded mb-3 text-sm focus:border-brand-orange outline-none"
               />
               <div className="flex items-center gap-2 mb-4 bg-gray-50 p-2 rounded border border-dashed">
                  <Upload size={14} className="text-gray-400"/>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm w-full text-gray-500" />
               </div>
               <div className="flex justify-end gap-2">
                 <button onClick={() => setIsEditing(false)} className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
                 <button onClick={handleSave} className="px-3 py-1 text-sm bg-brand-orange text-white rounded hover:bg-orange-600 font-bold">Save</button>
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};