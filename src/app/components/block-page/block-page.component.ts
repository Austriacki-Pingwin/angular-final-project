import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-block-page',
  imports: [],
  templateUrl: './block-page.component.html',
  styleUrl: './block-page.component.scss',
  host: { class: 'content' },
})
export class BlockPageComponent {
  private route = inject(ActivatedRoute);

  public blockId = signal<string>(this.route.snapshot.paramMap.get('blockId') ?? '');
}
