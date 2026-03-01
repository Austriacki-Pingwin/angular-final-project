import { Component, input } from '@angular/core';
import { type Language } from '../../../../models/blocks.model';
import { CommonModule } from '@angular/common';
import { DragDropModule, moveItemInArray, type CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-languages-item',
  imports: [CommonModule, DragDropModule],
  templateUrl: './languages-item.component.html',
  styleUrl: './languages-item.component.scss',
  host: { class: 'languages' },
})
export class LanguagesItemComponent {
  public data = input.required<Language[]>();

  public languagesDrop(event: CdkDragDrop<Language[]>): void {
    const current = this.data();
    moveItemInArray(current, event.previousIndex, event.currentIndex);
  }
}
