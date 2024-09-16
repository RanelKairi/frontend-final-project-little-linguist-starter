import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'frontend-ono-proj-lil-ling',
        appId: '1:859989106870:web:f9e2c068aec7eade744617',
        storageBucket: 'frontend-ono-proj-lil-ling.appspot.com',
        apiKey: 'AIzaSyC2s2EO_sWdnmtUPRqbrSgXE4EhH14pc0M',
        authDomain: 'frontend-ono-proj-lil-ling.firebaseapp.com',
        messagingSenderId: '859989106870',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
