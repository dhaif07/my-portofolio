import type { Certificate } from '@/types';

export const certificatesData: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Google Cloud Certified - Professional Cloud Architect',
    issuer: 'Google',
    date: 'Oct 2023',
    image: '/certificates/gcp-architect.jpg',
    credentialUrl: 'https://google.com/certification',
  },
  {
    id: 'cert-2',
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta (Coursera)',
    date: 'May 2023',
    image: '/certificates/meta-frontend.jpg',
    credentialUrl: 'https://coursera.org/verify',
  },
  {
    id: 'cert-3',
    title: 'AWS Certified Developer – Associate',
    issuer: 'Amazon Web Services',
    date: 'Dec 2022',
    image: '/certificates/aws-developer.jpg',
    credentialUrl: 'https://aws.amazon.com/certification',
  },
  {
    id: 'cert-4',
    title: 'Advanced React and GraphQL',
    issuer: 'Wes Bos',
    date: 'Mar 2022',
    image: '/certificates/advanced-react.jpg',
  },
];
