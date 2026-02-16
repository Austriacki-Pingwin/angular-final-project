import { Component, inject } from '@angular/core';
import { MatButton, MatAnchor } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ThemeButtonComponent } from '../theme-button/theme-button.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [MatButton, MatAnchor, MatIcon, RouterLink, ThemeButtonComponent, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private translate = inject(TranslateService);

  public get currentLang(): string {
    return this.translate.getCurrentLang();
  }

  public switchLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
