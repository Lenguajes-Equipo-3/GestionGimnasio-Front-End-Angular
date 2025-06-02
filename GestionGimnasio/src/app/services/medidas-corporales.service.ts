import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Medida {
  idMedida: number;
  nombreMedida: string;
  unidadMedida: string;
  esObligatoria: boolean;
  idCategoria: number;
}

export interface Categoria {
  idCategoria: number; 
  nombreCategoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedidasService {
  private apiUrlMedidas = 'http://localhost:8080/proyecto/api/medidascorporales';
  private apiUrlCategorias = 'http://localhost:8080/proyecto/api/categoriasmedidascorporales';
  constructor(private http: HttpClient) {}


  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrlCategorias);
  }
  obtenerMedidas(): Observable<Medida[]> {
    return this.http.get<Medida[]>(this.apiUrlMedidas);
  }
  agregarMedida(medida: Medida): Observable<Medida> {
    return this.http.post<Medida>(this.apiUrlMedidas, medida);
  }
  updateMedida(id: number, medida: Medida): Observable<Medida> {
    return this.http.put<Medida>(`${this.apiUrlMedidas}/${id}`, medida); 
  }
  getMedidaById(id: number): Observable<Medida> {
    return this.http.get<Medida>(`${this.apiUrlMedidas}/${id}`);
  }
  eliminarMedida(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlMedidas}/${id}`);
  }
  
  
}
