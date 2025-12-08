import React, { useState } from 'react';
import { useContent } from '../services/contentContext';
import { EditableText, EditableImage } from '../components/Editable';
import { UI_LABELS } from '../constants';
import { Share2, Plus, X } from 'lucide-react';
import { Project } from '../types';

export const Projects: React.FC = () => {
  const { projects, updateProject, addProject, isAdmin, language } = useContent();
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '', category: 'Sport Day', description: '', imageUrl: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?q=80&w=800'
  });

  const labels = UI_LABELS[language];
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const handleUpdate = (id: string, field: keyof typeof projects[0], value: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      updateProject({ ...project, [field]: value });
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject.title && newProject.description) {
      const id = Date.now().toString();
      await addProject({
        id,
        title: newProject.title || 'Untitled',
        category: newProject.category || 'General',
        imageUrl: newProject.imageUrl || '',
        description: newProject.description || ''
      });
      setIsAdding(false);
      setNewProject({ title: '', category: 'Sport Day', description: '', imageUrl: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?q=80&w=800' });
    }
  };

  const handleShare = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${project.title} - ${window.location.href}`);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="py-12 bg-brand-dark min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-brand-lime">{labels.our_projects}</h1>
        <p className="text-center text-gray-400 mb-12">{language === 'th' ? 'ภาพความประทับใจและความสำเร็จจากลูกค้าของเรา' : 'Impressive moments and success stories from our clients.'}</p>

        {/* Admin Add Button */}
        {isAdmin && (
          <div className="text-center mb-8">
            <button 
              onClick={() => setIsAdding(!isAdding)} 
              className="bg-brand-lime text-black px-6 py-2 rounded-full font-bold hover:bg-white transition flex items-center gap-2 mx-auto"
            >
              <Plus size={20} /> Add New Project
            </button>
          </div>
        )}

        {/* Add Project Form */}
        {isAdding && (
          <div className="mb-12 bg-brand-light p-6 rounded-xl border border-gray-700 max-w-2xl mx-auto animate-fadeIn">
            <h3 className="text-xl font-bold text-white mb-4">Add New Project</h3>
            <form onSubmit={handleAddProject} className="space-y-4">
              <input 
                type="text" 
                placeholder="Title" 
                className="w-full p-2 rounded bg-black border border-gray-700 text-white"
                value={newProject.title}
                onChange={e => setNewProject({...newProject, title: e.target.value})}
                required
              />
              <select 
                className="w-full p-2 rounded bg-black border border-gray-700 text-white"
                value={newProject.category}
                onChange={e => setNewProject({...newProject, category: e.target.value})}
              >
                <option value="Sport Day">Sport Day</option>
                <option value="Party">Party</option>
                <option value="Team Building">Team Building</option>
                <option value="Event">Event</option>
              </select>
              <input 
                type="text" 
                placeholder="Image URL" 
                className="w-full p-2 rounded bg-black border border-gray-700 text-white"
                value={newProject.imageUrl}
                onChange={e => setNewProject({...newProject, imageUrl: e.target.value})}
              />
              <textarea 
                placeholder="Description" 
                className="w-full p-2 rounded bg-black border border-gray-700 text-white h-24"
                value={newProject.description}
                onChange={e => setNewProject({...newProject, description: e.target.value})}
                required
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                <button type="submit" className="bg-brand-orange text-black font-bold px-6 py-2 rounded hover:bg-white">Save Project</button>
              </div>
            </form>
          </div>
        )}

        {/* Filter */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium transition ${
                filter === cat 
                ? 'bg-brand-lime text-black shadow-lg shadow-lime-500/20' 
                : 'bg-brand-light text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              className="bg-brand-light rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-lime-500/10 transition group flex flex-col cursor-pointer border border-gray-800"
              onClick={() => setSelectedProject(project)}
            >
              <div className="h-64 overflow-hidden relative">
                {/* Lazy Loaded Image */}
                <img 
                  loading="lazy"
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                  <button onClick={(e) => handleShare(project, e)} className="bg-black/50 text-white p-2 rounded-full hover:bg-brand-lime hover:text-black">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col relative">
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-2 block">{project.category}</span>
                
                {isAdmin ? (
                   <div onClick={e => e.stopPropagation()}>
                    <EditableText
                      id={`project_title_${project.id}`}
                      tag="h3"
                      className="text-xl font-bold mb-2 text-white"
                      overrideValue={project.title}
                      onSave={(val) => handleUpdate(project.id, 'title', val)}
                    />
                    <EditableText
                        id={`project_desc_${project.id}`}
                        tag="p"
                        className="text-gray-400 text-sm line-clamp-3"
                        multiline
                        overrideValue={project.description}
                        onSave={(val) => handleUpdate(project.id, 'description', val)}
                      />
                   </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-3">{project.description}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
            <div className="bg-brand-light rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-700" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition z-10"
              >
                <X size={24} />
              </button>
              
              <div className="h-[300px] md:h-[500px]">
                <img src={selectedProject.imageUrl} alt={selectedProject.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-brand-orange font-bold text-sm uppercase tracking-wider">{selectedProject.category}</span>
                    <h2 className="text-3xl font-bold text-white mt-1">{selectedProject.title}</h2>
                  </div>
                  <button onClick={(e) => handleShare(selectedProject, e)} className="flex items-center gap-2 text-brand-lime font-bold border border-brand-lime px-4 py-2 rounded-full hover:bg-brand-lime hover:text-black transition">
                    <Share2 size={18} /> Share
                  </button>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">{selectedProject.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};