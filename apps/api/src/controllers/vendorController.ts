import type { Request, Response } from "express";
import prisma from "../utils/prismaClient.ts";


//Get all vendors with invoices
export const getInvoices = async (req: Request, res: Response) => {
  try {
    //Get all vendors
    const vendors = await prisma.vendors.findMany({
      include: {
        invoices: true, 
      },
    });

    res.status(200).json({
      success: true,
      data: vendors,
    });
  } catch (error: any) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
