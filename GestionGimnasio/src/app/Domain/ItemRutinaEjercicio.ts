import { Ejercicio } from "./Ejercicio.interface";

export interface ItemRutinaEjercicio {
  ejercicio: Ejercicio;
  series: number;
  repeticiones: number;
  codigoEquipo: string;
}