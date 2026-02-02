// * CV Content Model

import type { About, Education, Experience, Language, Personal, Skill } from './blocks.model';

export type CvContent = {
  personal: Personal;
  about: About;
  experience: Experience[];
  education: Education[];
  languages: Language[];
  skills: Skill[];
};
