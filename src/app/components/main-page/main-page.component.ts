import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { MyResumesComponent } from './my-resumes/my-resumes.component';

@Component({
  selector: 'app-main-page',
  imports: [MatToolbarModule, MatButtonModule, ProfileCardComponent, MyResumesComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  host: { class: 'content' },
})
export class MainPageComponent {}
