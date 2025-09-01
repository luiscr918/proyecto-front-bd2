import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Clientes } from "../pages/Clientes";
import { RegisterClient } from "../components/clients/RegisterClient";
import { UpdateClient } from "../components/clients/UpdateClient";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/clientes/registrar" element={<RegisterClient />} />
      <Route path="/clientes/editar/:id" element={<UpdateClient />} />
    </Routes>
  );
};
