import type { Routes } from '@angular/router';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { AuthGuard, type AuthPipe, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

const redirectToLogin = (): AuthPipe => redirectUnauthorizedTo('/auth/sign-in');

export const routes: Routes = [
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
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectToLogin,
    },
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
];
