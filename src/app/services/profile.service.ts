import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { catchError, filter, from, of, switchMap, take, tap, type Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { type CollectionType } from '../models/collections.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private injectionContext = inject(EnvironmentInjector);

  public getBlocks<T>(blockType: CollectionType): Observable<T[]> {
    return this.authService.uid$.pipe(
      switchMap((userId) => {
        return runInInjectionContext(this.injectionContext, () => {
          const ref = collection(this.firestore, `users/${userId}/${blockType}`);
          return collectionData(ref, { idField: 'id' }) as Observable<T[]>;
        });
      }),
      catchError(() => {
        this.notificationService.error('Could not load blocks. Please try again');
        return of();
      }),
    );
  }

  public getBlock<T>(blockType: CollectionType, blockId: string): Observable<T> {
    return this.authService.uid$.pipe(
      switchMap((userId) => {
        return runInInjectionContext(this.injectionContext, () => {
          const ref = doc(this.firestore, `users/${userId}/${blockType}/${blockId}`);
          return docData(ref, { idField: 'id' }) as Observable<T>;
        });
      }),
      catchError(() => {
        this.notificationService.error('Could not load block. Please try again');
        return of();
      }),
    );
  }

  public createBlock<T>(blockType: CollectionType, block: T & { id: string }): Observable<void> {
    return this.authService.uid$.pipe(
      filter((uid): uid is string => !!uid),
      take(1),
      switchMap((uid) => {
        return runInInjectionContext(this.injectionContext, () => {
          const ref = doc(this.firestore, `users/${uid}/${blockType}/${block.id}`);
          return from(setDoc(ref, block));
        });
      }),
      tap(() => this.notificationService.success('Block created successfully')),
      catchError(() => {
        this.notificationService.error('Could not create block. Please try again');
        return of();
      }),
    );
  }

  public updateBlock<T>(
    blockType: CollectionType,
    blockId: string,
    changes: Partial<T>,
  ): Observable<void> {
    return this.authService.uid$.pipe(
      filter((uid): uid is string => !!uid),
      take(1),
      switchMap((uid) => {
        return runInInjectionContext(this.injectionContext, () => {
          const ref = doc(this.firestore, `users/${uid}/${blockType}/${blockId}`);
          return from(updateDoc(ref, changes));
        });
      }),
      tap(() => this.notificationService.success('Block updated successfully')),
      catchError(() => {
        this.notificationService.error('Could not update block. Please try again');
        return of();
      }),
    );
  }

  public deleteBlock(blockType: CollectionType, blockId: string): Observable<void> {
    return this.authService.uid$.pipe(
      filter((uid): uid is string => !!uid),
      take(1),
      switchMap((uid) => {
        return runInInjectionContext(this.injectionContext, () => {
          const ref = doc(this.firestore, `users/${uid}/${blockType}/${blockId}`);
          return deleteDoc(ref);
        });
      }),
      tap(() => this.notificationService.success('Block deleted successfully')),
      catchError(() => {
        this.notificationService.error('Could not delete block. Please try again');
        return of();
      }),
    );
  }
}
