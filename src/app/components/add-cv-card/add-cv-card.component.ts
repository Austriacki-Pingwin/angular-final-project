import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-add-cv-card',
  imports: [MatIcon],
  templateUrl: './add-cv-card.component.html',
  styleUrl: './add-cv-card.component.scss',
})
export class AddCvCardComponent {
  public addCvConfig = {
    icon: 'add_2',
    title: 'Create New CV',
    description: 'Start from scratch or upload',
  };

  public onClick(): void {
    console.log('Add Cv');
  }
}
