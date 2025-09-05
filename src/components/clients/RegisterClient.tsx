import { useState } from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import type { Usuario } from "../../models/Usuario";
import { UsuarioService } from "../../services/usuarioService";
import { useNavigate } from "react-router-dom";

export const RegisterClient = () => {
  const navigate = useNavigate();
  const [Usuario, setUsuario] = useState<Usuario>({
    cedula: "",
    nombre: "",
    apellido: "",
    telefono: "",
    correo: "",
    contrasenia: "",
    rolId: 0,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUsuario({ ...Usuario, [e.target.name]: e.target.value });
  };
  const guardarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await UsuarioService.createUsuario(Usuario);
      alert("Usuario Registrado Existosamente");
      setUsuario({
        cedula: "",
        nombre: "",
        apellido: "",
        telefono: "",
        correo: "",
        contrasenia: "",
        rolId: 0,
      });
      navigate("/Usuarios");
    } catch (error) {
      alert("Error al registrar Usuario");
      console.log("Error:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Registrar Usuario
        </h2>
        <form onSubmit={guardarUsuario} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Cédula</label>
            <input
              type="text"
              name="cedula"
              value={Usuario.cedula}
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
              value={Usuario.nombre}
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
              value={Usuario.apellido}
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
              value={Usuario.telefono}
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
              value={Usuario.correo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
           <div>
    <label className="block text-gray-700 mb-1">Contraseña</label>
    <input
      type="password"
      name="contrasenia"
      value={Usuario.contrasenia}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
      required
    />
  </div>
    <div>
    <label className="block text-gray-700 mb-1">Rol</label>
    <select
      name="rolId"
      value={Usuario.rolId}
      onChange={handleChange}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
      required
    >
      <option value={1}>Cliente</option>
      <option value={2}>Admin</option>
      <option value={3}>Superadmin</option>
    </select>
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
