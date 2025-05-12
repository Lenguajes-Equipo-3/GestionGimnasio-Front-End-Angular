import { ImagenEjercicio } from "./ImagenEjercicio.interface";
import { Categoria } from "./CategoriaEjercicio.interface";

export interface Ejercicio {
  id?: number; // El ID debe estar definido como opcional
  categoriaEjercicio: Categoria; // Cambiado a un objeto de tipo Categoria
  nombreEjercicio: string;
  descripcionEjercicio: string;
  codigoEquipo?: string;
  imagenes: ImagenEjercicio[];
}