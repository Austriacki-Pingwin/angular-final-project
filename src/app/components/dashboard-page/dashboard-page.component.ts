import { Component, inject } from '@angular/core';
import { type User } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  private activatedRouter = inject(ActivatedRoute);
  private authService = inject(AuthService);

  public onSignOut(): void {
    this.authService.signOut();
  }

  // * get the user from the route (with is injected by the userResolver)
  public user: User = this.activatedRouter.snapshot.data['user'];

  constructor() {
    console.log('Logged in user: ', this.user);
  }
}
