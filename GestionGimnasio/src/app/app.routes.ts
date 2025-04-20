import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
// app.routes.ts
export const routes: Routes = [
  { path: '', component: LoginComponent },

  
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: '',
      component: MainLayoutComponent,
      canActivate: [RoleGuard],
      data: { roles: ['admin', 'usuario'] },
      children: [
        {
          path: 'dashboard',
          component: DashboardComponent,
          canActivate: [RoleGuard],
          data: { roles: ['admin', 'usuario'] }
        },
        {
          path: 'admin',
          component: AdminComponent,
          canActivate: [RoleGuard],
          data: { roles: ['admin'] }
        }
      ]
    },
    { path: '**', redirectTo: 'login' }
  ];
  