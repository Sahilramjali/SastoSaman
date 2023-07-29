import { FC } from "react";
import { useNavigate } from "react-router-dom";
interface cardProps{
  _id:string;
  name:string;
  price:string;
  imageUrl:string;
}


const Card:FC<cardProps> = ({
  _id,
  name,
  price,
  imageUrl
}) => {
  const navigate=useNavigate();
  console.log(_id);
  const onClickHandler=()=>{
    navigate(`/productDetails/${_id}`)
  }
  return (
    <div className=" w-[150px] h-[250px] sm:w-[188px] sm:h-[290px] mr-12px flex flex-col  border  rounded hover:shadow-lg m-2 gap-2 hover:scale-[1.01]" onClick={onClickHandler}>
      <img
        src={imageUrl}
        alt={name}
        className="sm:h-[188px] sm:w-[188px] h-[150px] w-[150px] rounded "
      />
      <p className="w-full leading-[18px] overflow-hidden line-clamp-2 px-2">{name}</p>
      <span className="text-hoverPrimary font-[700] px-2">Rs.{price}</span>
    </div>
  );
};

export default Card;
