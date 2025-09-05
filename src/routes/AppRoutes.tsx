import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Clientes } from "../pages/Clientes";
import { RegisterClient } from "../components/clients/RegisterClient";
import { UpdateClient } from "../components/clients/UpdateClient";
import { Login } from "../pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { Videojuegos } from "../pages/Videojuegos";
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
