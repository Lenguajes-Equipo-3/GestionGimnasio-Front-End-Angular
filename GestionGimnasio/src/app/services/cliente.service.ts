import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definir el modelo Cliente directamente en el servicio
export interface Cliente {
  idCliente: number;
  numeroIdentificacion: string;
  nombreCliente: string;
  apellidosCliente: string;
  fechaNacimiento: string;
  telefono: string;
  direccion: string;
  nombreContactoEmergencia: string;
  telefonoContactoEmergencia: string;
  fotografia: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private baseUrl = 'http://localhost:8080/proyecto/api/clientes';  // URL api

  constructor(private http: HttpClient) {}

  // Obtener todos los clientes
  obtenerTodos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}`);
  }

  // Obtener un cliente por su ID
  obtenerPorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}`);
  }

  // Insertar un nuevo cliente
  insertar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}`, cliente);
  }
/*
  // Actualizar los datos de un cliente
  actualizar(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(${this.baseUrl}, cliente);
  }

  // Eliminar un cliente
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(${this.baseUrl}${id});
  }
    */
}

