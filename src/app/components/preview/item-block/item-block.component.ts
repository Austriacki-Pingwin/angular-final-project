import { Component, computed, input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { PersonalItemComponent } from './personal-item/personal-item.component';
import { type ComponentType } from '@angular/cdk/overlay';
import { type ProfileBlockType } from '../../../models/collections.model';
import { SkillsItemComponent } from './skills-item/skills-item.component';
import { LinksItemComponent } from './links-item/links-item.component';
import { AboutItemComponent } from './about-item/about-item.component';
import { LanguagesItemComponent } from './languages-item/languages-item.component';
import { ExperienceItemComponent } from './experience-item/experience-item.component';
import { EducationItemComponent } from './education-item/education-item.component';
import { TitleItemComponent } from './title-item/title-item.component';
import { type FullCVBlockType } from '../../../models/cv.model';

@Component({
  selector: 'app-item-block',
  imports: [NgComponentOutlet],
  templateUrl: './item-block.component.html',
  styleUrl: './item-block.component.scss',
  host: {
    '[attr.data-block]': 'type()',
  },
})
export class ItemBlockComponent {
  public blocks = input.required<FullCVBlockType>();
  public type = computed(() => this.blocks().type);

  public componentMap: Record<ProfileBlockType | 'title', ComponentType<unknown>> = {
    title: TitleItemComponent,
    personal: PersonalItemComponent,
    skills: SkillsItemComponent,
    links: LinksItemComponent,
    about: AboutItemComponent,
    languages: LanguagesItemComponent,
    experience: ExperienceItemComponent,
    education: EducationItemComponent,
  };
}
