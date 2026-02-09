import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  AuthErrorCodes,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  authState,
  type User,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { filter, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private _errorMessage = signal<string>('');
  public _isSubmissionInProgress = signal<boolean>(false);
  public _isPasswordResetEmailSent = signal<boolean>(false);

  // * init the google auth provider
  public googleAuthProvider = new GoogleAuthProvider();

  // * auth instance
  public auth = inject(Auth);

  public readonly uid$ = user(this.auth).pipe(
    filter((u): u is NonNullable<typeof u> => !!u),
    map((u) => u.uid),
  );

  public uid = this.auth.currentUser?.uid;

  public readonly errorMessage = this._errorMessage.asReadonly();
  public readonly isSubmissionInProgress = this._isSubmissionInProgress.asReadonly();
  public readonly isPasswordResetEmailSent = this._isPasswordResetEmailSent.asReadonly();

  constructor() {
    authState(this.auth)
      .pipe(
        filter((user): user is User => !!user),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((user) => {
        this.userService.getUser(user.uid);
      });
  }

  public signInWithEmailAndPassword(form: { email: string; password: string }): void {
    signInWithEmailAndPassword(this.auth, form.email, form.password)
      .then(async () => {
        const user = this.auth.currentUser;
        if (user) {
          await this.userService.ensureUserExists(user);
        }

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
  }

  public createUserWithEmailAndPassword(form: { email: string; password: string }): void {
    createUserWithEmailAndPassword(this.auth, form.email, form.password)
      .then(async () => {
        const user = this.auth.currentUser;
        if (user) {
          await this.userService.ensureUserExists(user);
        }

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
  }

  public onSignInWithGoogle(): void {
    signInWithPopup(this.auth, this.googleAuthProvider)
      .then(async () => {
        const user = this.auth.currentUser;

        if (user) {
          await this.userService.ensureUserExists(user);
        }
        this._isSubmissionInProgress.set(false);
        this._errorMessage.set('');

        this.redirectToMain();
      })
      .catch((error) => {
        console.error('error: ', error);
        this._errorMessage.set('Something went wrong, please try again');
      });
  }

  public signOut(): void {
    signOut(this.auth)
      .then(() => {
        this.redirectToSignIn();
        this.userService.clear();
      })
      .catch((error) => {
        console.error('Error occurred: ', error);
      });
  }

  public resetPassword(form: { email: string }): void {
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
  }

  public redirectToMain(): void {
    this.router.navigate(['/']);
  }

  public redirectToSignIn(): void {
    this.router.navigate(['/auth/sign-in']);
  }
}
