import type { ApplicationConfig } from '@angular/core';
import { provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'angular-final-team-project',
        appId: '1:796927565920:web:47a69dc0216d466b09e305',
        storageBucket: 'angular-final-team-project.firebasestorage.app',
        apiKey: 'AIzaSyAakAv8pXLTDDlgLrw9tjuYgII_VKETWOc',
        authDomain: 'angular-final-team-project.firebaseapp.com',
        messagingSenderId: '796927565920',
      }),
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideNgxSkeletonLoader({
      theme: {
        extendsFromRoot: true,
      },
    }),
  ],
};
