import type { DetallePrestamo } from "./DetallePrestamo";

export interface Videojuego {
  id?: number; // Long en Java → number en TS
  titulo: string;
  genero: string;
  stock: number;
  plataforma: string;
  precio: number;
  detallePrestamo?: DetallePrestamo; // ManyToOne opcional
}