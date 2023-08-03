import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser'
import auth from './routes/authRoute.js';
import product from './routes/productRoute.js';
import carts from './routes/cartRoute.js';
// import checkOuts from './routes/checkoutRoute.js'
import {v2 as cloudinary} from 'cloudinary';

const app = express();
const PORT = 5000;
dotenv.config();
app.use(express.json())
app.use(
  cors({
  
    origin: "http://localhost:5173",
    // origin:process.env.PRODUCTION_URL,
    credentials: true,
  })
);
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({extended:true,limit:'100mb'}));


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//api router
app.use("/api/auth",auth );
app.use('/api/product',product);
app.use('/api/cart',carts);
// app.use('/api/checkout',checkOuts);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("data base connected");
  })
  .catch(() => {
    console.log("data base connection error");
  });

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
