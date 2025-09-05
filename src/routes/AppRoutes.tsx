import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Clientes } from "../pages/Clientes";
import { RegisterClient } from "../components/clients/RegisterClient";
import { UpdateClient } from "../components/clients/UpdateClient";
import { Login } from "../pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* Ruta protegida: solo rol 3 (superadmin) */}
      <Route
        path="/usuarios"
        element={
          <ProtectedRoute roles={[2, 3]}>
            <Clientes />
          </ProtectedRoute>
        }
      />
      <Route path="/usuarios/registrar" element={<RegisterClient />} />
      <Route
        path="/usuarios/editar/:id"
        element={
          <ProtectedRoute roles={[2, 3]}>
            <UpdateClient />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
