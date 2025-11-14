"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface QueryResult {
  [key: string]: string | number | boolean | null | undefined;
}

export default function Home() {
  const [userQuery, setUserQuery] = useState("");
  const [generatedSQL, setGeneratedSQL] = useState("");
  const [results, setResults] = useState<QueryResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasFirstRun, setHasFirstRun] = useState(false);

  const handleQuerySubmit = async () => {
    if (!userQuery.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/chat-with-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userQuery }),
      });

      const data = await res.json();

      setHasFirstRun(true);

      if (data.error) {
        setError(data.error);
      } else {
        setGeneratedSQL(data.generated_sql ?? "");
        setResults(data.results ?? []);
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const numericColumns = results.length
    ? Object.keys(results[0]).filter(
        (col) => !isNaN(Number(results[0][col]))
      )
    : [];

  let chartData: { name: string; value: number }[] = [];
  if (results.length && numericColumns.length) {
    const keyColumn = Object.keys(results[0])[0];
    const valueColumn = numericColumns[0];

    chartData = results.map((row) => ({
      name: String(row[keyColumn] ?? "Unknown"),
      value: Number(row[valueColumn]) ?? 0,
    }));
  }

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#33AA88", "#8884d8"];

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col items-center px-20 py-10 space-y-10">
      <h1 className="text-3xl font-bold text-white">Chat With Data</h1>

      {/* Chat Input Section */}
      <div className="w-full max-w-5xl flex gap-3">
        <input
          type="text"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Ask something like 'Total spend last 90 days'"
          className="flex-1 bg-zinc-900 text-white border border-zinc-700 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleQuerySubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
        >
          {loading ? "Thinking..." : "Run"}
        </button>
      </div>

      {/* Output Section */}
      {hasFirstRun && (
        <div className="w-full max-w-5xl space-y-6">
          {error && (
            <div className="text-red-400 font-medium bg-red-900/20 border border-red-700 p-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Results Table */}
          {results.length > 0 && (
            <div>
              <h2 className="font-semibold text-lg mb-3">Results:</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-zinc-700 text-sm">
                  <thead>
                    <tr className="bg-zinc-800">
                      {Object.keys(results[0]).map((col) => (
                        <th
                          key={col}
                          className="border border-zinc-700 px-3 py-2 text-left text-gray-300"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-950"}
                      >
                        {Object.values(row).map((val, j) => (
                          <td key={j} className="border border-zinc-800 px-3 py-2">
                            {val !== null && val !== undefined
                              ? val.toString()
                              : "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Chart */}
              {chartData.length > 0 && (
                <div className="h-80 mt-10">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartData.length <= 10 ? (
                      <PieChart>
                        <Pie
                          data={chartData}
                          dataKey="value"
                          nameKey="name"
                          outerRadius={100}
                          label
                        >
                          {chartData.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    ) : (
                      <BarChart data={chartData}>
                        <XAxis dataKey="name" stroke="#ccc" />
                        <YAxis stroke="#ccc" />
                        <Tooltip />
                        <Bar dataKey="value" fill="#00C49F" />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
