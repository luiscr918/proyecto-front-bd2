import { api } from "../api/api";
import type { Prestamo } from "../models/Prestamo";

export const PrestamoService = {
  // Obtener todos los préstamos
  getPrestamos: async (): Promise<Prestamo[]> => {
    const { data } = await api.get<Prestamo[]>("/prestamo");
    return data;
  },

  // Obtener un préstamo por ID
  getPrestamoById: async (id: string): Promise<Prestamo> => {
    const { data } = await api.get<Prestamo>(`/prestamo/${id}`);
    return data;
  },

  // Crear un nuevo préstamo
  createPrestamo: async (prestamo: Prestamo): Promise<Prestamo> => {
    const { data } = await api.post<Prestamo>("/prestamo", prestamo);
    return data;
  },

  // Actualizar un préstamo existente
  updatePrestamo: async (id: string, prestamo: Prestamo): Promise<Prestamo> => {
    const { data } = await api.put<Prestamo>(`/prestamo/${id}`, prestamo);
    return data;
  },

  // Eliminar un préstamo
  deletePrestamo: async (id: string): Promise<void> => {
    await api.delete(`/prestamo/${id}`);
  },

  // Obtener préstamos por usuario
  getPrestamosPorUsuario: async (usuarioId: string): Promise<Prestamo[]> => {
    const { data } = await api.get<Prestamo[]>(`/prestamo/usuario/${usuarioId}`);
    return data;
  },

  // Obtener préstamos por videojuego
  getPrestamosPorVideojuego: async (videojuegoId: string): Promise<Prestamo[]> => {
    const { data } = await api.get<Prestamo[]>(`/prestamo/videojuego/${videojuegoId}`);
    return data;
  },

  // Obtener préstamos por estado
  getPrestamosPorEstado: async (estado: string): Promise<Prestamo[]> => {
    const { data } = await api.get<Prestamo[]>(`/prestamo/estado/${estado}`);
    return data;
  },

  // Cambiar estado de un préstamo (admin)
cambiarEstado: async (id: string, nuevoEstado: string): Promise<void> => {
  await api.patch(`/prestamo/${id}/estado`, { estado: nuevoEstado });
},

};
