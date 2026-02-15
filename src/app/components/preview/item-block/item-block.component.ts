import { Component, computed, input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { PersonalItemComponent } from './personal-item/personal-item.component';
import { type ComponentType } from '@angular/cdk/overlay';
import { type PreviewBlockType } from '../../../models/collections.model';
import { SkillsItemComponent } from './skills-item/skills-item.component';
import { LinksItemComponent } from './links-item/links-item.component';
import { AboutItemComponent } from './about-item/about-item.component';
import { LanguagesItemComponent } from './languages-item/languages-item.component';
import { ExperienceItemComponent } from './experience-item/experience-item.component';
import { EducationItemComponent } from './education-item/education-item.component';
import { TitleItemComponent } from './title-item/title-item.component';
import { type FullCVPreviewBlockType } from '../../../models/cv.model';
import { PhotoItemComponent } from './photo-item/photo-item.component';
import { CapitalizeFirstPipe } from '../../../shared/pipe/capitalize-first.pipe';
import { CdkDrag } from '@angular/cdk/drag-drop';

const PREVIEW_BLOCK_COMPONENTS: Record<PreviewBlockType, ComponentType<unknown>> = {
  title: TitleItemComponent,
  photo: PhotoItemComponent,
  personal: PersonalItemComponent,
  skills: SkillsItemComponent,
  links: LinksItemComponent,
  about: AboutItemComponent,
  languages: LanguagesItemComponent,
  experience: ExperienceItemComponent,
  education: EducationItemComponent,
};

@Component({
  selector: 'app-item-block',
  imports: [NgComponentOutlet, CapitalizeFirstPipe],
  templateUrl: './item-block.component.html',
  styleUrl: './item-block.component.scss',
  host: {
    '[attr.data-block]': 'cvBlock().type',
  },
  hostDirectives: [CdkDrag],
})
export class ItemBlockComponent {
  public cvBlock = input.required<FullCVPreviewBlockType>();
  public componentMap = computed(() => PREVIEW_BLOCK_COMPONENTS[this.cvBlock().type]);
}
