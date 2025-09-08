import { useEffect, useState } from "react";

import { VideojuegoService } from "../../services/videojuegoService";
import type { Videojuego } from "../../models/Videojuego";
import { Link } from "react-router-dom";

export const AllGames = () => {
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

  if (loading) return <p className="m-10">Cargando videojuegos...</p>;

  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-center ">
        Conoce todos nuestros videojuegos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 m-10">
        {videojuegos.map((vj) => (
          <div
            key={vj.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={vj.urlImagen}
              alt={vj.titulo}
              className="h-48 w-full object-contain"
            />
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-bold mb-2">{vj.titulo}</h3>
              <p className="text-gray-600 mb-1">Género: {vj.genero}</p>
              <p className="text-gray-600 mb-1">Plataforma: {vj.plataforma}</p>
              <p className="text-gray-600 mb-2">Stock: {vj.stock}</p>
              <p className="text-gray-800 font-semibold mb-4">${vj.precio}</p>
              <Link
                to={`/prestamos/registrar/${vj.id}`}
                className="mt-auto bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Generar pedido
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
