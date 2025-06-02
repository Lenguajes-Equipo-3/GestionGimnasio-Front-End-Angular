// categorias.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../Domain/CategoriaEjercicio.interface';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',

})
export class CategoriaEjercicioService {
  private apiUrl = `${environment.apiURL}`+'api/categorias-ejercicio';

  constructor(private http: HttpClient) {}

  getAllCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  createCategoria(categoria: Categoria, imagen: File): Observable<Categoria> {
    const formData = new FormData();
    formData.append('categoria', new Blob([JSON.stringify(categoria)], { type: 'application/json' }));
    formData.append('imagen', imagen);
    console.log('Enviando categoría con imagen:',imagen);
    return this.http.post<Categoria>(this.apiUrl, formData);
  }
  

  updateCategoria(categoria: Categoria, imagen: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('categoriaDTO', new Blob([JSON.stringify(categoria)], { type: 'application/json' }));
    
    if (imagen) {
      formData.append('imagen', imagen);
    }
  
    return this.http.put(`${this.apiUrl}/actualizar`, formData); // Ajustá la URL según tu endpoint real
  }
   
  deleteCategoria(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }  
}
