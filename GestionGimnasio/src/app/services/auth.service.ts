import { Injectable } from '@angular/core';
import { RoleGuard } from '../guards/role.guard';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private role: string = 'usuario'; // Valor fijo por ahora

  constructor() {
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      this.role = savedRole;
    }
  }

  login(role: string) {
    localStorage.setItem('role', role);
    // RoleGuard.setRole(role); // Removed as RoleGuard does not have a setRole method
  }

  logout() {
    this.role = '';
    localStorage.removeItem('role');
  }

  getUserRole(): string {
    return this.role;
  }

  isAuthenticated(): boolean {
    return !!this.role;
  }
}
