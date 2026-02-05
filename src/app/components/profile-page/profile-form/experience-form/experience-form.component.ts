import type { OnInit } from '@angular/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import type { Experience } from '../../../../models/experience.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

type ExperienceFormData = Experience[];

@Component({
  selector: 'app-experience-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './experience-form.component.html',
  styleUrl: './experience-form.component.scss',
})
export class ExperienceFormComponent implements OnInit {
  @Input({ required: true })
  public data!: ExperienceFormData;

  @Output()
  public experienceChange = new EventEmitter<ExperienceFormData>();

  public form!: FormGroup;

  public experiences!: FormArray;

  public ngOnInit(): void {
    this.experiences = new FormArray(this.data.map((item) => this.createExperienceGroup(item)));

    this.form = new FormGroup({
      experience: this.experiences,
    });

    this.form.valueChanges.subscribe((value) => {
      this.experienceChange.emit(value.experience);
    });
  }

  private createExperienceGroup(data?: Experience): FormGroup {
    return new FormGroup({
      id: new FormControl(data?.id ?? crypto.randomUUID()),
      position: new FormControl(data?.position ?? ''),
      company: new FormControl(data?.company ?? ''),
      startDate: new FormControl(data?.startDate ?? ''),
      endDate: new FormControl(data?.endDate ?? ''),
      description: new FormControl(data?.description ?? ''),
    });
  }

  public addExperience(): void {
    this.experiences.push(this.createExperienceGroup());
  }

  public removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }
}
