import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { ThemeService } from '../../../services/theme.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-theme-button',
  imports: [MatIconButton, MatIcon],
  templateUrl: './theme-button.component.html',
  styleUrl: './theme-button.component.scss',
})
export class ThemeButtonComponent {
  public themeService = inject(ThemeService);

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
