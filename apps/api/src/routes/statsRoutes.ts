import express from "express";
import {
  getStats,
  getInvoiceTrends,
  getTopVendors,
  getCategorySpend,
  getCashOutflow,
  getDashboardStats
} from "../controllers/statsController.ts"; // ✅ include .ts extension

const router = express.Router();

// ✅ Route definitions
router.get("/stats", getStats);
router.get("/invoice-trends", getInvoiceTrends);
router.get("/vendors/top10", getTopVendors);
router.get("/category-spend", getCategorySpend);
router.get("/cash-outflow", getCashOutflow);
router.get("/stats/dashboard", getDashboardStats);

export default router;
