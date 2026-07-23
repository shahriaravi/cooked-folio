import {
  SiExpress,
  SiFacebook,
  SiGit,
  SiGithub,
  SiJavascript,
  SiLinkedin,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiUnrealengine,
  SiX,
} from "react-icons/si";

export interface ExperienceItem {
  company: string;
  role: string;
  date: string;
  description: string;
  logo: string;
}

export interface EducationItem {
  institution: string;
  period: string;
  logo: string;
}

export interface ProjectItem {
  name: string;
  tagline: string;
  url: string;
  repo?: string;
  playstore?: string;
  image: string;
}

export const BANNER_IMAGE = "/cp.jpg";

export const RESUME_URL =
  "https://drive.google.com/file/d/1WKa36vE76iBqOAcucFTeVxGwsFmSim9g/view?usp=drive_link";
export const DISCORD_LINK = "https://discord.gg/wG9qpfvuQQ";
export const CAL_URL = "https://cal.com/shahriaravi/15m";

export const SOCIALS = [
  {
    platform: "facebook",
    url: "https://facebook.com/shahriaravi",
    icon: SiFacebook,
    color: "#1877F2",
  },
  {
    platform: "linkedin",
    url: "https://linkedin.com/in/shahriaravi",
    icon: SiLinkedin,
    color: "#0A66C2",
  },
  {
    platform: "github",
    url: "https://github.com/shahriaravi",
    icon: SiGithub,
    color: "#ffffff",
  },
  {
    platform: "x",
    url: "https://x.com/shahriaravi_",
    icon: SiX,
    color: "#ffffff",
  },
];

export const STACK = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "React Native", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express", icon: SiExpress, color: "#FFFFFF" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Unreal Engine", icon: SiUnrealengine, color: "#FFFFFF" },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Byontriq",
    role: "Founder & SWE",
    date: "2025 — Present",
    description:
      "Building Byontriq from the ground up. Designing the product, writing the code, shipping the site, and answering support in between deploys. It's chaotic, and I love every part of it.",
    logo: "/images/companies/byontriq.jpeg",
  },
  {
    company: "EXEAIO",
    role: "Project Manager",
    date: "2023 — 2024",
    description:
      "Led production and delivery at a VR game studio. Coordinated designers, developers, and artists across timezones while keeping releases predictable and the team unblocked.",
    logo: "/images/companies/exeaio.png",
  },
  {
    company: "Crisis Entertainment",
    role: "Game Ops",
    date: "2020 — 2023",
    description:
      "Handled live operations at a video game MNC. Kept servers healthy, managed community incidents, and worked closely with engineering to ship fixes without breaking the vibe of live matches.",
    logo: "/images/companies/ce.png",
  },
  {
    company: "GameExp",
    role: "Editor",
    date: "2022",
    description:
      "Wrote and edited long form gaming content across reviews, guides, and industry commentary. Learned that a good headline saves an okay article, and a bad one buries a great one.",
    logo: "/images/companies/gxp.png",
  },
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "North South University",
    period: "Dec 2025 – Dec 2029",
    logo: "/images/education/nsu.webp",
  },
  {
    institution: "Presidency University",
    period: "Jan 2025 – Aug 2025",
    logo: "/images/education/pu.webp",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    name: "Mate",
    tagline: "Private finance tracker app. No ads. Just beautiful design.",
    url: "https://mate.byontriq.dev",
    repo: "https://github.com/shahriaravi/MateApp",
    image: "/images/projects/mate.png",
  },
  {
    name: "cooked-folio",
    tagline: "A minimal, high-performance portfolio template aka this website.",
    url: "https://shahriaravi.me",
    repo: "https://github.com/shahriaravi/cooked-folio",
    image: "/avatar/avatar.png",
  },
  {
    name: "NSU Directory",
    tagline: "NSU Students - clubs, communities, resources, faculty review portal",
    url: "https://nsudirectory.xyz",
    image: "/images/projects/nsudr.ico",
  },
  {
    name: "Byontriq",
    tagline: "The central hub for our privacy-first apps and tools.",
    url: "https://byontriq.dev",
    repo: "",
    playstore: "https://play.google.com/store/apps/dev?id=6170259174823402335",
    image: "/images/projects/byontriq.png",
  },
  {
    name: "nothing-vscode-theme",
    tagline: "High-contrast VS Code theme inspired by Nothing Tech.",
    url: "https://marketplace.visualstudio.com/items?itemName=xexefe.nothing-os-theme",
    repo: "https://github.com/shahriaravi/nothing-vscode-theme",
    image: "/images/projects/nothing-theme.png",
  },
  {
    name: "Terms Buddy",
    tagline: "Browser extension that analyzes privacy policies for risks.",
    url: "https://github.com/shahriaravi/terms-buddy",
    repo: "",
    image: "/images/projects/tb.png",
  },
];