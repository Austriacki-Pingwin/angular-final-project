import { Component, inject, input } from '@angular/core';
import type {
  About,
  Education,
  Experience,
  Link,
  Personal,
  Skill,
  Language,
} from '../../../models/blocks.model';
import { ProfileBlockItemComponent } from './profile-block-item/profile-block-item.component';
import { MatButton } from '@angular/material/button';
import { ProfileService } from '../../../services/profile.service';
import { type ProfileBlockType } from '../../../models/collections.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemComponent } from '../../shared/dialog/delete-item/delete-item.component';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-profile-block',
  imports: [ProfileBlockItemComponent, MatButton],
  templateUrl: './profile-block.component.html',
  styleUrl: './profile-block.component.scss',
})
export class ProfileBlockComponent {
  private profileService = inject(ProfileService);
  public blockData = input.required<
    Personal[] | Education[] | Skill[] | Experience[] | About[] | Link[] | Language[]
  >();
  public blockType = input.required<ProfileBlockType>();

  private dialog = inject(MatDialog);
  public openDialog(itemId: string): void {
    const ref = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        component: DeleteItemComponent,
        inputs: {
          itemId: itemId,
          blockType: this.blockType(),
        },
      },
    });
    ref.afterClosed().subscribe((result) => {
      console.log('Dialog result:', result);
    });
  }

  public removeItem(itemId: string): void {
    this.openDialog(itemId);
  }
}
