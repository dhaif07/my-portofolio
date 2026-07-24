export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'UI/UX' | 'Full Stack' | 'Animation' | 'Real Client Project';
  role?: string;
  timeline?: string;
  features?: string[];
  challenges?: string;
  solutions?: string;
  result?: string;
  lessonsLearned?: string;
  link?: string;
  github?: string;
  featured: boolean;
  year: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
  level: number;
}

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'mobile'
  | 'tools'
  | 'design';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Statistic {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}


export interface Education {
  id: string;
  university: string;
  major: string;
  period: string;
  location: string;
  courses: string[];
  achievements: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
