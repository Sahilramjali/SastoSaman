import stripe from "stripe";
import jwt from "jsonwebtoken";

export const checkOut = async (req, res) => {
  const Stripe = stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const token = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET_KEY
    );
    const userId = token._id;
    const cartItemsString = JSON.stringify(req.body.cartItems);
    const truncatedCartItemsString = cartItemsString.substring(0, 500); 
    if (userId) {
      const customer=await Stripe.customers.create({
        metadata:{
          userId:req.body.userId,
          cart:truncatedCartItemsString
        }
      })
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
      const session = await Stripe.checkout.sessions.create({
        mode: "payment",
        shipping_address_collection: {
          allowed_countries: ["NP"],
        },
        phone_number_collection: {
          enabled: true,
        },
        success_url: `http://localhost:5173/checkout-success`,
        cancel_url: `http://localhost:5173/cart`,
         customer:customer.id,
        line_items,
      });
      res.send({ url: session.url });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal Server error" });
  }
};





