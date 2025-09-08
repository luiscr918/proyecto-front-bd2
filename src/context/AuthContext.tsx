import { createContext } from "react";

interface Usuario {
  id: string;
  correo: string;
  rolId: number;
  nombre:string;
  apellido:string;
}

interface AuthContextType {
  user: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

// Solo el contexto aquí
export const AuthContext = createContext<AuthContextType | undefined>(undefined);