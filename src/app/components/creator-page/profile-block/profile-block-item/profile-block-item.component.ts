import { Component, computed, input } from '@angular/core';
import type { Skill, Photo } from '../../../../models/blocks.model';
import { KeyValuePipe } from '@angular/common';
import type { ProfileBlockItem, ProfileBlockType } from '../../../../models/collections.model';

@Component({
  selector: 'app-profile-block-item',
  imports: [KeyValuePipe],
  templateUrl: './profile-block-item.component.html',
  styleUrl: './profile-block-item.component.scss',
})
export class ProfileBlockItemComponent {
  public itemData = input.required<ProfileBlockItem>();
  public blockType = input.required<ProfileBlockType>();

  public skillTitle = computed<string | null>(() =>
    this.blockType() === 'skills' ? (this.itemData() as Skill).title : null,
  );
  public photoData = computed<Photo | null>(() =>
    this.blockType() === 'photo' ? (this.itemData() as Photo) : null,
  );
}
