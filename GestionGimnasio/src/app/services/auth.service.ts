import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UsuarioLoginRequest } from '../Domain/usuario-login-request';
import { UsuarioLoginResponse } from '../Domain/usuario-login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://api-security-proyecto-dkh3cxh6h0b8g7d7.canadacentral-01.azurewebsites.net/security/api/auth/login';

  constructor(private http: HttpClient) { }

  login(datos: UsuarioLoginRequest): Observable<UsuarioLoginResponse> {
    return this.http.post<UsuarioLoginResponse>(this.baseUrl, datos).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('nombre', response.nombreEmpleado);
        localStorage.setItem('apellidos', response.apellidosEmpleado);
        localStorage.setItem('lastAction', Date.now().toString());
        localStorage.setItem('idEmpleado', response.idEmpleado);

      })
    );
  }

  logout(): void {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getRol(): string | null {
    return localStorage.getItem('rol');
  }

  isSessionActive(): boolean {
    const lastAction = localStorage.getItem('lastAction');
    if (!lastAction) return false;

    const currentTime = Date.now();
    const timeout = 5 * 60 * 1000; // 5 minutos
    return (currentTime - parseInt(lastAction, 10)) < timeout;
  }

  refreshLastAction(): void {
    localStorage.setItem('lastAction', Date.now().toString());
  }
}
