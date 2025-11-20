import express from 'express';
import { getInvoices } from '../controllers/vendorController.ts';

const router = express.Router();

router.get('/vendor', getInvoices);           
   

export default router;
