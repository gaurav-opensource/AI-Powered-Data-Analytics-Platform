import express from "express";
import { getInvoices, getInvoiceById } from "../controllers/invoiceController.ts";

const router = express.Router();

router.get("/invoices", getInvoices);
router.get("/invoices/:id", getInvoiceById);

export default router;
