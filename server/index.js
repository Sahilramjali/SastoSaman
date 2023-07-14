
import express from 'express';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app=express();
const PORT=5000;
dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("data base connected")
}).catch(()=>{
    console.log("data base connection error");
})
app.listen(PORT,()=>{
    console.log("Server is running on port "+PORT);
})


