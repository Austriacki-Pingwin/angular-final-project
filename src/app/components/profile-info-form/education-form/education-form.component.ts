import type { OnInit } from '@angular/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import type { Education } from '../../../models/education.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-education-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.scss',
})
export class EducationFormComponent implements OnInit {
  @Input({ required: true })
  public data!: Education[];

  @Output()
  public educationChange = new EventEmitter<Education[]>();

  public form!: FormGroup;
  public educations!: FormArray;

  public ngOnInit(): void {
    this.educations = new FormArray(this.data.map((item) => this.createEducationGroup(item)));

    this.form = new FormGroup({
      education: this.educations,
    });

    this.form.valueChanges.subscribe((value) => {
      this.educationChange.emit(value.education);
    });
  }

  private createEducationGroup(data?: Education): FormGroup {
    return new FormGroup({
      id: new FormControl(data?.id ?? crypto.randomUUID()),
      degree: new FormControl(data?.degree ?? ''),
      startDate: new FormControl(data?.startDate ?? ''),
      endDate: new FormControl(data?.endDate ?? ''),
    });
  }

  public addEducation(): void {
    this.educations.push(this.createEducationGroup());
  }

  public removeEducation(index: number): void {
    this.educations.removeAt(index);
  }
}
