import { Injectable } from "@angular/core";
import { Ejercicio } from "../Domain/Ejercicio.interface";
import { Empleado } from "../Domain/Empleado.interface";
import { Cliente } from "./cliente.service";
import { Medida } from "./medidas-corporales.service";
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

export interface ItemRutinaMedida {
  medidaCorporal: Medida;
  rutina: Rutina;
  valor: number;
}
export interface Rutina {
  idRutina: number;
  empleado: Empleado;
  cliente: Cliente;
  fechaCreacion: Date;        // ISO format (YYYY-MM-DD)
  fechaRenovacion:Date;      // ISO format (YYYY-MM-DD)
  objetivo: string;
  lesiones: string;
  enfermedades: string;
  esVigente: boolean;
  ejercicios: Ejercicio[];
  medidas: ItemRutinaMedida[];
}
export interface RutinaDataGeneral {
 // empleado?: Empleado;
  cliente?: Cliente;
  fechaCreacion?: Date;
  fechaRenovacion?: Date;
  objetivo?: string;
  lesiones?: string;
  enfermedades?: string;
  esVigente?: boolean;
}

@Injectable({ providedIn: 'root' })
export class RutinaContextService {
    private clienteSeleccionado$ = new BehaviorSubject<Cliente | null>(null);

 private rutinaActual: RutinaDataGeneral = {
    fechaCreacion: new Date() // Se asigna al iniciar
  };
      private clienteUrl = 'http://localhost:8080/proyecto/api/clientes'; 

     constructor(private http: HttpClient) {}


      getRutina(): RutinaDataGeneral {
    return this.rutinaActual;
  }

  actualizarRutina(data: Partial<RutinaDataGeneral>) {
    this.rutinaActual = { ...this.rutinaActual, ...data };
  }
  setClienteSeleccionado(cliente: Cliente) {
    this.clienteSeleccionado$.next(cliente);
  }
   getClienteSeleccionado(): Observable<Cliente | null> {
    return this.clienteSeleccionado$.asObservable();
  }

  getClienteSeleccionadoValor(): Cliente | null {
    return this.clienteSeleccionado$.value;
    
  }
 
    obtenerTodos() {
    return this.http.get<Cliente[]>(`${this.clienteUrl}`);
  }
      buscarClientes(nombre: string): Observable<Cliente[]> {
         return this.http.get<Cliente[]>(`${this.clienteUrl}/buscar`, {
           params: { nombre }
         });
       }

}