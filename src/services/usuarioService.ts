import { api } from "../api/api";
import type { Usuario } from "../models/Usuario";
export const UsuarioService = {
  //Obtener todos los Usuarios
  getUsuarios: async (): Promise<Usuario[]> => {
    const { data } = await api.get<Usuario[]>("/usuarios");
    return data;
  },
  // Obtener un Usuario por ID
  getUsuarioById: async (id: string): Promise<Usuario> => {
    const { data } = await api.get<Usuario>(`/usuarios/${id}`);
    return data;
  },
  // Crear un nuevo Usuario
  createUsuario: async (Usuario: Usuario): Promise<Usuario> => {
    const { data } = await api.post<Usuario>("/usuarios", Usuario);
    return data;
  },
  // Actualizar un Usuario existente
  updateUsuario: async (id: string, Usuario: Usuario): Promise<Usuario> => {
    const { data } = await api.put<Usuario>(`/usuarios/${id}`, Usuario);
    return data;
  },
  // Eliminar un Usuario
  deleteUsuario: async (id: string): Promise<void> => {
    await api.delete(`/usuarios/${id}`);
  },
  // Login de usuario
  login: async (correo: string, contrasenia: string): Promise<Usuario> => {
    const { data } = await api.post<Usuario>("/usuarios/login", {
      correo,
      contrasenia,
    });
    return data;
  },
};
