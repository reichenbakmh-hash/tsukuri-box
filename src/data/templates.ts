export type Template = {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  preview?: string;
  demo?: string;
  github: string;
  license?: string;
  featured?: boolean;
};

export const templates: Template[] = [
  {
    id: "open-react",
    title: "Open React",
    description:
      "Landing page open source orientée SaaS, produits web et projets open source.",
    category: "Landing Page",
    tags: [
      "React",
      "Vite",
      "Tailwind CSS"
    ],
    demo: "https://open.cruip.com/",
    github: "https://github.com/cruip/open-react-template",
    license: "MIT",
    featured: true
  },

  {
    id: "react-portfolio",
    title: "React Portfolio",
    description:
      "Portfolio développeur responsive avec sections projets, compétences et parcours.",
    category: "Portfolio",
    tags: [
      "React",
      "TypeScript",
      "SCSS"
    ],
    github:
      "https://github.com/yujisatojr/react-portfolio-template",
    license: "Open source"
  },

  {
    id: "shadcn-dashboard",
    title: "shadcn Dashboard",
    description:
      "Dashboard moderne basé sur React, TypeScript, Tailwind et des composants réutilisables.",
    category: "Dashboard",
    tags: [
      "React",
      "Vite",
      "TypeScript",
      "Tailwind"
    ],
    demo:
      "https://www.shadcndashboard.dev/",
    github:
      "https://github.com/shadcndashboard/shadcndashboard",
    license: "Open source"
  },

  {
    id: "vite-react-starter",
    title: "Vite React Starter",
    description:
      "Starter React + Vite destiné aux projets web modernes avec Tailwind et outils de test.",
    category: "Starter",
    tags: [
      "React",
      "Vite",
      "Tailwind",
      "Vitest"
    ],
    github:
      "https://github.com/riipandi/vite-react-template",
    license: "MIT / Apache-2.0"
  },

  {
    id: "volt-react",
    title: "Volt React",
    description:
      "Dashboard open source basé sur React et Bootstrap avec plusieurs composants prêts à utiliser.",
    category: "Dashboard",
    tags: [
      "React",
      "Bootstrap",
      "Charts"
    ],
    github:
      "https://github.com/themesberg/volt-react-dashboard",
    license: "Open source"
  },

  {
    id: "my-template",
    title: "Mon nouveau template",
    description:
      "Une courte description du projet.",
    category: "Landing Page",
    tags: [
      "React",
      "Vite",
      "CSS"
    ],
    preview:
      "https://mon-site.com/image.jpg",
    demo:
      "https://mon-site.com",
    github:
      "https://github.com/moi/mon-template",
    license: "À vérifier"
  }
];
