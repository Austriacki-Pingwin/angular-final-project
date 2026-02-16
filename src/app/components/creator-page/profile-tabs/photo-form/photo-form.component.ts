import { ChangeDetectorRef, Component, effect, inject, input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatDialogRef } from '@angular/material/dialog';
import type { Photo } from '../../../../models/blocks.model';
// import { NotificationService } from '../../../../services/notification.service';

const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/x-png'];
@Component({
  selector: 'app-photo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './photo-form.component.html',
  styleUrl: './photo-form.component.scss',
})
export class PhotoFormComponent {
  private dialogRef = inject(MatDialogRef);
  private changeDetectorRef = inject(ChangeDetectorRef);
  // private notificationService = inject(NotificationService);

  public item = input<Photo | null>(null);
  public isUploading = false;
  public selectedFile: File | null = null;
  public imagePreview: string | null = null;
  constructor() {
    effect(() => {
      const value = this.item();
      if (!value) return;

      this.form.patchValue({
        title: value.title,
        imageBase64: value.imageBase64,
      });

      this.imagePreview = value.imageBase64;
    });
  }

  public form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    imageBase64: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
  });

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files === null || input.files.length === 0) return;

    const file = input.files[0];
    if (!allowedTypes.includes(file.type)) {
      // todo notification
      return;
    }
    if (file.size > 400_000) {
      //todo notification
      return;
    }

    const reader = new FileReader();
    reader.onload = (): void => {
      const base64 = reader.result as string;
      this.imagePreview = base64;
      this.form.patchValue({ imageBase64: base64 });

      this.changeDetectorRef.detectChanges();
    };
    reader.readAsDataURL(file);
  }

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
