import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: `./sidebar.component.html`,
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() collapsed = false;
  userRoleVista: string = '';
  nombre: string = '';
  apellidos: string = '';
  userRole: string | null = null;

  constructor(private authService: AuthService) {
    this.userRole = this.authService.getRol();
  }

  ngOnInit(): void {
    this.userRoleVista = localStorage.getItem('rol') || '';
    this.nombre = localStorage.getItem('nombre') || '';
    this.apellidos = localStorage.getItem('apellidos') || '';
  }
  get rolNombre(): string {
    return this.userRole === 'ADMIN' ? 'Administrador' : 'Entrenador';
  }

  logout(): void {
  localStorage.clear();
  window.location.href = '/login'; // o usa el Router si ya está inyectado
}
}
