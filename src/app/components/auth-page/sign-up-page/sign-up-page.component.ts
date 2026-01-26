import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sign-up-page',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    MatProgressSpinnerModule,
  ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
})
export class SignUpPageComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  public errorMessage = this.authService.errorMessage;
  public isSubmissionInProgress = this.authService.isSubmissionInProgress;

  public form = this.formBuilder.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  public onSubmit(): void {
    if (this.form.invalid) return;
    this.authService._isSubmissionInProgress.set(true);
    const form = this.form.getRawValue();
    this.authService.createUserWithEmailAndPassword(form);
  }

  public onSignInWithGoogle(): void {
    this.authService.onSignInWithGoogle();
  }
}
