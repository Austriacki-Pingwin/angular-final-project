import type { ProfileBlockType } from '../../../../models/collections.model';

export const PROFILE_TABS: { key: ProfileBlockType; label: string }[] = [
  { key: 'personal', label: 'Personal' },
  { key: 'links', label: 'Links' },
  { key: 'about', label: 'About' },
  { key: 'skills', label: 'Skills' },
  { key: 'languages', label: 'Languages' },
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
];
