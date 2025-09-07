import { useEffect, useState } from "react";
import type { Prestamo } from "../../models/Prestamo";
import { PrestamoService } from "../../services/prestamoService";
import { UsuarioService } from "../../services/usuarioService";
import { VideojuegoService } from "../../services/videojuegoService";
import Swal from "sweetalert2";
import { UserRoundCheck, UserRoundX } from "lucide-react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

interface PrestamoConNombres extends Prestamo {
  usuarioNombre?: string;
  videojuegoNombre?: string;
}

export const CambiarEstadoPrestamo = () => {
  const [prestamos, setPrestamos] = useState<PrestamoConNombres[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PrestamoService.getPrestamos();
        const prestamosConNombres = await Promise.all(
          data.map(async (p) => {
            const usuario = await UsuarioService.getUsuarioById(p.usuarioId);
            const videojuego = await VideojuegoService.getVideojuegoById(p.videojuegoId);
            return {
              ...p,
              usuarioNombre: usuario.nombre,
              videojuegoNombre: videojuego.titulo,
            };
          })
        );
        setPrestamos(prestamosConNombres);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const cambiarEstado = (id: string, nuevoEstado: string) => {
    PrestamoService.cambiarEstado(id, nuevoEstado)
      .then(() => {
        setPrestamos((prev) =>
          prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
        );
        Swal.fire({
          icon: "success",
          title: "Estado cambiado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <p className="m-10">Cargando préstamos...</p>;

  return (
    <>
    <Navbar/>
    <div className="m-14">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">Videojuego</th>
              <th className="px-6 py-3">Cliente</th>
              <th className="px-6 py-3">Fecha Préstamo</th>
              <th className="px-6 py-3">Fecha Devolución</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {prestamos.map((p) => (
              <tr
                key={p.id}
                className="odd:bg-white even:bg-gray-50 border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="px-6 py-4 font-medium text-gray-900">{p.videojuegoNombre}</td>
                <td className="px-6 py-4">{p.usuarioNombre}</td>
                <td className="px-6 py-4">{p.fechaPrestamo}</td>
                <td className="px-6 py-4">{p.fechaDevolucion}</td>
                <td className="px-6 py-4 font-semibold">{p.estado}</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    onClick={() => cambiarEstado(p.id!, "APROBADO")}
                    className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    <UserRoundCheck size={16} /> Aprobar
                  </button>
                  <button
                    onClick={() => cambiarEstado(p.id!, "RECHAZADO")}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    <UserRoundX size={16} /> Rechazar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Footer/>
    </>
  );
};
