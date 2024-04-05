import express from "express";
import authController from "../controller/authController.js";

const router = express.Router();

// router for sign up and sign in
router.post("/auth/login", authController.login);

router.post("/auth/signup", authController.signUp);

export default router;
