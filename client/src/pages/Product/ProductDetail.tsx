import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useCookies } from "react-cookie";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addToCart } from "../../redux/cartSlice";
import Card from "../../components/Category/Card";
const ProductDetail = () => {
    const {isLogin}=useAppSelector(state=>state.user);
   
    const dispatch=useAppDispatch();
    const [cookies,,]=useCookies(['user']);
    const navigate=useNavigate();
  const {id} = useParams();
  console.log(id);
  const [product, setProduct] = useState([]);
  const [relatedProducts,setRelatedProducts]=useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/product/getProductDetail/${id}`)
      .then((res) => {
        setProduct(res.data.product[0]);
        console.log(res.data.product[0]);
       
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal server error");
      });
  }, [id]);
  useEffect(() => {
    if(product.category){
        axios.get(`http://localhost:5000/api/product/getproductByCategory?category=${product.category}`).then(res=>{
        
    const FilteredProduct=res.data.products.filter(product=>product._id!==id);
       setRelatedProducts(FilteredProduct);
    console.log("+++++++++++++++++++++++++");
        console.log(FilteredProduct);
       
    }).catch(err=>{
        console.log(err);
        
        toast.error("Server TimeOut");
    })
    }
  }, [product]);

const handleAddToCart=async()=>{
    if(isLogin){
        await axios.post("http://localhost:5000/api/cart/updateCart",{
            productId:product._id,
            quantity:1,
        },{
            headers:{
                authorization :`bearer ${cookies?.user?.token}`
            }
        }).then(async res=>{
            console.log("++++==========================================")
            console.log(res.data);
            
            toast.success("Item is added to cart");
           await axios.get("http://localhost:5000/api/cart/getCart",{
                headers:{
                    authorization :`bearer ${cookies?.user?.token}`
                }
            }).then(res=>{
                dispatch(addToCart(res.data.cartItems));
                
            })
        }).catch(err=>{
            console.log(err);
            toast.error("something went wrong")
        });
    }else{
        navigate("/login");
    }
}

  return (
    <section className="w-full h-[87vh] flex flex-col pt-6">
      {
        product && <div className="w-full flex flex-row flex-wrap">
        <div className="w-[75%] flex flex-col  sm:flex-row gap-2 flex-wrap px-2">
          <div className="h-[250px] w-[250px] sm:h-[330px] sm:w-[330px]">
            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div className=" p-[1rem] flex flex-col sm:gap-[5rem] gap-[2rem]">
                <p className="text-[22px] font-[700]">
                    {product.name}
                </p>
                <span className="text-[30px] font-[700] text-hoverPrimary">Rs.{product.price}</span>    
                <div className="flex flex-col sm:flex-row  gap-5">
                        <button className="text-white bg-sky-500 px-8 py-4 hover:cursor-pointer hover:scale-110 outline-none border-none rounded">Buy Now</button>
                        <button onClick={handleAddToCart} className="text-white bg-sky-500 px-8 py-4 hover:cursor-pointer hover:scale-110 outline-none border-none rounded">Add to cart</button>
                </div>
          </div>


          <div className=" flex-col hidden sm:flex">
            <span className="px-3 text-[1.2rem] font-[600]">Related products</span>
            {relatedProducts && relatedProducts.map((product,index)=>(
                 <Card key={product._id} {...product}/>
            ))}
          </div>
        </div>
      </div>
      }
    </section>
  );
};

export default ProductDetail;
