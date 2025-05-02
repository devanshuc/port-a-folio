export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    bio: string;
    email: string;
    location: string;
    avatar: string;
    socialLinks: {
      github?: string;
      linkedin?: string;
      twitter?: string;
      instagram?: string;
      website?: string;
    };
  };
  skills: {
    category: string;
    items: string[];
  }[];
  experience: {
    company: string;
    position: string;
    duration: string;
    description: string;
    technologies: string[];
  }[];
  projects: {
    title: string;
    description: string;
    tags: string[];
    image?: string;
    link?: string;
    github?: string;
  }[];
  education: {
    institution: string;
    degree: string;
    duration: string;
    description?: string;
  }[];
  resume: {
    url: string;
  };
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Devanshu Chicholikar",
    title: "Software Engineer",
    bio: "Passionate software engineer with a focus on creating efficient and elegant solutions. Strong background in full-stack development with expertise in modern web technologies.",
    email: "devanshu2000@gmail.com",
    location: "San Francisco, CA",
    avatar: "/avatar.png",
    socialLinks: {
      github: "https://github.com/devanshu-73",
      linkedin: "https://linkedin.com/in/devanshu-chicholikar",
      twitter: "https://twitter.com/devanshu_73",
      website: "https://devanshu.dev",
    },
  },
  skills: [
    {
      category: "Programming Languages",
      items: ["JavaScript", "TypeScript", "Python"],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Vue.js", "HTML/CSS", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "Django"],
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS", "Docker", "Kubernetes"],
    },
    {
      category: "Databases",
      items: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
    },
  ],
  experience: [
    {
      company: "Meta",
      position: "Software Engineer Intern",
      duration: "May 2023 - Aug 2023",
      description:
        "Led development of microservices architecture, resulting in 40% improved system performance. Collaborated with cross-functional teams to implement features for Meta's social media platform.",
      technologies: ["React", "Node.js", "GraphQL", "TypeScript", "MongoDB"],
    },
    {
      company: "Amazon Web Services",
      position: "SDE Intern",
      duration: "May 2022 - Aug 2022",
      description:
        "Designed and implemented scalable backend APIs and responsive frontend interfaces. Worked on cloud infrastructure solutions for AWS customers.",
      technologies: [
        "AWS Lambda",
        "Express",
        "DynamoDB",
        "Docker",
        "CloudFormation",
      ],
    },
    {
      company: "Uber",
      position: "Software Engineering Intern",
      duration: "Jan 2022 - Apr 2022",
      description:
        "Built responsive web applications and optimized existing user interfaces. Contributed to Uber's driver platform enhancements.",
      technologies: ["JavaScript", "React", "Redux", "Node.js", "PostgreSQL"],
    },
  ],
  projects: [
    {
      title: "E-commerce Platform",
      description:
        "A full-stack e-commerce platform with payment processing, inventory management, and analytics dashboard.",
      tags: ["Next.js", "Node.js", "MongoDB", "Stripe", "AWS"],
      image: "/projects/ecommerce.png",
      link: "https://project-demo.com",
      github: "https://github.com/devanshu-73/ecommerce",
    },
    {
      title: "Real-time Chat Application",
      description:
        "A real-time messaging platform with features like group chats, file sharing, and end-to-end encryption.",
      tags: ["React", "Socket.io", "Express", "Redis", "Docker"],
      image: "/projects/chat-app.png",
      github: "https://github.com/devanshu-73/chat-app",
    },
    {
      title: "AI Content Generator",
      description:
        "An AI-powered tool that generates blog posts, social media content, and marketing copy based on user prompts.",
      tags: ["Python", "TensorFlow", "React", "FastAPI", "AWS Lambda"],
      image: "/projects/ai-generator.png",
      link: "https://ai-content-gen.com",
    },
    {
      title: "Personal Finance Dashboard",
      description:
        "A dashboard for tracking expenses, investments, and financial goals with visualization and predictive analytics.",
      tags: ["Vue.js", "D3.js", "Node.js", "PostgreSQL", "Auth0"],
      image: "/projects/finance-dashboard.png",
      github: "https://github.com/devanshu-73/finance-dashboard",
    },
  ],
  education: [
    {
      institution: "Stanford University",
      degree: "Master of Science in Computer Science",
      duration: "2020 - 2022",
      description: "Specialized in Machine Learning and Distributed Systems",
    },
    {
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      duration: "2016 - 2020",
      description: "Dean's List, 3.9/4.0 GPA",
    },
  ],
  resume: {
    url: "/Devanshu Chicholikar Resume.pdf",
  },
};
