import express from 'express';
import {addProduct,getProductByCategory,getSingleProdutDetails} from '../Controllers/product.js';

const router=express.Router();
router.post('/addProduct',addProduct);
router.get('/getproductByCategory',getProductByCategory);
router.get('/getProductDetail/:id',getSingleProdutDetails);
export default router;