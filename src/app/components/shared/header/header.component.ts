import { Component } from '@angular/core';
import { MatButton, MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ThemeButtonComponent } from '../theme-button/theme-button.component';

@Component({
  selector: 'app-header',
  imports: [MatButton, MatAnchor, MatIcon, RouterLink, ThemeButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
