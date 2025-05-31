export interface UsuarioLoginResponse {
  usuario: string;
  nombreEmpleado: string;
  apellidosEmpleado: string;
  roles: string[]; // Cambiado de `rol: string` a `roles: string[]`
  token: string;
}
