import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { AddCvCardComponent } from '../../add-cv-card/add-cv-card.component';
import { CvCardComponent } from '../../cv-card/cv-card.component';
import { CvService } from '../../../services/cv.service';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import type { CV, CVs, CardItem, Cards } from '../../../models/collections.model';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-my-resumes',
  imports: [
    AddCvCardComponent,
    CvCardComponent,
    CommonModule,
    NgxSkeletonLoaderComponent,
    TranslatePipe,
    ScrollingModule,
  ],
  templateUrl: './my-resumes.component.html',
  styleUrl: './my-resumes.component.scss',
})
export class MyResumesComponent {
  private cvService = inject(CvService);
  private breakpointObserver = inject(BreakpointObserver);

  public columns = toSignal(
    this.breakpointObserver
      .observe(['(max-width: 680px)', '(max-width: 1000px)', '(max-width: 1300px)'])
      .pipe(
        map((bp) => {
          if (bp.breakpoints['(max-width: 680px)']) return 1;
          if (bp.breakpoints['(max-width: 1000px)']) return 2;
          if (bp.breakpoints['(max-width: 1300px)']) return 3;
          return 4;
        }),
      ),
    { initialValue: 4 },
  );
  public readonly rowHeight = 365;

  public cvs = toSignal(this.cvService.getCvs(), { initialValue: [] });

  public rows = computed(() => {
    const cvs = this.cvs();
    const cols = this.columns();

    return this.chunk(cvs, cols);
  });

  private chunk(arr: CVs, size: number): Array<Cards> {
    const result: Array<Cards> = [];

    const arrayWithAdd: Cards = [{ title: 'add', id: 'add' }, ...arr];

    for (let i = 0; i < arrayWithAdd.length; i += size) {
      result.push(arrayWithAdd.slice(i, i + size));
    }

    return result;
  }

  public isCV(item: CardItem): item is CV {
    return (item as CV).id !== 'add';
  }

  public trackByRow(index: number): number {
    return index;
  }

  @Output() public download = new EventEmitter<string>();

  public downloadCv(cvId: string): void {
    this.download.emit(cvId);
  }
}
