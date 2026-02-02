// * Empty CV

import { type CvContent } from './cv-content.model';

export const EMPTY_CV_CONTENT: CvContent = {
  personal: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  },
  about: {
    id: '',
    content: [],
  },
  languages: [],
  experience: [],
  education: [],
  skills: [],
};
