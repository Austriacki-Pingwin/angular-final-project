import type { CvContent } from '../../../models/cv-content.model';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { type Personal } from '../../../models/blocks.model';
import { ProfileService } from '../../../services/profile.service';
import { MatButton } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';

export type PersonalFormData = Pick<CvContent, 'personal'>;

@Component({
  selector: 'app-personal-form',
  imports: [AsyncPipe, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButton],
  templateUrl: './personal-form.component.html',
  styleUrl: './personal-form.component.scss',
})
export class PersonalFormComponent {
  private profileService = inject(ProfileService);

  public personal$ = this.profileService.getBlocks<Personal>('personal');

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

    this.profileService
      .createBlock('personal', {
        id: crypto.randomUUID(),
        ...this.form.getRawValue(),
      })
      .subscribe({
        error: (err) => {
          console.error('Create personal block failed', err);
        },
      });
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
