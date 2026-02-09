// * CV Model

import { type Timestamp } from '@angular/fire/firestore';
import type { About, Education, Experience, Language, Link, Personal, Skill } from './blocks.model';

export type FullCVs = FullCV[];

export type FullCV = {
  id: string;
  title: string;
  personal: Personal[];
  about: About[];
  links: Link[];
  experience: Experience[];
  education: Education[];
  languages: Language[];
  skills: Skill[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
