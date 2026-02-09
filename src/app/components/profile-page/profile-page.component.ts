import { Component } from '@angular/core';
import { ProfileFormComponent } from './profile-form/profile-form.component';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileFormComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  host: { class: 'content' },
})
export class ProfilePageComponent {}
