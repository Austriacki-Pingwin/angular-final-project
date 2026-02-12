import { Component, input } from '@angular/core';
import { type About } from '../../../../models/blocks.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-item',
  imports: [CommonModule],
  templateUrl: './about-item.component.html',
  styleUrl: './about-item.component.scss',
})
export class AboutItemComponent {
  public data = input.required<About[]>();
}
