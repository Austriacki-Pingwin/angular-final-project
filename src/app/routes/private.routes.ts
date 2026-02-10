import { type Routes } from '@angular/router';
import { MainPageComponent } from '../components/main-page/main-page.component';
import { ProfilePageComponent } from '../components/profile-page/profile-page.component';
import { BlockPageComponent } from '../components/block-page/block-page.component';
import { SkillsBlockComponent } from '../components/block-page/skills-block/skills-block.component';
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
    children: [
      {
        path: '',
        component: ProfilePageComponent,
      },
      {
        path: 'skills',
        component: SkillsBlockComponent,
      },
      {
        path: ':blockId',
        component: BlockPageComponent,
      },
    ],
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
