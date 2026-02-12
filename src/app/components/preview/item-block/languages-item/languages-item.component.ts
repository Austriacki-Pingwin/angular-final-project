import { Component, input } from '@angular/core';
import { type Language } from '../../../../models/blocks.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-languages-item',
  imports: [CommonModule],
  templateUrl: './languages-item.component.html',
  styleUrl: './languages-item.component.scss',
})
export class LanguagesItemComponent {
  public data = input.required<Language[]>();

  public ngOnInit(): void {
    console.log(this.data());
  }
}
