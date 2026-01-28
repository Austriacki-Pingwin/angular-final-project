import { inject, Injectable, signal } from '@angular/core';
import { type User } from '@angular/fire/auth';
import { type UserProfile } from '../models/user-profile.model';
import { doc, Firestore, getDoc, serverTimestamp, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firestore = inject(Firestore);

  private _profile = signal<UserProfile | null>(null);
  public profile = this._profile.asReadonly();

  public async ensureUserExists(user: User): Promise<void> {
    const ref = doc(this.firestore, 'users', user.uid);

    await setDoc(
      ref,
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: user.providerData[0]?.providerId ?? 'password',
        createdAt: serverTimestamp(),
      },
      { merge: true },
    );
  }

  public async getUser(uid: string): Promise<void> {
    const ref = doc(this.firestore, 'users', uid);

    const snap = await getDoc(ref);

    if (!snap.exists()) {
      this._profile.set(null);
      return;
    }

    const data = snap.data();

    const profile: UserProfile = {
      uid: data['uid'],
      email: data['email'] ?? null,
      displayName: data['displayName'] ?? null,
      photoURL: data['photoURL'] ?? null,
      provider: data['provider'],
      createdAt: data['createdAt'],
    };

    this._profile.set(profile);
  }

  public clear(): void {
    this._profile.set(null);
  }
}
