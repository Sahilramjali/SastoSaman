import express from 'express';

import { addCart,cartCount,viewCart,removeItemFromCart } from './../Controllers/cart.js';

const router=express.Router();
router.get('/getCartCount',cartCount);
router.get('/getCart',viewCart);
router.post('/updateCart',addCart);
router.delete('/removeItemFromCart/:productId',removeItemFromCart);
export default router;