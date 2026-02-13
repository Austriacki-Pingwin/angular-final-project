import { Component, input } from '@angular/core';
import { type Personal } from '../../../../models/blocks.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-item',
  imports: [CommonModule],
  templateUrl: './personal-item.component.html',
  styleUrl: './personal-item.component.scss',
})
export class PersonalItemComponent {
  public data = input.required<Personal[]>();
}
