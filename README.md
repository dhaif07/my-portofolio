# Personal Portfolio

A premium, high-performance personal portfolio built for modern web standards. Features fluid animations, a 7-layer parallax background, and seamless glassmorphism components.

## 🚀 Technologies

* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion & GSAP (Lenis for smooth scrolling)
* **Icons:** Lucide React
* **Type Checking:** TypeScript
* **Deployment:** Vercel (Recommended)

## 🌟 Key Features

* **Advanced Animations:** Custom Lenis smooth scrolling, orchestrated Framer Motion page reveals, and high-performance CSS keyframes.
* **Premium Aesthetics:** Glassmorphism UI cards, gradient glowing buttons, and dynamic hover effects.
* **SEO Optimized:** Automatic sitemap, robots.txt, dynamic OpenGraph & Twitter cards.
* **Responsive Design:** Fluid typography and layout scaling across all devices.
* **Content Management:** Fully typed TypeScript data structures (`/data`) for easy content updates.

## 📦 Project Structure

```
├── app/                  # Next.js App Router (Pages, Layouts, SEO)
├── components/           # React Components
│   ├── layout/           # Global Layouts (Navbar, Footer, Cursor)
│   ├── sections/         # Page Sections (Hero, Projects, Contact, etc.)
│   └── ui/               # Reusable UI Elements (Buttons, Cards, Inputs)
├── config/               # Global configuration (Site details, URLs)
├── data/                 # Typed Content Data (Experience, Projects, etc.)
├── hooks/                # Custom React Hooks
├── providers/            # Context Providers (Theme, Scroll)
├── types/                # TypeScript Interfaces
└── utils/                # Helper Functions
```

## 🛠️ Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Customization

All personal information and content can be easily updated in the `config/` and `data/` directories:
* `config/site.ts`: Update your name, email, social links, and basic SEO info.
* `data/*.ts`: Update your projects, work experience, skills, and testimonials.

## ✅ Verification & Build

To ensure code quality and build for production:

```bash
npm run typecheck
npm run lint
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
