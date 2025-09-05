import { api } from "../api/api";
import type { Cliente } from "../models/Usuario";
export const ClienteService = {
  //Obtener todos los clientes
  getClientes: async (): Promise<Cliente[]> => {
    const { data } = await api.get<Cliente[]>("/clientes");
    return data;
  },
  // Obtener un cliente por ID
  getClienteById: async (id: number): Promise<Cliente> => {
    const { data } = await api.get<Cliente>(`/clientes/${id}`);
    return data;
  },
  // Crear un nuevo cliente
  createCliente: async (cliente: Cliente): Promise<Cliente> => {
    const { data } = await api.post<Cliente>("/clientes", cliente);
    return data;
  },
  // Actualizar un cliente existente
  updateCliente: async (id: number, cliente: Cliente): Promise<Cliente> => {
    const { data } = await api.put<Cliente>(`/clientes/${id}`, cliente);
    return data;
  },
  // Eliminar un cliente
  deleteCliente: async (id: number): Promise<void> => {
    await api.delete(`/clientes/${id}`);
  },
};
