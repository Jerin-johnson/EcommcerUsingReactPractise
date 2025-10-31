import express from "express";
import { addProduct, updateProduct, getProductbyId,fetchProduct, getUserProducts, deleteProduct } from "../controllers/productController.js";
import upload from "../multerconfig.js";
import userAuth from "../middlewares/userAuth.js";


const router = express.Router();



router.get("/",fetchProduct);
router.get("/my",userAuth,getUserProducts)
router.post("/add", userAuth, upload.single("image"), addProduct);
router.get("/:id",userAuth,getProductbyId)

router.put("/update/:id", userAuth, upload.single("image"), updateProduct);



router.delete("/:id",userAuth,deleteProduct)

export default router;


