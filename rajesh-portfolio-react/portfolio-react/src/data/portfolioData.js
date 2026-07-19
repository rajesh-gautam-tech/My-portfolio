// ────────────────────────────────────────────────────────────
// ALL PORTFOLIO CONTENT LIVES HERE.
// Edit this file to update any text/info shown on the site —
// no need to touch any component.
// ────────────────────────────────────────────────────────────

export const brand = {
  initials: "RKG",
  fullName: "RAJESH KUMAR GAUTAM",
  tagline: "VIT Student · Full-Stack Developer · AI/ML Enthusiast",
  year: 2026,
};

export const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "CONTACT", href: "#contact" },
];

export const aboutStats = [
  { value: "3rd Year", label: "Timeline" },
  { value: "B.Tech", label: "CSE Core" },
  { value: "VIT", label: "University" },
  { value: "AI/ML + Web", label: "Focus" },
];

export const aboutParagraphs = [
  {
    html: 'Hey, I\'m <strong>Rajesh Kumar Gautam</strong> — a driven 3rd year Computer Science Engineering student specialized in <strong>CSE Core at VIT University</strong>.',
  },
  {
    html: "I operate at the intersection of production-grade Web Architecture and practical Deep Learning. My development philosophy centers on engineering clean, modular frontends tightly integrated with robust backend APIs, and deploying optimization layers on edge devices.",
  },
  {
    html: "Whether calculating real-time matrix transformations for UI visuals or streamlining neural network inferences, I focus on building high-performance solutions that are fast, accessible, and mathematically precise.",
  },
];

export const aboutQuote =
  "I systematically construct robust systems, run deep computational diagnostics, fix structural edge cases — and evolve with every stack execution.";

export const projects = [
  {
    id: "01",
    icon: "👁️‍🗨️",
    title: "Smart Surveillance System (AI/ML Platform)",
    description:
      "Developed a real-time AI-powered surveillance system using TensorFlow, OpenCV, and MediaPipe to perform face recognition, suspicious activity detection, and vehicle speed monitoring with 85%+ accuracy. Optimized deep learning inference for edge devices, reducing latency by 40% while maintaining solid 30+ FPS performance benchmarks.",
    tags: ["TensorFlow", "OpenCV", "MediaPipe", "Python", "Edge AI"],
    sourceUrl: "https://github.com/rajesh-gautam-tech",
    liveLabel: "↗ Architecture",
    sourceLabel: "⌥ Code Base",
    liveUrl: "#",
  },
  {
    id: "02",
    icon: "🌐",
    title: "Cyber-Mesh — Full-Stack Portal",
    description:
      "Engineered a multi-tiered reactive web layout featuring state orchestration, async API gateways, and custom database indices. Integrated real-time data push mechanisms with web-token secure authentication, optimized to handle concurrency smoothly.",
    tags: ["React.js", "Node.js", "Express", "MongoDB", "Websockets"],
    sourceUrl: "https://github.com/rajesh-gautam-tech",
    liveLabel: "↗ Live Engine",
    sourceLabel: "⌥ Source",
    liveUrl: "#",
  },
];

export const technicalSkills = [
  { name: "Full-Stack Development (React / Node.js)", percent: 85 },
  { name: "AI / ML Inference (TensorFlow & OpenCV)", percent: 80 },
  { name: "Database Architecture & Systems (MongoDB / SQL)", percent: 75 },
];

export const techStack = [
  "React.js",
  "Node.js",
  "Python",
  "TensorFlow",
  "OpenCV",
  "MongoDB",
];

export const education = [
  {
    date: "2023 — Present",
    role: "B.Tech — Computer Science & Engineering (Core)",
    org: "VIT University",
    description:
      "Core specialization covering Advanced Data Structures & Algorithms, Database Management Engines, Operating System Core Architecture, and Neural Network Inferences.",
  },
];

export const contactIntro = {
  html: "Open to <strong>Internships, System Collaborations, and Engineering positions.</strong>",
};

export const contactLinks = [
  {
    icon: "✉",
    label: "Email Endpoint",
    value: "rg14262004@gmail.com",
    href: "mailto:rg14262004@gmail.com",
  },
  {
    icon: "📞",
    label: "Secure Line",
    value: "+91 9560921809",
    href: "tel:+919560921809",
  },
  {
    icon: "🐙",
    label: "GitHub",
    value: "rajesh-gautam-tech",
    href: "https://github.com/rajesh-gautam-tech",
  },
  {
    icon: "🌐",
    label: "LinkedIn",
    value: "rajesh-kumar-gautam-b29aa2344",
    href: "https://www.linkedin.com/in/rajesh-kumar-gautam-b29aa2344",
  },
];

export const footerText = `© ${brand.year} ${brand.fullName.replace(
  /\b\w/g,
  (c) => c
)} | VIT CSE Core Mainframe`;
