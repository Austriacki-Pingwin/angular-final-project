import { Component } from '@angular/core';

// import type { CvContent } from '../../models/cv-content.model';
// import type { Experience } from '../../models/experience.model';
// import type { Education } from '../../models/education.model';

import { ProfileTabsComponent } from './tabs/tabs.component';
import { PersonalFormComponent } from './personal-form/personal-form.component';
import { ExperienceFormComponent } from './experience-form/experience-form.component';
import { EducationFormComponent } from './education-form/education-form.component';
import { SkillsFormComponent } from './skills-form/skills-form.component';
import { type ProfileBlockType } from '../../../models/collections.model';

@Component({
  selector: 'app-profile-info-form',
  standalone: true,
  imports: [
    ProfileTabsComponent,
    PersonalFormComponent,
    ExperienceFormComponent,
    EducationFormComponent,
    SkillsFormComponent,
  ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss',
})
export class ProfileFormComponent {
  public activeTab: ProfileBlockType = 'personal';
}
