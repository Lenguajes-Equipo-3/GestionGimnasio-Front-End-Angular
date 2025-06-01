import { Medida } from "../services/medidas-corporales.service";

export interface ItemRutinaMedida {
  medidaCorporal: Medida;
  valor: number| null;
}