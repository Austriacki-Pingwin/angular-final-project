import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { type Link } from '../../../../models/blocks.model';
import { ProfileService } from '../../../../services/profile.service';
import { MatButton } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { ProfileBlockComponent } from '../../profile-block/profile-block.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-link-form',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    ProfileBlockComponent,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './link-form.component.html',
  styleUrl: './link-form.component.scss',
})
export class LinkFormComponent {
  private profileService = inject(ProfileService);

  public links$ = this.profileService.getBlocks<Link>('links');

  public form = new FormGroup({
    label: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    url: new FormControl<string>('', {
      validators: [Validators.required],
    }),
  });

  public save(): void {
    if (this.form.invalid) return;

    this.profileService
      .createBlock('links', {
        id: crypto.randomUUID(),
        ...this.form.getRawValue(),
      })
      .subscribe({
        error: (err) => {
          console.error('Create link block failed', err);
        },
      });
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
