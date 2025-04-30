import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.get<Ejercicio[]>(this.apiUrl);
  }
}