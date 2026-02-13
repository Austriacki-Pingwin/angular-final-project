import { Component, input } from '@angular/core';
import { type Skill } from '../../../../models/blocks.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills-item',
  imports: [CommonModule],
  templateUrl: './skills-item.component.html',
  styleUrl: './skills-item.component.scss',
})
export class SkillsItemComponent {
  public data = input.required<Skill[]>();
}
