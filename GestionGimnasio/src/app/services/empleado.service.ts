import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Empleado } from '../Domain/Empleado.interface';
import { Rol } from '../Domain/Rol.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:8080/proyecto/api/empleados';
  private rolesApiUrl = 'http://localhost:8080/proyecto/api/roles';

  constructor(private http: HttpClient) { }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  // GET: Obtener todos los empleados
  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.apiUrl, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  // GET: Obtener un empleado por su ID
  getEmpleadoById(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.apiUrl}/${id}`, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  // POST: Crear un nuevo empleado
  createEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiUrl, empleado, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  // PUT: Actualizar un empleado existente
  updateEmpleado(id: number, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/${id}`, empleado, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  // DELETE: Eliminar un empleado por ID
  deleteEmpleado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  // GET: Obtener todos los roles
  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.rolesApiUrl, this.getHttpOptions())
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código ${error.status}: `;
      if (error.error && typeof error.error === 'string') {
        errorMessage += error.error;
      } else if (error.error && error.error.message) {
        errorMessage += error.error.message;
      } else {
        errorMessage += error.message || 'Error del servidor';
      }
    }
    console.error('Error en EmpleadoService:', errorMessage, error);
    return throwError(() => new Error(`Error en la operación de empleados. ${errorMessage}`));
  }
}