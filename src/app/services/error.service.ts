import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private _errorMessage = signal<string>('');

  public readonly errorMessage = this._errorMessage.asReadonly();

  public showError(msg: string): void {
    this._errorMessage.set(msg);
  }

  public clearError(): void {
    this._errorMessage.set('');
  }
}
