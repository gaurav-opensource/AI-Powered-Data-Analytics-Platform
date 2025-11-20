import express from "express";
import {
  getStats,
  getInvoiceTrends,
  getTopVendors,
  getCategorySpend,
  getCashOutflow,
  getDashboardStats
} from "../controllers/statsController.ts"; 

const router = express.Router();

//  Route define
router.get("/stats", getStats);
router.get("/invoice-trends", getInvoiceTrends);
router.get("/vendors/top10", getTopVendors);
router.get("/category-spend", getCategorySpend);
router.get("/cash-outflow", getCashOutflow);
router.get("/stats/dashboard", getDashboardStats);

export default router;
