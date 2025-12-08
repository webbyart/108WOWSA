import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, Project } from '../types';
import { DEFAULT_CONTENT, MOCK_PROJECTS, GOOGLE_SCRIPT_URL } from '../constants';

export type Language = 'th' | 'en';

interface ContentContextType {
  content: SiteContent;
  projects: Project[];
  isAdmin: boolean;
  isLoading: boolean;
  language: Language;
  login: (token: string) => void;
  logout: () => void;
  updateContent: (key: string, value: string) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  switchLanguage: (lang: Language) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>('th');

  // Initial Fetch (Simulated if no URL provided)
  useEffect(() => {
    const fetchData = async () => {
      if (GOOGLE_SCRIPT_URL === "REPLACE_WITH_YOUR_DEPLOYED_GOOGLE_SCRIPT_URL") {
        console.warn("GAS URL not configured. Using default data.");
        return;
      }
      
      try {
        setIsLoading(true);
        // Fetch Content
        const resContent = await fetch(`${GOOGLE_SCRIPT_URL}?action=getContent`);
        const jsonContent = await resContent.json();
        if (jsonContent.status === 'success') {
          setContent(prev => ({ ...prev, ...jsonContent.data }));
        }

        // Fetch Projects
        const resProjects = await fetch(`${GOOGLE_SCRIPT_URL}?action=getProjects`);
        const jsonProjects = await resProjects.json();
        if (jsonProjects.status === 'success') {
          setProjects(jsonProjects.data);
        }
      } catch (e) {
        console.error("Failed to fetch data", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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

    if (GOOGLE_SCRIPT_URL !== "REPLACE_WITH_YOUR_DEPLOYED_GOOGLE_SCRIPT_URL") {
       try {
         await fetch(GOOGLE_SCRIPT_URL, {
           method: 'POST',
           body: JSON.stringify({ action: 'updateContent', key, value })
         });
       } catch (e) {
         console.error("Failed to save content", e);
         alert("Failed to save changes to server.");
       }
    }
  };

  const updateProject = async (project: Project) => {
    // Simplified: Just local state update for this demo as GAS implementation for array is complex
    setProjects(prev => prev.map(p => p.id === project.id ? project : p));
  };

  return (
    <ContentContext.Provider value={{ content, projects, isAdmin, isLoading, login, logout, updateContent, updateProject, language, switchLanguage }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent must be used within ContentProvider");
  return context;
};