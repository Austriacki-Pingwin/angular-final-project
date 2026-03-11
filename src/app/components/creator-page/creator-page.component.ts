import { Component, inject, input, type OnInit } from '@angular/core';
import { ProfileTabsComponent } from './profile-tabs/profile-tabs.component';
import { PreviewComponent } from '../preview/preview.component';
import { CvService } from '../../services/cv.service';
import type { FullCV } from '../../models/cv.model';
import { type Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-creator-page',
  imports: [ProfileTabsComponent, PreviewComponent, AsyncPipe],
  templateUrl: './creator-page.component.html',
  styleUrl: './creator-page.component.scss',
})
export class CreatorPageComponent implements OnInit {
  private cvService = inject(CvService);
  public cvId = input.required<string>();
  public cv$!: Observable<FullCV>;

  public ngOnInit(): void {
    this.cv$ = this.cvService.getFullCv(this.cvId());
  }
  public printCv(): void {
    window.print();
  }
}
