import { type Timestamp } from '@angular/fire/firestore';

export type UserProfile = {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  provider: AuthProvider;
  createdAt: Timestamp;
};

export type AuthProvider = 'password' | 'google';
