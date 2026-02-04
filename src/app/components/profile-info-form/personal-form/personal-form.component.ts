import type { CvContent } from '../../../models/cv-content.model';
import type { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export type PersonalFormData = Pick<CvContent, 'personal'>;

@Component({
  selector: 'app-personal-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './personal-form.component.html',
  styleUrl: './personal-form.component.scss',
})
export class PersonalFormComponent implements OnInit, OnChanges {
  @Input({ required: true })
  public data!: PersonalFormData;

  @Output()
  public personalChange = new EventEmitter<PersonalFormData['personal']>();

  public form = new FormGroup({
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    email: new FormControl<string>(''),
    phone: new FormControl<string>(''),
    location: new FormControl<string>(''),
    website: new FormControl<string>(''),
    linkedin: new FormControl<string>(''),
    github: new FormControl<string>(''),
  });

  public ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.personalChange.emit({
        firstName: value.firstName ?? '',
        lastName: value.lastName ?? '',
        email: value.email ?? '',
        phone: value.phone ?? '',
        location: value.location ?? '',
        website: value.website ?? '',
        linkedin: value.linkedin ?? '',
        github: value.github ?? '',
      });
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const dataChange = changes['data'];

    if (
      dataChange !== undefined &&
      dataChange.currentValue !== undefined &&
      dataChange.currentValue !== null
    ) {
      this.form.patchValue(dataChange.currentValue.personal);
    }
  }
}
