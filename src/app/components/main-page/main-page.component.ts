import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { CvService } from '../../services/cv.service';
import { MyResumesComponent } from './my-resumes/my-resumes.component';

@Component({
  selector: 'app-main-page',
  imports: [MatToolbarModule, MatButtonModule, ProfileCardComponent, MyResumesComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  host: { class: 'content' },
})
export class MainPageComponent {
  private cvService = inject(CvService);

  public cvs$ = this.cvService.getFullCvs();
}
