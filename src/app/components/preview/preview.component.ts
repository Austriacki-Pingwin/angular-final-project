import { Component, computed, input } from '@angular/core';
import { type FullCVPreviewBlockType, type FullCV } from '../../models/cv.model';
import { ItemBlockComponent } from './item-block/item-block.component';
import { type PreviewBlockType } from '../../models/collections.model';
import { TranslatePipe } from '@ngx-translate/core';

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
  imports: [ItemBlockComponent, TranslatePipe],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent {
  public cv = input.required<FullCV>();

  public cvBlocks = computed<FullCVPreviewBlockType[]>(() => {
    const value = this.cv();

    return PREVIEW_BLOCKS.map((key) => ({
      type: key,
      data: value[key],
    })) as FullCVPreviewBlockType[];
  });
}
