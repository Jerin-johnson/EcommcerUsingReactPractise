import express from 'express';
import { loginPost,logout,signUp } from '../controllers/userAuthcontroller.js';
import userAuth from '../middlewares/userAuth.js';
const router = express.Router();


router.post("/signup",signUp) 


router.post("/login",loginPost);

router.get("/logout",logout)

export default router;