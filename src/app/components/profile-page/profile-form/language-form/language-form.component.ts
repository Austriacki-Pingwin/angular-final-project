import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { type Language } from '../../../../models/blocks.model';
import { ProfileService } from '../../../../services/profile.service';
import { ProfileBlockComponent } from '../../profile-block/profile-block.component';
import { AsyncPipe } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-language-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ProfileBlockComponent,
    AsyncPipe,
    NgxSkeletonLoaderModule,
    MatOption,
    MatSelect,
  ],
  templateUrl: './language-form.component.html',
  styleUrl: './language-form.component.scss',
})
export class LanguageFormComponent {
  private profileService = inject(ProfileService);

  public languages$ = this.profileService.getBlocks<Language>('languages');

  public isLoading = this.languages$.pipe();
  public form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    proficiency: new FormControl<'Beginner' | 'Intermediate' | 'Advanced' | 'Native'>('Native', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public save(): void {
    if (this.form.invalid) return;

    this.profileService
      .createBlock('languages', {
        id: crypto.randomUUID(),
        ...this.form.getRawValue(),
      })
      .subscribe({
        error: (err) => {
          console.error('Create language block failed', err);
        },
      });
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
