import type { Prestamo } from "./Prestamo";

export interface Cliente {
  id?: number;            // corresponde a Long en Java
  cedula: string;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  prestamos?: Prestamo[]; // relación con la otra tabla
}