import { useCookies } from "react-cookie";
import checkout from "../../assets/images/success.svg";
import axios from "axios";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { clearCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";

const CheckoutSuccess = () => {
  const [cookies, ,] = useCookies(["user"]);
  const {cartItems}=useAppSelector(state=>state.cart)
  const dispatch = useAppDispatch();
  const [orderItems, setOrderItems] = useState();
  // useEffect(()=>{

  // },[])
  // useEffect(() => {
  //   const clearCartHandler = async () => {
  //     await axios
  //       .delete(import.meta.env.VITE_CLEAR_CART_API, {
  //         headers: {
  //           Authorization: `bearer ${cookies.user.token}`,
  //         },
  //       })
  //       .then((res) => {
  //         if (res?.data?.status === "success") {
  //           dispatch(clearCart());
  //         }
  //       })
  //       .catch((err) => {
  //         toast.error("Internal server error");
  //       });
  //   };
  //   clearCartHandler();
  // }, []);
  return (
    <section className="w-full h-[88vh] flex flex-col items-center justify-center ">
      <div className="h-[80px] w-[80px]">
        <img className="animate-scaleup" src={checkout} alt="tick" />
      </div>
      <h2>Payment success</h2>
    </section>
  );
};

export default CheckoutSuccess;
