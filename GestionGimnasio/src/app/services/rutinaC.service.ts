import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rutina } from '../Domain/Rutina.interface';
import { Cliente } from './cliente.service';
import { Empleado } from '../Domain/Empleado.interface';
import { ItemRutinaMedida } from '../Domain/ItemRutinaMedida';
import { ItemRutinaEjercicio } from '../Domain/ItemRutinaEjercicio';
import { HttpClient } from '@angular/common/http';
import { Medida } from './medidas-corporales.service';
import { EmpleadoService } from './empleado.service';
import { ItemRutinaEjercicioInterface, ItemRutinaMedidaInterface, RutinaCompleta } from '../Domain/RutinaCompleta.interface';

@Injectable({
  providedIn: 'root'
})
export class RutinaContextService {
  private rutinaSubject = new BehaviorSubject<Rutina>(this.crearRutinaVacia());
   // private rutinaCompleta = new BehaviorSubject<RutinaCompleta>(this.crearRutinaCompletaVacia());

  rutina$ = this.rutinaSubject.asObservable();
// rutinaComp$=this.rutinaCompleta.asObservable();
   private clienteUrl = 'http://localhost:8080/proyecto/api/clientes'; 
  private MedidasUrl = 'http://localhost:8080/proyecto/api/medidascorporales';
  private RutinasUrl = 'http://localhost:8080/proyecto/api/rutinas';



     constructor(private http: HttpClient, private empleadoService: EmpleadoService) {}
      
     insertar(rutina: RutinaCompleta): Observable<Rutina> {
    return this.http.post<RutinaCompleta>(`${this.RutinasUrl}`, rutina);
  }
  private crearRutinaVacia(): Rutina {
    return {
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
// private crearRutinaCompletaVacia(): RutinaCompleta {
//       return {

//       empleado: undefined,
//       cliente: undefined,
//       fechaCreacion: new Date(),
//       fechaRenovacion: new Date(new Date().setMonth(new Date().getMonth() + 3)),
//       objetivo: '',
//       lesiones: '',
//       enfermedades: '',
//       esVigente: true,
//       ejercicios: [],
//       medidas: []
      
//     };}


  // setRutinaCompleta(medidas: ItemRutinaMedidaInterface[], ejercicio: ItemRutinaEjercicioInterface[],cliente: Cliente,objetivo: string, lesiones: string, enfermedades: string, fechaRenovacion: Date, esVigente: boolean) {
  //   const rutina = this.rutinaCompleta.getValue();
  //    rutina.cliente = cliente;
  //   rutina.fechaCreacion = new Date();
  //   rutina.fechaRenovacion = fechaRenovacion;
  //   rutina.objetivo = objetivo;
  //   rutina.lesiones = lesiones;
  //   rutina.enfermedades = enfermedades;
  //   rutina.esVigente = esVigente;
  //  rutina.medidas=medidas;
  //  rutina.ejercicios=ejercicio;


  //     const idEmpleado = localStorage.getItem('idEmpleado');
  //     if (!idEmpleado) {
  //         console.error('No se encontró el idEmpleado en localStorage');
  //         return;
  //       }
  //       const id = parseInt(idEmpleado, 10);
  //       this.empleadoService.getEmpleadoById(id).subscribe({
  //         next: (empleado: Empleado) => {
  //           rutina.empleado = empleado;
  //         },
  //         error: err => {
  //           console.error('Error al obtener el empleado:', err);
  //         }
  //       });

  //   console.log('📝 Datosset:', rutina)

  //   this.rutinaCompleta.next(rutina);
  // }

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
    console.log('📝 Datos generales actualizados:', rutina);

    this.rutinaSubject.next(rutina);
  }

 
  setMedidas(medidas: ItemRutinaMedida[]) {
    const rutina = this.rutinaSubject.getValue();
    rutina.medidas = medidas;
    console.log('📝 Datos medidas  actualizados:', rutina);

    this.rutinaSubject.next(rutina);
  }

  setEjercicios(ejercicios: ItemRutinaEjercicio[]) {
    const rutina = this.rutinaSubject.getValue();
    rutina.ejercicios = ejercicios;
    this.rutinaSubject.next(rutina);
   
  console.log('📝 Datos create:', rutina);

  }

  actualizarRutina(rutina: Rutina) {
    console.log('🚀 Datos recibidos para actualizar la rutina:', rutina);
  this.rutinaSubject.next(rutina);
  console.log('✅ Estado actualizado:', this.rutinaSubject.getValue());
  }

  // === GETTERS ===
  getRutinaActual(): Rutina {
    return this.rutinaSubject.getValue();
  }
  
  // === RESET ===
  resetRutina() {
    this.rutinaSubject.next(this.crearRutinaVacia());
  }

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

   //Medidas
    obtenerMedidas(): Observable<Medida[]> {
       return this.http.get<Medida[]>(this.MedidasUrl);
     }
      
     

}
