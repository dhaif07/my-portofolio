import type { Skill } from '@/types';

export const skills: Skill[] = [
  // Frontend
  { name: 'HTML', icon: 'HTML5', category: 'frontend', level: 85 },
  { name: 'CSS', icon: 'CSS3', category: 'frontend', level: 80 },
  { name: 'JavaScript', icon: 'JavaScript', category: 'frontend', level: 70 },
  
  // Backend
  { name: 'PHP', icon: 'PHP', category: 'backend', level: 70 },
  
  // Database
  { name: 'MySQL', icon: 'MySQL', category: 'database', level: 75 },
  
  // Design
  { name: 'Figma', icon: 'Figma', category: 'design', level: 65 },
];

export const skillCategories = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Database' },
  { key: 'design', label: 'Design' },
  { key: 'tools', label: 'Tools' },
];

export const marqueeSkills = [
  'Responsive Web Design', 'Modern JavaScript', 'Clean Code', 'REST API',
  'Website Performance', 'UI/UX Design', 'Visual Studio Code', 'Git',
  'GitHub', 'Figma', 'XAMPP', 'Chrome DevTools'
];
