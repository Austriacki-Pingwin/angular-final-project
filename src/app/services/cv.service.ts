import { inject, Injectable, signal } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, serverTimestamp } from '@angular/fire/firestore';
import { type CV } from '../models/cv.model';
import { EMPTY_CV_CONTENT } from '../models/empty-cv';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private firestore = inject(Firestore);

  private _cvs = signal<CV[]>([]);
  public cvs = this._cvs.asReadonly();

  public async loadUserCvs(uid: string): Promise<void> {
    const ref = collection(this.firestore, `users/${uid}/cvs`);

    const snap = await getDocs(ref);

    const cvs: CV[] = snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data['title'],
        status: data['status'],
        createdAt: data['createdAt'],
        updatedAt: data['updatedAt'],
        content: data['content'],
      };
    });

    this._cvs.set(cvs);
  }

  public async createCv(uid: string): Promise<void> {
    const ref = collection(this.firestore, `users/${uid}/cvs`);
    const title = 'New CV';

    await addDoc(ref, {
      title: title,
      status: 'draft',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      content: EMPTY_CV_CONTENT,
    });
  }
}
