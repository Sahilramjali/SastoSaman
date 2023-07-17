import { User2, Menu, X,ShoppingCart } from "lucide-react";

import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => {
    setIsOpen(!isOpen);
  };
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
  console.log(isOpen);
  return (
    <nav className="flex transition-all gap-5">
       <div className="flex relative hover:scale-110">
      <ShoppingCart />
      <span className="absolute sm:top-[-13px] sm:right-2 top-[-9px] right-[-6px] bg-hoverPrimary rounded-full w-5 h-5 text-center ">1</span>
      <span className="hidden sm:block">cart</span>
      </div>
      <div className="sm:hidden hover:scale-110" onClick={openMobileMenu}>
        {isOpen ? <X /> : <Menu />}
      </div>
     
      <ul
        className={
          isOpen
            ? `absolute top-[3.8rem] right-[0.5rem] flex flex-col p-2 gap-2 border shadow-gray-300`
            : "hidden sm:flex gap-5"
        }
      >
        <Link className="hover:scale-110 " to="/login">
          <li>Login</li>
        </Link>
        <Link className="hover:scale-110" to="/profile">
          <User2 />
        </Link>
      </ul>
    </nav>
  );
};
// position: absolute;
// top: 3.5rem;
// right: 1.5rem;
// z-index: 10;
// border: 1px solid black;
// padding: 1rem;
// // gap: 1.5rem;

export default NavBar;
