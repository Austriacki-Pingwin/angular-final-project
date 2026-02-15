import { Component } from '@angular/core';
import { ProfileTabsComponent } from '../creator-page/profile-tabs/profile-tabs.component';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileTabsComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  host: { class: 'content' },
})
export class ProfilePageComponent {}
