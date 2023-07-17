

import { Outlet } from "react-router-dom"
import Header from "./components/Header"
const Layout = () => {
  return (
    <main className="max-w-[1280px] w-full">
        <Header/>
        <Outlet/>
    </main>
  )
}

export default Layout