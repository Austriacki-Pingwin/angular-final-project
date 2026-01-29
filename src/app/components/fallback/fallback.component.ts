import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-fallback',
  imports: [MatButton],
  templateUrl: './fallback.component.html',
  styleUrl: './fallback.component.scss',
})
export class FallbackComponent {
  public onTryAgain(): void {
    window.location.reload();
  }
}
