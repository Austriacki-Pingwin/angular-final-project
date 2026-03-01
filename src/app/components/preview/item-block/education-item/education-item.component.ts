import { Component, input } from '@angular/core';
import { type Education } from '../../../../models/blocks.model';

@Component({
  selector: 'app-education-item',
  imports: [],
  templateUrl: './education-item.component.html',
  styleUrl: './education-item.component.scss',
  host: { class: 'education' },
})
export class EducationItemComponent {
  public data = input.required<Education[]>();
}
