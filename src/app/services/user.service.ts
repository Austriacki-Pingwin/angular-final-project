import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import { type UserProfile } from '../models/user-profile.model';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { catchError, type Observable, of, switchMap } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private injectionContext = inject(EnvironmentInjector);
  private notificationService = inject(NotificationService);

  public getUser(): Observable<UserProfile> {
    return this.authService.uid$.pipe(
      switchMap((uid) => {
        return runInInjectionContext(this.injectionContext, () => {
          const ref = doc(this.firestore, `users/${uid}`);
          return docData(ref, { idField: 'uid' }) as Observable<UserProfile>;
        });
      }),
      catchError(() => {
        this.notificationService.error('Could not load User. Please try again');
        return of();
      }),
    );
  }
}
