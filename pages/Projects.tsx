import React, { useState } from 'react';
import { useContent } from '../services/contentContext';
import { EditableText, EditableImage } from '../components/Editable';

export const Projects: React.FC = () => {
  const { projects, updateProject, isAdmin } = useContent();
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const handleUpdate = (id: string, field: keyof typeof projects[0], value: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      updateProject({ ...project, [field]: value });
    }
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-brand-blue">ผลงานที่ผ่านมา (Our Projects)</h1>
        <p className="text-center text-gray-600 mb-12">ภาพความประทับใจและความสำเร็จจากลูกค้าของเรา</p>

        {/* Filter */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                filter === cat 
                ? 'bg-brand-orange text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group flex flex-col">
              <div className="h-64 overflow-hidden relative">
                {/* Editable Image with Project logic */}
                <EditableImage
                  id={`project_img_${project.id}`}
                  alt={project.title}
                  className="w-full h-full"
                  overrideSrc={project.imageUrl}
                  onSave={(newSrc) => handleUpdate(project.id, 'imageUrl', newSrc)}
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-2 block">{project.category}</span>
                
                <EditableText
                   id={`project_title_${project.id}`}
                   tag="h3"
                   className="text-xl font-bold mb-2 text-gray-800"
                   overrideValue={project.title}
                   onSave={(val) => handleUpdate(project.id, 'title', val)}
                />
                
                <div className="flex-grow">
                  <EditableText
                    id={`project_desc_${project.id}`}
                    tag="p"
                    className="text-gray-600 text-sm line-clamp-4"
                    multiline
                    overrideValue={project.description}
                    onSave={(val) => handleUpdate(project.id, 'description', val)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {isAdmin && (
            <div className="mt-12 text-center text-sm text-gray-400">
                <p>💡 Tip: As an Admin, you can edit project images and descriptions directly above.</p>
                <p>Note: To add *new* projects, please add rows to the Google Sheet 'Projects' tab.</p>
            </div>
        )}
      </div>
    </div>
  );
};