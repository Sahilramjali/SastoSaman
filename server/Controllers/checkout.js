import stripe from 'stripe';


const Stripe=stripe(process.env.STRIPE_SECRET_KEY);

export const checkOut=async(req,res)=>{
     
    const session=await Stripe.checkout.sessions.create({
        mode: 'payment',
        success_url: `http://localhost:5173?success=true`,
        cancel_url:`http://localhost:5173/cart`,
        line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price: '{{PRICE_ID}}',
              quantity: 1,
            },
          ],
    })
    res.send({url:session.url});
}
