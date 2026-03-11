import { Component, input } from '@angular/core';
import { type Education } from '../../../../models/blocks.model';
import { DragDropModule, moveItemInArray, type CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-education-item',
  imports: [DragDropModule],
  templateUrl: './education-item.component.html',
  styleUrl: './education-item.component.scss',
  host: { class: 'education' },
})
export class EducationItemComponent {
  public data = input.required<Education[]>();

  public educationDrop(event: CdkDragDrop<Education[]>): void {
    const current = this.data();
    moveItemInArray(current, event.previousIndex, event.currentIndex);
  }
}
