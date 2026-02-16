import { type ErrorHandler, inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorService implements ErrorHandler {
  private dialog = inject(MatDialog);

  public handleError(error: unknown): void {
    console.error(error);
  }
}
