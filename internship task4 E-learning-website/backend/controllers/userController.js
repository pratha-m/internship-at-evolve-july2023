import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import User from "../models/userModel.js";
import {  otpGenerator, sendCookie } from "../utils/feature.js";
import { sendMail } from "../utils/sendEmail.js";
import Otp from "../models/otpModel.js";

const registerUser=catchAsyncErrors(async(req,res,next)=>{
        const {name,email,password}=req.body;
 
        let user=await User.findOne({email});
 
        if(user) return next(new ErrorHandler("User Already Exists",409));
 
        user=await User.create({name,email,password});
     
        sendCookie(user,res,"Registered Successfully");
})
const loginUser=catchAsyncErrors(async(req,res,next)=>{
     const {email,password}=req.body;
     
     const user=await User.findOne({email}).select("+password");

     if(!user) return next(new ErrorHandler("Pls Sign Up First",401));

     const passMatch=await user.matchPassword(password);

     if(!passMatch) return next(new ErrorHandler("Pls Enter Valid Password",401)) 

     sendCookie(user,res,"Login Successfully");
})
const logoutUser=catchAsyncErrors(async(req,res)=>{
    res.status(200)
    .cookie("mern_auth_token","",{
        expires:new Date(Date.now())
    }).json({success:true,message:"Logout Successfully"});
})
const getUserProfile=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).json({success:true,data:req.user});
})
const updateUserProfile=catchAsyncErrors(async(req,res)=>{
    const user=await User.findById(req.user._id).select("+password");

    if(!user) return next(new ErrorHandler("Login First You Cant Update Profile",401));

    const {name,email,password}=req.body;

    user.name=name || user.name;
    user.email=email || user.email;
    user.password=password || user.password;

    const updateUser=await user.save();

    res.status(200).json({success:true,data:{
        _id:updateUser._id,
        name:updateUser.name,
        email:updateUser.email
    }});
})
const checkOtp=catchAsyncErrors(async(req,res,next)=>{
    const {otp}=req.body;

    const otpFind=await Otp.findById(req.user._id);

    if(!otpFind) return next(new ErrorHandler("Otp Is Expired",401));

    if(otpFind.otpvalue!==otp) return next(new ErrorHandler("Otp Is Incorrect",401));

    res.status(200).json({success:true,message:"Otp is correct"});
})
const changePassword=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    
    const user=await User.findOne({email});

    if(!user) return next(new ErrorHandler("User Does not Exists",401));

    user.password=password || user.password;

    await user.save();

    res.status(200).json({success:true,message:"Password Changed Successfully"});
})

export {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    checkOtp,
    changePassword
}