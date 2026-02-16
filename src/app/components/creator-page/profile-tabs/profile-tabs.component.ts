import { Component } from '@angular/core';
import { TabsComponent } from './tabs/tabs.component';
import { type ProfileBlockType } from '../../../models/collections.model';
import { ProfileBlockComponent } from '../profile-block/profile-block.component';

@Component({
  selector: 'app-profile-tabs',
  standalone: true,
  imports: [TabsComponent, ProfileBlockComponent],
  templateUrl: './profile-tabs.component.html',
  styleUrl: './profile-tabs.component.scss',
})
export class ProfileTabsComponent {
  public activeTab: ProfileBlockType = 'personal';
}
