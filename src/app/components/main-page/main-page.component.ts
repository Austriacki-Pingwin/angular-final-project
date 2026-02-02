import { Component, effect, inject } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { AuthService } from '../../services/auth.service';
import { CvCardComponent } from '../cv-card/cv-card.component';
import type { CV } from '../../models/cv.model';
import { CvService } from '../../services/cv.service';
import { AddCvCardComponent } from '../add-cv-card/add-cv-card.component';

@Component({
  selector: 'app-main-page',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIcon,
    CvCardComponent,
    ProfileCardComponent,
    AddCvCardComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  private readonly authService = inject(AuthService);
  private cvService = inject(CvService);

  constructor() {
    effect(() => {
      console.log(this.cvService.cvs());
    });
  }
  // TEMP mock CVs (until backend is wired)
  public readonly cvs: CV[] = [
    {
      id: 'cv-1',
      title: 'Software Engineer CV',
      status: 'draft',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      content: {
        personal: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@gmail.com',
        },
        summary: 'Frontend developer with Angular experience',
        experience: [
          {
            id: 'exp-1',
            position: 'Frontend Developer',
            company: 'EPAM',
            startDate: '2023-01',
            description: 'Worked on Angular applications',
          },
        ],
        education: [],
        skills: ['Angular', 'TypeScript'],
      },
    },
  ];
}
