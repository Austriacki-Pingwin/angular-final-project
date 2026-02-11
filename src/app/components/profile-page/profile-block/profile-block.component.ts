import { Component, inject, input, type OnInit } from '@angular/core';
import { ProfileBlockItemComponent } from './profile-block-item/profile-block-item.component';
import { MatIconButton } from '@angular/material/button';
import { ProfileService } from '../../../services/profile.service';
import type { ProfileBlockItem, ProfileBlockType } from '../../../models/collections.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemComponent } from '../../shared/dialog/delete-item/delete-item.component';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { type Observable } from 'rxjs';

@Component({
  selector: 'app-profile-block',
  imports: [ProfileBlockItemComponent, MatIconButton, AsyncPipe, MatIcon, AsyncPipe],
  templateUrl: './profile-block.component.html',
  styleUrl: './profile-block.component.scss',
})
export class ProfileBlockComponent implements OnInit {
  private profileService = inject(ProfileService);
  public blockType = input.required<ProfileBlockType>();
  public blockData$!: Observable<ProfileBlockItem[]>;
  public ngOnInit(): void {
    this.blockData$ = this.profileService.getBlocks<ProfileBlockItem>(this.blockType()).pipe();
  }

  private dialog = inject(MatDialog);
  public openDeleteDialog(itemId: string): void {
    const ref = this.dialog.open(DialogComponent, {
      data: {
        component: DeleteItemComponent,
        inputs: {
          itemId: itemId,
          blockType: this.blockType(),
        },
      },
    });
    ref.afterClosed().subscribe();
  }

  public removeItem(itemId: string): void {
    this.openDeleteDialog(itemId);
  }

  public editItem(itemId: string): void {
    console.log('Edit item', itemId);
    //todo
  }

  public addItem(): void {
    //TODO
  }
}
