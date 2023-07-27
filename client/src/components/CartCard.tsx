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
    setTotalProductPrice(productPrice*countProductQuantity);

  },[countProductQuantity,productPrice]);

  const updateCart=async(value:number)=>{
   await axios.post('http://localhost:5000/api/cart/updateCart',{
      productId,
      quantity:value
    },{
      headers:{
        Authorization:`bearer ${cookies.user.token}`
      }
    }).then(res=>{
      console.log(res.data);
    }).catch(err=>{
      toast.error("something went wrong")
    })
  }


  // useEffect(()=>{
  //     updateCart();
  // },[countProductQuantity]);

  const decreaseQuantity=async()=>{
    setCountProductQuantity(prev=>{
      const updateValue=prev-1;
       updateCart(updateValue);
      return updateValue;
    });
    console.log("decreased");
   
  }
  const incrementQuantity=async()=>{
    setCountProductQuantity(prev=>{
      const updateValue=prev+1;
       updateCart(updateValue);
      return updateValue;
    });
    console.log("increment");
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
    <div className="w-full flex flex-row items-center justify-between p-2 rounded-md shadow-lg mt-2 mb-2">
      <div className="flex flex-row pl-2 pt-2 gap-2 items-center">
        <div className="sm:h-[170px] sm:w-[170px] rounded-sm h-[50px] w-[60px]">
          <img
            className=" h-full w-full object-cover object-center"
            src={productImage}
            alt={productTitle}
          />
        </div>
        <div className="flex flex-col sm:gap-5 gap-1">
          <span className="sm:text-[1.2rem] sm:leading-[1.2rem] text-[1rem]">{productTitle}</span>
          <span className="sm:text-[1rem] font-[600]">Rs {totalProductPrice}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-md border sm:p-[0.2rem] hover:scale-110 p-[0.1rem]" onClick={decreaseQuantity}>
          <Minus />
        </div>
        
        <span className="sm:text-[1.2rem] font-[500] text-[1rem]">{countProductQuantity}</span>

        <div className="rounded-md border sm:p-[0.2rem] hover:scale-110 p-[0.1rem]" onClick={incrementQuantity}>
          <Plus />
        </div>
        <div className="rounded-md border sm:p-[0.2rem] hover:scale-110 p-[0.1rem]" onClick={itemRemove}>
        <X />
      </div>
      </div>
      
    </div>
  );
};

export default CartCard;
