
import { useAppSelector } from "../../hooks/useAppSelector"

import { Navigate } from "react-router-dom";
import CartCard from './../../components/CartCard';
import { useEffect,useState} from  "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-hot-toast";


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
  
    const fetchCartItems=async()=>{
        return await  axios.get('http://localhost:5000/api/cart/getCart',{
          headers:{
            authorization:`beare ${cookies?.user?.token}`
          }
        }).then((res)=>{
          setCartItems(res.data.cartItems);
            console.log(cartItems);
            const total=cartItems.reduce((sum,product)=>{
                return sum+product.productData[0].price*product.quantity
            },0);
            setTotalPrice(total);
        }).catch((err)=>{
          console.log(err);
          toast.error("Internal server Error")
        })
    }
    useEffect(()=>{
      fetchCartItems();
    },[]);
    
    
    if(isLogin){
       return (
        <section className="w-full h-[88vh] flex flex-col items-center">
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
            </>

           }
        </section>
       )
    }
  return(<Navigate to="/login" />)
  
}

export default Cart