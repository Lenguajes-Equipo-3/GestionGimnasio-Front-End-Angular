import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RoleGuard } from './guards/role.guard';
import { RedirectGuard } from './guards/redirect.guard';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MedidasCorporalesComponent} from './pages/medidaCorporal/medida-corporal-list/medida-corporal-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: MainLayoutComponent, // Layout principal
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
      },
      {
        path: 'medidasCorporales',  
        component: MedidasCorporalesComponent,
        canActivate: [RoleGuard],
        data: { roles: ['admin', 'usuario']  }  
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
