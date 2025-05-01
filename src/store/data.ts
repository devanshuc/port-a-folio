import { Project, Skill, Experience, Education } from "../types";

// Project Data
export const projectsData: Project[] = [
  {
    id: "securescale",
    title: "SecureScale",
    description:
      "Cloud infrastructure automation platform with security-first approach",
    technologies: ["AWS", "Terraform", "TypeScript", "React", "Node.js"],
    githubUrl: "https://github.com/yourusername/securescale",
    demoUrl: "https://securescale.demo",
    highlights: [
      "Automated infrastructure provisioning with security best practices",
      "Real-time monitoring and alerting system",
      "Cost optimization recommendations",
      "Compliance verification for multiple standards",
    ],
    category: "cloud",
  },
  {
    id: "gohaul",
    title: "GoHaul",
    description:
      "Vehicle rental and logistics platform with real-time tracking",
    technologies: ["React", "MongoDB", "Express", "Node.js", "Socket.io"],
    githubUrl: "https://github.com/yourusername/gohaul",
    demoUrl: "https://gohaul.demo",
    highlights: [
      "Real-time vehicle tracking and status updates",
      "Automated dispatch system",
      "Payment processing and invoicing",
      "Customer feedback and rating system",
    ],
    category: "fullstack",
  },
  {
    id: "jakshenterprise",
    title: "Jaksh Enterprise",
    description: "Enterprise resource planning system for small businesses",
    technologies: ["MERN Stack", "GraphQL", "Redux", "Material UI"],
    githubUrl: "https://github.com/yourusername/jakshenterprise",
    demoUrl: "https://jakshenterprise.demo",
    highlights: [
      "Comprehensive inventory management",
      "Employee scheduling and time tracking",
      "Financial reporting and forecasting",
      "Customer relationship management",
    ],
    category: "fullstack",
  },
];

// Skills Data
export const skillsData: Skill[] = [
  {
    id: "aws",
    name: "AWS",
    proficiency: 9,
    category: "cloud",
    description:
      "Designing and implementing scalable, secure cloud infrastructure",
    yearsOfExperience: 3,
    relatedProjects: ["securescale"],
  },
  {
    id: "terraform",
    name: "Terraform",
    proficiency: 8,
    category: "devops",
    description: "Infrastructure as Code for multi-cloud environments",
    yearsOfExperience: 2,
    relatedProjects: ["securescale"],
  },
  {
    id: "react",
    name: "React",
    proficiency: 9,
    category: "frontend",
    description:
      "Building interactive user interfaces with React and related libraries",
    yearsOfExperience: 4,
    relatedProjects: ["securescale", "gohaul", "jakshenterprise"],
  },
  {
    id: "nodejs",
    name: "Node.js",
    proficiency: 8,
    category: "backend",
    description: "Server-side JavaScript for web applications and APIs",
    yearsOfExperience: 3,
    relatedProjects: ["securescale", "gohaul", "jakshenterprise"],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    proficiency: 7,
    category: "database",
    description: "NoSQL database design and optimization",
    yearsOfExperience: 3,
    relatedProjects: ["gohaul", "jakshenterprise"],
  },
];

// Experience Data
export const experienceData: Experience[] = [
  {
    id: "pitney",
    company: "Pitney Bowes",
    role: "Software Engineer",
    startDate: "2021-06-01",
    endDate: null,
    description: "Developing cloud infrastructure and automation solutions",
    achievements: [
      "Reduced deployment time by 70% through automation",
      "Implemented security best practices that improved compliance score by 35%",
      "Designed scalable architecture that handles 3x previous traffic volume",
    ],
    technologies: ["AWS", "Terraform", "Python", "JavaScript", "Docker"],
  },
  {
    id: "jaksh",
    company: "Jaksh Enterprise",
    role: "Full Stack Developer",
    startDate: "2019-05-01",
    endDate: "2021-05-30",
    description:
      "Built enterprise resource planning software for small businesses",
    achievements: [
      "Developed complete MERN stack application from concept to production",
      "Implemented real-time data synchronization across clients",
      "Created custom reporting module that became a key selling feature",
    ],
    technologies: ["MongoDB", "Express", "React", "Node.js", "GraphQL"],
  },
];

// Education Data
export const educationData: Education[] = [
  {
    id: "northeastern",
    institution: "Northeastern University",
    degree: "Master of Science",
    field: "Computer Science",
    startDate: "2022-09-01",
    endDate: "2024-05-15",
    description: "Specialized in cloud computing and distributed systems",
    achievements: [
      "GPA: 3.8/4.0",
      "Selected for cloud computing research team",
      "Published paper on efficient resource allocation in cloud environments",
    ],
  },
  {
    id: "daiict",
    institution: "Dhirubhai Ambani Institute",
    degree: "Bachelor of Technology",
    field: "Information and Communication Technology",
    startDate: "2015-08-01",
    endDate: "2019-05-30",
    description:
      "Built a strong foundation in computer science and communications",
    achievements: [
      "Graduated with distinction",
      "Led team to win national hackathon",
      "Completed capstone project on IoT security",
    ],
  },
];
