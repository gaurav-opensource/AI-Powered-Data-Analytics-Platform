"use client";

import { useEffect, useState } from "react";
import api from "@/app/api/api";  // ⬅ using central API layer
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

export default function InvoiceTrendsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrends = async () => {
      try {
        const response = await api.getInvoiceTrends(); // ⬅ centralized API call
        setData(response.data || []);
      } catch (err) {
        console.error("Error fetching trends", err);
      } finally {
        setLoading(false);
      }
    };

    loadTrends();
  }, []);

  if (loading) return <div className="text-center p-6 text-lg">Loading chart...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Monthly Invoice Spend Trend
      </h1>

      <div className="w-full h-80 bg-white rounded-2xl shadow p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="totalSpend" 
              stroke="black" 
              strokeWidth={2} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
