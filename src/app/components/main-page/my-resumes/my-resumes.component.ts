import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AddCvCardComponent } from '../../add-cv-card/add-cv-card.component';
import { CvCardComponent } from '../../cv-card/cv-card.component';
import { CvService } from '../../../services/cv.service';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-my-resumes',
  imports: [
    AddCvCardComponent,
    CvCardComponent,
    CommonModule,
    NgxSkeletonLoaderComponent,
    TranslatePipe,
  ],
  templateUrl: './my-resumes.component.html',
  styleUrl: './my-resumes.component.scss',
})
export class MyResumesComponent {
  private cvService = inject(CvService);

  public cvs$ = this.cvService.getCvs();

  @Output() public download = new EventEmitter<string>();

  public downloadCv(cvId: string): void {
    this.download.emit(cvId);
  }
}
