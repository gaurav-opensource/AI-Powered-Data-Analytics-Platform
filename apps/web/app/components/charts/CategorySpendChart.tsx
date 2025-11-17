"use client";

import { useEffect, useState } from "react";
import api from "@/app/api/api";  // 
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A16AE8",
  "#FF4560",
  "#775DD0",
];

export default function CategorySpendChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategorySpend = async () => {
      try {
        const response = await api.getCategorySpend();  //  centralized API call
        setData(response.data || []);
      } catch (err) {
        console.error("Error loading category spend:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCategorySpend();
  }, []);

  if (loading)
    return <div className="text-center py-10 text-lg">Loading chart...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">
        Category Spend Overview
      </h2>

      <div className="w-full h-96 bg-white shadow rounded-2xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="totalSpend"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={140}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
