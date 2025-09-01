import type { Prestamo } from "./Prestamo";
import type { Videojuego } from "./Videojuego";

export interface DetallePrestamo {
  id: number;           // Long en Java → number en TS
  cantidad: number;
  total: number;
  prestamo?: Prestamo;  // Relación ManyToOne con Prestamo
  videojuegos?: Videojuego[]; // Relación OneToMany con Videojuego
}