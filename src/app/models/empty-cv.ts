// * Empty CV

import { type CvContent } from './cv-content.model';

export const EMPTY_CV_CONTENT: CvContent = {
  personal: {
    firstName: '',
    lastName: '',
    email: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
};
