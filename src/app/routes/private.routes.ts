import { type Routes } from '@angular/router';
import { MainPageComponent } from '../components/main-page/main-page.component';
import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { BlockPageComponent } from '../components/block-page/block-page.component';

export const PRIVATE_ROUTES: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'profile',
    children: [
      {
        path: '',
        component: ProfilePageComponent,
      },
      {
        path: ':blockId',
        component: BlockPageComponent,
      },
    ],
  },
];
