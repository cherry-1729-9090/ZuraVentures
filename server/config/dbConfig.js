import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

connectDB = async () =>{
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log('Successfully connected with the database.');
    }
    catch(err){
        console.log('Unable to connect to the Database ',err)
    }
        
}

export default connectDB