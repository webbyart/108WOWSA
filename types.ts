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

export interface User {
  email: string;
  token: string;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
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