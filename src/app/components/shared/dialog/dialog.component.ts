import { type ComponentType } from '@angular/cdk/overlay';
import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

export type DialogData<T = unknown> = {
  component: ComponentType<T>;
  inputs?: Partial<T>;
  buttonText?: string;
};

@Component({
  selector: 'app-dialog',
  imports: [NgComponentOutlet, MatButtonModule, MatDialogActions, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  private dialogRef = inject(MatDialogRef<DialogComponent>);
  public readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  public close(): void {
    this.dialogRef.close();
  }
}
