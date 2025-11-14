// /apps/web/app/components/dashboard/KeyMetrics.tsx
"use client";

import React, { useEffect, useState } from "react";
import { StatCard } from "../cards/StatCard";
import { ChartBarIcon, CurrencyDollarIcon, DocumentIcon, ReceiptTaxIcon } from "@heroicons/react/24/outline";

interface StatsData {
  totalSpend: number;
  totalInvoices: number;
  documentsUploaded: number;
  avgInvoiceValue: number;
  growthTotalSpend: string;
  growthTotalInvoices: string;
  growthDocuments: string;
  growthAvgInvoice: string;
}

const KeyMetrics: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    fetch("/api/stats") // call your backend API
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Spend (YTD)"
        value={`₹${stats.totalSpend.toLocaleString()}`}
        change={stats.growthTotalSpend}
        isPositive={true}
        graph={<CurrencyDollarIcon className="w-12 h-12 text-green-500" />}
      />
      <StatCard
        title="Total Invoices Processed"
        value={stats.totalInvoices.toString()}
        change={stats.growthTotalInvoices}
        isPositive={true}
        graph={<ReceiptTaxIcon className="w-12 h-12 text-blue-500" />}
      />
      <StatCard
        title="Documents Uploaded"
        value={stats.documentsUploaded.toString()}
        change={stats.growthDocuments}
        isPositive={false}
        graph={<DocumentIcon className="w-12 h-12 text-yellow-500" />}
      />
      <StatCard
        title="Average Invoice Value"
        value={`₹${stats.avgInvoiceValue.toLocaleString()}`}
        change={stats.growthAvgInvoice}
        isPositive={true}
        graph={<ChartBarIcon className="w-12 h-12 text-purple-500" />}
      />
    </div>
  );
};

export default KeyMetrics;
