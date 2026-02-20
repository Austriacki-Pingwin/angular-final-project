import { type ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorService implements ErrorHandler {
  public handleError(error: unknown): void {
    console.error(error);
  }
}
