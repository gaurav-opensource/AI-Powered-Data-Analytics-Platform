"use client";

import { useEffect, useState } from "react";
import api from "@/app/api/api";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function VendorInvoiceChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVendorInvoices = async () => {
      try {
        const response = await api.getVendorInvoices(); // ← new API call
        setData(response.data || []);
      } catch (err) {
        console.error("Error loading vendor invoices:", err);
      } finally {
        setLoading(false);
      }
    };

    loadVendorInvoices();
  }, []);

  if (loading) return <div className="text-center py-10">Loading chart...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">
        Vendor Invoice Summary
      </h1>

      <div className="w-full h-80 bg-white rounded-xl shadow p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="vendorColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.7} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="amount"     
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#vendorColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
