import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"; 
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config(); 
connectDB();     


const app = express();

app.use(express.json()); // JSON body accept করার middleware

// Routes
app.use("/api", productRoutes);
app.use("/api", categoryRoutes); 
// Optional Home Route
app.get("/", (req, res) => {
  res.send(" API is running");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
