import { type Routes } from '@angular/router';
import { MainPageComponent } from '../components/main-page/main-page.component';
import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { CreatorPageComponent } from '../components/creator-page/creator-page.component';
import { cvResolver } from '../shared/resolvers/cv.resolver';

export const PRIVATE_ROUTES: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'profile',
    title: 'User profile',
    component: ProfilePageComponent,
  },
  {
    path: 'creator/:cvId',
    title: 'CV creator',
    component: CreatorPageComponent,
    resolve: {
      cvId: cvResolver,
    },
  },
];
