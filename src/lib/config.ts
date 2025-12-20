import {
  SiFacebook,
  SiFirebase,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiExpress,
  SiGit,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
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
  logo: string;
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

export const BANNER_IMAGE = "https://cdn.discordapp.com/attachments/1346582212983918642/1449929873643536446/IMG_20250915_175942771.jpg?ex=6940afec&is=693f5e6c&hm=c9c6fb703d01193df0a555a5e5bd29f41db98665161eea43e4c7a68c24a4c365&";

// External Links
export const RESUME_URL = "https://drive.google.com/file/d/1WKa36vE76iBqOAcucFTeVxGwsFmSim9g/view?usp=drive_link";
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

// =================================================================================
// 5. EXPERIENCE
// =================================================================================

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Byontriq",
    role: "Founder & SWE",
    date: "2025 - Present",
    description: "Building modern, minimal web & mobile apps.",
    logo: "/logos/byontriq.png", 
  },
  {
    company: "EXEAIO",
    role: "Project Manager",
    date: "2023 - 2024",
    description: "Led projects at a VR game studio.",
    logo: "/images/companies/exeaio.png",
  },
  {
    company: "Crisis Entertainment",
    role: "Game Ops",
    date: "2020 - 2023",
    description: "Handled live operations at a video game development MNC.",
    logo: "/images/companies/ce.png",
  },
  {
    company: "GameExp",
    role: "Editor",
    date: "2022",
    description: "Wrote and edited content about all things gaming.",
    logo: "/images/companies/gxp.png",
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
    tagline: "A minimal, high-performance portfolio template aka this website.",
    url: "https://avi.byontriq.xyz",
    repo: "https://github.com/shahriaravi/cooked-folio",
    image: "/avatar/avatar.png",
  },
  {
    name: "Mate",
    tagline: "Private finance tracker app. No ads. Just beautiful design.",
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
