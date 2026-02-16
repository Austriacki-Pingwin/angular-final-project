import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password-page',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    TranslatePipe,
  ],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.scss',
})
export class ForgotPasswordPageComponent {
  private fromBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  public readonly isPasswordResetEmailSent = this.authService.isPasswordResetEmailSent;
  public readonly errorMessage = this.authService.errorMessage;
  public readonly isSubmissionInProgress = this.authService.isSubmissionInProgress;

  public form = this.fromBuilder.nonNullable.group({
    email: ['', Validators.required],
  });

  public onSubmit(): void {
    if (this.form.invalid) return;
    const form = this.form.getRawValue();

    // * resent the password by sending a reset password link
    this.authService.resetPassword(form);
  }
}
