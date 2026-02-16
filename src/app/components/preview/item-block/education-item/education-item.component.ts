import { Component, input } from '@angular/core';
import { type Education } from '../../../../models/blocks.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-education-item',
  imports: [JsonPipe],
  templateUrl: './education-item.component.html',
  styleUrl: './education-item.component.scss',
})
export class EducationItemComponent {
  public data = input.required<Education[]>();
}
