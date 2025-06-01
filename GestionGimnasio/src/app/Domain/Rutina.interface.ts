import { Cliente } from "../services/cliente.service";
import { ItemRutinaMedida } from "../services/rutina.service";
import { Ejercicio } from "./Ejercicio.interface";
import { Empleado } from "./Empleado.interface";

export interface Rutina {
  idRutina: number;
  empleado: Empleado;
  cliente: Cliente;
  fechaCreacion: string;        // ISO format (YYYY-MM-DD)
  fechaRenovacion: string;      // ISO format (YYYY-MM-DD)
  objetivo: string;
  lesiones: string;
  enfermedades: string;
  esVigente: boolean;
  ejercicios: Ejercicio[];
  medidas: ItemRutinaMedida[];
}
