import { Component } from '@angular/core';

@Component({
  selector: 'app-fallback',
  imports: [],
  templateUrl: './fallback.component.html',
  styleUrl: './fallback.component.scss',
})
export class FallbackComponent {
  public onTryAgain(): void {
    window.location.reload();
  }
}
