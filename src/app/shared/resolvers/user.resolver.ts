import { inject } from '@angular/core';
import { Auth, authState, type User } from '@angular/fire/auth';
import { type ResolveFn } from '@angular/router';
import { filter, map } from 'rxjs';

export const userResolver: ResolveFn<User> = () => {
  const auth = inject(Auth);

  // * create the user observable
  const user$ = authState(auth).pipe(
    filter((user): user is User => user !== null),
    map((user) => user),
  );

  // * resolver the user data to the router
  return user$;
};
