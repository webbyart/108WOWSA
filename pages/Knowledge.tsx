import React, { useState, useEffect } from 'react';
import { BookOpen, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { EditableText, EditableImage } from '../components/Editable';
import { useContent } from '../services/contentContext';
import { UI_LABELS } from '../constants';

interface Article {
  id: string;
  image: string;
  title: string;
  title_en?: string;
  excerpt: string;
  excerpt_en?: string;
}

export const Knowledge: React.FC = () => {
  const { language, content, isAdmin, updateContent } = useContent();
  const suffix = language === 'en' ? '_en' : '';
  const labels = UI_LABELS[language];
  
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    try {
      // Parse knowledge articles from JSON content
      const loaded = JSON.parse(content['knowledge_articles'] || '[]');
      if (loaded.length > 0) {
        setArticles(loaded);
      } else {
         setArticles([]);
      }
    } catch (e) {
      setArticles([]);
    }
  }, [content]);

  // Helper to save current state to global content
  const saveArticles = (newArticles: Article[]) => {
    setArticles(newArticles);
    updateContent('knowledge_articles', JSON.stringify(newArticles));
  };

  const handleAddArticle = () => {
    const newArticle: Article = {
      id: Date.now().toString(),
      image: 'https://picsum.photos/600/400?random=' + Date.now(),
      title: 'หัวข้อบทความใหม่',
      title_en: 'New Article Title',
      excerpt: 'เนื้อหาโดยย่อ...',
      excerpt_en: 'Short excerpt...'
    };
    saveArticles([...articles, newArticle]);
  };

  const handleRemoveArticle = (id: string) => {
    if (confirm("Delete this article?")) {
      const newArticles = articles.filter(a => a.id !== id);
      saveArticles(newArticles);
    }
  };

  const updateArticleField = (id: string, field: keyof Article, value: string) => {
    const newArticles = articles.map(a => {
      if (a.id === id) {
        return { ...a, [field]: value };
      }
      return a;
    });
    saveArticles(newArticles);
  };

  return (
    <div className="py-12 bg-brand-dark min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-brand-lime">{labels.knowledge}</h1>
        <p className="text-center text-gray-400 mb-12">{language === 'th' ? 'บทความและสาระน่ารู้เกี่ยวกับการจัดกิจกรรม' : 'Articles and interesting facts about event organization.'}</p>

        {/* Admin Add Button */}
        {isAdmin && (
          <div className="text-center mb-8">
            <button 
              onClick={handleAddArticle}
              className="bg-brand-lime text-black px-6 py-2 rounded-full font-bold hover:bg-white transition flex items-center gap-2 mx-auto shadow-lg"
            >
              <Plus size={20} /> {language === 'th' ? 'เพิ่มบทความใหม่' : 'Add New Article'}
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-brand-light rounded-xl overflow-hidden shadow-md hover:shadow-lime-500/20 transition flex flex-col border border-gray-700 group relative">
              <div className="h-48 relative">
                 <EditableImage 
                    id={`img_blog_${article.id}`} 
                    overrideSrc={article.image}
                    alt="Blog" 
                    onSave={(newSrc) => updateArticleField(article.id, 'image', newSrc)}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {/* Remove Button for Admin */}
                  {isAdmin && (
                    <button 
                      onClick={() => handleRemoveArticle(article.id)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 z-10 opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center text-xs text-brand-orange font-bold mb-2 gap-1">
                  <BookOpen size={14} />
                  <span>ARTICLE</span>
                </div>
                
                {/* Dynamic Title */}
                <EditableText 
                  id={`blog_title_${article.id}${suffix}`}
                  tag="h3"
                  overrideValue={language === 'en' ? (article.title_en || article.title) : article.title}
                  onSave={(val) => updateArticleField(article.id, language === 'en' ? 'title_en' : 'title', val)}
                  className="text-xl font-bold mb-3 text-white min-h-[1.5em]"
                />

                {/* Dynamic Excerpt */}
                <EditableText 
                  id={`blog_excerpt_${article.id}${suffix}`}
                  tag="p"
                  multiline
                  overrideValue={language === 'en' ? (article.excerpt_en || article.excerpt) : article.excerpt}
                  onSave={(val) => updateArticleField(article.id, language === 'en' ? 'excerpt_en' : 'excerpt', val)}
                  className="text-gray-400 text-sm mb-4 flex-grow min-h-[3em]"
                />

                <button className="text-brand-lime font-bold flex items-center gap-1 hover:gap-2 transition-all self-start hover:text-white mt-auto">
                  {labels.read_more} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {articles.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500 border-2 border-dashed border-gray-800 rounded-xl">
              <p>{language === 'th' ? 'ยังไม่มีบทความ' : 'No articles found.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};