import { Component } from '@angular/core';

import { ProfileTabsComponent } from './tabs/tabs.component';
import { PersonalFormComponent } from './personal-form/personal-form.component';
import { ExperienceFormComponent } from './experience-form/experience-form.component';
import { EducationFormComponent } from './education-form/education-form.component';
import { SkillsFormComponent } from './skills-form/skills-form.component';
import { type ProfileBlockType } from '../../../models/collections.model';
import { LanguageFormComponent } from './language-form/language-form.component';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    ProfileTabsComponent,
    PersonalFormComponent,
    ExperienceFormComponent,
    EducationFormComponent,
    SkillsFormComponent,
    LanguageFormComponent,
  ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProfileFormComponent {
  public activeTab: ProfileBlockType = 'personal';
}
