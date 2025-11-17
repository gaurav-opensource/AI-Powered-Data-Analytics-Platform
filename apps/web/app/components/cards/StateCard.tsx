"use client";
import { useEffect, useState } from "react";
import api from "@/app/api/api";

export default function KPIStats({ type }: { type: string }) {

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.getDashboardStats()
      .then((json) => setData(json.data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  if (!data) return null;

  const cardData: any = {
    totalSpend: {
      label: "Total Spend (YTD)",
      value: `€ ${data.totalSpend.toLocaleString()}`,
      change: "+8.2%",
      color: "text-green-600"
    },
    totalInvoices: {
      label: "Total Invoices Processed",
      value: data.totalInvoices,
      change: "+8.2%",
      color: "text-green-600"
    },
    documentsUploaded: {
      label: "Documents Uploaded",
      value: data.totalDocs,
      change: "-1",
      color: "text-red-600"
    },
    averageInvoice: {
      label: "Average Invoice Value",
      value: `€ ${data.avgInvoice.toLocaleString()}`,
      change: "+8.2%",
      color: "text-green-600"
    }
  };

  const item = cardData[type];

  return (
    <div className="bg-white shadow rounded-xl p-5">
      <p className="text-sm text-gray-500">{item.label}</p>
      <p className="text-2xl font-bold">{item.value}</p>
      <p className={`${item.color} text-sm mt-1`}>{item.change} from last month</p>
    </div>
  );
}
