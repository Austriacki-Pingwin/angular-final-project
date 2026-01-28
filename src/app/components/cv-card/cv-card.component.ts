import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import type { CV } from '../../models/cv.model';

@Component({
  selector: 'app-cv-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressBarModule, MatIconModule, MatMenuModule],
  templateUrl: './cv-card.component.html',
  styleUrl: './cv-card.component.scss',
})
export class CvCardComponent {
  @Input()
  public cv!: CV;

  public progress = 0;
}
