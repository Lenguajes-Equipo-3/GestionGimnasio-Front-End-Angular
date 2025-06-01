import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UsuarioLoginRequest } from '../Domain/usuario-login-request';
import { UsuarioLoginResponse } from '../Domain/usuario-login-response';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.api_SECURITY_URL}`;

  constructor(private http: HttpClient) { }

  login(datos: UsuarioLoginRequest): Observable<UsuarioLoginResponse> {
    return this.http.post<UsuarioLoginResponse>(this.baseUrl, datos).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('nombre', response.nombreEmpleado);
        localStorage.setItem('apellidos', response.apellidosEmpleado);
        localStorage.setItem('lastAction', Date.now().toString());

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
