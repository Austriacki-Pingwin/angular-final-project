import { type ErrorHandler, inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/shared/dialog/dialog.component';
import { ErrorItemComponent } from '../components/shared/dialog/error-item/error-item.component';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorService implements ErrorHandler {
  private dialog = inject(MatDialog);

  public handleError(error: unknown): void {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';

    this.dialog.open(DialogComponent, {
      width: '500px',
      panelClass: 'error-dialog',
      backdropClass: 'error-backdrop',
      disableClose: true,
      data: {
        component: ErrorItemComponent,
        inputs: { msg: message },
        buttonText: 'Ok',
      },
    });

    console.error(error);
  }
}
