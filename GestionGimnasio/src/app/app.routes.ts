import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RoleGuard } from './guards/role.guard';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ClienteEditarComponent } from './pages/Clientes/cliente-editar/cliente-editar.component';
import { ClienteListaComponent } from './pages/Clientes/cliente-lista/cliente-lista.component';
import { MedidasCorporalesComponent } from './pages/medidaCorporal/medida-corporal-list/medida-corporal-list.component';
import { RutinaListComponent } from './pages/Rutina/rutina-list/rutina-list.component';
import { RutinaNewComponent } from './pages/Rutina/rutina-new/rutina-new.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainLayoutComponent, // Layout principal
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN', 'ENTRENADOR'] },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'ENTRENADOR'] },
      },
      {
        path: 'CategoriaEjercicio',
        loadComponent: () =>
          import(
            './pages/CategortiaEjercicio/categoria-ejercicio-list/categoria-ejercicio-list.component'
          ).then((m) => m.CategoriaEjercicioListComponent),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'ENTRENADOR'] },
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'ENTRENADOR'] },
      },
      {
        path: 'clientes',
        component: ClienteListaComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'ENTRENADOR'] },
      },
      {
        path: 'clientes/nuevo', // Ruta para agregar nuevo cliente
        component: ClienteEditarComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'ENTRENADOR'] },
      },
      {
        path: 'clientes/editar/:id',
        component: ClienteEditarComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'ENTRENADOR'] },
      },
      {
        path: 'medidasCorporales',
        component: MedidasCorporalesComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'ENTRENADOR'] },
      },
      {
        path: 'ejercicios',
        loadComponent: () =>
          import(
            './pages/Ejercicios/ejercicio-list/ejercicio-list.component'
          ).then((m) => m.EjercicioListComponent),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'ENTRENADOR'] },
      },
      {
        path: 'empleados',
        loadComponent: () =>
          import(
            './pages/Empleados/empleado-list/empleado-list.component'
          ).then((m) => m.EmpleadoListComponent),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'ENTRENADOR'] },
      },
      {
        path: 'rutina',
        component: RutinaListComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'ENTRENADOR'] },
      },
      {
        path: 'rutina/nueva',
        component: RutinaNewComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'ENTRENADOR'] },
      },
      {
        path: 'rutina/cliente/:idCliente',
        loadComponent: () =>
          import(
            './pages/Rutina/rutina-cliente/rutina-cliente.component'
          ).then((m) => m.RutinaClienteComponent),
        canActivate: [RoleGuard],
        data: { roles: ['ADMIN', 'ENTRENADOR'] },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
