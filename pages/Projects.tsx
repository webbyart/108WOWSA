import React, { useState } from 'react';
import { useContent } from '../services/contentContext';

export const Projects: React.FC = () => {
  const { projects } = useContent();
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

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
            <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group">
              <div className="h-64 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">{project.category}</span>
                <h3 className="text-xl font-bold mt-2 mb-2 text-gray-800">{project.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};