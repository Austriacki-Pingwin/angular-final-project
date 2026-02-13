import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  public success(message: string): void {
    this.snackBar.open(message, undefined, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  public error(message: string): void {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
