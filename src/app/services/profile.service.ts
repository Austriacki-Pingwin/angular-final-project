import { inject, Injectable } from '@angular/core';
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
import { catchError, filter, from, switchMap, take, throwError, type Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { type CollectionType } from '../models/collections.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  public getBlocks<T>(blockType: CollectionType): Observable<T[]> {
    return this.authService.uid$.pipe(
      switchMap((userId) => {
        const ref = collection(this.firestore, `users/${userId}/${blockType}`);
        return collectionData(ref, { idField: 'id' }) as Observable<T[]>;
      }),
      catchError((): Observable<T[]> => {
        return throwError(() => new Error('Could not load blocks. Please try again'));
      }),
    );
  }
  public getBlock<T>(blockType: CollectionType, blockId: string): Observable<T> {
    return this.authService.uid$.pipe(
      switchMap((userId) => {
        const ref = doc(this.firestore, `users/${userId}/${blockType}/${blockId}`);

        return docData(ref, { idField: 'id' }) as Observable<T>;
      }),
      catchError((): Observable<T> => {
        return throwError(() => new Error('Could not load block. Please try again'));
      }),
    );
  }

  public createBlock<T>(blockType: CollectionType, block: T & { id: string }): Observable<void> {
    return this.authService.uid$.pipe(
      filter((uid): uid is string => !!uid),
      take(1),
      switchMap((uid) => {
        const ref = doc(this.firestore, `users/${uid}/${blockType}/${block.id}`);
        return from(setDoc(ref, block));
      }),
      catchError((): Observable<void> => {
        return throwError(() => new Error('Could not create block. Please try again'));
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
        const ref = doc(this.firestore, `users/${uid}/${blockType}/${blockId}`);

        return from(updateDoc(ref, changes));
      }),
      catchError((): Observable<void> => {
        return throwError(() => new Error('Could not update block. Please try again'));
      }),
    );
  }

  public deleteBlock(blockType: CollectionType, blockId: string): Observable<void> {
    return this.authService.uid$.pipe(
      filter((uid): uid is string => !!uid),
      take(1),
      switchMap((uid) => {
        const ref = doc(this.firestore, `users/${uid}/${blockType}/${blockId}`);
        return deleteDoc(ref);
      }),
      catchError((): Observable<void> => {
        return throwError(() => new Error('Could not delete block. Please try again'));
      }),
    );
  }
}
