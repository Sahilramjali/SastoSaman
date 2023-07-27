
import { useAppSelector } from "../../hooks/useAppSelector"

import { Navigate } from "react-router-dom";
import CartCard from './../../components/CartCard';
import { useEffect,useCallback,useState} from  "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CookiesProps } from "../../Type/user";


interface cardItemsProps{
  _id:string,
  userId:string,
  productId:string,
  quantity:number,
  productData:[
    {
      _id:string;
      name:string;
      category:string;
      description:string;
      imageUrl:string;
      price:number;
      userId:string;
      createdAt:string;
      updatedAt:string
    }
  ]
}


const Cart = () => {
  const[cookies,,]=useCookies(['user']);
    const{isLogin}=useAppSelector(state=>state.user);
    const[cartItems,setCartItems]=useState<cardItemsProps[]>([]);
    const[totalPrice,setTotalPrice]=useState<number>(0);
   
    const fetchCartItems=useCallback(async()=>{
      await  axios.get('http://localhost:5000/api/cart/getCart',{
       headers:{
         authorization:`beare ${cookies?.user?.token}`
       }
     }).then((res)=>{
       setCartItems(res.data.cartItems);
         console.log(cartItems);
         const total=cartItems.reduce((sum,product)=>{
             return sum+product.productData[0].price*product.quantity
         },0);
         console.log(cartItems);
         setTotalPrice(total);
     }).catch((err)=>{
       console.log(err);
       toast.error("Internal server Error")
     })
 },[cartItems,cookies?.user?.token])
    
    useEffect(()=>{
      
   if(cookies?.user?.token){
    fetchCartItems();
   }
      
    },[]);
    
    
    if(!isLogin){
      
      return(<Navigate to="/login" replace/>)
    }
  
  return (
    <section className="w-full  flex flex-col p-2">
       {cartItems.length===0?<p className="text-center">No product added in cart</p>:
        <>
        {
          cartItems.map(product=>(
             <CartCard key={product._id}
             productId={product.productId}
            productTitle={product.productData[0].name}
            productPrice={product.productData[0].price}
            productImage={product.productData[0].imageUrl}
            productQuantity={product.quantity}
            />
          ))
        }
         <hr className="mt-6 border-[0.2rem]"/>
       <div className="w-full flex flex-col gap-5 mt-[2rem]">
       
       <div>
       <h4 className="font-[800] text-[1.5rem]">Summary</h4>
        <span>In your cart {cartItems.length} {cartItems.length>1?`items`:`item`}</span>
       </div>
        <span>total : Rs. <span className="font-[800]">{totalPrice}</span></span>
      
       </div>
        </>

       }
      
    </section>);
}

export default Cart