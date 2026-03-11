# Project Overview :duck:

CV Generator is a modern web application built with Angular 21 and Firebase that allows users to create and manage professional CVs.
Users can fill in profile blocks (experience, education, skills, etc.) and dynamically generate multiple CV versions by selecting specific blocks.
The application uses a reactive architecture with Angular Signals and RxJS for efficient state management and real-time updates

[Task](https://github.com/rolling-scopes-school/tasks/tree/master/angular/modules/rsclone)

# Deployment :dodo:

[Vercel deployment](https://angular-final-project-rs.vercel.app/)

### Architecture Diagram

```
┌─────────────────────┐
│      Browser        │
│  Angular SPA (v21)  │
└──────────┬──────────┘
           │
           │ Firebase SDK
           ▼
┌─────────────────────┐
│   Firebase Auth     │
│   (JWT, session)    │
└─────────────────────┘
           │
           ▼
┌─────────────────────┐
│    Firestore DB     │
│                     │
│  profile collection │
│  cvs collection     │
└─────────────────────┘
           │
           ▼
┌─────────────────────┐
│   Firebase Hosting  │
└─────────────────────┘
```

- Angular 21 (standalone, signals)
- Firebase Authentication
- Firestore (Profile collection → CVs collection)
- Hosting (Firebase)

### Performance

- Lazy loading
- Standalone components
- OnPush
- Signals reduce unnecessary change detection
- defer

- Performance: 50
- Accessibility: 91
- Best Practices: 196
- SEO: 100

### Accessibility

- Semantic HTML
- aria-label
- mat-form-field correctly configured

🚀 Running the Project

## Clone repository

git clone https://github.com/your-repo.git
cd project-name

## Install dependencies

npm install

## Run locally

ng serve

Open:

http://localhost:4200

## Build production

ng build --configuration production

### Signals vs RxJS

We use Angular Signals for local component state, Inputs/Outputs communication, and UI-driven state in services, because they provide a simpler and more declarative reactive model with fine-grained change detection.

RxJS is used primarily for asynchronous operations and external data streams such as Firebase Authentication and Firestore, where stream composition (switchMap, combineLatest) is required.

Signals improve readability and reduce boilerplate for UI state, while RxJS remains essential for handling complex async flows and real-time backend data.

This combination ensures clarity, performance optimization, and separation of UI reactivity from async stream management.
