import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import type { Usuario } from "../models/Usuario";

export const Navbar = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const storedUsuario = localStorage.getItem("usuario");
    if (storedUsuario) {
      setUsuario(JSON.parse(storedUsuario));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario"); // borra la sesión
    setUsuario(null);

    Swal.fire({
      icon: "success",
      title: "Sesión cerrada",
      text: "Has cerrado sesión correctamente",
      timer: 1500,
      showConfirmButton: false,
    });

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <nav className="bg-gray-900 border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            GameLoan
          </span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg bg-gray-800 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-900 border-gray-700">
            <li>
              <Link
                to={"/"}
                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-500 md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {/* videojuegos */}
            <li>
              <Link
                to={"/videojuegos"}
                className="block py-2 px-3 text-white rounded-sm hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0"
              >
                Videojuegos
              </Link>
            </li>
            {/*Mostrar Usuarios solo si es superAdministrador */}
            {usuario?.rolId === 3 && (
              <li>
                <Link
                  to={"/usuarios"}
                  className="block py-2 px-3 text-white rounded-sm hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0"
                >
                  Usuarios
                </Link>
              </li>
            )}

            {/* Mostrar "Mis Préstamos" solo si el usuario está logueado y es rol 1 (Cliente) */}
            {usuario?.rolId === 1 && (
              <li>
                <Link
                  to={"/prestamos"}
                  className="block py-2 px-3 text-white rounded-sm hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-500 md:p-0"
                >
                  Mis Préstamos
                </Link>
              </li>
            )}

            {/* Mostrar Iniciar Sesión y Registrarse SOLO si no hay usuario */}
            {!usuario && (
              <>
                <li>
                  <Link
                    to={"/login"}
                    className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Iniciar Sesión
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/usuarios/registrar"}
                    className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            )}

            {/* Mostrar Cerrar Sesión SOLO si hay usuario */}
            {usuario && (
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Cerrar Sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
