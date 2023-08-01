
import {FC} from 'react';
import axios from "axios"
import { cardItem } from "../../redux/cartSlice"
import { useNavigate } from 'react-router-dom';
import  toast  from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { useAppSelector } from '../../hooks/useAppSelector';
interface checkoutButtonProps{
    cartItems:cardItem[];
    userId:string;
}

const CheckoutButton:FC<checkoutButtonProps> = ({cartItems,userId}) => {
    const navigate=useNavigate();
    const [cookies,,]=useCookies(['user']);
    const {isLogin}=useAppSelector(state=>state.user);
    const handleCheckout=async()=>{
        if(isLogin){
            await axios.post(import.meta.env.VITE_CLEAR_CHECKOUT,{
                cartItems,
                userId,
                },{
                    headers:{
                        authorization: `beare ${cookies?.user?.token}`
                    }
                }).then((res)=>{
                    console.log(res.data.url);
                    if(res.data.url){
                        navigate(res.data.url);
                        
                        toast.success("payment success");
                    }
                }).catch(err=>{
                    console.log(err);
                    toast.error("payment unsuccessfull");
                })

        }else{
                navigate('/login');
        }
      
    }
  return (
   <button  className="py-4 px-12 bg-sky-500 rounded hover:scale-105 mt-4" onClick={handleCheckout}>Check out</button>
  )
}

export default CheckoutButton