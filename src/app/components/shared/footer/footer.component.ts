import { Component } from '@angular/core';
import { MatButton, MatAnchor, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-footer',
  imports: [MatButton, MatAnchor, MatIconButton],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  public year = new Date().getFullYear();
}
