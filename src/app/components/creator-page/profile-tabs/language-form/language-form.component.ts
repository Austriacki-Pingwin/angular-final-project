import { Component, effect, inject, input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import type { Language } from '../../../../models/blocks.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-language-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
    MatOption,
    MatSelect,
    TranslatePipe,
  ],
  templateUrl: './language-form.component.html',
  styleUrl: './language-form.component.scss',
})
export class LanguageFormComponent {
  private dialogRef = inject(MatDialogRef);
  public item = input<Language | null>(null);
  constructor() {
    effect(() => {
      const value = this.item();
      if (!value) return;

      this.form.patchValue({
        name: value.name,
        proficiency: value.proficiency,
      });
    });
  }

  public form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    proficiency: new FormControl<'Beginner' | 'Intermediate' | 'Advanced' | 'Native'>('Native', {
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
