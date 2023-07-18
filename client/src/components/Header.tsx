import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import SearchBar from "./Search";

const Header = () => {
  return (
    <header className="flex flex-row justify-between items-center mb-2 pt-6 border-b-2 pb-2 w-full px-3">
      <Link to="/">
        <h1 className="text-lg font-bold text-gray-500 ">SastoSaman</h1>
      </Link>
      <SearchBar />
      <NavBar />
    </header>
  );
};

export default Header;
