import type { ProfileBlockType } from '../../../../models/collections.model';

export const PROFILE_TABS: { key: ProfileBlockType; label: string }[] = [
  { key: 'personal', label: 'Personal' },
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
  { key: 'skills', label: 'Skills' },
];
