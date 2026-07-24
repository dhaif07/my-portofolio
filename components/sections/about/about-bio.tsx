'use client';

import { FadeIn } from '@/components/animations/fade-in';
import { TextReveal } from '@/components/animations/text-reveal';

export function AboutBio() {
  return (
    <div className="flex flex-col gap-8">
      <TextReveal as="h2" className="font-clash text-3xl md:text-5xl font-bold">
        Halo, saya Dhaif Muharram
      </TextReveal>

      <FadeIn delay={0.4}>
        <div className="flex flex-col gap-6 font-inter text-lg text-secondary leading-relaxed">
          <p>
            Saya mahasiswa Teknik Informatika yang memiliki minat dalam pengembangan website modern, responsif, dan mudah digunakan. Selama kurang lebih tiga tahun saya mempelajari dunia web development melalui berbagai project pribadi maupun project akademik.
          </p>
          <p>
            Saya menikmati proses mengubah sebuah ide menjadi aplikasi atau website yang dapat digunakan oleh banyak orang. Saat ini saya berfokus pada pengembangan frontend menggunakan HTML, CSS, dan JavaScript, serta mempelajari backend menggunakan PHP dan MySQL. Selain itu, saya juga menggunakan Figma untuk merancang antarmuka yang sederhana, modern, dan nyaman digunakan.
          </p>
          <p>
            Saya percaya bahwa proses belajar tidak pernah berhenti. Oleh karena itu saya terus mengembangkan kemampuan, mengikuti perkembangan teknologi, dan membangun project nyata sebagai bekal untuk berkarier sebagai Web Developer profesional.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
