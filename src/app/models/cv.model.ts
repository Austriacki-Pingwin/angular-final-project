// * CV Model

import { type Timestamp } from '@angular/fire/firestore';
import { type CvContent } from './cv-content.model';

export type CV = {
  id: string;
  title: string;
  status: CvStatus; //? ready of public distribution and uploading by PDF, editing is either prohibited or restricted.
  createdAt: Timestamp;
  updatedAt: Timestamp;
  content: CvContent;
};

export type CvStatus = 'draft' | 'published';
