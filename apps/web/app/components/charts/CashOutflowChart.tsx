"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface CashOutflowData {
  range: string;
  amount: number;
}

export const CashOutflowChart: React.FC = () => {
  const [data, setData] = useState<CashOutflowData[]>([]);

  // ✅ Use sample data temporarily for design preview
  useEffect(() => {
    const sampleData: CashOutflowData[] = [
      { range: "0–7 days", amount: 45000 },
      { range: "8–14 days", amount: 32000 },
      { range: "15–30 days", amount: 28000 },
      { range: "31–60 days", amount: 15000 },
      { range: "61–90 days", amount: 12000 },
      { range: "90+ days", amount: 8000 },
    ];
    setData(sampleData);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Cash Outflow Forecast</h2>
        <p className="text-sm text-gray-500">
          Expected payment obligations grouped by due date ranges.
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          <YAxis
            tickFormatter={(value) => `€${(value / 1000).toLocaleString()}k`}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
          />
          <XAxis
            dataKey="range"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#374151" }}
          />
          <Tooltip
            formatter={(value: number) => `€${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: "0.5rem",
              padding: "0.75rem",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            }}
          />
          <Bar dataKey="amount" fill="#312E81" radius={[8, 8, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill="#4338CA" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
