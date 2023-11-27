import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },   
    email:{
        type:String,
        required:true,
        unique:true
    },   
    password:{
        type:String,
        required:true,
        select:false
    },
    createdAt:{
        type:Date,  
        default:Date.now
    }
})
userSchema.pre("save",async function(next){
    // only hash the password if it is modified or new 
    if(!this.isModified("password")){
        next(); // this will run when password is not new or modified
    }
    const salt=await bcrypt.genSalt(10);  
    this.password=await bcrypt.hash(this.password,salt);
})
userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password); 
}

const User=mongoose.model("User",userSchema);

export default User;