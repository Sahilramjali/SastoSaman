import { Search } from "lucide-react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import Input from "../Input";
import { useEffect, useState } from "react";
import axios from "axios";
// import SearchBar from "../Search";

const Header = () => {
  const [searchData,setSearchData]=useState('');
  const [result,setResult]=useState([]);

  useEffect(()=>{
    let timer;
    if(searchData!=''){
       timer=setTimeout(()=>{
        axios.get(`${import.meta.env.VITE_SEARCH_API}${searchData}`).then(res=>{
          setResult(res.data);
          console.log(result);
        }).catch(err=>{
         console.log("something went wrong");
        })
       },2000);
    }
    return ()=>clearTimeout(timer);
  },[searchData])
  const searchHandler=(e)=>{
    setSearchData(e.target.value);
  }
  return (
    <header className="flex flex-row justify-between items-center mb-2 pt-6 border-b-2 pb-2 w-full px-3 ">
      <Link to="/">
        <h1 className="text-lg font-bold text-gray-500 ">SastoSaman</h1>
      </Link>
      <div className="hidden md:flex gap-1 justify-start items-center border rounded px-2 py-1 bg-blue w-2/5">
      <Search />
      {
        searchData && <div className="absolute h-[100px] bg-white w-[400px] top-16 left-[18rem] z-[200] overflow-y-auto p-5">
{
  result.length!==0?result.map(data=>(
    <div key={data._id}className="h-[40px] border mb-1 flex items-center gap-3 p-2">
       
        <div className="h-[40px] w-[40px]">
          <img src={data.imageUrl} src={data.name} className="h-full w-full object-contain "/>
        </div>
        {data.name}
       
    </div>
  )): <p className="text-black text-center">No data found</p>
}
        </div>
      }
      <Input variant="noBorder" placeholder="search" value={searchData} onChange={searchHandler}/>
    </div>
      <NavBar />
    </header>
  );
};

export default Header;
