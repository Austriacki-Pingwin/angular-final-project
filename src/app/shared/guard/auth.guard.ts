import { inject } from '@angular/core';
import { type CanActivateFn, Router } from '@angular/router';
import { Auth, authState, type User } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators';
import { type Observable } from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    take(1),
    map((user: User | null) => {
      if (user) {
        return true;
      }
      router.navigate(['/auth/sign-in']);
      return false;
    }),
  );
};
