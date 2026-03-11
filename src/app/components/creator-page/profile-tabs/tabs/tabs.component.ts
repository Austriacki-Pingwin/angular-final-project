import { Component, input, output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import type { ProfileBlockType } from '../../../../models/collections.model';
import { TranslatePipe } from '@ngx-translate/core';
export const PROFILE_TABS = [
  'photo',
  'personal',
  'links',
  'about',
  'skills',
  'languages',
  'experience',
  'education',
] as const;

export const PROFILE_TABS_CONFIG = PROFILE_TABS.map((key) => ({
  key,
  labelKey: `TABS.${key.toUpperCase()}`,
}));
@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [MatTabsModule, TranslatePipe],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  public activeTab = input.required<ProfileBlockType>();
  public tabChange = output<ProfileBlockType>();

  public readonly tabs = PROFILE_TABS_CONFIG;

  public onTabChange(index: number): void {
    this.tabChange.emit(this.tabs[index].key);
  }

  public get selectedIndex(): number {
    const index = this.tabs.findIndex((t) => t.key === this.activeTab());
    return index === -1 ? 0 : index;
  }
}
