import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in-page',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatIcon,
    TranslatePipe,
  ],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
})
export class SignInPageComponent {
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
    this.authService.signInWithEmailAndPassword(form);
  }

  public onSignInWithGoogle(): void {
    this.authService.onSignInWithGoogle();
  }
}
