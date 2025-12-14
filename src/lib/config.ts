import {
  SiFacebook,
  SiFirebase,
  SiGit,
  SiGithub,
  SiInstagram,
  SiJavascript,
  SiLinkedin,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiUnrealengine,
  SiX,
} from "react-icons/si";

// =================================================================================
// 1. TYPES & INTERFACES
// =================================================================================

export interface ExperienceItem {
  company: string;
  role: string;
  date: string;
  description: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  logo: string;
}

export interface ProjectItem {
  name: string;
  tagline: string;
  url: string;
  repo?: string;
  image: string;
}

// =================================================================================
// 2. PERSONAL DETAILS & LINKS
// =================================================================================

export const BANNER_IMAGE = "https://images.unsplash.com/photo-1764377848067-aefbce306f80";

// External Links
export const RESUME_URL = "";
export const DISCORD_LINK = "https://discord.gg/gWRxxKcWDZ";
export const CAL_URL = "https://cal.com/shahriaravi/15m";
export const FIVERR_URL = "https://www.fiverr.com/shahriaravi/develop-a-high-performance-custom-website-with-modern-design";

// =================================================================================
// 3. SOCIAL MEDIA
// =================================================================================

export const SOCIALS = [
  { 
    platform: "facebook", 
    url: "https://facebook.com/shahriaravi", 
    icon: SiFacebook, 
    color: "#1877F2" 
  },
  { 
    platform: "instagram", 
    url: "https://instagram.com/shahriaravi_", 
    icon: SiInstagram, 
    color: "#E1306C" 
  },
  { 
    platform: "linkedin", 
    url: "https://linkedin.com/in/shahriaravi", 
    icon: SiLinkedin, 
    color: "#0A66C2" 
  },
  { 
    platform: "github", 
    url: "https://github.com/shahriaravi", 
    icon: SiGithub, 
    color: "#ffffff" 
  },
  { 
    platform: "x", 
    url: "https://x.com/shahriaravi_", 
    icon: SiX, 
    color: "#ffffff" 
  },
];

// =================================================================================
// 4. TECH STACK
// =================================================================================

export const STACK = [
  { name: "javascript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "typescript", icon: SiTypescript, color: "#3178C6" },
  { name: "react", icon: SiReact, color: "#61DAFB" },
  { name: "nextjs", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "python", icon: SiPython, color: "#3776AB" },
  { name: "nodejs", icon: SiNodedotjs, color: "#339933" },
  { name: "tailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "unreal engine", icon: SiUnrealengine, color: "#FFFFFF" },
  { name: "firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "react native", icon: SiReact, color: "#61DAFB" },
  { name: "git", icon: SiGit, color: "#F05032" },
];

// =================================================================================
// 5. EXPERIENCE
// =================================================================================

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Byontriq",
    role: "Founder & SWE",
    date: "2025 - Eternity",
    description:
      "Building modern, minimal web & mobile apps that people actually use. My dream startup, powered by caffeine and chaos.",
  },
  {
    company: "EXEAIO",
    role: "Project Manager",
    date: "2023 - 2024",
    description:
      "Led projects at a VR game studio. Shipped features, wrangled timelines, and tried not to break builds before demos.",
  },
  {
    company: "Crisis Entertainment",
    role: "Game Ops",
    date: "2020 - 2023",
    description:
      "Handled live operations at a video game development & publishing MNC. Events, player experience, and firefighting.",
  },
  {
    company: "GameExp",
    role: "Editor",
    date: "2022",
    description:
      "Wrote and edited content about all things gaming — reviews, features, and deep dives into game design.",
  },
];

// =================================================================================
// 6. EDUCATION
// =================================================================================

export const EDUCATION: EducationItem[] = [
  {
    institution: "North South University",
    degree: "Bachelor of Science – Biochemistry and Biotechnology",
    period: "Dec 2025 – Dec 2029",
    logo: "/images/education/nsu.webp",
  },
  {
    institution: "Presidency University",
    degree: "Bachelor of Science – Computer Science and Engineering",
    period: "Jan 2025 – Aug 2025",
    logo: "/images/education/pu.webp",
  },
];

// =================================================================================
// 7. PROJECTS
// =================================================================================

export const PROJECTS: ProjectItem[] = [
   {
    name: "cooked-folio",
    tagline: "A minimal, high-performance portfolio template aka .",
    url: "https://avi.byontriq.xyz",
    repo: "https://github.com/shahriaravi/cooked-portfolio",
    image: "/avatar/avatar.png",
  },
  {
    name: "Mate",
    tagline: "Private finance tracker. No cloud. Just beautiful design.",
    url: "https://mate.byontriq.xyz",
    repo: "https://github.com/shahriaravi/MateApp",
    image: "/images/projects/mate.png",
  },
  {
    name: "Byontriq",
    tagline: "The central hub for our privacy-first apps and tools.",
    url: "https://byontriq.xyz",
    repo: "",
    image: "/images/projects/byontriq.svg",
  },
  {
    name: "Terms Buddy",
    tagline: "Browser extension that analyzes privacy policies for risks.",
    url: "https://github.com/shahriaravi/terms-buddy",
    repo: "",
    image: "/images/projects/tb.png",
  },
  {
    name: "nothing-vscode-theme",
    tagline: "High-contrast VS Code theme inspired by Nothing Tech.",
    url: "https://marketplace.visualstudio.com/items?itemName=xexefe.nothing-os-theme",
    repo: "https://github.com/shahriaravi/nothing-vscode-theme",
    image: "/images/projects/nothing-theme.png",
  },
];