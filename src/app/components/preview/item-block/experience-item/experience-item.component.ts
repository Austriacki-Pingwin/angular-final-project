import { Component, input } from '@angular/core';
import { type Experience } from '../../../../models/blocks.model';
import { CommonModule } from '@angular/common';
import { DragDropModule, moveItemInArray, type CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-experience-item',
  imports: [CommonModule, DragDropModule],
  templateUrl: './experience-item.component.html',
  styleUrl: './experience-item.component.scss',
  host: { class: 'experience' },
})
export class ExperienceItemComponent {
  public data = input.required<Experience[]>();

  public experienceDrop(event: CdkDragDrop<Experience[]>): void {
    const current = this.data();
    moveItemInArray(current, event.previousIndex, event.currentIndex);
  }
}
