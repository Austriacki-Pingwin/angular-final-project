// * CV Content Model

import { type Experience } from './experience.model';
import { type Education } from './education.model';

export type CvContent = {
  personal: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
};

export type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
};
