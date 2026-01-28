import { Component, effect, inject } from '@angular/core';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { CvService } from '../../services/cv.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [ProfileCardComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  private cvService = inject(CvService);

  constructor() {
    effect(() => {
      console.log(this.cvService.cvs());
    });
  }
}
