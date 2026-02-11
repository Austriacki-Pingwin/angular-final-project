import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-education-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.scss',
})
export class EducationFormComponent {
  private dialogRef = inject(MatDialogRef);

  public form = new FormGroup({
    degree: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    institution: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    location: new FormControl<string>(''),
    startDate: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    endDate: new FormControl<string>(''),
    description: new FormControl<string>(''),
  });

  public save(): void {
    if (this.form.invalid) return;
    this.dialogRef.close({
      id: crypto.randomUUID(),
      ...this.form.getRawValue(),
    });
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
