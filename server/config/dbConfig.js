import mongoose from "mongoose";
import dotenv from "dotenv";
import { config } from "./config.js";

dotenv.config()

const connectDB = async () =>{
    try{
        mongoose.connect(config.MONGO_URI)
        console.log('Successfully connected with the database.');
    }
    catch(err){
        console.log('Unable to connect to the Database ',err)
    }
        
}

export default connectDB