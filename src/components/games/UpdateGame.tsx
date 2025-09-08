import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Videojuego } from "../../models/Videojuego";
import { VideojuegoService } from "../../services/videojuegoService";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

export const UpdateGame = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [videojuego, setVideojuego] = useState<Videojuego | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchVideojuego = async () => {
      try {
        if (!id) {
          setNotFound(true);
          setLoading(false);
          return;
        }
        const data = await VideojuegoService.getVideojuegoById(id);
        setVideojuego(data);
      } catch (error) {
        console.error("Videojuego no encontrado:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchVideojuego();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!videojuego) return;
    setVideojuego({ ...videojuego, [e.target.name]: e.target.value });
  };

  const actualizarVideojuego = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videojuego || !id) return;

    try {
      await VideojuegoService.updateVideojuego(id, videojuego);
      alert("Videojuego actualizado exitosamente");
      navigate("/videojuegos/admin");
    } catch (error) {
      console.error("Error al actualizar Videojuego:", error);
      alert("No se pudo actualizar el Videojuego");
    }
  };

  if (loading) return <p className="m-10">Cargando Videojuego...</p>;
  if (notFound)
    return (
      <p className="m-10 text-red-600">Videojuego con ID {id} no existe.</p>
    );
  if (!videojuego) return null;

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Actualizar Videojuego
        </h2>
        <form onSubmit={actualizarVideojuego} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Título</label>
            <input
              type="text"
              name="titulo"
              value={videojuego.titulo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Género</label>
            <input
              type="text"
              name="genero"
              value={videojuego.genero}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={videojuego.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Plataforma</label>
            <input
              type="text"
              name="plataforma"
              value={videojuego.plataforma}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Precio</label>
            <input
              type="number"
              name="precio"
              value={videojuego.precio}
              onChange={handleChange}
              step="0.01"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Url Imagen</label>
            <input
              type="text"
              name="url_imagen"
              value={videojuego.urlImagen}
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
    </div>
  );
};
