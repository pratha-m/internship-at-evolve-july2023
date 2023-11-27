import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    checkOtp,
    changePassword,
} from "../controllers/userController.js";
import { isAuthenticated, userExists } from "../middlewares/auth.js";
import { sendMail } from "../utils/sendEmail.js";

const router=express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/logout",logoutUser);

router.get("/profile",isAuthenticated,getUserProfile);

router.put("/profile",isAuthenticated,updateUserProfile);

router.put("/sendemail",userExists,sendMail);  // we have to send only email in body from client 

router.get("/checkotp",userExists,checkOtp);   // we have to send email and otp in body from client

router.put("/changepassword",changePassword);// we have to send email and new password in body from client

export default router;