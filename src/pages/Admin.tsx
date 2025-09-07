import { CambiarEstadoPrestamo } from "../components/admin/CambiarEstadoPrestamo"
import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"


export const Admin = () => {
  return (
    <>
      <Navbar />
      <CambiarEstadoPrestamo />
      <Footer />
    </>
  )
}
