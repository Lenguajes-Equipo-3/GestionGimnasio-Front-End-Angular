import { ImagenEjercicio } from "./ImagenEjercicio.interface";

export interface Ejercicio {
    id?: number; // El ID debe estar definido como opcional
    idCategoriaEjercicio: number;
    nombreEjercicio: string;
    descripcionEjercicio: string;
    codigoEquipo?: string;
    imagenes: ImagenEjercicio[];
  }