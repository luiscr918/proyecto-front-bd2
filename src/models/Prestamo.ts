export interface Prestamo {
  id?: string; // Correcto: _id de MongoDB es un String
  fechaPrestamo: string;
  fechaDevolucion: string;
  estado: string;
  cantidad: number;
  subtotal: number; // El subtotal corresponde al precio por cantidad
  total:number; //mas el iva
  videojuegoId: string;//referencia al id del videojuego
  usuarioId: string; // Es el ID del usuario, no el objeto completo
}