import express from 'express';
import { SignUp } from '../Controllers/auth.js';

const router=express.Router();
router.post('/signup',SignUp);


export default router;