import type { CvContent } from '../../../../models/cv-content.model';
import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { type About } from '../../../../models/blocks.model';
import { ProfileService } from '../../../../services/profile.service';
import { MatButton } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { ProfileBlockComponent } from '../../profile-block/profile-block.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

export type PersonalFormData = Pick<CvContent, 'personal'>;

@Component({
  selector: 'app-about-form',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    ProfileBlockComponent,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './about-form.component.html',
  styleUrl: './about-form.component.scss',
})
export class AboutFormComponent {
  private profileService = inject(ProfileService);

  public about$ = this.profileService.getBlocks<About>('about');

  public form = new FormGroup({
    content: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });

  public save(): void {
    if (this.form.invalid) return;

    this.profileService
      .createBlock('about', {
        id: crypto.randomUUID(),
        ...this.form.getRawValue(),
      })
      .subscribe({
        error: (err) => {
          console.error('Create about block failed', err);
        },
      });
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
