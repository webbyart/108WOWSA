
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, Project, Article } from '../types';
import { DEFAULT_CONTENT, MOCK_PROJECTS, MOCK_ARTICLES } from '../constants';
import { supabase } from '../supabaseClient';

export type Language = 'th' | 'en';

interface ContentContextType {
  content: SiteContent;
  projects: Project[];
  articles: Article[];
  isAdmin: boolean;
  isLoading: boolean;
  language: Language;
  login: (token: string) => void;
  logout: () => void;
  updateContent: (key: string, value: string) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  saveArticles: (articles: Article[]) => Promise<void>;
  addArticle: (article: Article) => Promise<void>;
  updateArticle: (article: Article) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  switchLanguage: (lang: Language) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>('th');

  // Initial Fetch from Supabase
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // 1. Fetch Site Content (Key-Value)
        const { data: contentData } = await supabase
          .from('site_content')
          .select('*');
        
        if (contentData) {
          const contentMap: SiteContent = { ...DEFAULT_CONTENT };
          contentData.forEach((item: any) => {
            contentMap[item.key] = item.value;
          });
          setContent(contentMap);
        }

        // 2. Fetch Projects
        const { data: projectsData } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (projectsData) {
          const mappedProjects: Project[] = projectsData.map((p: any) => ({
            id: p.id,
            title: p.title,
            category: p.category,
            imageUrl: p.image_url,
            description: p.description
          }));
          setProjects(mappedProjects);
        }

        // 3. Fetch Articles
        const { data: articlesData } = await supabase
          .from('articles')
          .select('*')
          .order('created_at', { ascending: false });

        if (articlesData) {
          setArticles(articlesData);
        }

      } catch (e) {
        console.error("Failed to fetch data from Supabase", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const login = (token: string) => {
    setIsAdmin(true);
    localStorage.setItem('admin_token', token);
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('admin_token');
  };

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const updateContent = async (key: string, value: string) => {
    // Optimistic Update
    setContent(prev => ({ ...prev, [key]: value }));

    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({ key, value });
      
      if (error) throw error;
    } catch (e) {
      console.error("Failed to save content", e);
    }
  };

  const updateProject = async (project: Project) => {
    // Optimistic
    setProjects(prev => prev.map(p => p.id === project.id ? project : p));

    try {
      const { error } = await supabase
        .from('projects')
        .update({
          title: project.title,
          category: project.category,
          image_url: project.imageUrl,
          description: project.description
        })
        .eq('id', project.id);
        
      if (error) throw error;
    } catch (e) {
       console.error("Failed to update project", e);
    }
  };

  const addProject = async (project: Project) => {
    // Optimistic (temporary ID)
    setProjects(prev => [project, ...prev]);

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          title: project.title,
          category: project.category,
          image_url: project.imageUrl,
          description: project.description
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Replace temporary ID with real ID from DB
      if (data) {
        setProjects(prev => prev.map(p => p.id === project.id ? { ...p, id: data.id } : p));
      }
    } catch (e) {
      console.error("Failed to add project", e);
    }
  };

  const addArticle = async (article: Article) => {
     try {
       // Remove ID if it's a temp ID or let Supabase generate it
       const { id, ...articleData } = article;
       const { data, error } = await supabase.from('articles').insert(articleData).select().single();
       if(error) throw error;
       if(data) setArticles(prev => [data, ...prev]);
     } catch(e) { console.error("Failed to add article", e); }
  };

  const updateArticle = async (article: Article) => {
      try {
        const { error } = await supabase.from('articles').update(article).eq('id', article.id);
        if(error) throw error;
        setArticles(prev => prev.map(a => a.id === article.id ? article : a));
      } catch(e) { console.error("Failed to update article", e); }
  };

  const deleteArticle = async (id: string) => {
      try {
        const { error } = await supabase.from('articles').delete().eq('id', id);
        if(error) throw error;
        setArticles(prev => prev.filter(a => a.id !== id));
      } catch(e) { console.error("Failed to delete article", e); }
  };

  // Backward compatibility wrapper
  const saveArticles = async (arts: Article[]) => {
    setArticles(arts);
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      projects, 
      articles, 
      isAdmin, 
      isLoading, 
      language,
      login, 
      logout, 
      updateContent, 
      updateProject, 
      addProject, 
      saveArticles,
      addArticle,
      updateArticle,
      deleteArticle,
      switchLanguage
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent must be used within ContentProvider");
  return context;
};
