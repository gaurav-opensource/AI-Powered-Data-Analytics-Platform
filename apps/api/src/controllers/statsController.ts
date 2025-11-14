import type { Request, Response } from "express";
import prisma from "../utils/prismaClient.ts";

/**
 * 📌 1. Get general statistics
 * - Total invoices
 * - Total spend (sum of invoice_total from summary)
 */
export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalInvoices = await prisma.invoices.count();

    const totalSpend = await prisma.summary.aggregate({
      _sum: { invoice_total: true },
    });

    res.status(200).json({
      success: true,
      totalInvoices,
      totalSpend: totalSpend._sum.invoice_total ?? 0,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

/**
 * 📌 2. Get monthly invoice spending trend
 * - Groups by YYYY-MM
 */
export const getInvoiceTrends = async (req: Request, res: Response) => {
  try {
    const invoices = await prisma.invoices.findMany({
      include: { summary: true },
    });

    const trendsMap: Record<string, number> = {};

    invoices.forEach(inv => {
      if (!inv.invoice_date) return;

      const month = inv.invoice_date.toISOString().slice(0, 7);

      // Convert Decimal → number
      const total = Number(inv.summary?.[0]?.invoice_total ?? 0);

      trendsMap[month] = (trendsMap[month] || 0) + total;  // ✔ FIXED
    });

    const trends = Object.entries(trendsMap)
      .map(([month, totalSpend]) => ({ month, totalSpend }))
      .sort((a, b) => a.month.localeCompare(b.month));

    res.status(200).json({ status: "success", data: trends });

  } catch (err) {
    console.error("Error fetching invoice trends:", err);
    res.status(500).json({ error: "Failed to fetch invoice trends" });
  }
};


/**
 * 📌 3. Top Vendors (Basic version)
 * - Later can include spending aggregation
 */
export const getTopVendors = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendors = await prisma.vendors.findMany({
      take: 10,
      orderBy: { id: "asc" },
    });

    res.status(200).json(vendors);
  } catch (err) {
    console.error("Error fetching top vendors:", err);
    res.status(500).json({ error: "Failed to fetch top vendors" });
  }
};

/**
 * 📌 4. Category Spend (placeholder for future extension)
 */
export const getCategorySpend = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all line items
    const lineItems = await prisma.line_items.findMany({
      select: {
        sachkonto: true,
        total_price: true,
      },
    });

    const categoryMap: Record<string, number> = {};

    lineItems.forEach((item) => {
      const category = item.sachkonto || "Unknown";

      // Convert Decimal to number
      const amount = Number(item.total_price ?? 0);

      categoryMap[category] = (categoryMap[category] || 0) + amount;
    });

    // Convert map to array for charts
    const result = Object.entries(categoryMap).map(([category, totalSpend]) => ({
      category,
      totalSpend,
    }));

    res.status(200).json({
      status: "success",
      data: result,
    });

  } catch (err) {
    console.error("Error fetching category spend:", err);
    res.status(500).json({ error: "Failed to fetch category spend" });
  }
};

/**
 * 📌 5. Cash Outflow (placeholder)
 */
export const getCashOutflow = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch payments along with invoice summary
    const payments = await prisma.payments.findMany({
      include: {
        invoice: {
          include: {
            summary: true
          }
        }
      }
    });

    const outflowMap: Record<string, number> = {};

    payments.forEach((p) => {
      if (!p.due_date) return;

      // Convert Date → YYYY-MM format
      const month = p.due_date.toISOString().slice(0, 7);

      // Get invoice_total from summary table
      const invoiceTotal = Number(p.invoice?.summary?.[0]?.invoice_total ?? 0);

      outflowMap[month] = (outflowMap[month] || 0) + invoiceTotal;
    });

    // Convert to array
    const cashOutflow = Object.entries(outflowMap).map(([month, total]) => ({
      month,
      cashOutflow: total
    }));

    res.status(200).json({
      status: "success",
      data: cashOutflow,
    });

  } catch (err) {
    console.error("Error fetching cash outflow:", err);
    res.status(500).json({ error: "Failed to fetch cash outflow" });
  }
};


export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // Total Spend (sum of invoice_total)
    const totalSpendAgg = await prisma.summary.aggregate({
      _sum: { invoice_total: true }
    });
    const totalSpend = Number(totalSpendAgg._sum.invoice_total || 0);

    // Total Invoices Count
    const totalInvoices = await prisma.invoices.count();

    // Documents Uploaded Count
    const totalDocs = await prisma.documents.count();

    // Average Invoice Value
    const avgInvoiceAgg = await prisma.summary.aggregate({
      _avg: { invoice_total: true }
    });
    const avgInvoice = Number(avgInvoiceAgg._avg.invoice_total || 0);

    res.status(200).json({
      status: "success",
      data: {
        totalSpend,
        totalInvoices,
        totalDocs,
        avgInvoice
      }
    });

  } catch (err) {
    console.error("Dashboard Stats Error:", err);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};
