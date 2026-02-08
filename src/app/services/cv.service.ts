import { inject, Injectable, signal } from '@angular/core';
import { collection, doc, Firestore, Timestamp } from '@angular/fire/firestore';
import type { CV, CVs } from '../models/collections.model';
import { AuthService } from './auth.service';
import { ProfileService } from './profile.service';
import { forkJoin, map, type Observable, of, switchMap } from 'rxjs';
import { type FullCVs, type FullCV } from '../models/cv.model';
import type {
  About,
  Education,
  Experience,
  Language,
  Link,
  Personal,
  Skill,
} from '../models/blocks.model';
import { EMPTY_CV, EMPTY_FULL_CV } from '../models/empty-cv';
import { mapBlocksToStream } from '../utils/cv-map-blocks.util';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);

  private _cvs = signal<CVs>([]);
  public cvs = this._cvs.asReadonly();

  public getFullCv(id: string): Observable<FullCV> {
    return this.profileService
      .getBlock<CV>('cvs', id)
      .pipe(switchMap((cv) => this.buildFullCv(cv)));
  }

  public getFullCvs(): Observable<FullCVs> {
    return this.profileService.getBlocks<CV>('cvs').pipe(
      switchMap((cvs) => {
        if (!cvs.length) {
          return of([]);
        }
        return forkJoin(cvs.map((cv) => this.buildFullCv(cv)));
      }),
    );
  }

  private buildFullCv(cv: CV): Observable<FullCV> {
    const personal$ = mapBlocksToStream<Personal>(
      cv.personalBlock,
      (id) => this.profileService.getBlock('personal', id),
      EMPTY_FULL_CV.personal,
    );

    const links$ = mapBlocksToStream<Link>(
      cv.linksBlock,
      (id) => this.profileService.getBlock('links', id),
      EMPTY_FULL_CV.links,
    );

    const about$ = mapBlocksToStream<About>(
      cv.aboutBlock,
      (id) => this.profileService.getBlock('about', id),
      EMPTY_FULL_CV.about,
    );

    const skills$ = mapBlocksToStream<Skill>(
      cv.skillsBlock,
      (id) => this.profileService.getBlock('skills', id),
      EMPTY_FULL_CV.skills,
    );

    const languages$ = mapBlocksToStream<Language>(
      cv.languagesBlock,
      (id) => this.profileService.getBlock('languages', id),
      EMPTY_FULL_CV.languages,
    );

    const experience$ = mapBlocksToStream<Experience>(
      cv.experienceBlock,
      (id) => this.profileService.getBlock('experience', id),
      EMPTY_FULL_CV.experience,
    );

    const education$ = mapBlocksToStream<Education>(
      cv.educationBlock,
      (id) => this.profileService.getBlock('education', id),
      EMPTY_FULL_CV.education,
    );
    return forkJoin({
      personal: personal$,
      links: links$,
      about: about$,
      skills: skills$,
      languages: languages$,
      experience: experience$,
      education: education$,
    }).pipe(
      map((blocks) => {
        return {
          id: cv.id,
          title: cv.title,
          createdAt: cv.createdAt,
          updatedAt: cv.updatedAt,
          ...blocks,
        };
      }),
    );
  }

  public createCv(title: string = ''): Observable<string> {
    return this.authService.uid$.pipe(
      switchMap((userId) => {
        const cvId = doc(collection(this.firestore, `users/${userId}/cvs`)).id;

        const newCv: CV = {
          id: cvId,
          ...EMPTY_CV,
          title,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        };

        return this.profileService.createBlock<CV>('cvs', newCv).pipe(map(() => cvId));
      }),
    );
  }

  public deleteCv(id: string): void {
    this.profileService.deleteBlock('cvs', id).subscribe({
      next: () => console.log('CV Deleted'),
      error: (err) => console.error('Error Delete:', err),
    });
  }
}
