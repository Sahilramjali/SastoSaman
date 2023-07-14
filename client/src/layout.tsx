

import { Outlet } from "react-router-dom"
import Header from "./components/Header"
const Layout = () => {
  return (
    <div className="mx-5">
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Layout