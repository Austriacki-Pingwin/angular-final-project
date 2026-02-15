import { Component, effect, input, signal } from '@angular/core';
import { type FullCVPreviewBlockType, type FullCV } from '../../models/cv.model';
import { ItemBlockComponent } from './item-block/item-block.component';
import { type PreviewBlockType } from '../../models/collections.model';
import { TranslatePipe } from '@ngx-translate/core';
import { type CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

const PREVIEW_BLOCKS: Array<PreviewBlockType> = [
  'title',
  'photo',
  'personal',
  'about',
  'skills',
  'experience',
  'education',
  'languages',
  'links',
];

@Component({
  selector: 'app-preview',
  imports: [ItemBlockComponent, DragDropModule, TranslatePipe],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent {
  public cv = input.required<FullCV>();
  public cvBlocks = signal<FullCVPreviewBlockType[]>([]);

  constructor() {
    effect(() => {
      const value = this.cv();

      this.cvBlocks.set(
        PREVIEW_BLOCKS.map((key) => ({ type: key, data: value[key] })) as FullCVPreviewBlockType[],
      );
    });
  }

  /*   public cvBlocks = computed<FullCVPreviewBlockType[]>(() => {
    const value = this.cv();

    return PREVIEW_BLOCKS.map((key) => ({
      type: key,
      data: value[key],
    })) as FullCVPreviewBlockType[];
  }); */

  public drop(event: CdkDragDrop<FullCVPreviewBlockType[]>): void {
    const current = this.cvBlocks();
    moveItemInArray(current, event.previousIndex, event.currentIndex);
    this.cvBlocks;
  }
}
