import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CvService } from '../../../../services/cv.service';

@Component({
  selector: 'app-create-item',
  imports: [MatFormFieldModule, ReactiveFormsModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.scss',
})
export class CreateItemComponent {
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef);
  private cvService = inject(CvService);

  public errorMessages = signal('');
  public loading = signal(false);

  public form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  });

  public updateErrorMessage(): void {
    if (this.form.controls.title.hasError('required')) {
      this.errorMessages.set('You must enter a title.');
    } else if (this.form.controls.title.hasError('maxlength')) {
      this.errorMessages.set('Your id must be less than 20 characters.');
    } else if (this.form.controls.title.hasError('minlength')) {
      this.errorMessages.set('Your id must be more than 3 characters.');
    } else {
      this.errorMessages.set('');
    }
  }

  public onSubmit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    const form = this.form.getRawValue();
    this.cvService.createCv(form.title).subscribe({
      next: () => {
        this.loading.set(false);
        this.dialogRef.close();
      },
      error: (err) => {
        this.loading.set(false);
        console.error('Create item failed', err);
      },
    });
  }
}
