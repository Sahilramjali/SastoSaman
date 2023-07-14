

import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="">
        
       
            <ul>
                <Link to='/login'><li>Login</li></Link>
            </ul>
        
    </nav>
  )
}

export default NavBar