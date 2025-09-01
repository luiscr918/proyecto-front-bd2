import { TableClients } from "../components/clients/TableClients";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

export const Clientes = () => {
  return (
    <>
      <Navbar />
      <TableClients />
      <Footer />
    </>
  );
};
