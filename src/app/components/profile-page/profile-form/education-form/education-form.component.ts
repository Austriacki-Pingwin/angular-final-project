import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import type { Education } from '../../../../models/blocks.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { ProfileService } from '../../../../services/profile.service';
import { ProfileBlockComponent } from '../../profile-block/profile-block.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-education-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ProfileBlockComponent,
    AsyncPipe,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.scss',
})
export class EducationFormComponent {
  private profileService = inject(ProfileService);

  public education$ = this.profileService.getBlocks<Education>('education');

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

    this.profileService
      .createBlock('education', {
        id: crypto.randomUUID(),
        ...this.form.getRawValue(),
      })
      .subscribe();
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
