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
    path: 'createEvent',
    loadComponent: () => import('./pages/create-event/create-event.page').then(m => m.CreateEventPage),
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
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [AuthGuard]
  },
  {
    path: 'create-event',
    loadComponent: () => import('./pages/create-event/create-event.page').then( m => m.CreateEventPage)
  },
  {
    path: 'goals',
    loadComponent: () => import('./pages/goals/goals.page').then( m => m.GoalsPage)
  },
  {
    path: 'create-goal',
    loadComponent: () => import('./pages/create-goal/create-goal.page').then( m => m.CreateGoalPage)
  },
  {
    path: 'transaction',
    loadComponent: () => import('./pages/transaction/transaction.page').then( m => m.TransactionPage)
  },
  {
    path: 'create-transaction',
    loadComponent: () => import('./pages/create-transaction/create-transaction.page').then( m => m.CreateTransactionPage)
  },
  {
    path: 'phone-input',
    loadComponent: () => import('./pages/phone-input/phone-input.page').then( m => m.PhoneInputPage)
  }
];
