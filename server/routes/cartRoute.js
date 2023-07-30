import express from 'express';

import { addCart,cartCount,viewCart,removeItemFromCart,clearCart } from './../Controllers/cart.js';

const router=express.Router();
router.get('/getCartCount',cartCount);
router.get('/getCart',viewCart);
router.post('/updateCart',addCart);
router.delete('/removeItemFromCart/:productId',removeItemFromCart);
router.delete('/clearcart',clearCart);
export default router;