import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import {
  arrayRemove,
  arrayUnion,
  collection,
  collectionData,
  doc,
  Firestore,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from '@angular/fire/firestore';
import type { CV, CVs, ProfileBlockItem, ProfileBlockType } from '../models/collections.model';
import { AuthService } from './auth.service';
import { ProfileService } from './profile.service';
import {
  catchError,
  combineLatest,
  from,
  map,
  type Observable,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { type FullCV } from '../models/cv.model';
import type {
  About,
  Education,
  Experience,
  Language,
  Link,
  Personal,
  Photo,
  Skill,
} from '../models/blocks.model';
import { EMPTY_CV, EMPTY_FULL_CV } from '../models/empty-cv';
import { mapBlocksToStream } from '../utils/cv-map-blocks.util';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);
  private notificationService = inject(NotificationService);
  private injectionContext = inject(EnvironmentInjector);

  public getFullCv(id: string): Observable<FullCV> {
    return this.profileService.getBlock<CV>('cvs', id).pipe(
      switchMap((cv) => this.buildFullCv(cv)),
      catchError((): Observable<FullCV> => {
        this.notificationService.error('Could not load CV. Please try again');
        return of();
      }),
    );
  }

  public getCvs(): Observable<CVs> {
    return this.authService.uid$.pipe(
      switchMap((userId) => {
        return runInInjectionContext(this.injectionContext, () => {
          const ref = collection(this.firestore, `users/${userId}/cvs`);
          const sort = query(ref, orderBy('createdAt', 'desc'));
          return collectionData(sort, { idField: 'id' }) as Observable<CVs>;
        });
      }),
      catchError(() => {
        this.notificationService.error('Could not load blocks. Please try again');
        return of();
      }),
    );
  }

  private buildFullCv(cv: CV): Observable<FullCV> {
    const photo$ = mapBlocksToStream<Photo>(
      cv.photoBlock,
      (id) => this.profileService.getBlock('photo', id),
      EMPTY_FULL_CV.photo,
    );
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
    return combineLatest({
      photo: photo$,
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
      catchError((): Observable<FullCV> => {
        this.notificationService.error('Could not load CV. Please try again');
        return of();
      }),
    );
  }

  public createCv(title: string = ''): Observable<string> {
    return this.authService.uid$.pipe(
      switchMap((userId) => {
        return runInInjectionContext(this.injectionContext, () => {
          const cvId = doc(collection(this.firestore, `users/${userId}/cvs`)).id;

          const newCv: CV = {
            id: cvId,
            ...EMPTY_CV,
            title,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
          };

          return this.profileService.createBlock<CV>('cvs', newCv).pipe(map(() => cvId));
        });
      }),
      catchError((): Observable<string> => {
        this.notificationService.error('Could not create CV. Please try again');
        return of();
      }),
    );
  }

  public duplicateCv(id: string): Observable<void> {
    return this.authService.uid$.pipe(
      switchMap((userId) =>
        this.profileService.getBlock<CV>('cvs', id).pipe(
          take(1),
          switchMap((cv) => {
            return runInInjectionContext(this.injectionContext, () => {
              const randomHash = Math.floor(Math.random() * 1000);
              const newTitle = cv.title.match(/ copy #\d+$/)
                ? cv.title.replace(/ copy #\d+$/, ` copy #${randomHash}`)
                : `${cv.title} copy #${randomHash}`;
              const cvId = doc(collection(this.firestore, `users/${userId}/cvs`)).id;

              const duplicateCv: CV = {
                ...cv,
                id: cvId,
                title: newTitle,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
              };

              return this.profileService.createBlock<CV>('cvs', duplicateCv);
            });
          }),
          tap(() => this.notificationService.success('CV successfully duplicated')),
          catchError(() => {
            this.notificationService.error('Could not create duplicate. Please try again');
            return of();
          }),
        ),
      ),
    );
  }

  public deleteCv(id: string): Observable<void> {
    return this.profileService.deleteBlock('cvs', id);
  }

  public addBlockToCv(block: string, blockId: string, cvId: string): Observable<void> {
    return this.authService.uid$.pipe(
      take(1),
      switchMap((uid) => {
        return runInInjectionContext(this.injectionContext, () => {
          const ref = doc(this.firestore, `users/${uid}/cvs/${cvId}`);
          return from(
            updateDoc(ref, {
              [`${block}Block`]: arrayUnion(blockId),
              updatedAt: Timestamp.now(),
            }),
          );
        });
      }),
      tap(() => this.notificationService.success('Block added successfully')),
      catchError((err) => {
        this.notificationService.error(`Could not add skill. Please try again: ${err.message}`);
        return of();
      }),
    );
  }

  public deleteBlockFromCv(block: string, blockId: string, cvId: string): Observable<void> {
    return this.authService.uid$.pipe(
      take(1),
      switchMap((uid) => {
        return runInInjectionContext(this.injectionContext, () => {
          const ref = doc(this.firestore, `users/${uid}/cvs/${cvId}`);
          return from(
            updateDoc(ref, {
              [`${block}Block`]: arrayRemove(blockId),
              updatedAt: Timestamp.now(),
            }),
          );
        });
      }),
      tap(() => this.notificationService.success('Block deleted successfully')),
      catchError((err) => {
        this.notificationService.error(`Could not add skill. Please try again: ${err.message}`);
        return of();
      }),
    );
  }

  public getBlockDataForProfile(
    blockType: ProfileBlockType,
    cvId: string,
  ): Observable<ProfileBlockItem[]> {
    return combineLatest([
      this.profileService.getBlock<CV>('cvs', cvId),
      this.profileService.getBlocks<ProfileBlockItem>(blockType),
    ]).pipe(
      map(([cv, block]) =>
        block.map((b) => ({
          ...b,
          isChecked: cv[`${blockType}Block`]?.includes(b.id) ?? false,
        })),
      ),
    );
  }
}
