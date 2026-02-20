import {
  EnvironmentInjector,
  inject,
  Injectable,
  runInInjectionContext,
  signal,
} from '@angular/core';
import {
  Auth,
  AuthErrorCodes,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private _errorMessage = signal<string>('');
  public _isSubmissionInProgress = signal<boolean>(false);
  public _isPasswordResetEmailSent = signal<boolean>(false);
  private injectionContext = inject(EnvironmentInjector);

  // * init the google auth provider
  public googleAuthProvider = new GoogleAuthProvider();

  // * auth instance
  public auth = inject(Auth);

  public readonly uid$ = user(this.auth).pipe(
    filter((u): u is NonNullable<typeof u> => !!u),
    map((u) => u.uid),
  );

  public readonly errorMessage = this._errorMessage.asReadonly();
  public readonly isSubmissionInProgress = this._isSubmissionInProgress.asReadonly();
  public readonly isPasswordResetEmailSent = this._isPasswordResetEmailSent.asReadonly();

  public signInWithEmailAndPassword(form: { email: string; password: string }): void {
    runInInjectionContext(this.injectionContext, () => {
      signInWithEmailAndPassword(this.auth, form.email, form.password)
        .then(() => {
          this._isSubmissionInProgress.set(false);
          this._errorMessage.set('');

          this.redirectToMain();
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
    });
  }

  public createUserWithEmailAndPassword(form: { email: string; password: string }): void {
    runInInjectionContext(this.injectionContext, () => {
      createUserWithEmailAndPassword(this.auth, form.email, form.password)
        .then(() => {
          this._isSubmissionInProgress.set(false);
          this._errorMessage.set('');

          this.redirectToMain();
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
    });
  }

  public onSignInWithGoogle(): void {
    runInInjectionContext(this.injectionContext, () => {
      signInWithPopup(this.auth, this.googleAuthProvider)
        .then(() => {
          this._isSubmissionInProgress.set(false);
          this._errorMessage.set('');

          this.redirectToMain();
        })
        .catch((error) => {
          console.error('error: ', error);
          this._errorMessage.set('Something went wrong, please try again');
        });
    });
  }

  public signOut(): void {
    runInInjectionContext(this.injectionContext, () => {
      signOut(this.auth)
        .then(() => {
          this.redirectToSignIn();
        })
        .catch((error) => {
          console.error('Error occurred: ', error);
        });
    });
  }

  public resetPassword(form: { email: string }): void {
    runInInjectionContext(this.injectionContext, () => {
      sendPasswordResetEmail(this.auth, form.email)
        .then(() => {
          this._isPasswordResetEmailSent.set(true);
          this._isSubmissionInProgress.set(false);
          this._errorMessage.set('');
        })
        .catch((error) => {
          console.error('Error reset: ', error);
          this._isSubmissionInProgress.set(false);
          this._errorMessage.set('An error occurred, please try again');
        });
    });
  }

  public redirectToMain(): void {
    this.router.navigate(['/']);
  }

  public redirectToSignIn(): void {
    this.router.navigate(['/auth/sign-in']);
  }
}
