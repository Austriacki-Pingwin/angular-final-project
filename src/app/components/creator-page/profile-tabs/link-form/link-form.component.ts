import { Component, effect, inject, input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatDialogRef } from '@angular/material/dialog';
import type { Link } from '../../../../models/blocks.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-link-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    NgxSkeletonLoaderModule,
    TranslatePipe,
  ],
  templateUrl: './link-form.component.html',
  styleUrl: './link-form.component.scss',
})
export class LinkFormComponent {
  private dialogRef = inject(MatDialogRef);
  public item = input<Link | null>(null);

  constructor() {
    effect(() => {
      const value = this.item();
      if (!value) return;

      this.form.patchValue({
        label: value.label,
        url: value.url,
      });
    });
  }

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
    this.dialogRef.close({
      id: this.item()?.id ?? crypto.randomUUID(),
      ...this.form.getRawValue(),
    });
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
