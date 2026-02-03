import type {
  Personal,
  About,
  Skill,
  Language,
  Experience,
  Education,
  Links,
} from './blocks.model';

export type Profile = {
  personalInfo: Personal;
  linksInfo: Links[];
  aboutInfo: About[];
  skillInfo: Skill[];
  languageInfo: Language[];
  experienceInfo: Experience[];
  educationInfo: Education[];
};

export type CVs = CV[];

export type CV = {
  id: string;
  title: string;
  personalBlock: string;
  linksBlock: string[];
  aboutBlock: string;
  skillsBlock: string[];
  languagesBlock: string[];
  experienceBlock: string[];
  educationBlock: string[];
};
