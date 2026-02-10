import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { ErrorService } from '../../services/error.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-error-dialog',
  imports: [MatButton],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDialogComponent implements AfterViewInit {
  public msg = input<string>();
  private errorService = inject(ErrorService);
  private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  public ngAfterViewInit(): void {
    this.dialog().nativeElement.showModal();
  }

  public onClearError(): void {
    this.errorService.clearError();
  }
}
