import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { ReactElement } from "react";

interface ProtectedRouteProps {
  children: ReactElement;
  roles?: number[]; // opcional: lista de roles permitidos
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { user } = useAuth();
  console.log("Usuario actual:", user); // <--- Aquí ves el usuario cargado
  // Si no hay usuario -> redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si se definieron roles y el rol del usuario no está permitido -> redirigir home
  if (roles && !roles.includes(user.rolId)) {
    return <Navigate to="/" replace />;
  }

  // Si pasa validaciones, mostrar el children
  return children;
};
