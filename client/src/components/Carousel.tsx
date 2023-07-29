import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";


const Category=[
  {
    src:"https://icms-image.slatic.net/images/ims-web/7870f982-fc12-4004-9532-8724e6e41a86.jpg_1200x1200.jpg",
    category:"Beauty and care",
  },
  {
    src:"https://icms-image.slatic.net/images/ims-web/0ac36a11-6d72-4676-bd86-4545b14d1bab.jpg",
    category:"Electronics appliance",
  },
  {
    src:"https://icms-image.slatic.net/images/ims-web/da4f522c-f4ab-4b14-a313-73af0ea15ad3.jpg",
    category:"Clothes",
  }
]

const Carousel = () => {
  const settings = {
    
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
const navigate=useNavigate();

  const onClickHandler=(index:number)=>{
    navigate(`/CategoryProduct/${Category[index].category}`)
  }

  return (
    <div className='w-full sm:h-[300px] overflow-hidden p-3 shadow-lg bg-[#f5f5f5]"'>
      <Slider {...settings} className="w-full h-full">

      {
        Category.map((category,index)=>(
          <div key={index} className="w-full h-full rounded" onClick={()=>onClickHandler(index)}>
          <img
            src={category.src}
            alt={category.category}
            className="w-full h-full object-contain rounded"
          />
        </div>
        ))
      }

        {/* <div className="w-full h-full rounded">
          <img
            src="https://icms-image.slatic.net/images/ims-web/7870f982-fc12-4004-9532-8724e6e41a86.jpg_1200x1200.jpg"
            alt="Image 1"
            className="w-full h-full object-contain rounded"
          />
        </div>
        <div className="w-full h-full rounded">
          <img
            src="https://icms-image.slatic.net/images/ims-web/0ac36a11-6d72-4676-bd86-4545b14d1bab.jpg"
            alt="Image 2"
            className=" object-contain rounded"
          />
        </div>
        <div className="w-full h-full rounded">
          <img
            src="https://icms-image.slatic.net/images/ims-web/da4f522c-f4ab-4b14-a313-73af0ea15ad3.jpg"
            alt="Image 3"
            className="w-full h-full object-contain rounded"
          />
        </div> */}
      </Slider>
    </div>
  );
};

export default Carousel;
