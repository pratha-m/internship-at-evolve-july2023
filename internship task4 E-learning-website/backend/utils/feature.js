import jwt from "jsonwebtoken";
export const sendCookie=(user,res,message,statusCode=200)=>{
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
    
    res.cookie("mern_auth_token",token,{
        maxAge:30*24*60*60*1000,
        secure:!(process.env.NODE_ENV==="Development"),      
        httpOnly:!(process.env.NODE_ENV==="Development")
    }).status(statusCode).json({success:true,message});
}

export const otpGenerator=()=>{
    let otp="";
    const rand="0123456789abcdefghijklmnopqrstuvwxyz";
    for(let i=0;i<5;i++){
        otp+=rand[Math.floor(Math.random()*36)];
    }
    return otp;
}