import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CvService } from '../../services/cv.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { CreateItemComponent } from '../shared/dialog/create-item/create-item.component';

@Component({
  selector: 'app-add-cv-card',
  imports: [MatIcon],
  templateUrl: './add-cv-card.component.html',
  styleUrl: './add-cv-card.component.scss',
})
export class AddCvCardComponent {
  private cvService = inject(CvService);
  private dialog = inject(MatDialog);
  public addCvConfig = {
    icon: 'add_2',
    title: 'Create New CV',
    description: 'Start from scratch or upload',
  };

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
