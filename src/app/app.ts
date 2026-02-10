import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ErrorService } from './services/error.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ErrorDialogComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  public error = inject(ErrorService).errorMessage;
}
