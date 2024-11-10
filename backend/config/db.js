import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongo DB connected ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1); //This is the faliear case
  }
};
