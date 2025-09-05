export interface Usuario {
  id?: string; // Corresponde al _id de MongoDB, que es un String
  cedula: string;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  contrasenia: string;
  rolId: number; // Es el ID del rol, no el objeto completo
}
