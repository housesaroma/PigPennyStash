import {Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'main',
        loadComponent: () =>
          import('../pages/main/main.page').then((m) => m.MainPage),
      },
      {
        path: 'contacts',
        loadComponent: () =>
          import('../pages/contacts/contacts.page').then((m) => m.ContactsPage),
      },
      {
        path: 'events',
        loadComponent: () =>
          import('../pages/events/events.page').then((m) => m.EventsPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../pages/settings/settings.page').then((m) => m.SettingsPage),
      },
      {
        path: '',
        redirectTo: '/tabs/main',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/main',
    pathMatch: 'full',
  },
];
