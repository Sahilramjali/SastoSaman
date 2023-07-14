import NavBar from "./NavBar"
import { Link } from "react-router-dom"
const Header = () => {
  return (
    <header className="flex flex-row justify-between mb-2 pt-6">
      <Link to='/'><h1 className="text-lg font-bold text-gray-500">SastoSaman</h1></Link>  
        <NavBar/>
    </header>
  )
}

export default Header