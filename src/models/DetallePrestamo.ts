export interface DetallePrestamo {
  id?: string; // Correcto: _id de MongoDB es un String
  cantidad: number;
  subtotal: number; // El subtotal corresponde al precio por unidad
  prestamoId: string; // Referencia al ID del préstamo
  videojuegoId: string; // Referencia al ID del videojuego
}