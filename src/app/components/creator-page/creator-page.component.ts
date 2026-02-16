import { Component, inject } from '@angular/core';
import { ProfileFormComponent } from '../profile-page/profile-form/profile-form.component';
import { PreviewComponent } from '../preview/preview.component';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { CvService } from '../../services/cv.service';
import { AsyncPipe } from '@angular/common';
// import type { FullCV } from '../../models/cv.model';

@Component({
  selector: 'app-creator-page',
  imports: [ProfileFormComponent, PreviewComponent, AsyncPipe],
  templateUrl: './creator-page.component.html',
  styleUrl: './creator-page.component.scss',
})
export class CreatorPageComponent {
  private route = inject(ActivatedRoute);
  private cvService = inject(CvService);

  public cv$ = this.route.data.pipe(
    map((data) => data['cvId']),
    filter((id): id is string => typeof id === 'string'),
    switchMap((id) => this.cvService.getFullCv(id)),
  );
  public printCv(): void {
    window.print();
  }
}
