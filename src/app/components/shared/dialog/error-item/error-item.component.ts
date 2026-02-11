import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'app-error-item',
  imports: [],
  templateUrl: './error-item.component.html',
  styleUrl: './error-item.component.scss',
})
export class ErrorItemComponent {
  private dialogRef = inject(DialogRef);
  public msg = input<string>();

  public onClose(): void {
    this.dialogRef.close({ saved: true });
  }
}
