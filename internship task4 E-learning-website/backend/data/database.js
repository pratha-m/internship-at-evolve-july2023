import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connection succeded`);
    }catch(error){
        console.log(error.message);
    }
}
export default connectDB;