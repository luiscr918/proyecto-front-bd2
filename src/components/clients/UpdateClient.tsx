import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { useEffect, useState } from "react";
import type { Usuario } from "../../models/Usuario";
import { UsuarioService } from "../../services/usuarioService";

export const UpdateClient = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [Usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        if (!id) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        const data = await UsuarioService.getUsuarioById(id);
        setUsuario(data);
      } catch (error) {
        console.error("Usuario no encontrado:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuario();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!Usuario) return;
    setUsuario({ ...Usuario, [e.target.name]: e.target.value });
  };

  const actualizarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Usuario || !id) return;

    try {
      await UsuarioService.updateUsuario(id, Usuario);
      alert("Usuario actualizado exitosamente");
      navigate("/usuarios");
    } catch (error) {
      console.error("Error al actualizar Usuario:", error);
      alert("No se pudo actualizar el Usuario");
    }
  };

  if (loading) return <p className="m-10">Cargando Usuario...</p>;
  if (notFound)
    return <p className="m-10 text-red-600">Usuario con ID {id} no existe.</p>;
  if (!Usuario) return null;
  return (
    <div>
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Actualizar Usuario
          </h2>
          <form onSubmit={actualizarUsuario} className="space-y-4">
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
                <option value={0}>Cliente</option>
                <option value={1}>Admin</option>
                <option value={2}>Superadmin</option>
              </select>
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
