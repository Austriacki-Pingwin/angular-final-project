// import { inject } from '@angular/core';
import { type ResolveFn } from '@angular/router';
// import type { FullCV } from '../../models/cv.model';
// import { CvService } from '../../services/cv.service';

// export const cvResolver: ResolveFn<FullCV> = (activatedRouteSnapshot) => {
//   const cvService = inject(CvService);
//   const cvId = activatedRouteSnapshot.paramMap.get('cvId') ?? '';
//   return cvService.getFullCv(cvId);
// };

export const cvResolver: ResolveFn<string> = (activatedRouteSnapshot) => {
  const cvId = activatedRouteSnapshot.paramMap.get('cvId') ?? 'oops';
  return cvId;
};
