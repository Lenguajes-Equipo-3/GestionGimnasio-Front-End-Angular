import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private role: string = 'admin'; // Valor fijo por ahora

  constructor() {
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      this.role = savedRole;
    }
  }

  login(role: string) {
    this.role = role;
    localStorage.setItem('role', role);
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
