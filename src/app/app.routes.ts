import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then(m => m.SplashPage)
  },
  {
    path: 'main',
    loadComponent: () => import('./pages/main/main.page').then(m => m.MainPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'contacts',
    loadComponent: () => import('./pages/contacts/contacts.page').then(m => m.ContactsPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'events',
    loadComponent: () => import('./pages/events/events.page').then(m => m.EventsPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'registration',
    loadComponent: () => import('./pages/registration/registration.page').then(m => m.RegistrationPage)
  },
  {
    path: 'event-modal',
    loadComponent: () => import('./pages/event-modal/event-modal.page').then(m => m.EventModalPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'registration-step1',
    loadComponent: () => import('./pages/registration/registration-step1/registration-step1.page').then(m => m.RegistrationStep1Page)
  },
  {
    path: 'registration-step2',
    loadComponent: () => import('./pages/registration/registration-step2/registration-step2.page').then(m => m.RegistrationStep2Page)
  },
  {
    path: 'registration-step3',
    loadComponent: () => import('./pages/registration/registration-step3/registration-step3.page').then(m => m.RegistrationStep3Page)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [AuthGuard]
  },
];
