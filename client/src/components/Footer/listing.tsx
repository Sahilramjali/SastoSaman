import { FC } from "react";


interface ListingProps{
    title:string;
    array:string[];
}
const Listing:FC<ListingProps> = ({title,array}) => {
  return (
    <div className="flex flex-col gap-2">
        <h3 className="text-[20px] text-white font-semibold">
            {title}
        </h3>
        <hr/>
        <ul className="list-disc">
            {
                array.map((category,index)=>(
                    <li key={index}>
                        {category}
                    </li>
                )
                    
                )
            }
        </ul>

    </div>
  )
}

export default Listing