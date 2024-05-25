
import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();


const dbUrl = process.env.DB_URL

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect( dbUrl.toString());
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Database connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;