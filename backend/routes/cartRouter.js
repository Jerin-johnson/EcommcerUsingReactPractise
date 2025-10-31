import express from "express";
import { addToCart, deleteFromCart, fetchUserCartItems } from "../controllers/cartController.js";
import userAuth from "../middlewares/userAuth.js";


const router = express.Router();

router.get("/",fetchUserCartItems)
router.post("/add/:id",userAuth,addToCart);
router.delete("/:id",userAuth,deleteFromCart);


export default router;