import type { Personal, About, Skill, Language, Experience, Education, Link } from './blocks.model';
<<<<<<< HEAD

export type ProfileBlockType =
  | 'personal'
  | 'links'
  | 'about'
  | 'skills'
  | 'languages'
  | 'experience'
  | 'education';

export type Profile = {
  personalInfo: Personal[];
<<<<<<< HEAD
  linksInfo: Link[];
=======
  linksInfo: Links[];
>>>>>>> 854efd6 (fix: minor fix models)
=======
import { type Timestamp } from '@angular/fire/firestore';

export type Profile = {
  personalInfo: Personal[];
  linksInfo: Link[];
>>>>>>> 2087918 (feat: add cv service and creat cv card, delete cv card, recive cv card)
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
<<<<<<< HEAD
  linksBlock: string[];
=======
>>>>>>> 2087918 (feat: add cv service and creat cv card, delete cv card, recive cv card)
  aboutBlock: string[];
  linksBlock: string[];
  skillsBlock: string[];
  languagesBlock: string[];
  experienceBlock: string[];
  educationBlock: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
