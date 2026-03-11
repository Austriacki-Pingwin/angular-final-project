import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TranslatePipe } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIcon,
    MatProgressSpinnerModule,
    NgxSkeletonLoaderModule,
    TranslatePipe,
    AsyncPipe,
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  public profile$ = this.userService.getUser();

  public onSignOut(): void {
    this.authService.signOut();
  }
}
