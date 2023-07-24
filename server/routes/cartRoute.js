import express from 'express';

import { addCart,cartCount,viewCart } from './../Controllers/cart.js';

const router=express.Router();
router.get('/getCartCount',cartCount);
router.get('/getCart',viewCart);
router.post('/updateCart',addCart);

export default router;