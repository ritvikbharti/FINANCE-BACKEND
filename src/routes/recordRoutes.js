import express from "express";
import {
  createRecord,
  getRecords,
  getSingleRecord,
  updateRecord,
  deleteRecord
} from "../controllers/recordController.js";

import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, allowRoles("viewer", "analyst", "admin"), getRecords);
router.get("/:id", protect, allowRoles("viewer", "analyst", "admin"), getSingleRecord);

router.post("/", protect, allowRoles("admin"), createRecord);
router.put("/:id", protect, allowRoles("admin"), updateRecord);
router.delete("/:id", protect, allowRoles("admin"), deleteRecord);

export default router;