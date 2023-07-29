import { User2, Menu, X,ShoppingCart } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { logout } from "../../redux/userSlice";
import { useCookies } from "react-cookie";

const NavBar = () => {
  const navigate=useNavigate();
  const dispatch=useAppDispatch();
  const[,,removeCookie]=useCookies(['user']);
  const {isLogin}=useAppSelector(state=>state.user);
  const {itemCount}=useAppSelector(state=>state.cart);
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  
  const logOuthandler=()=>{
    setIsOpen(false);
    dispatch(logout());
    removeCookie('user');
    navigate('/login');
  }
  useEffect(() => {
    const showMenu = () => {
      if (window.innerWidth > 767) {
        setIsOpen(false);
      }
    };
    const interval = setInterval(() => {
      showMenu();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });
 
  return (
    <nav className="flex transition-all gap-5">
       <Link to='/cart' onClick={()=>setIsOpen(false)}>
       <div className="flex relative hover:scale-110 hover:cursor-pointer">
      <ShoppingCart />
      <span className={itemCount!=0?"absolute sm:top-[-13px] sm:right-2 top-[-9px] right-[-6px] bg-hoverPrimary rounded-full w-5 h-5 text-center ":"hidden"}>{itemCount}</span>
      <span className="hidden sm:block">cart</span>
      </div>
       </Link>
      <div className="sm:hidden hover:scale-110" onClick={openMobileMenu}>
        {isOpen ? <X /> : <Menu />}
      </div>
     
      <ul
        className={
          isOpen
            ? `absolute top-[3.8rem] right-[0.5rem] flex flex-col p-2 gap-2 border shadow-gray-300 z-10 bg-white`
            : "hidden sm:flex gap-5"
        }
      >
        {isLogin?(
        
        <li className="hover:scale-110 hover:cursor-pointer " onClick={logOuthandler}>Logout</li>
     
      ):(<Link className="hover:scale-110 " onClick={()=>setIsOpen(false)} to="/login">
          <li>Login</li>
        </Link>)}
        <Link className="hover:scale-110" onClick={()=>setIsOpen(false)} to="/profile">
          <User2 />
        </Link>
      </ul>
    </nav>
  );
};


export default NavBar;
