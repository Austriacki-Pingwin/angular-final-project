import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

// type ProfileBlock =
//   | 'personal'
//   | 'links'
//   | 'about'
//   | 'skills'
//   | 'languages'
//   | 'experience'
//   | 'education';

@Component({
  selector: 'app-block-page',
  imports: [],
  templateUrl: './block-page.component.html',
  styleUrl: './block-page.component.scss',
  host: { class: 'content' },
})
export class BlockPageComponent {
  public blockId = toSignal(
    inject(ActivatedRoute).paramMap.pipe(map((params) => params.get('blockId'))),
  );
}
