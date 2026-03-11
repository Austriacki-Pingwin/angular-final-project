import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { CreateItemComponent } from '../shared/dialog/create-item/create-item.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-add-cv-card',
  imports: [MatIcon, TranslatePipe],
  templateUrl: './add-cv-card.component.html',
  styleUrl: './add-cv-card.component.scss',
})
export class AddCvCardComponent {
  private dialog = inject(MatDialog);

  public openDialog(): void {
    const ref = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        component: CreateItemComponent,
      },
    });

    ref.afterClosed().subscribe((result) => {
      console.log('Dialog result: ', result);
    });
  }
}
