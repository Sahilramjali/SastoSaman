import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Card from "../../components/Category/Card";
import { useParams } from "react-router-dom";

const CategoryProduct = () => {
  const { category } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:5000/api/product/getproductByCategory?category=${category}`
      )
      .then((res) => {
        setCategoryProducts(res.data.products);
        console.log(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Server TimeOut");
      });
  }, []);
  useEffect(() => {
    document.title = `${category}`;
  }, [category]);

  if (isLoading) {
    return <p className="flex justify-center items-center">Loading...</p>;
  }
  if (categoryProducts.length === 0) {
    return <p className="flex justify-center items-center">No Product found</p>;
  }
  return (
    <section className="w-full flex flex-row flex-wrap h-[87vh]">
      {categoryProducts &&
        categoryProducts.map((product, index) => (
          <Card key={product._id} {...product} />
        ))}
    </section>
  );
};

export default CategoryProduct;
