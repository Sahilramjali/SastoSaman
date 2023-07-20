import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';

import auth from './routes/authRoute.js';

const app = express();
const PORT = 5000;
dotenv.config();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/auth",auth );

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
