import { UserRoundPen } from "lucide-react";
import { UserRoundX } from "lucide-react";
import { SquareChartGantt } from "lucide-react";
import { useEffect, useState } from "react";
import type { Cliente } from "../../models/Cliente";
import { ClienteService } from "../../services/clienteService";
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
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline m-3"
                    >
                      <UserRoundPen />
                    </a>
                    <a
                      href="#"
                      className="font-medium text-red-600 hover:underline m-3"
                    >
                      <UserRoundX />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
