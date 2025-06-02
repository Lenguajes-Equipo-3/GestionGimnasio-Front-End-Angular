import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Ejercicio } from '../Domain/Ejercicio.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EjercicioService {
  private apiUrl = `${environment.apiURL}`+'api/ejercicios'; // Cambiar por la URL del backend

  constructor(private http: HttpClient) {}

  createEjercicioFormData(formData: FormData): Observable<Ejercicio> {
    return this.http.post<Ejercicio>(this.apiUrl, formData);
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

  updateEjercicioConImagenes(ejercicio: Ejercicio, imagenes: File[]): Observable<Ejercicio> {
    if (!ejercicio.id) {
      console.error('El ejercicio no tiene un ID válido.');
      throw new Error('El ejercicio no tiene un ID válido.');
    }
  
    const formData = new FormData();
  
    // Convertir el objeto ejercicio a JSON y agregarlo como string
    formData.append('ejercicio', new Blob([JSON.stringify(ejercicio)], { type: 'application/json' }));
  
    // Agregar cada imagen al FormData
    imagenes.forEach((file, index) => {
      formData.append('imagenes', file); // Si tu backend espera múltiples archivos con el mismo nombre
    });
  
    return this.http.put<Ejercicio>(`${this.apiUrl}/${ejercicio.id}`, formData);
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