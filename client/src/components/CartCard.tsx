import { Plus, Minus, X } from "lucide-react";

import { FC, useEffect, useState } from "react";

import { cardItemsProps } from "../pages/cart/Cart";

interface CartCardProps {
  removeQuantity: (item: cardItemsProps) => void;
  addQuantity: (item: cardItemsProps) => void;
  itemRemove: (productId: string) => void;
  product: cardItemsProps;
}

const CartCard: FC<CartCardProps> = ({
  removeQuantity,
  addQuantity,
  itemRemove,
  product,
}) => {
  const [totalProductPrice, setTotalProductPrice] = useState<number>(
    product.productData[0].price
  );

  useEffect(() => {
    setTotalProductPrice(product.productData[0].price * product.quantity);
  }, [product.quantity, product.productData]);

  return (
    <div className="w-full flex flex-row items-center justify-between p-2 rounded-md shadow-lg mt-2 mb-2">
      <div className="flex flex-row pl-2 pt-2 gap-2 items-center">
        <div className="sm:h-[170px] sm:w-[170px] rounded-sm h-[50px] w-[60px]">
          <img
            className=" h-full w-full object-cover object-center"
            src={product.productData[0].imageUrl}
            alt={product.productData[0].name}
          />
        </div>
        <div className="flex flex-col sm:gap-5 gap-1">
          <span className="sm:text-[1.2rem] sm:leading-[1.2rem] text-[1rem]">
            {product.productData[0].name}
          </span>
          <span className="sm:text-[1rem] font-[600]">
            Rs {totalProductPrice}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div
          className="rounded-md border sm:p-[0.2rem] hover:scale-110 p-[0.1rem]"
          onClick={() => removeQuantity(product)}
        >
          <Minus />
        </div>

        <span className="sm:text-[1.2rem] font-[500] text-[1rem]">
          {product.quantity}
        </span>

        <div
          className="rounded-md border sm:p-[0.2rem] hover:scale-110 p-[0.1rem]"
          onClick={() => addQuantity(product)}
        >
          <Plus />
        </div>
        <div
          className="rounded-md border sm:p-[0.2rem] hover:scale-110 p-[0.1rem]"
          onClick={() => itemRemove(product.productId)}
        >
          <X />
        </div>
      </div>
    </div>
  );
};

export default CartCard;
