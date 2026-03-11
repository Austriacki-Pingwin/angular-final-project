import { Component, input } from '@angular/core';
import { type Link } from '../../../../models/blocks.model';
import { CommonModule } from '@angular/common';
import { DragDropModule, moveItemInArray, type CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-links-item',
  imports: [CommonModule, DragDropModule],
  templateUrl: './links-item.component.html',
  styleUrl: './links-item.component.scss',
  host: { class: 'links' },
})
export class LinksItemComponent {
  public data = input.required<Link[]>();

  public linksDrop(event: CdkDragDrop<Link[]>): void {
    const current = this.data();
    moveItemInArray(current, event.previousIndex, event.currentIndex);
  }
}
