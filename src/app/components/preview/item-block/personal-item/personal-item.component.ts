import { Component, input } from '@angular/core';
import { type Personal } from '../../../../models/blocks.model';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-personal-item',
  imports: [CommonModule, MatIcon],
  templateUrl: './personal-item.component.html',
  styleUrl: './personal-item.component.scss',
})
export class PersonalItemComponent {
  public data = input.required<Personal[]>();
}
