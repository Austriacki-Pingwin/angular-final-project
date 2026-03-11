import { Component, effect, inject, input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatDialogRef } from '@angular/material/dialog';
import type { Experience } from '../../../../models/blocks.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-experience-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxSkeletonLoaderModule,
    TranslatePipe,
  ],
  templateUrl: './experience-form.component.html',
  styleUrl: './experience-form.component.scss',
})
export class ExperienceFormComponent {
  private dialogRef = inject(MatDialogRef);
  public item = input<Experience | null>(null);
  constructor() {
    effect(() => {
      const value = this.item();
      if (!value) return;

      this.form.patchValue({
        position: value.position,
        company: value.company,
        location: value.location,
        startDate: value.startDate,
        endDate: value.endDate,
        description: value.description,
      });
    });
  }

  public form = new FormGroup({
    position: new FormControl('', {
      validators: [Validators.required],
    }),
    company: new FormControl('', {
      validators: [Validators.required],
    }),
    location: new FormControl(''),
    startDate: new FormControl('', {
      validators: [Validators.required],
    }),
    endDate: new FormControl(''),
    description: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  public save(): void {
    if (this.form.invalid) return;
    this.dialogRef.close({
      id: this.item()?.id ?? crypto.randomUUID(),
      ...this.form.getRawValue(),
    });
    this.form.reset();
  }
}
