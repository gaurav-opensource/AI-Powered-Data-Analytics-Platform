"use client";

import { useEffect, useState } from "react";
import api from "@/app/api/api";  

export default function InvoicesTablePage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const res = await api.getInvoices();  
        setInvoices(res.data || res);         // backend may send data:[] OR []
      } catch (err) {
        console.error("Error fetching invoices", err);
      } finally {
        setLoading(false);
      }
    };

    loadInvoices();
  }, []);

  if (loading) return <div className="text-center p-6 text-xl">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Invoices Table</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Invoice ID</th>
              <th className="p-3">Vendor</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Invoice Date</th>
              <th className="p-3">Total Amount</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv: any, index: number) => (
              <tr key={inv.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{inv.invoice_id}</td>
                <td className="p-3">{inv.vendor?.vendor_name || "N/A"}</td>
                <td className="p-3">{inv.customer?.customer_name || "N/A"}</td>
                <td className="p-3">
                  {inv.invoice_date?.slice(0, 10) || "N/A"}
                </td>
                <td className="p-3 font-semibold">
                  {inv.summary?.[0]?.invoice_total?.toString() ?? "0"}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
