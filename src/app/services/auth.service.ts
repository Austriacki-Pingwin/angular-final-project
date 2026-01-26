import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  AuthErrorCodes,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private _errorMessage = signal<string>('');
  public _isSubmissionInProgress = signal<boolean>(false);

  // * init the google auth provider
  public googleAuthProvider = new GoogleAuthProvider();

  // * auth instance
  public auth = inject(Auth);

  public readonly errorMessage = this._errorMessage.asReadonly();
  public isSubmissionInProgress = this._isSubmissionInProgress.asReadonly();

  public signInWithEmailAndPassword(form: { email: string; password: string }): void {
    signInWithEmailAndPassword(this.auth, form.email, form.password)
      .then(() => {
        this.redirectToDashboard();
      })
      .catch((error) => {
        this._isSubmissionInProgress.set(false);
        console.error('error: ', error);
        if (error instanceof Error) {
          if (error.message.includes(AuthErrorCodes.INVALID_EMAIL)) {
            this._errorMessage.set('Email is not valid');
          } else if (error.message.includes(AuthErrorCodes.INVALID_LOGIN_CREDENTIALS)) {
            this._errorMessage.set('Invalid Email/Password');
          } else if (error.message.includes(AuthErrorCodes.WEAK_PASSWORD)) {
            this._errorMessage.set('Please enter a stronger password');
          } else if (error.message.includes(AuthErrorCodes.EMAIL_EXISTS)) {
            this._errorMessage.set('The email is already used for another account');
          } else {
            this._errorMessage.set('Something went wrong, please try again');
          }
        }
      });
  }

  public onSignInWithGoogle(): void {
    signInWithPopup(this.auth, this.googleAuthProvider)
      .then(() => this.redirectToDashboard())
      .catch((error) => {
        console.error('error: ', error);
        this._errorMessage.set('Something went wrong, please try again');
      });
  }

  public redirectToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
