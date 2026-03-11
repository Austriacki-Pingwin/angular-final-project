import { Component, effect, input, type OnInit, signal } from '@angular/core';
import { type FullCVPreviewBlockType, type FullCV } from '../../models/cv.model';
import { ItemBlockComponent } from './item-block/item-block.component';
import { type PreviewBlockType } from '../../models/collections.model';
import { TranslatePipe } from '@ngx-translate/core';
import { type CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

const PREVIEW_BLOCKS: Array<PreviewBlockType> = [
  'photo',
  'personal',
  'about',
  'skills',
  'experience',
  'education',
  'languages',
  'links',
];

type PreviewStyle = 'classic' | 'technical';

@Component({
  selector: 'app-preview',
  imports: [
    ItemBlockComponent,
    DragDropModule,
    TranslatePipe,
    MatButtonModule,
    MatIconButton,
    MatIcon,
    MatRadioModule,
    FormsModule,
  ],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent implements OnInit {
  public cv = input.required<FullCV>();
  public cvBlocks = signal<FullCVPreviewBlockType[]>([]);
  public title!: string;

  constructor() {
    effect(() => {
      const value = this.cv();

      this.cvBlocks.set(
        PREVIEW_BLOCKS.map((key) => ({ type: key, data: value[key] })) as FullCVPreviewBlockType[],
      );
    });
  }

  public ngOnInit(): void {
    this.title = this.cv().title;
  }

  public printCv(): void {
    window.print();
  }

  public selectedType: PreviewStyle = 'classic';

  public get leftBlocks(): FullCVPreviewBlockType[] {
    const mid = Math.ceil(this.cvBlocks().length / 2);
    return this.cvBlocks().slice(0, mid);
  }

  public get rightBlocks(): FullCVPreviewBlockType[] {
    const mid = Math.ceil(this.cvBlocks().length / 2);
    return this.cvBlocks().slice(mid);
  }

  public drop(event: CdkDragDrop<FullCVPreviewBlockType[]>): void {
    const current = this.cvBlocks();
    moveItemInArray(current, event.previousIndex, event.currentIndex);
  }
}
