import { Cliente } from "../services/cliente.service";
import { Medida } from "../services/medidas-corporales.service";
import { Ejercicio } from "./Ejercicio.interface";
import { Empleado } from "./Empleado.interface";



export interface ItemRutinaEjercicioInterface {
  rutina: RutinaCompleta;
  ejercicio: Ejercicio;
  series: number;
  repeticiones: number;
  codigoEquipo: string;
}


export interface ItemRutinaMedidaInterface {
  medidaCorporal: Medida;
   rutina: RutinaCompleta;
  valor: number| null;
}
export interface RutinaCompleta {
  
    empleado?: Empleado;
    cliente?: Cliente;
    fechaCreacion: Date;
    fechaRenovacion: Date;
    objetivo: string;
    lesiones: string;
    enfermedades: string;
    esVigente: boolean;
    ejercicios: ItemRutinaEjercicioInterface[];
    medidas: ItemRutinaMedidaInterface[];
    
}
