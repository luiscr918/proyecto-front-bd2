import { UserRoundPen } from "lucide-react";
import { UserRoundX } from "lucide-react";
import { SquareChartGantt } from "lucide-react";
import { useEffect, useState } from "react";
import type { Cliente } from "../../models/Cliente";
import { ClienteService } from "../../services/clienteService";
import { Link } from "react-router-dom";
export const TableClients = () => {
  const [loading, setLoading] = useState(true);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await ClienteService.getClientes();
        setClientes(data);
      } catch (error) {
        console.error("Error al cargar clientes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClientes();
  }, []);
  //metodo para borrar un cliente
  const eliminarCliente = async (id: number) => {
    try {
      //llamo a mi servicio de eliminar cliente
      await ClienteService.deleteCliente(id);
      //actualizo el estado local de la lista de clientes para que me carguen
      //solo los que sean diferente del id que elimine
      alert("Cliente eliminado correctamente");
      setClientes((prevClientes) =>
        prevClientes.filter((cliente) => cliente.id != id)
      );
    } catch (error) {
      alert("Error al eliminar el cliente");
      console.log("error: ", error);
    }
  };
  if (loading) return <p className="m-10">Cargando clientes...</p>;
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
              <th scope="col" className="px-6 py-3 text-center">
                Prestamos
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr
                key={cliente.id}
                className="odd:bg-white even:bg-gray-50 border-b border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {cliente.cedula}
                </th>
                <td className="px-6 py-4">
                  {cliente.nombre.concat(" ", cliente.apellido)}
                </td>
                <td className="px-6 py-4">{cliente.telefono}</td>
                <td className="px-6 py-4">{cliente.correo}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center align-middle">
                    <a
                      href="#"
                      className="font-medium text-cyan-400 hover:underline m-3"
                    >
                      <SquareChartGantt />
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 flex flex-row">
                  <div className="flex justify-center align-middle">
                    <Link
                      to={`/clientes/editar/${cliente.id}`}
                      className="font-medium text-blue-600 hover:underline m-3"
                    >
                      <UserRoundPen />
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        cliente.id &&
                        window.confirm("¿Deseas eliminar este cliente?") &&
                        eliminarCliente(cliente.id)
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
          to={`/clientes/registrar`}
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Registrar Nuevo Cliente
        </Link>
      </div>
    </div>
  );
};
