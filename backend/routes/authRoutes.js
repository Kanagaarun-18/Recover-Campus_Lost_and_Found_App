import express from "express";
import { login, register } from "../controllers/authController.js";
import { validateAuth } from "../validators/authValidator.js";

const router = express.Router();

// Register
router.post("/register", validateAuth, register);

// Login
router.post("/login", validateAuth, login);

export default router;
