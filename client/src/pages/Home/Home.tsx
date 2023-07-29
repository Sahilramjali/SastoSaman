import Carousel from "../../components/Carousel"

import CategoryComponent from "../../components/Category/CategoryItemsCarousel"
import Footer from "../../components/Footer/Footer"



const Home = () => {
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