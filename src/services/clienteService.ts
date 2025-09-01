import { api } from "../api/api";
import type { Cliente } from "../models/Cliente";
//Obtener todos los clientes
export const getClientes = async (): Promise<Cliente[]> => {
  const { data } = await api.get<Cliente[]>("/clientes");
  return data;
};
// Obtener un cliente por ID
export const getClienteById = async (id: number): Promise<Cliente> => {
  const { data } = await api.get<Cliente>(`/clientes/${id}`);
  return data;
};

// Crear un nuevo cliente
export const createCliente = async (cliente: Cliente): Promise<Cliente> => {
  const { data } = await api.post<Cliente>("/clientes", cliente);
  return data;
};

// Actualizar un cliente existente
export const updateCliente = async (
  id: number,
  cliente: Cliente
): Promise<Cliente> => {
  const { data } = await api.put<Cliente>(`/clientes/${id}`, cliente);
  return data;
};

// Eliminar un cliente
export const deleteCliente = async (id: number): Promise<void> => {
  await api.delete(`/clientes/${id}`);
};
