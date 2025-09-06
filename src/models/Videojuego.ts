export interface Videojuego {
  id?: string; // Correcto: Corresponde al _id de MongoDB (String)
  titulo: string;
  genero: string;
  stock: number;
  plataforma: string;
  precio: number;
  urlImagen: string;
}
