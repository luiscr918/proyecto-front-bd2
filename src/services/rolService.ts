import { api } from "../api/api";
import type { Rol } from "../models/Rol";

export const RolService = {
  // Obtener todos los roles
  getRoles: async (): Promise<Rol[]> => {
    const { data } = await api.get<Rol[]>("/api/roles");
    return data;
  },

  // Obtener un rol por ID
  getRolById: async (id: number): Promise<Rol> => {
    const { data } = await api.get<Rol>(`/api/roles/${id}`);
    return data;
  },

  // Crear un nuevo rol
  createRol: async (rol: Rol): Promise<Rol> => {
    const { data } = await api.post<Rol>("/api/roles", rol);
    return data;
  },

  // Actualizar un rol existente
  updateRol: async (id: number, rol: Rol): Promise<Rol> => {
    const { data } = await api.put<Rol>(`/api/roles/${id}`, rol);
    return data;
  },

  // Eliminar un rol
  deleteRol: async (id: number): Promise<void> => {
    await api.delete(`/api/roles/${id}`);
  },
};
