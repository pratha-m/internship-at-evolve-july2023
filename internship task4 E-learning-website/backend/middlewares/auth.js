import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import User from "../models/userModel.js";

export const isAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const cookie=req.cookies.mern_auth_token;

    if(!cookie) return next(new ErrorHandler("Pls Login First,no token",401)); 

    try{
        let decodedData=jwt.verify(cookie,process.env.JWT_SECRET);
    
        req.user=await User.findById(decodedData._id);

        next();
    }
    catch(err){
        next(new ErrorHandler("Pls Login First,Invalid Token",400));
    }
})

export const userExists=catchAsyncErrors(async(req,res,next)=>{
    const {email}=req.body;

    let user=await User.findOne({email});

    if(!user) return next(new ErrorHandler("User Does not Exists",401));

    req.user=user;

    next();
})
