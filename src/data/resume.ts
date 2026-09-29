export const profile = {
  name: "Aastha Shrivastava",
  firstName: "Aastha",
  title: "Frontend Developer",
  roles: ["Frontend Developer", "React.js Developer", "Next.js Developer", "React Native Developer"],
  location: "Pune, Maharashtra",
  phone: "+91 7509640660",
  email: "ash.shri982@gmail.com",
  linkedin: "https://linkedin.com/in/aastha-shrivastava-48200a2a8",
  github: "https://github.com/ash-1504",
  summary:
    "Frontend Developer with 1 year of full-time industry experience building web and cross-platform mobile applications using React.js, Next.js and React Native. I've developed frontend modules for an in-house ERP system and a booking management app, integrating secured REST APIs with token-based authentication, and independently built the complete frontend of a role-based task management application.",
  available: "Available to join immediately",
};

export const stats = [
  { value: 1, suffix: "+", label: "Year of industry experience" },
  { value: 3, suffix: "", label: "Production-grade projects" },
  { value: 2, suffix: "", label: "Platforms — web & mobile" },
  { value: 20, suffix: "+", label: "Tools & technologies" },
];

export const skillGroups = [
  {
    title: "Languages",
    icon: "code",
    items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "SQL (Basic)"],
  },
  {
    title: "Frontend",
    icon: "layers",
    items: ["React.js", "Next.js", "Redux Toolkit", "Tailwind CSS", "Material UI", "GSAP"],
  },
  {
    title: "Mobile",
    icon: "phone",
    items: ["React Native", "StyleSheet API", "Cross-platform Apps"],
  },
  {
    title: "Core Concepts",
    icon: "cpu",
    items: [
      "REST API Integration",
      "Token-based Auth",
      "Component Architecture",
      "State Management",
      "Responsive Design",
      "Flexbox & CSS Grid",
      "Cross-browser Compatibility",
    ],
  },
  {
    title: "Tools",
    icon: "wrench",
    items: ["Git", "GitHub", "VS Code", "Postman", "Figma", "npm", "Vercel", "Netlify", "Prisma Studio"],
  },
  {
    title: "Practices",
    icon: "users",
    items: ["Agile", "Git Branching", "Code Reviews", "Debugging", "Functional Testing"],
  },
] as const;

export const marquee = [
  "React.js",
  "Next.js",
  "React Native",
  "TypeScript",
  "Tailwind CSS",
  "Redux Toolkit",
  "Material UI",
  "GSAP",
  "REST APIs",
  "Figma",
  "Git",
  "Postman",
];

export const experience = [
  {
    role: "Frontend Developer",
    company: "Omega Computers and Services",
    location: "Pune",
    period: "Aug 2025 – Aug 2026",
    points: [
      "Built and maintained frontend modules for in-house business applications using React.js, Next.js and React Native, working in a development team across web and mobile platforms.",
      "Integrated frontend screens with backend REST APIs, implementing token-based authentication, request handling, and loading and error states.",
      "Developed responsive, reusable UI components using Tailwind CSS for web and StyleSheet.create() for React Native, keeping the interface consistent across modules.",
      "Tested API integrations using Postman and debugged issues across web and mobile modules before release to the team.",
      "Worked in an Agile environment with backend developers and team leads, using Git branching and code reviews to deliver features against evolving requirements.",
    ],
    tags: ["React.js", "Next.js", "React Native", "Tailwind CSS", "REST APIs", "Postman"],
  },
];

export const projects = [
  {
    title: "In-House ERP System",
    kind: "Team Project",
    platform: "Web",
    description:
      "Responsive frontend modules powering core ERP business workflows — data-driven views, tables and forms wired to REST APIs.",
    points: [
      "Developed responsive frontend modules supporting core ERP business workflows as part of the frontend team.",
      "Connected modules to REST APIs to render data-driven views, tables and forms.",
      "Improved usability of existing screens through iterative UI enhancements based on team and user feedback.",
    ],
    tags: ["Next.js", "Tailwind CSS", "REST APIs"],
    accent: "from-violet-500 to-fuchsia-500",
    visual: "dashboard",
  },
  {
    title: "Booking Management System",
    kind: "Team Project",
    platform: "Mobile App",
    description:
      "Cross-platform mobile app for booking workflows and front-desk status tracking, secured with token-based authentication.",
    points: [
      "Built cross-platform mobile screens for booking workflows and front-desk status tracking.",
      "Integrated secured REST APIs using authentication tokens for protected access to booking data.",
      "Created consistent, maintainable layouts using React Native StyleSheet.create().",
      "Validated end-to-end API flows, including login, token handling and booking operations.",
    ],
    tags: ["React Native", "StyleSheet API", "REST APIs"],
    accent: "from-cyan-400 to-blue-500",
    visual: "mobile",
  },
  {
    title: "Task Management Application",
    kind: "Solo Frontend",
    platform: "Web",
    description:
      "Role-based task manager for managers and employees — designed and built end-to-end, from information architecture to final UI.",
    points: [
      "Independently designed and developed the complete frontend, from information architecture and user flows to the final UI.",
      "Implemented role-based manager and employee workflows for task creation, assignment and status tracking.",
      "Studied workflow patterns from tools such as ClickUp and Asana to design an intuitive user experience.",
      "Built a responsive, component-based interface with client-side persistence using local storage.",
    ],
    tags: ["Next.js", "Tailwind CSS", "Local Storage"],
    accent: "from-emerald-400 to-teal-500",
    visual: "kanban",
  },
] as const;

export const education = [
  {
    degree: "B.Tech, Computer Science and Engineering (AI & ML)",
    school: "Gyan Ganga Institute of Technology & Sciences, Jabalpur",
    year: "2025",
    score: "CGPA: 7.2",
  },
  {
    degree: "Class XII (PCM), CBSE",
    school: "Army Public School GRC No. 1, Jabalpur",
    year: "2021",
    score: "72%",
  },
  {
    degree: "Class X, CBSE",
    school: "Army Public School GRC No. 1, Jabalpur",
    year: "2019",
    score: "84%",
  },
];

export const currently = "Preparing for GATE (Computer Science) alongside an active job search.";

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];
