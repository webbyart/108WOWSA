
export interface SiteContent {
  [key: string]: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface Article {
  id: string;
  image: string;
  title: string;
  title_en?: string;
  excerpt: string;
  excerpt_en?: string;
  details?: string;
  details_en?: string;
}

export interface User {
  email: string;
  token: string;
}

export enum PageType {
  HOME = 'home',
  SERVICES = 'services',
  EQUIPMENT = 'equipment',
  PROJECTS = 'projects',
  ABOUT = 'about',
  KNOWLEDGE = 'knowledge',
  CONTACT = 'contact'
}
