import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoUrl = process.env.MONGO_CONN;
export const connectDB = async() => {
   try {
    await mongoose.connect(mongoUrl);
    console.log('MongoDB connected');
   } catch (error) {
       console.log('MongoDB connection error:', error);
    
   }

}

