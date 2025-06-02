import { Cliente } from "../services/cliente.service";
import { Medida } from "../services/medidas-corporales.service";
import { Ejercicio } from "./Ejercicio.interface";
import { Empleado } from "./Empleado.interface";



export interface ItemRutinaEjercicio {
  rutina?: Rutina;
  ejercicio: Ejercicio;
  series: number;
  repeticiones: number;
  codigoEquipo: string;
}


export interface ItemRutinaMedida{
  medidaCorporal: Medida;
   rutina?: Rutina;
  valor: number| null;
}
export interface Rutina {
   idRutina:number;
    empleado?: Empleado;
    cliente?: Cliente;
    fechaCreacion: Date;
    fechaRenovacion: Date;
    objetivo: string;
    lesiones: string;
    enfermedades: string;
    esVigente: boolean;
    ejercicios: ItemRutinaEjercicio[];
    medidas: ItemRutinaMedida[];
    
}
