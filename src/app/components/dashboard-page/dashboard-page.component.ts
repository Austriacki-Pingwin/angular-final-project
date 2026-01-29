import { Component, inject } from '@angular/core';
import { type User } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { CvCardComponent } from '../cv-card/cv-card.component';
import type { CV } from '../../models/cv.model';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIcon, CvCardComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  private readonly activatedRouter = inject(ActivatedRoute);
  private readonly authService = inject(AuthService);

  // user from resolver
  public readonly user: User = this.activatedRouter.snapshot.data['user'];

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

  public onSignOut(): void {
    this.authService.signOut();
  }

  constructor() {
    console.log('Logged in user:', this.user);
  }
}
