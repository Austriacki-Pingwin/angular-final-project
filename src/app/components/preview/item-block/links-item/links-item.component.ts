import { Component, input } from '@angular/core';
import { type Link } from '../../../../models/blocks.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-links-item',
  imports: [CommonModule],
  templateUrl: './links-item.component.html',
  styleUrl: './links-item.component.scss',
  host: { class: 'links' },
})
export class LinksItemComponent {
  public data = input.required<Link[]>();
}
