import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { useEffect, useState } from "react";
import type { Cliente } from "../../models/Usuario";
import { ClienteService } from "../../services/clienteService";

export const UpdateClient = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        if (!id) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        const data = await ClienteService.getClienteById(Number(id));
        setCliente(data);
      } catch (error) {
        console.error("Cliente no encontrado:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCliente();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!cliente) return;
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const actualizarCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliente || !id) return;

    try {
      await ClienteService.updateCliente(Number(id), cliente);
      alert("Cliente actualizado exitosamente");
      navigate("/clientes");
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      alert("No se pudo actualizar el cliente");
    }
  };

  if (loading) return <p className="m-10">Cargando cliente...</p>;
  if (notFound)
    return <p className="m-10 text-red-600">Cliente con ID {id} no existe.</p>;
  if (!cliente) return null;
  return (
    <div>
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Actualizar Cliente
          </h2>
          <form onSubmit={actualizarCliente} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Cédula</label>
              <input
                type="text"
                name="cedula"
                value={cliente.cedula}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={cliente.nombre}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Apellido</label>
              <input
                type="text"
                name="apellido"
                value={cliente.apellido}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={cliente.telefono}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Correo</label>
              <input
                type="email"
                name="correo"
                value={cliente.correo}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Actualizar
            </button>
          </form>
        </div>
        <Footer />
      </>
    </div>
  );
};
