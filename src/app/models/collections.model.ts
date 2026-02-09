import type { Personal, About, Skill, Language, Experience, Education, Link } from './blocks.model';
import type { Timestamp } from '@angular/fire/firestore';

export type ProfileBlockType =
  | 'personal'
  | 'links'
  | 'about'
  | 'skills'
  | 'languages'
  | 'experience'
  | 'education';

export type CollectionType = ProfileBlockType | 'cvs';

export type Profile = {
  personalInfo: Personal[];
  linksInfo: Link[];
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
  personalBlock: string[];
  aboutBlock: string[];
  linksBlock: string[];
  skillsBlock: string[];
  languagesBlock: string[];
  experienceBlock: string[];
  educationBlock: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
