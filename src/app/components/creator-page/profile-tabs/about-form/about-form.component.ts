import { Component, effect, inject, input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatDialogRef } from '@angular/material/dialog';
import type { About } from '../../../../models/blocks.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    NgxSkeletonLoaderModule,
    TranslatePipe,
  ],
  templateUrl: './about-form.component.html',
  styleUrl: './about-form.component.scss',
})
export class AboutFormComponent {
  private dialogRef = inject(MatDialogRef);
  public item = input<About | null>(null);
  constructor() {
    effect(() => {
      const value = this.item();
      if (!value) return;

      this.form.patchValue({
        content: value.content,
      });
    });
  }

  public form = new FormGroup({
    content: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(10)],
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
