import { Component, input } from '@angular/core';
import { JsonPipe } from '@angular/common';
import type { FullCV } from '../../models/cv.model';

@Component({
  selector: 'app-preview',
  imports: [JsonPipe],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent {
  public cv = input.required<FullCV>();
  // public cv = input.required<string>();
}
