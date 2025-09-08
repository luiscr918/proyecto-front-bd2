import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

interface Usuario {
  id: string;
  correo: string;
  rolId: number;
  nombre:string;
  apellido:string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(() => {
    const storedUser = localStorage.getItem("usuario");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (usuario: Usuario) => {
    setUser(usuario);
    localStorage.setItem("usuario", JSON.stringify(usuario));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};