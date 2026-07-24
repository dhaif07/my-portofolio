import type { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'responsive-website',
    title: 'Responsive Website Development',
    description: 'Membuat website responsif yang tampil optimal di berbagai perangkat.',
    icon: 'Code2',
    features: [
      'Landing Page Development',
      'Company Profile Website',
      'Modern & Interactive UI',
    ],
  },
  {
    id: 'php-webapp',
    title: 'Basic PHP Web Application',
    description: 'Pengembangan aplikasi web sederhana menggunakan PHP dan MySQL.',
    icon: 'Server',
    features: [
      'Basic PHP Web Application',
      'MySQL Database Design',
      'CRUD Operations',
    ],
  },
  {
    id: 'ui-design',
    title: 'UI Design with Figma',
    description: 'Merancang antarmuka pengguna yang menarik, modern, dan mudah digunakan.',
    icon: 'PenTool',
    features: [
      'UI Design with Figma',
      'Wireframing',
      'Prototyping',
    ],
  },
];
