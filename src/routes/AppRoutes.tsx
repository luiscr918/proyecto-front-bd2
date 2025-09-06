import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Clientes } from "../pages/Clientes";
import { RegisterClient } from "../components/clients/RegisterClient";
import { UpdateClient } from "../components/clients/UpdateClient";
import { Login } from "../pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { Videojuegos } from "../pages/Videojuegos";
import { RegisterGame } from "../components/games/RegisterGame";
import { AllGamesAdmin } from "../components/games/AllGamesAdmin";
import { UpdateGame } from "../components/games/UpdateGame";
import { RegisterPrestamos } from "../components/prestamos/RegisterPrestamos";
import { Prestamos } from "../pages/Prestamos";
import { UpdatePrestamoClient } from "../components/prestamos/UpdatePrestamoClient";
//roles
/* 1-Cliente
2-Admin
3-SuperAdmin */
export const AppRoutes = () => {
  return (
    <Routes>
      {/* rutas sin restriccion */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/usuarios/registrar" element={<RegisterClient />} />
      <Route path="/videojuegos" element={<Videojuegos />} />

      {/* Rutas protegidas por login y rol */}
      {/* RUTAS PARA PRESTAMOS-CLIENTE */}
      <Route
        path="/prestamos/editar/cliente/:id"
        element={
          <ProtectedRoute roles={[1]}>
            <UpdatePrestamoClient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prestamos/mis-prestamos"
        element={
          <ProtectedRoute roles={[1]}>
            <Prestamos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/prestamos/registrar/:id"
        element={
          <ProtectedRoute roles={[1]}>
            <RegisterPrestamos />
          </ProtectedRoute>
        }
      />
      {/* RUTAS PARA VIDEOJUEGOS ADMIN-SUPERADMIN */}
      <Route
        path="/videojuegos/registrar"
        element={
          <ProtectedRoute roles={[2, 3]}>
            <RegisterGame />
          </ProtectedRoute>
        }
      />
      <Route
        path="/videojuegos/admin"
        element={
          <ProtectedRoute roles={[2, 3]}>
            <AllGamesAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/videojuegos/editar/:id"
        element={
          <ProtectedRoute roles={[2, 3]}>
            <UpdateGame />
          </ProtectedRoute>
        }
      />
      {/* RUTAS PARA ADMINISTRAR USUARIOS ADMIN-SUPERADMIN */}
      <Route
        path="/usuarios"
        element={
          <ProtectedRoute roles={[2, 3]}>
            <Clientes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/usuarios/editar/:id"
        element={
          <ProtectedRoute roles={[3]}>
            <UpdateClient />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
