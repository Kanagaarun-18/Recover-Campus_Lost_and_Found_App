import express from "express";
import {
  getAnalytics,
  getPendingItems,
  verifyItem
} from "../controllers/adminController.js";

import {authMiddleware} from "../middlewares/authMiddleware.js";
import {roleMiddleware} from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Admin dashboard stats
router.get(
  "/stats",
  authMiddleware,
  roleMiddleware("admin"),
  getPendingItems
);

// Verify item
router.patch(
  "/verify/:id",
  authMiddleware,
  roleMiddleware("admin"),
  verifyItem
);

export default router;
