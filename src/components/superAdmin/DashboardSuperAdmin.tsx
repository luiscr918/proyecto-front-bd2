import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { useAuth } from "../../context/useAuth";

export const DashboardSuperAdmin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <div className="m-14">
        {/* Saludo dinámico */}
        {user && (
          <h3 className="text-xl text-black mb-4">
            Bienvenid@,{" "}
            <span className="font-bold">
              {user.nombre + " " + user.apellido}
            </span>
          </h3>
        )}
        <h2 className="text-3xl font-bold mb-8 text-black text-center">
          Dashboard SuperAdmin
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Administrar Juegos */}
          <div
            onClick={() => navigate("/videojuegos/admin")}
            className="cursor-pointer bg-blue-600 hover:bg-blue-500 transition duration-300 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center"
          >
            <span className="text-white text-xl font-semibold mb-2">
              Administrar Juegos
            </span>
            <span className="text-white text-4xl">🎮</span>
          </div>

          {/* Administrar Préstamos */}
          <div
            onClick={() => navigate("/prestamos/superadmin")}
            className="cursor-pointer bg-green-600 hover:bg-green-500 transition duration-300 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center"
          >
            <span className="text-white text-xl font-semibold mb-2">
              Administrar Préstamos
            </span>
            <span className="text-white text-4xl">📋</span>
          </div>

          {/* Administrar Usuarios */}
          <div
            onClick={() => navigate("/usuarios")}
            className="cursor-pointer bg-purple-600 hover:bg-purple-500 transition duration-300 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center"
          >
            <span className="text-white text-xl font-semibold mb-2">
              Administrar Usuarios
            </span>
            <span className="text-white text-4xl">👤</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
