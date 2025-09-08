import { useEffect, useState } from "react";
import { PrestamoService } from "../../services/prestamoService";
import type { Prestamo } from "../../models/Prestamo";
import { VideojuegoService } from "../../services/videojuegoService";
import type { Videojuego } from "../../models/Videojuego";
import { useParams } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { useAuth } from "../../context/useAuth";

export const PrestamosClientReview = () => {
  const { id } = useParams<{ id: string }>(); // id del usuario
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [videojuegosMap, setVideojuegosMap] = useState<
    Record<string, Videojuego>
  >({});
  const { user } = useAuth();
  useEffect(() => {
    if (!id) return;

    // Traer todos los préstamos del usuario
    const fetchPrestamos = async () => {
      try {
        const data = await PrestamoService.getPrestamosPorUsuario(id);
        setPrestamos(data);

        // Obtener info de videojuegos para mostrar nombre
        const juegosIds = Array.from(new Set(data.map((p) => p.videojuegoId)));
        const juegosData = await Promise.all(
          juegosIds.map((id) => VideojuegoService.getVideojuegoById(id))
        );
        const map: Record<string, Videojuego> = {};
        juegosData.forEach((j) => {
          if (j.id) map[j.id] = j;
        });
        setVideojuegosMap(map);
      } catch (error) {
        console.error("Error al cargar préstamos:", error);
      }
    };

    fetchPrestamos();
  }, [id]);

  const handleEliminar = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este préstamo?")) return;
    try {
      await PrestamoService.deletePrestamo(id);
      setPrestamos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar préstamo:", error);
      alert("No se pudo eliminar el préstamo");
    }
  };

  if (!id) return <p className="m-10">El usuario no existe</p>;

  if (prestamos.length === 0)
    return <p className="m-10">No tienes préstamos registrados</p>;
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Prestamos</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Videojuego</th>
              <th className="border px-4 py-2">Fecha préstamo</th>
              <th className="border px-4 py-2">Fecha devolución</th>
              <th className="border px-4 py-2">Cantidad</th>
              <th className="border px-4 py-2">Subtotal</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Estado</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {prestamos.map((p) => (
              <tr key={p.id} className="text-center">
                <td className="border px-4 py-2">
                  {videojuegosMap[p.videojuegoId]?.titulo || "N/D"}
                </td>
                <td className="border px-4 py-2">{p.fechaPrestamo}</td>
                <td className="border px-4 py-2">{p.fechaDevolucion}</td>
                <td className="border px-4 py-2">{p.cantidad}</td>
                <td className="border px-4 py-2">${p.subtotal.toFixed(2)}</td>
                <td className="border px-4 py-2">${p.total.toFixed(2)}</td>
                <td className="border px-4 py-2">{p.estado}</td>
                <td className="border px-4 py-2 space-x-2">
                  {user?.rolId === 3 && (
                    <button
                      onClick={() => handleEliminar(p.id!)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};
