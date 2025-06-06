import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  gmail: string; 
}

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private baseUrl = `${environment.apiURL}`+'api/clientes';  // URL api

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
  insertar(cliente: Cliente , imagen: File): Observable<Cliente> {

    const formData = new FormData();
    formData.append('cliente', new Blob([JSON.stringify(cliente)], { type: 'application/json' }));
    formData.append('imagen', imagen);

    return this.http.post<Cliente>(`${this.baseUrl}`, formData);
  }

  // Actualizar los datos de un cliente
  actualizar(cliente: Cliente , imagen: File): Observable<Cliente> {
    const formData = new FormData();
    formData.append('cliente', new Blob([JSON.stringify(cliente)], { type: 'application/json' }));
    formData.append('imagen', imagen);

    return this.http.put<Cliente>(`${this.baseUrl}/${cliente.idCliente}`, formData);
  }

  // Eliminar un cliente
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  buscarClientes(nombre: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/buscar`, {
      params: { nombre }
    });
  }


}

