import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/clinic-outcomes',
    pathMatch: 'full'
  },
  {
    path: 'clinic-outcomes',
    loadComponent: () => import('./features/clinic-outcomes/components/clinic-outcomes-dashboard.component').then(m => m.ClinicOutcomesDashboardComponent)
  }
];
