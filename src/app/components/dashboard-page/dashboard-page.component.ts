import { Component } from '@angular/core';
import { ProfileCardComponent } from './profile-card/profile-card.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [ProfileCardComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {}
