import { Routes } from '@angular/router';
import { adminGuard } from '../../guards/admin.guard';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => {
      const authService = inject(AuthService);
      return authService.isAdmin() ? 'admin-dashboard' : 'user-dashboard';
    }
  },
  {
    path: 'user-dashboard',
    loadComponent: () => import('./user-dashboard/user-dashboard.component').then(m => m.UserDashboardComponent)
  },
  {
    path: 'admin-dashboard',
    loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [adminGuard]
  }
];