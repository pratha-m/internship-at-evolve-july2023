import mongoose, { Schema } from "mongoose";

const otpSchema=new mongoose.Schema({
    _id:{
       type:Schema.Types.ObjectId,
       ref:"User"
    },
    otpvalue:{
        type:String
    },
    createdAt:{
       type:Date,        
       default:Date.now
    },
})
otpSchema.index({createdAt:1},{expireAfterSeconds:60});

const Otp=new mongoose.model("Otp",otpSchema);

export default Otp;