import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { UsuarioService } from "../services/usuarioService";
import Swal from "sweetalert2";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- Aquí
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const usuario = await UsuarioService.login(correo, contrasenia);

      // Guardar en contexto
      login({
        ...usuario,
        id: usuario.id ?? ""
      });

      // Guardar también en localStorage (opcional)
      localStorage.setItem("usuario", JSON.stringify(usuario));

      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: `Hola ${usuario.nombre}`,
        timer: 1500,
        showConfirmButton: false,
      });

      // Redirigir según rol
      switch (usuario.rolId) {
        case 1:
          navigate("/"); // página del cliente
          break;
        case 2:
          navigate("/admin"); // página del admin
          break;
        case 3:
          navigate("/usuarios"); // página del superadmin
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Correo o contraseña incorrectos",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};
