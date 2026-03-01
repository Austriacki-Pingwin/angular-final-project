import { type ResolveFn } from '@angular/router';

export const cvResolver: ResolveFn<string> = (activatedRouteSnapshot) => {
  const cvId = activatedRouteSnapshot.paramMap.get('cvId') ?? 'oops';
  return cvId;
};
