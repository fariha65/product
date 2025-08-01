import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(" MongoDB connected");
  } catch (err) {
    console.error(" DB connection failed:", err.message);
    process.exit(1); // Stop server if DB fails
  }
};

export default connectDB;
