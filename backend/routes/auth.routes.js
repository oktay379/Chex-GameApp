import express from "express";
import { login, logout, signup, verify, verifyUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

router.get("/verify", verifyUser, verify);


export default router;