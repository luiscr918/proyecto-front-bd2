import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { Prestamo } from "../../models/Prestamo";
import { PrestamoService } from "../../services/prestamoService";
import { UsuarioService } from "../../services/usuarioService";
import { VideojuegoService } from "../../services/videojuegoService";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

interface PrestamoConNombres extends Prestamo {
  usuarioNombre?: string;
  videojuegoNombre?: string;
}

export const GestionPrestamo = () => {
  const [prestamos, setPrestamos] = useState<PrestamoConNombres[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrestamos = async () => {
      try {
        const data = await PrestamoService.getPrestamos();

        const prestamosConNombres = await Promise.all(
          data.map(async (p) => {
            let usuarioNombre = "Desconocido";
            let videojuegoNombre = "Desconocido";

            // Traer nombre de usuario
            try {
              const usuario = await UsuarioService.getUsuarioById(p.usuarioId);
              usuarioNombre = usuario.nombre + " " + usuario.apellido;
            } catch (e) {
              console.warn("Usuario no encontrado:", e);
            }

            // Traer nombre de videojuego
            try {
              const videojuego = await VideojuegoService.getVideojuegoById(p.videojuegoId);
              videojuegoNombre = videojuego.titulo;
            } catch (e) {
              console.warn("Videojuego no encontrado:", e);
            }

            return {
              ...p,
              usuarioNombre,
              videojuegoNombre,
            };
          })
        );

        setPrestamos(prestamosConNombres);
      } catch (err) {
        console.error("Error al cargar préstamos:", err);
        Swal.fire("Error", "No se pudieron cargar los préstamos", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchPrestamos();
  }, []);

  const cambiarEstado = (id?: string, nuevoEstado?: string) => {
    if (!id || !nuevoEstado) return;

    PrestamoService.updatePrestamo(id, { estado: nuevoEstado } as Prestamo)
      .then(() => {
        setPrestamos((prev) =>
          prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
        );
        Swal.fire("Éxito", `Estado cambiado a ${nuevoEstado}`, "success");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "No se pudo cambiar el estado", "error");
      });
  };

  const eliminarPrestamo = (id?: string) => {
    if (!id) return;

    Swal.fire({
      title: "¿Deseas eliminar este préstamo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        PrestamoService.deletePrestamo(id)
          .then(() => {
            setPrestamos((prev) => prev.filter((p) => p.id !== id));
            Swal.fire("Eliminado", "El préstamo ha sido eliminado", "success");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error", "No se pudo eliminar el préstamo", "error");
          });
      }
    });
  };

  if (loading) return <p className="m-10 text-white">Cargando préstamos...</p>;

  return (
    <>
      <Navbar />
      <div className="m-14">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Videojuego</th>
                <th className="px-6 py-3">Cliente</th>
                <th className="px-6 py-3">Fecha préstamo</th>
                <th className="px-6 py-3">Fecha devolución</th>
                <th className="px-6 py-3">Cantidad</th>
                <th className="px-6 py-3">Subtotal</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {prestamos.map((p) => (
                <tr
                  key={p.id}
                  className="odd:bg-white even:bg-gray-50 border-b border-gray-200 hover:bg-gray-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {p.videojuegoNombre}
                  </td>
                  <td className="px-6 py-4">{p.usuarioNombre}</td>
                  <td className="px-6 py-4">{p.fechaPrestamo}</td>
                  <td className="px-6 py-4">{p.fechaDevolucion}</td>
                  <td className="px-6 py-4">{p.cantidad ?? 0}</td>
                  <td className="px-6 py-4">${p.subtotal?.toFixed(2) ?? "0.00"}</td>
                  <td className="px-6 py-4">${p.total?.toFixed(2) ?? "0.00"}</td>
                  <td className="px-6 py-4">{p.estado ?? "Pendiente"}</td>
                  <td className="px-6 py-4 flex gap-2 justify-center">
                    <button
                      onClick={() => cambiarEstado(p.id, "APROBADO")}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => cambiarEstado(p.id, "RECHAZADO")}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Rechazar
                    </button>
                    <button
                      onClick={() => eliminarPrestamo(p.id)}
                      className="px-3 py-1 bg-gray-700 text-white rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};
