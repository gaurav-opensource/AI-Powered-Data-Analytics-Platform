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

// ✅ Define data interface
interface VendorData {
  vendor: string;
  spend: number;
}

// ✅ Define tooltip props type
interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: VendorData }[];
}

// ✅ Move CustomTooltip OUTSIDE the component
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const vendor = payload[0].payload.vendor;
    const spend = payload[0].payload.spend;

    return (
      <div className="bg-white rounded-lg shadow-xl border border-gray-100 p-4">
        <div className="text-sm font-semibold text-gray-800 mb-2">{vendor}</div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Vendor Spend:</span>
          <span className="text-sm font-bold text-indigo-600">
            € {spend.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export const VendorSpendChart: React.FC = () => {
  const [data, setData] = useState<VendorData[]>([]);

  // ✅ Static mock data for testing
  useEffect(() => {
    const sampleData: VendorData[] = [
      { vendor: "Alpha Traders", spend: 45000 },
      { vendor: "Beta Electronics", spend: 38000 },
      { vendor: "Gamma Textiles", spend: 32000 },
      { vendor: "Delta Corp", spend: 29000 },
      { vendor: "OmegaLtd", spend: 26000 },
      { vendor: "Sigma Foods", spend: 23000 },
      { vendor: "Zeta Logistics", spend: 20000 },
      { vendor: "Nova Health", spend: 18000 },
      { vendor: "Apex Construction", spend: 16000 },
      { vendor: "Cobalt Industries", spend: 14000 },
    ];
    setData(sampleData);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Spend by Vendor (Top 10)
        </h2>
        <p className="text-sm text-gray-500">
          Vendor spend with cumulative percentage distribution.
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Y Axis (vendors) */}
          <YAxis
            dataKey="vendor"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#374151", fontSize: 14 }}
            width={120}
          />

          {/* X Axis (spend) */}
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickFormatter={(val) => `€${(val / 1000).toFixed(0)}k`}
          />

          {/* ✅ Tooltip uses external component */}
          <Tooltip content={<CustomTooltip />} />

          {/* Bars */}
          <Bar dataKey="spend" radius={4} barSize={20}>
            {data.map((entry, index) => {
              const isHighlighted = entry.vendor === "OmegaLtd"; // Example highlight
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={isHighlighted ? "#4F46E5" : "#C7D2FE"}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
