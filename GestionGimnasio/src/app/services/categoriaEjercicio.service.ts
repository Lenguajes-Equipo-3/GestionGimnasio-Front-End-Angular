// categorias.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../Domain/CategoriaEjercicio.interface';



@Injectable({
  providedIn: 'root',

})
export class CategoriaEjercicioService {
  private apiUrl = 'http://localhost:8080/proyecto/api/categorias-ejercicio';

  constructor(private http: HttpClient) {}

  getAllCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  createCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  updateCategoria(categoria: Categoria): Observable<Categoria> {
    const url = `${this.apiUrl}/${categoria.idCategoria}`;
    return this.http.put<Categoria>(url, categoria);
  }
  deleteCategoria(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }  
}
