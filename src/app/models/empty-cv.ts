// * Empty Full CV

import { Timestamp } from '@angular/fire/firestore';
import { type FullCV } from './cv.model';
import { type CV } from './collections.model';

export const EMPTY_FULL_CV: Omit<FullCV, 'id'> = {
  title: '',
  photo: [],
  personal: [],
  links: [],
  about: [],
  languages: [],
  experience: [],
  education: [],
  skills: [],
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
};

export const EMPTY_CV: Omit<CV, 'id'> = {
  title: '',
  photoBlock: [],
  personalBlock: [],
  linksBlock: [],
  aboutBlock: [],
  languagesBlock: [],
  experienceBlock: [],
  educationBlock: [],
  skillsBlock: [],
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
};
