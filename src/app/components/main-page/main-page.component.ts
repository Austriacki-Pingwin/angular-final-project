import { Component, inject, type OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { MyResumesComponent } from './my-resumes/my-resumes.component';
import type { FullCV } from '../../models/cv.model';
import { PreviewComponent } from '../preview/preview.component';
import { CvService } from '../../services/cv.service';

@Component({
  selector: 'app-main-page',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    ProfileCardComponent,
    MyResumesComponent,
    PreviewComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  host: { class: 'content' },
})
export class MainPageComponent implements OnInit {
  private isPrinting = false;
  private cvService = inject(CvService);
  private _printCvData = signal<FullCV | null>(null);
  public readonly printCvData = this._printCvData.asReadonly();

  public ngOnInit(): void {
    window.onafterprint = (): void => {
      this.isPrinting = false;
      this._printCvData.set(null);
    };
  }

  public downloadCv(cvId: string): void {
    if (this.isPrinting) return;

    this.cvService.getFullCv(cvId).subscribe((cv) => {
      this._printCvData.set(cv);
      this.isPrinting = true;

      setTimeout(() => {
        window.print();
        this._printCvData.set(null);
      });
    });
  }
}
