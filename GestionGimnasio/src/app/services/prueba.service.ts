// categorias.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',

})
export class Prueba {
  private apiUrl = `${environment.apiURL}`+'api/rutinas';

  constructor(private http: HttpClient) {}

  generarReporte(idCliente: number): Observable<any> {
    return this.http.get(this.apiUrl+`/rutina/reporte/${idCliente}`, {
      responseType: 'blob'
    }).pipe(
      tap(blob => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      })
    );
  }
 
}
