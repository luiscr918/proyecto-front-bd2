import { useState } from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import type { Cliente } from "../../models/Cliente";
import { ClienteService } from "../../services/clienteService";
import { useNavigate } from "react-router-dom";

export const RegisterClient = () => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<Cliente>({
    cedula: "",
    nombre: "",
    apellido: "",
    telefono: "",
    correo: "",
    prestamos: [],
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };
  const guardarCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ClienteService.createCliente(cliente);
      alert("Cliente Registrado Existosamente");
      setCliente({
        cedula: "",
        nombre: "",
        apellido: "",
        telefono: "",
        correo: "",
        prestamos: [],
      });
      navigate("/clientes");
    } catch (error) {
      alert("Error al registrar cliente");
      console.log("Error:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Registrar Cliente
        </h2>
        <form onSubmit={guardarCliente} className="space-y-4">
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
            Registrar
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};
