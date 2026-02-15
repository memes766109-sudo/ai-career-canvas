export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolioLink?: string;
}

export interface Education {
  degree: string;
  college: string;
  gradYear: string;
  cgpa: string;
}

export interface Project {
  id: string;
  title: string;
  problem: string;
  techStack: string;
  contributions: string;
  outcome: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface WizardData {
  personalDetails: PersonalDetails;
  education: Education;
  targetRole: string;
  skills: {
    languages: string;
    mlSkills: string;
    tools: string;
    frameworks: string;
    databases: string;
  };
  projects: Project[];
  experiences: Experience[];
  certifications: string;
  documentType: "resume" | "portfolio" | "both";
  resumeTemplate: string;
  portfolioTemplate: string;
}

export const AI_ROLES = [
  "AI Engineer",
  "ML Engineer",
  "Data Scientist",
  "GenAI Developer",
  "NLP Engineer",
  "Computer Vision Engineer",
  "MLOps Engineer",
  "AI Research Scientist",
  "Deep Learning Engineer",
  "Data Analyst (AI)",
];

export const defaultWizardData: WizardData = {
  personalDetails: { fullName: "", email: "", phone: "", location: "", linkedin: "", github: "" },
  education: { degree: "", college: "", gradYear: "", cgpa: "" },
  targetRole: "",
  skills: { languages: "", mlSkills: "", tools: "", frameworks: "", databases: "" },
  projects: [],
  experiences: [],
  certifications: "",
  documentType: "resume",
  resumeTemplate: "classic-ats",
  portfolioTemplate: "minimal-ai",
};
