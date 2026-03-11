import { Component, input } from '@angular/core';
import { type Photo } from '../../../../models/blocks.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-item',
  imports: [CommonModule],
  templateUrl: './photo-item.component.html',
  styleUrl: './photo-item.component.scss',
  host: { class: 'photo' },
})
export class PhotoItemComponent {
  public data = input.required<Photo[]>();
}
