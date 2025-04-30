import { ImagenEjercicio } from "./ImagenEjercicio.interface";

export interface Ejercicio {
    idCategoriaEjercicio: number;
    nombreEjercicio: string;
    descripcionEjercicio: string;
    codigoEquipo?: string;
    imagenes: ImagenEjercicio[];
  }