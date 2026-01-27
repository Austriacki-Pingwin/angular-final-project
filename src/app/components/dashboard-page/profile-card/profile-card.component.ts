import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile-card',
  imports: [MatCardModule, MatButtonModule, MatIcon, MatProgressSpinnerModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  public profile = this.userService.profile;

  public onSignOut(): void {
    this.authService.signOut();
  }
}
