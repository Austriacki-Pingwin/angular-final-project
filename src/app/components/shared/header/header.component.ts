import { Component, inject } from '@angular/core';
import { MatButton, MatAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ThemeButtonComponent } from '../theme-button/theme-button.component';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    MatButton,
    MatAnchor,
    MatIcon,
    RouterLink,
    ThemeButtonComponent,
    MatIconButton,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private translate = inject(TranslateService);
  public authService = inject(AuthService);

  public get currentLang(): string {
    return this.translate.getCurrentLang();
  }

  public switchLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
