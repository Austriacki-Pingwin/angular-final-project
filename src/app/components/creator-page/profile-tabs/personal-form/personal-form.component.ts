import { Component, effect, inject, input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatDialogRef } from '@angular/material/dialog';
import type { Personal } from '../../../../models/blocks.model';

@Component({
  selector: 'app-personal-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './personal-form.component.html',
  styleUrl: './personal-form.component.scss',
})
export class PersonalFormComponent {
  private dialogRef = inject(MatDialogRef);
  public item = input<Personal | null>(null);

  constructor() {
    effect(() => {
      const value = this.item();
      if (!value) return;

      this.form.patchValue({
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        phone: value.phone,
        location: value.location,
      });
    });
  }

  public form = new FormGroup({
    firstName: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    lastName: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl<string>('', {
      validators: [Validators.pattern(/^\d{9}$/)],
    }),
    location: new FormControl<string>(''),
  });

  public save(): void {
    if (this.form.invalid) return;
    this.dialogRef.close({
      id: this.item()?.id ?? crypto.randomUUID(),
      ...this.form.getRawValue(),
    });
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
