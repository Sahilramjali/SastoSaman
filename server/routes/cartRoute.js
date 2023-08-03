import express from 'express';

import { addCart,cartCount,viewCart,removeItemFromCart,clearCart,updateCart } from './../Controllers/cart.js';
import { checkOut } from '../Controllers/checkout.js';
const router=express.Router();
router.get('/getCartCount',cartCount);
router.get('/getCart',viewCart);
router.post('/addCart',addCart);
router.post('/updateCart',updateCart);
router.delete('/removeItemFromCart/:productId',removeItemFromCart);
router.delete('/clearcart',clearCart);
router.post('/checkout',checkOut);
// router.post('/webhook',stripeWebHook)
export default router;