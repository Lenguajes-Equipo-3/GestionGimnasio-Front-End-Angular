import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Ejercicio } from '../Domain/Ejercicio.interface';

@Injectable({
  providedIn: 'root',
})
export class EjercicioService {
  private apiUrl = 'http://localhost:8080/proyecto/api/ejercicios'; // Cambiar por la URL del backend

  constructor(private http: HttpClient) {}

  createEjercicio(ejercicio: Ejercicio): Observable<Ejercicio> {
    return this.http.post<Ejercicio>(this.apiUrl, ejercicio);
  }

  getAllEjercicios(): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(this.apiUrl).pipe(
      map((ejercicios: any[]) =>
        ejercicios.map((ejercicio) => ({
          ...ejercicio,
          id: ejercicio.idEjercicio, // Mapear idEjercicio a id
        }))
      )
    );
  }

  updateEjercicio(ejercicio: Ejercicio): Observable<Ejercicio> {
    if (!ejercicio.id) {
      console.error('El ejercicio no tiene un ID válido.');
      throw new Error('El ejercicio no tiene un ID válido.');
    }
    return this.http.put<Ejercicio>(`${this.apiUrl}/${ejercicio.id}`, ejercicio);
  }

  deleteEjercicio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getEjercicioByNombre(nombre: string): Observable<Ejercicio> {
    return this.http.get<Ejercicio>(`${this.apiUrl}/nombre/${nombre}`).pipe(
      map((ejercicio: any) => ({
        ...ejercicio,
        id: ejercicio.idEjercicio, // Mapear idEjercicio a id
      }))
    );
  }
}