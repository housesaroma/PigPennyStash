import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
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
    loadComponent: () => import('./pages/main/main.page').then(m => m.MainPage)
  },
  {
    path: 'contacts',
    loadComponent: () => import('./pages/contacts/contacts.page').then(m => m.ContactsPage)
  },
  {
    path: 'events',
    loadComponent: () => import('./pages/events/events.page').then( m => m.EventsPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage)
  },
  {
    path: 'registration',
    loadComponent: () => import('./pages/registration/registration.page').then( m => m.RegistrationPage)
  },
];
