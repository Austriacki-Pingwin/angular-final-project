import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { AddCvCardComponent } from '../../add-cv-card/add-cv-card.component';
import { CvCardComponent } from '../../cv-card/cv-card.component';
import { CvService } from '../../../services/cv.service';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { TranslatePipe } from '@ngx-translate/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import type { CV, CVs, CardItem, Cards } from '../../../models/collections.model';
import { map } from 'rxjs';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyResumesComponent {
  private cvService = inject(CvService);
  private readonly columns = 4;
  public readonly rowHeight = 365;

  private chunk(arr: CVs, size: number): Array<Cards> {
    const result: Array<Cards> = [];

    const arrayWithAdd: Cards = [{ title: 'add', id: 'add' }, ...arr];

    for (let i = 0; i < arrayWithAdd.length; i += size) {
      result.push(arrayWithAdd.slice(i, i + size));
    }

    return result;
  }

  public rows$ = this.cvService.getCvs().pipe(map((cvs) => this.chunk(cvs, this.columns)));

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
