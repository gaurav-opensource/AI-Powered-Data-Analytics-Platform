// routes/invoiceRoutes.ts
import express from 'express';
import { getInvoices, getInvoiceById, createInvoice } from '../controllers/paymentController';

const router = express.Router();

router.get('/', getInvoices);           // GET /api/invoices
router.get('/:id', getInvoiceById);    // GET /api/invoices/:id
router.post('/', createInvoice);       // POST /api/invoices

export default router;
