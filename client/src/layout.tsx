

import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
// import Footer from "./components/Footer/Footer"
import { Toaster } from "react-hot-toast"
const Layout = () => {
  return (
    <main className="max-w-[1280px] w-full">
        <Header/>
        <Outlet/>
        {/* <Footer/> */}
        <Toaster />
    </main>
  )
}

export default Layout