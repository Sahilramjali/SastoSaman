import { useAppSelector } from "../../hooks/useAppSelector";

import { Navigate } from "react-router-dom";
import CartCard from "./../../components/CartCard";
import { useEffect, useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addToCart } from "../../redux/cartSlice";



export interface cardItemsProps {
  _id: string;
  userId: string;
  productId: string;
  quantity: number;
  productData: [
    {
      _id: string;
      name: string;
      category: string;
      description: string;
      imageUrl: string;
      price: number;
      userId: string;
      createdAt: string;
      updatedAt: string;
    }
  ];
}

const Cart = () => {
  const {cartItems,totalPrice}=useAppSelector(state=>state.cart);
  const dispatch=useAppDispatch();
  const [cookies, ,] = useCookies(["user"]);
  
  const { isLogin } = useAppSelector((state) => state.user);
  const [cartItem, setCartItems] = useState<cardItemsProps[]>(cartItems);
  // const [totalPrices, setTotalPrice] = useState<number>(0);
  const [reload, setReload] = useState(false);

  const fetchCartItems = useCallback(async () => {
    await axios
      .get("http://localhost:5000/api/cart/getCart", {
        headers: {
          authorization: `beare ${cookies?.user?.token}`,
        },
      })
      .then((res) => {
        setCartItems(res.data.cartItems);
        dispatch(addToCart(res.data.cartItems));
        console.log(cartItem);
       console.log(cartItems);
        
        // setTotalPrice();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server Error");
      });
  }, [cartItem, cookies?.user?.token]);

  useEffect(() => {
    if (cookies?.user?.token) {
      fetchCartItems();
    }
  }, [reload]);

  const removeQuantity = async(item: cardItemsProps) => {
    if (item.quantity > 1) {
      const inew:cardItemsProps = { ...item };
      inew.quantity = inew.quantity - 1;
      
      axios
        .post(
          'http://localhost:5000/api/cart/updateCart',
          {
            productId:inew.productId,
            quantity:inew.quantity
          },
          {
            headers: {
              Authorization: "bearer " + cookies?.user?.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setReload(!reload);
        })
        .catch((err) => {
          console.log(err);
          toast.error("something went wrong")
        });
    } else{
    await  itemRemove(item.productId);
    }
    console.log("hit reduce");
  };

  const addQuantity = (item: cardItemsProps) => {
    
      const inew:cardItemsProps = { ...item };
      inew.quantity = inew.quantity + 1;
      
      axios
        .post(
          'http://localhost:5000/api/cart/updateCart',
          {
            productId:inew.productId,
            quantity:inew.quantity
          },
          {
            headers: {
              Authorization: "bearer " + cookies?.user?.token,
            },
          }
        )
        .then((res) => {
          console.log(res)
          setReload(!reload);
        })
        .catch((err) => {
          console.log(err);
          toast.error("something went wrong")
        });
    
  };

  const itemRemove=async(productId:string)=>{
    await axios.delete(`http://localhost:5000/api/cart/removeItemFromCart/`+productId,{
      headers:{
        Authorization:`bearer ${cookies.user.token}`
      }
    }).then(res=>{
      console.log(res);
      toast.success("remove item");
      setReload(!reload);
    }).catch(err=>{
      toast.error("something went wrong")
    })
    
  }

  
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="w-full  flex flex-col p-2">
      {cartItems.length === 0 ? (
        <p className="text-center">No product added in cart</p>
      ) : (
        <>
          {cartItems.map((product,index) => (
            <CartCard
              key={product._id+index}
              product={product}
              removeQuantity={removeQuantity}
              addQuantity={addQuantity}
              itemRemove={itemRemove}
           
            />
          ))}
          <hr className="mt-6 border-[0.2rem]" />
          <div className="w-full flex flex-col gap-5 mt-[2rem]">
            <div>
              <h4 className="font-[800] text-[1.5rem]">Summary</h4>
              <span>
                In your cart {cartItems.length}{" "}
                {cartItems.length > 1 ? `items` : `item`}
              </span>
            </div>
            <span>
              total : Rs. <span className="font-[800]">{totalPrice}</span>
            </span>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
