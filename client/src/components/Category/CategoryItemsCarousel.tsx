import { useEffect, FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Card from "./Card";
import toast from 'react-hot-toast';
interface categoryComponentProps {
  category: string;
}

const CategoryComponent: FC<categoryComponentProps> = ({ category }) => {
  const navigate = useNavigate();
 
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/product/getproductByCategory?category=${category}`
      )
      .then((res) => {
        setProducts(res.data.products);
      
      })
      .catch((err) => {
        console.log(err);

        toast.error("Server TimeOut");
      });
  }, [category]);
  return (
    <section className=" w-full flex flex-col h-[350px] mt-[1rem]">
      <div className="flex flex-row justify-between">
        <span className="font-[600] text-[1.2rem]">{category}</span>
        <span
          className="decoration-solid text-sky-500 hover:cursor-pointer"
          onClick={() => navigate(`/CategoryProduct/${category}`)}
        >
          view All
        </span>
      </div>
      <div className="flex flex-row overflow-hidden">
        {products.map((product) => (
          
          <Card key={product._key} {...product} />
        ))}
      </div>
    </section>
  );
};

export default CategoryComponent;
