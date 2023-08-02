import { useAppSelector } from "../../hooks/useAppSelector";

import { Navigate } from "react-router-dom";
import CartCard from "./../../components/CartCard";
import { useEffect, useCallback, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addToCart, clearCart } from "../../redux/cartSlice";
import CheckoutButton from "../../components/checkout/CheckoutButton";

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
  const { cartItems, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [cookies, ,] = useCookies(["user"]);

  const { isLogin } = useAppSelector((state) => state.user);
  const [cartItem, setCartItems] = useState<cardItemsProps[]>(cartItems);

  const [reload, setReload] = useState(false);
  useEffect(() => {
    document.title = "Cart";
  }, []);
  const fetchCartItems = useCallback(async () => {
    await axios
      .get(import.meta.env.VITE_GET_CART_API, {
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

  const removeQuantity = async (item: cardItemsProps) => {
    if (item.quantity > 1) {
      const inew: cardItemsProps = { ...item };
      inew.quantity = inew.quantity - 1;

      axios
        .post(
          import.meta.env.VITE_UPDATE_CART_API,
          {
            productId: inew.productId,
            quantity: inew.quantity,
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
          toast.error("something went wrong");
        });
    } else {
      await itemRemove(item.productId);
    }
    console.log("hit reduce");
  };

  const addQuantity = (item: cardItemsProps) => {
    const inew: cardItemsProps = { ...item };
    inew.quantity = inew.quantity + 1;

    axios
      .post(
        import.meta.env.VITE_UPDATE_CART_API,
        {
          productId: inew.productId,
          quantity: inew.quantity,
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
        toast.error("something went wrong");
      });
  };

  const itemRemove = async (productId: string) => {
    await axios
      .delete(import.meta.env.VITE_REMOVE_ITEM_FROM_CART_API + productId, {
        headers: {
          Authorization: `bearer ${cookies.user.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("remove item");
        setReload(!reload);
      })
      .catch((err) => {
        toast.error("something went wrong");
      });
  };

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  const handleClearCart = async () => {
    await axios
      .delete(import.meta.env.VITE_CLEAR_CART_API, {
        headers: {
          Authorization: `bearer ${cookies.user.token}`,
        },
      })
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success("Removed item");
          dispatch(clearCart());
          setReload(!reload);
        } else {
          toast.error("Something went wrong");
          setReload(!reload);
        }
      })
      .catch((err) => {
        toast.error("Internal server error");
        setReload(!reload);
      });
  };

  return (
    <section className="w-full  flex flex-col p-2">
      {cartItem.length === 0 ? (
        <p className="text-center">No product added in cart</p>
      ) : (
        <>
          {cartItem.map((product, index) => (
            <CartCard
              key={product._id + index}
              product={product}
              removeQuantity={removeQuantity}
              addQuantity={addQuantity}
              itemRemove={itemRemove}
            />
          ))}
          <hr className="mt-6 border-[0.2rem]" />
          <div className="w-full flex flex-row flex-wrap">
            <div className="w-full flex flex-col gap-5 mt-[2rem]">
              <button
                className="px-5 py-4 bg-slate-500 w-[200px] border-none outline-none rounded hover:scale-105 text-white font-[600]"
                onClick={handleClearCart}
              >
                clear Cart
              </button>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-4">
                  <h4 className="font-[800] text-[1.5rem]">Summary</h4>
                  <span>
                    In your cart {cartItem.length}{" "}
                    {cartItem.length > 1 ? `items` : `item`}
                  </span>
                  <span>
                  total : Rs. <span className="font-[800]">{totalPrice}</span>
                </span>
                </div>
               
                <div className="h-5">
                <CheckoutButton cartItems={cartItem} userId={cookies?.user?.id}/>
                </div>
              </div>
              
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
