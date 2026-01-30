import { type Routes } from '@angular/router';
import { ForgotPasswordPageComponent } from '../components/auth-page/forgot-password-page/forgot-password-page.component';
import { SignInPageComponent } from '../components/auth-page/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from '../components/auth-page/sign-up-page/sign-up-page.component';

export const AUTH_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
  {
    path: 'sign-in',
    component: SignInPageComponent,
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent,
  },
];
