import Carousel from "../../components/Carousel"

import CategoryComponent from "../../components/Category/CategoryItemsCarousel"
import Footer from "../../components/Footer/Footer"

import { useEffect } from "react"

const Home = () => {

  useEffect(()=>{
    document.title=`SastoSaman: Home`
  })
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