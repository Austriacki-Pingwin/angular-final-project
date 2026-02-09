import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CvService } from '../../services/cv.service';

@Component({
  selector: 'app-add-cv-card',
  imports: [MatIcon],
  templateUrl: './add-cv-card.component.html',
  styleUrl: './add-cv-card.component.scss',
})
export class AddCvCardComponent {
  private cvService = inject(CvService);
  public addCvConfig = {
    icon: 'add_2',
    title: 'Create New CV',
    description: 'Start from scratch or upload',
  };

  public createCv(): void {
    this.cvService.createCv().subscribe({
      next: (cvId) => {
        console.log('CV created with id:', cvId);
      },
      error: (err) => {
        console.error('Failed to create CV', err);
      },
    });
  }
}
