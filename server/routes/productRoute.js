import express from 'express';
import {addProduct,getProductByCategory,getSingleProdutDetails} from '../Controllers/product.js';
import { search } from '../Controllers/search.js';
const router=express.Router();
router.post('/addProduct',addProduct);
router.get('/getproductByCategory',getProductByCategory);
router.get('/getProductDetail/:id',getSingleProdutDetails);
router.get('/search/:searchValue',search);
export default router;