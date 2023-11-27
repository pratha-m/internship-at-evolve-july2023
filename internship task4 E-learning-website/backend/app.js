import express from "express";
import userRouter from "./routes/userRoutes.js";
import { config } from "dotenv";
import { errorMiddleware, notFound } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

export const app=express();

// configure the env file      
config({
    path:"./data/config.env"
})

// middlewares
app.use(express.json());
app.use(cookieParser());

// Routes middlewares
app.use("/api/v1/users",userRouter); 

// Error Middlewares 
app.use(notFound)
app.use(errorMiddleware);