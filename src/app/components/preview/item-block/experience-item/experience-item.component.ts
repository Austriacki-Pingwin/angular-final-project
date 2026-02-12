import { Component, input } from '@angular/core';
import { type Experience } from '../../../../models/blocks.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience-item',
  imports: [CommonModule],
  templateUrl: './experience-item.component.html',
  styleUrl: './experience-item.component.scss',
})
export class ExperienceItemComponent {
  public data = input.required<Experience[]>();
}
