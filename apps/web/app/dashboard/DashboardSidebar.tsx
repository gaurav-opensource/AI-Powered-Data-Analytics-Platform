"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Invoice", path: "/invoice" },
  { name: "Other Files", path: "/files" },
  { name: "Departments", path: "/departments" },
  { name: "Users", path: "/users" },
  { name: "Chat with Data", path: "/chat" },
  { name: "Settings", path: "/settings" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-[#0F172A] text-white border-r p-4 flex flex-col shadow-lg">

      <h1 className="text-lg font-bold mb-6 tracking-wide">
        📘 AI-Powered Analytics
      </h1>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const active = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`p-3 rounded-lg text-sm font-medium transition-all duration-200
                ${active 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "text-gray-300 hover:bg-blue-800 hover:text-white"
                }
              `}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
