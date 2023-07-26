import { Plus, Minus, X } from "lucide-react";
import axios from "axios";
import { FC,useEffect,useState } from "react";
import { useCookies } from "react-cookie";
import  toast  from "react-hot-toast";
interface CartCardProps {
  productTitle: string;
  productPrice: number;
  productImage: string;
  productQuantity: number;
  productId:string;
}

const CartCard: FC<CartCardProps> = ({
  productId,
  productTitle,
  productImage,
  productQuantity,
  productPrice,
}) => {
  const [cookies,,]=useCookies(['user'])
  const [totalProductPrice,setTotalProductPrice]=useState<number>(productPrice);
  const [countProductQuantity,setCountProductQuantity]=useState<number>(productQuantity)
  useEffect(()=>{
    setTotalProductPrice(productPrice*productQuantity);

  },[productQuantity]);

  const updateCart=async()=>{
   await axios.post('http://localhost:5000/api/cart/updateCart',{
      productId,
      quantity:countProductQuantity
    },{
      headers:{
        Authorization:`bearer ${cookies.user.token}`
      }
    }).then(res=>{
      console.log(res);
    }).catch(err=>{
      toast.error("something went wrong")
    })
  }


  // useEffect(()=>{
  //     updateCart();
  // },[countProductQuantity]);

  const decreaseQuantity=async()=>{
    setCountProductQuantity(prev=>prev-1);
    console.log(countProductQuantity);
   await  updateCart();
  }
  const incrementQuantity=async()=>{
    setCountProductQuantity(prev=>prev+1);
    console.log(countProductQuantity);
    await  updateCart();
  }
  const itemRemove=async()=>{
    await axios.delete(`http://localhost:5000/api/cart/removeItemFromCart/`+productId,{
      headers:{
        Authorization:`bearer ${cookies.user.token}`
      }
    }).then(res=>{
      console.log(res);
      toast.success("remove item");
    }).catch(err=>{
      toast.error("something went wrong")
    })
    
  }
  return (
    <div className="w-[75%] flex flex-row items-center justify-between p-2 rounded-md shadow-lg m-2">
      <div className="flex flex-row pl-2 pt-2 gap-2 items-center">
        <div className="h-[180px] w-[180px] rounded-sm ">
          <img
            className=" h-full w-full object-cover object-center"
            src={productImage}
            alt={productTitle}
          />
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-[1.2rem] leading-[1.2rem]">{productTitle}</span>
          <span className="text-[1rem] font-[600]">Rs {totalProductPrice}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-md border p-[0.2rem] hover:scale-110" onClick={decreaseQuantity}>
          <Minus />
        </div>
        
        <span className="text-[1.2rem] font-[500]">{countProductQuantity}</span>

        <div className="rounded-md border p-[0.2rem] hover:scale-110" onClick={incrementQuantity}>
          <Plus />
        </div>
      </div>
      <div className="rounded-md border p-[0.2rem] hover:scale-110" onClick={itemRemove}>
        <X />
      </div>
    </div>
  );
};

export default CartCard;
