import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { VideojuegoService } from "../../services/videojuegoService";
import { PrestamoService } from "../../services/prestamoService";
import type { Videojuego } from "../../models/Videojuego";
import type { Prestamo } from "../../models/Prestamo";

export const RegisterPrestamos = () => {
  const { id } = useParams<{ id: string }>(); // id del videojuego
  const { user } = useAuth(); // usuario logueado
  const navigate = useNavigate();

  const [videojuego, setVideojuego] = useState<Videojuego | null>(null);
  const [fechaPrestamo, setFechaPrestamo] = useState<string>("");
  const [tiempoPrestamo, setTiempoPrestamo] = useState<number>(1); // 1=1 dia, 3=3 dias, 7=1 semana
  const [cantidad, setCantidad] = useState<number>(1);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [fechaDevolucion, setFechaDevolucion] = useState<string>("");

  // Cargar datos del videojuego
  useEffect(() => {
    if (!id) return;
    const fetchVideojuego = async () => {
      try {
        const data = await VideojuegoService.getVideojuegoById(id);
        setVideojuego(data);
        setSubtotal(data.precio); // cantidad inicial 1
        setTotal(data.precio * 1.15); // 15% IVA
      } catch (error) {
        console.error("Error al cargar videojuego:", error);
      }
    };
    fetchVideojuego();
  }, [id]);

  // Actualizar subtotal y total cada vez que cambie cantidad o videojuego
  useEffect(() => {
    if (!videojuego) return;
    const newSubtotal = cantidad * videojuego.precio;
    setSubtotal(newSubtotal);
    setTotal(newSubtotal * 1.15); // IVA 15%
  }, [cantidad, videojuego]);

  // Calcular fecha de devolución automáticamente
  useEffect(() => {
    if (!fechaPrestamo) {
      setFechaDevolucion("");
      return;
    }
    const prestamoDate = new Date(fechaPrestamo);
    prestamoDate.setDate(prestamoDate.getDate() + tiempoPrestamo);
    setFechaDevolucion(prestamoDate.toISOString().split("T")[0]);
  }, [fechaPrestamo, tiempoPrestamo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videojuego || !user) return;

    const nuevoPrestamo: Prestamo = {
      fechaPrestamo,
      fechaDevolucion,
      estado: "PENDIENTE",
      cantidad,
      subtotal,
      total,
      videojuegoId: videojuego.id!,
      usuarioId: user.id,
    };

    try {
      await PrestamoService.createPrestamo(nuevoPrestamo);
      alert("Préstamo registrado correctamente");
      navigate("/"); // redirige a la lista de préstamos
    } catch (error) {
      console.error("Error al registrar préstamo:", error);
      alert("No se pudo registrar el préstamo");
    }
  };

  if (!videojuego) return <p className="m-10">Cargando videojuego...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Generar Préstamo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Videojuego</label>
          <input
            type="text"
            value={videojuego.titulo}
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1">Fecha de préstamo</label>
          <input
            type="date"
            value={fechaPrestamo}
            onChange={(e) => setFechaPrestamo(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Tiempo de préstamo</label>
          <select
            value={tiempoPrestamo}
            onChange={(e) => setTiempoPrestamo(parseInt(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value={1}>1 día</option>
            <option value={3}>3 días</option>
            <option value={7}>1 semana</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Cantidad</label>
          <input
            type="number"
            min={1}
            max={videojuego.stock}
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Total (IVA 15%): ${total.toFixed(2)}</p>
          <p>Fecha de devolución: {fechaDevolucion}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Generar préstamo
        </button>
      </form>
    </div>
  );
};
