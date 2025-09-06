import { useState } from "react";

import Swal from "sweetalert2";
import { VideojuegoService } from "../../services/videojuegoService";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { useNavigate } from "react-router-dom";

export const RegisterGame = () => {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [stock, setStock] = useState(0);
  const [plataforma, setPlataforma] = useState("");
  const [precio, setPrecio] = useState(0);
  const navigate = useNavigate();
  const [urlImagen, setUrlImagen] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await VideojuegoService.createVideojuego({
        titulo,
        genero,
        stock,
        plataforma,
        precio,
        urlImagen,
      });

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Videojuego registrado correctamente",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/videojuegos/admin");
      // Limpiar formulario
      setTitulo("");
      setGenero("");
      setStock(0);
      setPlataforma("");
      setPrecio(0);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar el videojuego",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Registrar Videojuego
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Título</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Género</label>
            <input
              type="text"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg"
              required
              min={0}
            />
          </div>
          <div>
            <label className="block mb-1">Plataforma</label>
            <input
              type="text"
              value={plataforma}
              onChange={(e) => setPlataforma(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Precio</label>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(parseFloat(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg"
              required
              min={0}
              step={0.01}
            />
          </div>
          <div>
            <label className="block mb-1">Url Imagen</label>
            <input
              type="text"
              value={urlImagen}
              onChange={(e) => setUrlImagen(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
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
