import express from "express";
import {
  getSummary,
  getCategoryTotals,
  getRecentActivity,
  getMonthlyTrends
} from "../controllers/dashboardController.js";

import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/summary", protect, allowRoles("analyst", "admin"), getSummary);
router.get("/category-totals", protect, allowRoles("analyst", "admin"), getCategoryTotals);
router.get("/recent", protect, allowRoles("viewer", "analyst", "admin"), getRecentActivity);
router.get("/monthly-trends", protect, allowRoles("analyst", "admin"), getMonthlyTrends);

export default router;