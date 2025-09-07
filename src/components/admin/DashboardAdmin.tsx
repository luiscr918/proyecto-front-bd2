import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const DashboardAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    Swal.fire({
      icon: "success",
      title: "Sesión cerrada",
      text: "Has cerrado sesión correctamente",
      timer: 1500,
      showConfirmButton: false,
    });
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="m-14">
      <h2 className="text-3xl font-bold mb-8 text-white text-center">
        Dashboard Admin
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          onClick={() => navigate("/prestamos/admin")}
          className="cursor-pointer bg-green-600 hover:bg-green-500 transition duration-300 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center"
        >
          <span className="text-white text-xl font-semibold mb-2">
            Administrar Préstamos
          </span>
          <span className="text-white text-4xl">📋</span>
        </div>
      </div>

      {/* Botón de Cerrar Sesión */}
      <div className="flex justify-center mt-10">
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};
