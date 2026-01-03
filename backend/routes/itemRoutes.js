import express from "express";
import {
  postItem,
  getItems,
  updateItem,
  deleteItem
} from "../controllers/itemController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateItem } from "../validators/itemValidator.js";

const router = express.Router();

// Create item
router.post("/", authMiddleware, validateItem, postItem);

// Get all items
router.get("/", authMiddleware, getItems);

// Update item status (Recovered etc.)
router.patch("/:id/status", authMiddleware, updateItem);

// Delete item
router.delete("/:id", authMiddleware, deleteItem);

export default router;
