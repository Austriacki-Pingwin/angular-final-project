import type { CvContent } from '../../../../models/cv-content.model';

export type CvSectionKey = keyof Pick<
  CvContent,
  'personal' | 'experience' | 'education' | 'skills'
>;

export const PROFILE_TABS: { key: CvSectionKey; label: string }[] = [
  { key: 'personal', label: 'Personal' },
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
  { key: 'skills', label: 'Skills' },
];
