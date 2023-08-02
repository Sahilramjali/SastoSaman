import stripe from 'stripe';
import jwt from 'jsonwebtoken';
import cart from '../Models/cart.js';



export const checkOut=async(req,res)=>{
  const Stripe=stripe(process.env.STRIPE_SECRET_KEY);
  try{
    const token=jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET_KEY
  )
  const userId=token._id;
  if(userId){
  

  const line_items = req.body.cartItems.map((item) => {
    
    return {
      price_data: {
        currency: "npr",
        product_data: {
          name: item.productData[0].name,
          images: [item.productData[0].imageUrl],
          description: item.productData[0].description,
          metadata: {
            id: item.productData[0]._id,
          },
        },
        unit_amount: item.productData[0].price * 100,
      },
      quantity: item.quantity,
    };
  });
    const session=await Stripe.checkout.sessions.create({
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ["NP"],
      },
     
      success_url: `http://localhost:5173/checkout-success`,
      cancel_url:`http://localhost:5173/cart`,
      line_items
  })
  res.send({url:session.url});
  }
    
  }catch(err){
    console.log(err);
    res.status(500).json({status:"error",message:"Internal Server error"})
  }
    
}
