import Carousel from "../../components/Carousel"

import CategoryComponent from "../../components/Category/CategoryItemsCarousel"
import Footer from "../../components/Footer/Footer"

import { useCallback, useEffect } from "react"
import axios from "axios"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { addToCart } from "../../redux/cartSlice"
import { useCookies } from "react-cookie"

const Home = () => {
const dispatch=useAppDispatch();
const[cookies,,]=useCookies(['user']);
  useEffect(()=>{
    document.title=`SastoSaman: Home`
  });

  const fetchCartItems = useCallback(async () => {
    await axios
      .get("http://localhost:5000/api/cart/getCart", {
        headers: {
          authorization: `beare ${cookies?.user?.token}`,
        },
      })
      .then((res) => {
       
        dispatch(addToCart(res.data.cartItems));
      })
      .catch((err) => {
        console.log(err);
       
      });
  }, [cookies?.user?.token, dispatch]);

  useEffect(() => {
    if (cookies?.user?.token) {
      fetchCartItems();
    }
  }, []);
  return (
    <>
     <Carousel/>
     <CategoryComponent category="Beauty and care"/>
     <CategoryComponent category="Electronics appliance"/>
    <Footer/>
    </>
  
  )
}

export default Home