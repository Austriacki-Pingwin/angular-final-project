import { Component, effect, inject } from '@angular/core';
// import { type User } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [MatToolbarModule, MatButtonModule, MatIcon],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  private activatedRouter = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  public profile = this.userService.profile;

  /*   // * get the user from the route (with is injected by the userResolver)
  public user: User = this.activatedRouter.snapshot.data['user']; */

  constructor() {
    // console.log('Logged in user: ', this.user);
    effect(() => {
      console.log(this.profile());
    });
  }

  public onSignOut(): void {
    this.authService.signOut();
  }
}
