import { Component, computed, EventEmitter, inject, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { calculateCvProgress } from '../../utils/cv-progress.util';
import { type FullCV } from '../../models/cv.model';
import { CvService } from '../../services/cv.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import type { CV } from '../../models/collections.model';

@Component({
  selector: 'app-cv-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatMenuModule,
    TranslatePipe,
  ],
  templateUrl: './cv-card.component.html',
  styleUrl: './cv-card.component.scss',
})
export class CvCardComponent {
  private cvService = inject(CvService);
  private router = inject(Router);
  public cv = input.required<CV>();

  @Output() public download = new EventEmitter<FullCV>();

  public progress = computed(() => {
    return calculateCvProgress(this.cv());
  });

  public deleteCv(): void {
    this.cvService.deleteCv(this.cv().id);
  }

  public openCreator(): void {
    this.router.navigate(['creator', this.cv().id]);
  }

  public duplicateCv(): void {
    this.cvService.duplicateCv(this.cv().id);
  }

  public onDownload(): void {
    // this.download.emit(this.cv());
  }
}
