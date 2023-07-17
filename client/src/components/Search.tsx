import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="hidden md:flex gap-1 justify-start items-center border rounded px-2 py-1 bg-blue w-2/5">
      <Search />
      <input
        type="text"
        className="bg-inherit border-none outline-none w-full"
        placeholder="search"
      />
    </div>
  );
};

export default SearchBar;
