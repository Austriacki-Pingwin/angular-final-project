import type { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent,
  },
];
