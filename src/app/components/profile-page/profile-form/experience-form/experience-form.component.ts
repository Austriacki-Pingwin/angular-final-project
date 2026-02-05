import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import type { Experience } from '../../../../models/blocks.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProfileService } from '../../../../services/profile.service';
import { AsyncPipe } from '@angular/common';
import { ProfileBlockComponent } from '../../profile-block/profile-block.component';

@Component({
  selector: 'app-experience-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ProfileBlockComponent,
    AsyncPipe,
  ],
  templateUrl: './experience-form.component.html',
  styleUrl: './experience-form.component.scss',
})
export class ExperienceFormComponent {
  private profileService = inject(ProfileService);

  public experience$ = this.profileService.getBlocks<Experience>('experience');

  public form = new FormGroup({
    position: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    company: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    location: new FormControl(''),
    startDate: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    endDate: new FormControl(''),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public save(): void {
    if (this.form.invalid) return;

    this.profileService
      .createBlock('experience', {
        id: crypto.randomUUID(),
        ...this.form.getRawValue(),
      })
      .subscribe({
        error: (err) => {
          console.error('Create experience block failed', err);
        },
      });
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
