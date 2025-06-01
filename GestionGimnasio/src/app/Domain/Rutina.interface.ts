import { Cliente } from "../services/cliente.service";
import { Empleado } from "./Empleado.interface";
import { ItemRutinaEjercicio } from "./ItemRutinaEjercicio";
import { ItemRutinaMedida } from "./ItemRutinaMedida";

export interface Rutina {
  
  fechaCreacion: Date;
  fechaRenovacion: Date;
  esVigente: boolean;
  objetivo: string;
  lesiones: string;
  enfermedades: string;
  cliente?: Cliente;
  empleado?: Empleado;
  medidas: ItemRutinaMedida[];
  ejercicios: ItemRutinaEjercicio[];
}
