import { Component, computed, input } from '@angular/core';
import type {
  About,
  Education,
  Experience,
  Link,
  Personal,
  Skill,
  Language,
} from '../../../../models/blocks.model';
import { KeyValuePipe } from '@angular/common';
import type { ProfileBlockType } from '../../../../models/collections.model';

@Component({
  selector: 'app-profile-block-item',
  imports: [KeyValuePipe],
  templateUrl: './profile-block-item.component.html',
  styleUrl: './profile-block-item.component.scss',
})
export class ProfileBlockItemComponent {
  public itemData = input.required<
    Personal | Education | Skill | Experience | About | Link | Language
  >();
  public blockType = input.required<ProfileBlockType>();

  public skillTitle = computed<string | null>(() =>
    this.blockType() === 'skills' ? (this.itemData() as Skill).title : null,
  );
}
