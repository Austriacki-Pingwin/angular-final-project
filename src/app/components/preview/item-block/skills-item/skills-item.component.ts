import { Component, input } from '@angular/core';
import { type Skill } from '../../../../models/blocks.model';
import { CommonModule } from '@angular/common';
import { type CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-skills-item',
  imports: [CommonModule, DragDropModule],
  templateUrl: './skills-item.component.html',
  styleUrl: './skills-item.component.scss',
  host: { class: 'skills' },
})
export class SkillsItemComponent {
  public data = input.required<Skill[]>();

  public skillDrop(event: CdkDragDrop<Skill[]>): void {
    const current = this.data();
    moveItemInArray(current, event.previousIndex, event.currentIndex);
  }
}
