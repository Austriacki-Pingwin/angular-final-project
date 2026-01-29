import { type Routes } from '@angular/router';

export const FALLBACK_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../components/fallback/fallback.component').then((m) => m.FallbackComponent),
  },
];
