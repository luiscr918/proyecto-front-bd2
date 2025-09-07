import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"
import { GestionPrestamo } from "../components/superAdmin/GestionPrestamo"


export const SuperAdmin = () => {
  return (
    <>
      <Navbar />
      <GestionPrestamo/>
      <Footer />
    </>
  )
}
