export interface Prestamo {
  id?: string; // Correcto: _id de MongoDB es un String
  fechaPrestamo: string;
  fechaDevolucion: string;
  estado: string;
  usuarioId: string; // Es el ID del usuario, no el objeto completo
}