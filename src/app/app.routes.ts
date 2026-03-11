import type { Routes } from '@angular/router';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./routes/auth.routes')
            .then((m) => m.AUTH_ROUTES)
            .catch(() => import('./routes/fallback.routes').then((m) => m.FALLBACK_ROUTES)),
      },
      {
        path: '',
        loadChildren: () =>
          import('./routes/private.routes')
            .then((m) => m.PRIVATE_ROUTES)
            .catch(() => import('./routes/fallback.routes').then((m) => m.FALLBACK_ROUTES)),
        canActivate: [authGuard],
      },
      {
        path: '',
        component: WelcomePageComponent,
      },
      {
        path: '**',
        title: '404',
        component: NotFoundComponent,
      },
    ],
  },
];
