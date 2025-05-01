import { create } from "zustand";
import { Project, Skill, Experience, Education, ViewMode } from "../types";
import {
  projectsData,
  skillsData,
  experienceData,
  educationData,
} from "./data";

interface Store {
  // UI State
  activeComponent: string | null;
  hoveredComponent: string | null;
  viewMode: ViewMode;
  isCodeViewActive: boolean;
  isMobileView: boolean;

  // Data
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: Education[];

  // Actions
  setActiveComponent: (id: string | null) => void;
  setHoveredComponent: (id: string | null) => void;
  setViewMode: (mode: ViewMode) => void;
  toggleCodeView: () => void;
  setMobileView: (isMobile: boolean) => void;

  // Helper selectors
  getActiveProject: () => Project | undefined;
  getActiveSkill: () => Skill | undefined;
  getActiveExperience: () => Experience | undefined;
  getActiveEducation: () => Education | undefined;
}

export const useStore = create<Store>((set, get) => ({
  // Initialize state with default values
  activeComponent: null,
  hoveredComponent: null,
  viewMode: "orbital",
  isCodeViewActive: false,
  isMobileView: false,

  projects: projectsData,
  skills: skillsData,
  experiences: experienceData,
  education: educationData,

  // Define actions
  setActiveComponent: (id) => set({ activeComponent: id }),
  setHoveredComponent: (id) => set({ hoveredComponent: id }),
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleCodeView: () =>
    set((state) => ({ isCodeViewActive: !state.isCodeViewActive })),
  setMobileView: (isMobile) => set({ isMobileView: isMobile }),

  // Helper selectors
  getActiveProject: () => {
    const { projects, activeComponent } = get();
    return projects.find((p) => p.id === activeComponent);
  },
  getActiveSkill: () => {
    const { skills, activeComponent } = get();
    return skills.find((s) => s.id === activeComponent);
  },
  getActiveExperience: () => {
    const { experiences, activeComponent } = get();
    return experiences.find((e) => e.id === activeComponent);
  },
  getActiveEducation: () => {
    const { education, activeComponent } = get();
    return education.find((e) => e.id === activeComponent);
  },
}));
