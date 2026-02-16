import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AddCvCardComponent } from '../../add-cv-card/add-cv-card.component';
import { CvCardComponent } from '../../cv-card/cv-card.component';
import { CvService } from '../../../services/cv.service';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import type { FullCV } from '../../../models/cv.model';
@Component({
  selector: 'app-my-resumes',
  imports: [AddCvCardComponent, CvCardComponent, CommonModule, NgxSkeletonLoaderComponent],
  templateUrl: './my-resumes.component.html',
  styleUrl: './my-resumes.component.scss',
})
export class MyResumesComponent {
  private cvService = inject(CvService);
  public cvs$ = this.cvService.getFullCvs();

  @Output() public download = new EventEmitter<FullCV>();

  public downloadCv(cv: FullCV): void {
    this.download.emit(cv);
  }
}
