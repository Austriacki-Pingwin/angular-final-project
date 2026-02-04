import { Component } from '@angular/core';

import type { CvContent } from '../../models/cv-content.model';
import type { Experience } from '../../models/experience.model';
import type { Education } from '../../models/education.model';
import type { CvSectionKey } from './tabs/tabs.model';

import { ProfileTabsComponent } from './tabs/tabs.component';
import { PersonalFormComponent } from './personal-form/personal-form.component';
import { ExperienceFormComponent } from './experience-form/experience-form.component';
import { EducationFormComponent } from './education-form/education-form.component';
import { SkillsFormComponent } from './skills-form/skills-form.component';

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
  templateUrl: './profile-info-form.component.html',
  styleUrl: './profile-info-form.component.scss',
})
export class ProfileInfoFormComponent {
  public activeTab: CvSectionKey = 'personal';

  public cvContent: CvContent = {
    personal: {
      firstName: '',
      lastName: '',
      email: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
  };

  public onSkillsChange(skills: string[]): void {
    this.cvContent = { ...this.cvContent, skills };
  }

  public onPersonalChange(personal: CvContent['personal']): void {
    this.cvContent = { ...this.cvContent, personal };
  }

  public onExperienceChange(experience: Experience[]): void {
    this.cvContent = { ...this.cvContent, experience };
  }

  public onEducationChange(education: Education[]): void {
    this.cvContent = { ...this.cvContent, education };
  }
}
