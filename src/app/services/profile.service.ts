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
import { filter, from, switchMap, take, type Observable } from 'rxjs';
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
    );
  }
  public getBlock<T>(blockType: CollectionType, blockId: string): Observable<T> {
    return this.authService.uid$.pipe(
      switchMap((userId) => {
        const ref = doc(this.firestore, `users/${userId}/${blockType}/${blockId}`);

        return docData(ref, { idField: 'id' }) as Observable<T>;
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
    );
  }
}
