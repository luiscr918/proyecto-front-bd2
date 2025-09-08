import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserRoundPen, UserRoundX } from "lucide-react"; // Reutilizamos iconos para editar/eliminar
import type { Videojuego } from "../../models/Videojuego";
import { VideojuegoService } from "../../services/videojuegoService";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

export const AllGamesAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [videojuegos, setVideojuegos] = useState<Videojuego[]>([]);

  useEffect(() => {
    const fetchVideojuegos = async () => {
      try {
        const data = await VideojuegoService.getVideojuegos();
        setVideojuegos(data);
      } catch (error) {
        console.error("Error al cargar videojuegos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideojuegos();
  }, []);

  const eliminarVideojuego = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("¿Deseas eliminar este videojuego?")) return;

    try {
      await VideojuegoService.deleteVideojuego(id);
      alert("Videojuego eliminado correctamente");
      setVideojuegos((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      alert("Error al eliminar el videojuego");
      console.error("Error:", error);
    }
  };

  if (loading) return <p className="m-10">Cargando videojuegos...</p>;

  return (
    <>
      <Navbar />
      <div className="m-14">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Título</th>
                <th className="px-6 py-3">Género</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Plataforma</th>
                <th className="px-6 py-3">Precio</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {videojuegos.map((v) => (
                <tr
                  key={v.id}
                  className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                >
                  <td className="px-6 py-4">{v.titulo}</td>
                  <td className="px-6 py-4">{v.genero}</td>
                  <td className="px-6 py-4">{v.stock}</td>
                  <td className="px-6 py-4">{v.plataforma}</td>
                  <td className="px-6 py-4">{v.precio}</td>
                  <td className="px-6 py-4 flex flex-row">
                    <Link
                      to={`/videojuegos/editar/${v.id}`}
                      className="text-blue-600 hover:underline m-3"
                    >
                      <UserRoundPen />
                    </Link>
                    <button
                      onClick={() => eliminarVideojuego(v.id)}
                      className="text-red-600 hover:underline m-3 cursor-pointer"
                    >
                      <UserRoundX />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5">
          <Link
            to="/videojuegos/registrar"
            className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Registrar Nuevo Videojuego
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};
