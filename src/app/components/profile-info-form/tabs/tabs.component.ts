import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

import { PROFILE_TABS } from './tabs.model';
import type { CvSectionKey } from './tabs.model';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class ProfileTabsComponent {
  @Input({ required: true })
  public activeTab!: CvSectionKey;

  @Output()
  public tabChange = new EventEmitter<CvSectionKey>();

  public readonly tabs = PROFILE_TABS;

  public onTabChange(index: number): void {
    this.tabChange.emit(this.tabs[index].key);
  }

  public get selectedIndex(): number {
    const index = this.tabs.findIndex((t) => t.key === this.activeTab);
    return index === -1 ? 0 : index;
  }
}
