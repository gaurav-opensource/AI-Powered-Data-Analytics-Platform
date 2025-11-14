// Dashboard.tsx
import React from "react";
import { Sidebar } from "./DashboardSidebar";
import { StatCard } from "../components/cards/StateCard";
import { InvoiceTrendChart } from "../components/charts/InvoiceTrendChart";
import { VendorSpendChart } from "../components/charts/VendorSpendChart";
import { CategorySpendChart } from "../components/charts/CategorySpendChart";
import { CashOutflowChart } from "../components/charts/CashOutflowChart";
import { InvoiceTable } from "../components/charts/InvoiceTable";

export const Dashboard: React.FC = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* --- LEFT SIDEBAR --- */}
      <Sidebar />

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 p-6 space-y-6">
        {/* --- TOP METRICS ROW (4 Cards) --- */}
        <div className="grid grid-cols-4 gap-6">
          <StatCard
            title="Total Spend (YTD)"
            value="€ 12.679,25"
            change="+8.2%"
            isPositive={true}
            graph={<div className="w-16 h-12 bg-green-200 rounded-lg" />}
          />
          <StatCard
            title="Total Invoices Processed"
            value="64"
            change="+8.2%"
            isPositive={true}
            graph={<div className="w-16 h-12 bg-green-200 rounded-lg" />}
          />
          <StatCard
            title="Documents Uploaded (This Month)"
            value="17"
            change="-8"
            isPositive={false}
            graph={<div className="w-16 h-12 bg-red-200 rounded-lg" />}
          />
          <StatCard
            title="Average Invoice Value"
            value="€ 2.455,00"
            change="+8.2%"
            isPositive={true}
            graph={<div className="w-16 h-12 bg-green-200 rounded-lg" />}
          />
        </div>

        {/* --- SECOND ROW: Detailed Charts --- */}
        <div className="grid grid-cols-2 gap-6">
          {/* Invoice Trend Line Chart */}
          <InvoiceTrendChart />

          {/* Spend by Vendor Horizontal Bar Chart */}
          <VendorSpendChart />
        </div>

        {/* --- THIRD ROW: Bottom Charts/Table --- */}
        <div className="grid grid-cols-3 gap-6">
          {/* Spend by Category (Donut) */}
          <CategorySpendChart />

          {/* Cash Outflow Forecast (Vertical Bar) */}
          <CashOutflowChart />

          {/* Invoices by Vendor Table */}
          <InvoiceTable />
        </div>
      </main>
    </div>
  );
};
