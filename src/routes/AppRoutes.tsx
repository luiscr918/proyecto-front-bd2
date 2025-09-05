import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Clientes } from "../pages/Clientes";
import { RegisterClient } from "../components/clients/RegisterClient";
import { UpdateClient } from "../components/clients/UpdateClient";
import { Login } from "../pages/Login";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/usuarios" element={<Clientes />} />
      <Route path="/usuarios/registrar" element={<RegisterClient />} />
      <Route path="/usuarios/editar/:id" element={<UpdateClient />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
