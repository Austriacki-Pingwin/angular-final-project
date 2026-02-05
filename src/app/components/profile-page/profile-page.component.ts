import { Component } from '@angular/core';
import { ProfileInfoFormComponent } from '../profile-info-form/profile-info-form.component';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileInfoFormComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  host: { class: 'content' },
})
export class ProfilePageComponent {}
