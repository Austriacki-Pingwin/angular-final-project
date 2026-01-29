import { type Routes } from '@angular/router';
import { MainPageComponent } from '../components/main-page/main-page.component';

export const PRIVATE_ROUTES: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
];
