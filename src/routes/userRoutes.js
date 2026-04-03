import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  updateUserRole,
  updateUserStatus
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", protect, allowRoles("admin"), getAllUsers);

router.patch("/:id/status", protect, allowRoles("admin"), updateUserStatus);
router.patch("/:id/role", protect, allowRoles("admin"), updateUserRole);

export default router;