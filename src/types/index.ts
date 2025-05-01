// View mode types
export type ViewMode = "orbital" | "firstPerson" | "guided";

// Project type
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  highlights: string[];
  category: "frontend" | "backend" | "fullstack" | "cloud";
}

// Skill type
export interface Skill {
  id: string;
  name: string;
  proficiency: number; // 1-10
  category: "frontend" | "backend" | "cloud" | "devops" | "database" | "other";
  description: string;
  yearsOfExperience: number;
  relatedProjects: string[]; // Project IDs
}

// Experience type
export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null; // null means current position
  description: string;
  achievements: string[];
  technologies: string[];
}

// Education type
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
}

// AWS Component types
export interface AWSComponentProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  onClick?: () => void;
}

export interface VPCProps extends AWSComponentProps {
  subnets?: number;
}

export interface EC2Props extends AWSComponentProps {
  project: Project;
}

export interface LambdaProps extends AWSComponentProps {
  skill: Skill;
}

export interface S3Props extends AWSComponentProps {
  education: Education;
}

export interface RDSProps extends AWSComponentProps {
  experience: Experience;
}

export interface CloudWatchProps extends AWSComponentProps {
  metrics: {
    name: string;
    value: number;
    maxValue: number;
  }[];
}

export interface ApiGatewayProps extends AWSComponentProps {
  contactInfo: {
    email: string;
    linkedin: string;
    github: string;
  };
}

export interface Route53Props extends AWSComponentProps {
  routes: {
    name: string;
    path: string;
  }[];
}
