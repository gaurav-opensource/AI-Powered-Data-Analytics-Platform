"use client";

import KPIStats from "../components/cards/StateCard";
import InvoiceTrendChart from "../components/charts/InvoiceTrendChart";
import CategorySpendChart from "../components/charts/CategorySpendChart";
import CashOutflowChart from "../components/charts/CashOutflowChart";
import InvoiceTable from "../components/charts/InvoiceTable";

export default function DashboardPage() {
  return (
    <div className="ml-14 p-2 space-y-10 min-h-screen 
      bg-gradient-to-br from-gray-100 via-gray-50 to-white
    ">

      {/* 🔥 TOP KPI SECTION */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4 tracking-wide">
        Dashboard Overview
      </h1>

      {/* 🔥 TOP 4 KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPIStats type="totalSpend" />
        <KPIStats type="totalInvoices" />
        <KPIStats type="documentsUploaded" />
        <KPIStats type="averageInvoice" />
      </div>

      {/* 🔥 INVOICE TREND */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg border border-gray-100 rounded-xl p-6 hover:shadow-xl transition-all duration-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Monthly Invoice Spend Trend</h2>
          <InvoiceTrendChart />
        </div>
      </div>

      {/* 🔥 CATEGORY + CASH OUTFLOW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white shadow-lg border border-gray-100 rounded-xl p-6 hover:shadow-xl transition-all duration-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Category Spend Overview</h2>
          <CategorySpendChart />
        </div>

        <div className="bg-white shadow-lg border border-gray-100 rounded-xl p-6 hover:shadow-xl transition-all duration-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Cash Outflow Forecast</h2>
          <CashOutflowChart />
        </div>

      </div>

      {/* 🔥 INVOICE TABLE */}
      <div className="bg-white shadow-lg border border-gray-100 rounded-xl p-6 hover:shadow-xl transition-all duration-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Invoices</h2>
        <InvoiceTable />
      </div>

    </div>
  );
}
