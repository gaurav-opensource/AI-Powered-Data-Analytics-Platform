import type { Request, Response } from "express";
import prisma from "../utils/prismaClient.ts";


// Get all invoices
export const getInvoices = async (req: Request, res: Response) => {
  try {
    // Fetch all invoices
    const invoices = await prisma.invoices.findMany({
      include: {
        vendor: true,
        customer: true,
        lineItems: true,
        payments: true,
      },
    });

    res.status(200).json(invoices);

  } catch (err) {
    console.error("Error fetching invoices:", err);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
};


// Get invoice by ID
export const getInvoiceById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id); // Convert ID to number

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid invoice ID" });
    }

    // Fetch specific invoice
    const invoice = await prisma.invoices.findUnique({
      where: { id },
      include: {
        vendor: true,
        customer: true,
        lineItems: true,
        payments: true,
      },
    });

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.status(200).json(invoice);

  } catch (err) {
    console.error("Error fetching invoice:", err);
    res.status(500).json({ error: "Failed to fetch invoice" });
  }
};
