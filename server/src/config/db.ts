import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  if (!MONGO_URI) {
    console.error("MongoDB URI is not defined in the environment variable");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
