import type { Cliente } from "./Cliente";
import type { DetallePrestamo } from "./DetallePrestamo";

export interface Prestamo {
  id?: number; // Long en Java → number en TS
  fechaPrestamo: string; // Date en Java → string en ISO desde la API
  fechaDevolucion: string;
  estado: string;
  cliente?: Cliente; // ManyToOne relación opcional
  detalles?: DetallePrestamo[]; // OneToMany relación opcional
}