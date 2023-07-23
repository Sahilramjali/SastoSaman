import express from 'express';
import {addProduct,getProductByCategory} from '../Controllers/product.js';

const router=express.Router();
router.post('/addProduct',addProduct);
router.get('/getproductByCategory',getProductByCategory);
export default router;