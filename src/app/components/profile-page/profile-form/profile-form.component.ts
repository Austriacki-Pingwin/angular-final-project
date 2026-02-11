import { Component } from '@angular/core';
import { ProfileTabsComponent } from './tabs/tabs.component';
import { type ProfileBlockType } from '../../../models/collections.model';
import { ViewEncapsulation } from '@angular/core';
import { ProfileBlockComponent } from '../profile-block/profile-block.component';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ProfileTabsComponent, ProfileBlockComponent],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProfileFormComponent {
  public activeTab: ProfileBlockType = 'personal';
}
