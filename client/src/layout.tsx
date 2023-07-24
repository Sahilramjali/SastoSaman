

import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header"
// import Footer from "./components/Footer/Footer"
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useAppDispatch } from "./hooks/useAppDispatch";
import {getCookieStorage} from './redux/userSlice';
const Layout = () => {
  const dispatch=useAppDispatch();

  const[cookies,,]=useCookies(['user']);
  useEffect(()=>{
    console.log(cookies.user);
      if(cookies.user){
        const username=cookies.user.username;
        const id=cookies.user.id;
        const token=cookies.user.token;
        dispatch(getCookieStorage({username,id,token}))
      }
  },[]);

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