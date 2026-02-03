import { Component } from '@angular/core';
import { AddCvCardComponent } from '../../add-cv-card/add-cv-card.component';
import { type CV } from '../../../models/cv.model';
import { Timestamp } from '@angular/fire/firestore';
import { CvCardComponent } from '../../cv-card/cv-card.component';

@Component({
  selector: 'app-my-resumes',
  imports: [AddCvCardComponent, CvCardComponent],
  templateUrl: './my-resumes.component.html',
  styleUrl: './my-resumes.component.scss',
})
export class MyResumesComponent {
  //* TEMP mock CVs (until backend is wired)
  public readonly cvs: CV[] = [
    {
      id: 'cv-1',
      title: 'Software Engineer CV',
      status: 'draft',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      content: {
        personal: {
          id: 'jhon',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@gmail.com',
        },
        languages: [
          {
            id: 'eng',
            name: 'English',
            proficiency: 'Intermediate',
          },
          {
            id: 'rus',
            name: 'Russian',
            proficiency: 'Native',
          },
        ],
        about: {
          id: 'about_one',
          content: 'Frontend developer with Angular experience',
        },
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
        skills: [
          {
            id: 'angular',
            title: 'Angular',
          },
          {
            id: 'type-script',
            title: 'TypeScript',
          },
        ],
      },
    },
  ];
}
