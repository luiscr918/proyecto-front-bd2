import { UserRoundPen } from "lucide-react";
import { UserRoundX } from "lucide-react";
import { SquareChartGantt } from "lucide-react";
import { useEffect, useState } from "react";
import type { Usuario } from "../../models/Usuario";
import { UsuarioService } from "../../services/usuarioService";
import { Link } from "react-router-dom";
export const TableClients = () => {
  const [loading, setLoading] = useState(true);
  const [Usuarios, setUsuarios] = useState<Usuario[]>([]);
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await UsuarioService.getUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al cargar Usuarios:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);
  //metodo para borrar un Usuario
  const eliminarUsuario = async (id: string) => {
    try {
      //llamo a mi servicio de eliminar Usuario
      await UsuarioService.deleteUsuario(id);
      //actualizo el estado local de la lista de Usuarios para que me carguen
      //solo los que sean diferente del id que elimine
      alert("Usuario eliminado correctamente");
      setUsuarios((prevUsuarios) =>
        prevUsuarios.filter((Usuario) => Usuario.id != id)
      );
    } catch (error) {
      alert("Error al eliminar el Usuario");
      console.log("error: ", error);
    }
  };
  if (loading) return <p className="m-10">Cargando Usuarios...</p>;
  //poner nombre al rol por el id
  const nombrarRol = (id: number) => {
    let nombre = "";
    switch (id) {
      case 1:
        nombre = "Cliente";
        break;
      case 2:
        nombre = "Admin";
        break;
      case 3:
        nombre = "SuperAdmin";
        break;

      default:
        nombre = "Rol desconocido";
        break;
    }
    return nombre;
  };
  return (
    <div className="m-14">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Cédula
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Telefono
              </th>
              <th scope="col" className="px-6 py-3">
                Correo
              </th>
              <th scope="col" className="px-6 py-3">
                Rol
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Prestamos
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {Usuarios.map((Usuario) => (
              <tr
                key={Usuario.id}
                className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {Usuario.cedula}
                </th>
                <td className="px-6 py-4">
                  {Usuario.nombre.concat(" ", Usuario.apellido)}
                </td>
                <td className="px-6 py-4">{Usuario.telefono}</td>
                <td className="px-6 py-4">{Usuario.correo}</td>
                <td className="px-6 py-4">{nombrarRol(Usuario.rolId)}</td>
                {Usuario.rolId !== 1 ? (
                  <td className="px-6 py-4">
                    <p className="text-center">No aplica</p>
                  </td>
                ) : (
                  <td className="px-6 py-4">
                    <div className="flex justify-center align-middle">
                      <Link
                        to={`/usuarios/prestamos/${Usuario.id}`}
                        className="font-medium text-cyan-400 hover:underline m-3"
                      >
                        <SquareChartGantt />
                      </Link>
                    </div>
                  </td>
                )}

                <td className="px-6 py-4 flex flex-row">
                  <div className="flex justify-center align-middle">
                    <Link
                      to={`/usuarios/editar/${Usuario.id}`}
                      className="font-medium text-blue-600 hover:underline m-3"
                    >
                      <UserRoundPen />
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        Usuario.id &&
                        window.confirm("¿Deseas eliminar este Usuario?") &&
                        eliminarUsuario(Usuario.id)
                      }
                      className="font-medium text-red-600 hover:underline m-3 cursor-pointer"
                    >
                      <UserRoundX />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5">
        <Link
          to={`/usuarios/registrar`}
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Registrar Nuevo Usuario
        </Link>
      </div>
    </div>
  );
};
