import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-title-item',
  imports: [CommonModule],
  templateUrl: './title-item.component.html',
  styleUrl: './title-item.component.scss',
})
export class TitleItemComponent {
  public data = input.required<string>();
}
