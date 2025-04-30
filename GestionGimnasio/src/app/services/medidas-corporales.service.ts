// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface Medida {
//   idMedida: number;
//   nombreMedida: string;
//   unidadMedida: string;
//   esObligatoria: boolean;
//   idCategoria: number;
// }

// export interface Categoria {
//   dCategoria: number;    // o number, dependiendo de tu API
//   nombreCategoria: string;
// }
// @Injectable({
//   providedIn: 'root'
// })
// export class MedidasService {
//   private apiUrl = 'http://localhost:8080/proyecto/api/medidascorporales';

//   constructor(private http: HttpClient) { }

//   obtenerMedidas(): Observable<Medida[]> {
//     return this.http.get<Medida[]>(this.apiUrl);
//   }
  
// }

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
  idCategoria: number;  // Ajusté el nombre del campo a 'idCategoria' para que coincida con el resto de la lógica
  nombreCategoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedidasService {
  private apiUrlMedidas = 'http://localhost:8080/proyecto/api/medidascorporales';
  private apiUrlCategorias = 'http://localhost:8080/proyecto/api/categoriasmedidascorporales';
  constructor(private http: HttpClient) {}

  obtenerMedidas(): Observable<Medida[]> {
    return this.http.get<Medida[]>(this.apiUrlMedidas);
  }

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrlCategorias);
  }
}
