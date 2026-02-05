import { Component, input } from '@angular/core';
import type {
  About,
  Education,
  Experience,
  Link,
  Personal,
  Skill,
  Language,
} from '../../../models/blocks.model';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-profile-block-item',
  imports: [KeyValuePipe],
  templateUrl: './profile-block-item.component.html',
  styleUrl: './profile-block-item.component.scss',
})
export class ProfileBlockItemComponent {
  public ItemData = input.required<
    Personal | Education | Skill | Experience | About | Link | Language
  >();
}
