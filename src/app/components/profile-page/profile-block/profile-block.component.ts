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
import { ProfileBlockItemComponent } from '../profile-block-item/profile-block-item.component';
import { MatButton } from '@angular/material/button';
import { ProfileService } from '../../../services/profile.service';

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

  public removeItem(itemId: string): void {
    this.profileService.deleteBlock('personal', itemId).subscribe({
      error: (err) => {
        console.error('Delete personal block failed', err);
      },
    });
  }
}
