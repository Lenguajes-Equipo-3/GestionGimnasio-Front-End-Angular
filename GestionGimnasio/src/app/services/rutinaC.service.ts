import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from './cliente.service';
import { Empleado } from '../Domain/Empleado.interface';
import { ItemRutinaEjercicio } from '../Domain/ItemRutinaEjercicio';
import { HttpClient } from '@angular/common/http';
import { Medida } from './medidas-corporales.service';
import { EmpleadoService } from './empleado.service';
import { ItemRutinaMedida, Rutina } from '../Domain/RutinaCompleta.interface';

@Injectable({
  providedIn: 'root'
})
export class RutinaContextService {
  private rutinaSubject = new BehaviorSubject<Rutina>(this.crearRutinaVacia());
  rutina$ = this.rutinaSubject.asObservable();

  private clienteUrl = 'http://localhost:8080/proyecto/api/clientes'; 
  private MedidasUrl = 'http://localhost:8080/proyecto/api/medidascorporales';
  private RutinasUrl = 'http://localhost:8080/proyecto/api/rutinas';



     constructor(private http: HttpClient, private empleadoService: EmpleadoService) {}
      
     insertar(rutina: Rutina): Observable<Rutina> {
    return this.http.post<Rutina>(`${this.RutinasUrl}`, rutina);
  }

  private crearRutinaVacia(): Rutina {
    return {
      idRutina:0,
      fechaCreacion: new Date(),
      fechaRenovacion: new Date(new Date().setMonth(new Date().getMonth() + 3)),
      esVigente: true,
      objetivo: '',
      lesiones: '',
      enfermedades: '',
      cliente: undefined,
      empleado: undefined,
      medidas: [],
      ejercicios: []
    };
  }

  // === SETTERS ===
  setCliente(cliente: Cliente) {
    const rutina = this.rutinaSubject.getValue();
    rutina.cliente = cliente;
    this.rutinaSubject.next(rutina);
  }
  setEmpleado(): void {
  const rutina = this.rutinaSubject.getValue();
  const idEmpleado = localStorage.getItem('idEmpleado');

  if (!idEmpleado) {
    console.error('No se encontró el idEmpleado en localStorage');
    return;
  }
   const id = parseInt(idEmpleado, 10);
  this.empleadoService.getEmpleadoById(id).subscribe({
    next: (empleado: Empleado) => {
      rutina.empleado = empleado;
      this.rutinaSubject.next(rutina);
    },
    error: err => {
      console.error('Error al obtener el empleado:', err);
    }
  });
}

  setDatosGenerales(objetivo: string, lesiones: string, enfermedades: string, fechaRenovacion: Date, esVigente: boolean) {
    const rutina = this.rutinaSubject.getValue();
    rutina.objetivo = objetivo;
    rutina.lesiones = lesiones;
    rutina.enfermedades = enfermedades;
    rutina.fechaCreacion = new Date();
    rutina.fechaRenovacion = fechaRenovacion;
    rutina.esVigente = esVigente;
    this.rutinaSubject.next(rutina);
  }
  setMedidas(medidas: ItemRutinaMedida[]) {
    const rutina = this.rutinaSubject.getValue();
    rutina.medidas = medidas;
    this.rutinaSubject.next(rutina);
  }
  setEjercicios(ejercicios: ItemRutinaEjercicio[]) {
    const rutina = this.rutinaSubject.getValue();
    rutina.ejercicios = ejercicios;
    this.rutinaSubject.next(rutina);
  }

  actualizarRutina(rutina: Rutina) {
  this.rutinaSubject.next(rutina);
  }

  // === GETTERS ===
  getRutinaActual(): Rutina {
    return this.rutinaSubject.getValue();
  }
  getCliente(): Cliente | undefined {
    return this.getRutinaActual().cliente;
  }
   getEmpleado(): Empleado | undefined {
    return this.getRutinaActual().empleado;
  }
 getObjetivo(): string {
    return this.getRutinaActual().objetivo;
  }
    getLesiones(): string {
    return this.getRutinaActual().lesiones;
  }

  getEnfermedades(): string {
    return this.getRutinaActual().enfermedades;
  }
  getFechaCreacion(): Date {
    return this.getRutinaActual().fechaCreacion;
  }

  getFechaRenovacion(): Date {
    return this.getRutinaActual().fechaRenovacion;
  }

  getEsVigente(): boolean {
    return this.getRutinaActual().esVigente;
  }

  getMedidas(): ItemRutinaMedida[] {
    return this.getRutinaActual().medidas;
  }

  getEjercicios(): ItemRutinaEjercicio[] {
    return this.getRutinaActual().ejercicios;
  }

  // === RESET ===
  resetRutina() {
    this.rutinaSubject.next(this.crearRutinaVacia());
  }


  // === UTILIDADES ===
  setClienteSeleccionado(cliente: Cliente): void {
    this.setCliente(cliente);
  }
   obtenerTodos() {
    return this.http.get<Cliente[]>(`${this.clienteUrl}`);
  }
  buscarClientes(nombre: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.clienteUrl}/buscar`, {
    params: { nombre }
    });
   }

    obtenerMedidas(): Observable<Medida[]> {
       return this.http.get<Medida[]>(this.MedidasUrl);
     }
      
     

}
