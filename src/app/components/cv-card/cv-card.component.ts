import type { OnChanges } from '@angular/core';
import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { calculateCvProgress } from '../../utils/cv-progress.util';
import { type FullCV } from '../../models/cv.model';
import { CvService } from '../../services/cv.service';

@Component({
  selector: 'app-cv-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule, MatIconModule, MatMenuModule],
  templateUrl: './cv-card.component.html',
  styleUrl: './cv-card.component.scss',
})
export class CvCardComponent implements OnChanges {
  private cvService = inject(CvService);
  @Input()
  public cv!: FullCV;

  public progress = 0;

  public ngOnChanges(): void {
    this.progress = calculateCvProgress(this.cv);
  }

  public deleteCv(): void {
    this.cvService.deleteCv(this.cv.id);
  }
}
