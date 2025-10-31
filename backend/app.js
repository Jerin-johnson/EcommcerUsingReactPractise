import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter  from "./routes/userRoutes.js";
import productRouter  from "./routes/productRoutes.js"
import cors from "cors";
import path from "path"
import cartRouter from "./routes/cartRouter.js"

dotenv.config();



const app = express();
const port =3000;

app.use(cors({
  origin: "http://localhost:5173",  //  frontend URL
  credentials: true,                // THIS is required for cookies / JWT
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);





const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // stop server if DB connection fails
  }
};

startServer();