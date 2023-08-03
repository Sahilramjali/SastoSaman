
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
            await axios.post(import.meta.env.VITE_CART_CHECKOUT,{
                cartItems,
                userId,
                },{
                    headers:{
                        // Authorization:'Bearer sk_test_51NZPl7SFsjEGTgYl09WDSFZx9tU3Cd1GRfbheOP8a7BXM48a0kqwx5ZMiGWxaGz1AA4Y16FquaH5wJJlwk7flNbp00WLnDTVrl',
                        authorization: `bearer ${cookies?.user?.token}`
                    }
                }).then((res)=>{
                    console.log(res.data.url); 
                    if(res.data.url){
                        window.location.href=res.data.url;
                        
                        
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
   <button  className="py-4 px-12 bg-sky-500 rounded hover:scale-105 mt-4 text-white font-[600]" onClick={handleCheckout}>Checkout</button>
  )
}

export default CheckoutButton