import { Component, effect, inject, input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatDialogRef } from '@angular/material/dialog';
import type { Skill } from '../../../../models/blocks.model';

@Component({
  selector: 'app-skills-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './skills-form.component.html',
  styleUrl: './skills-form.component.scss',
})
export class SkillsFormComponent {
  private dialogRef = inject(MatDialogRef);
  public item = input<Skill | null>(null);
  constructor() {
    effect(() => {
      const value = this.item();
      if (!value) return;

      this.form.patchValue({
        title: value.title,
      });
    });
  }

  public form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
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
