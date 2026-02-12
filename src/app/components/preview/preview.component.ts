import { Component, input } from '@angular/core';
import { type FullCVBlockType, type FullCV } from '../../models/cv.model';
import { ItemBlockComponent } from './item-block/item-block.component';

@Component({
  selector: 'app-preview',
  imports: [ItemBlockComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent {
  public cv = input.required<FullCV>();

  public get cvBlocks(): FullCVBlockType[] {
    const value = this.cv();
    const excludedKeys = ['id', 'createdAt', 'updatedAt'];
    return (Object.keys(value) as Array<keyof FullCV>)
      .filter((key) => !excludedKeys.includes(key))
      .map((item) => ({ type: item, data: value[item] })) as FullCVBlockType[];
  }
}
