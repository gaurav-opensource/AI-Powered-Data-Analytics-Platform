// Sidebar.tsx
import React from "react";
import {
  HomeIcon,
  DocumentIcon,
  FolderIcon,
  AcademicCapIcon,
  UserIcon,
  CogIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";

interface NavItem {
  name: string;
  icon: React.ReactNode;
  active?: boolean;
}

export const Sidebar: React.FC = () => {
  const generalNav: NavItem[] = [
    { name: "Dashboard", icon: <HomeIcon className="w-5 h-5" />, active: true },
    { name: "Invoice", icon: <DocumentIcon className="w-5 h-5" /> },
    { name: "Other files", icon: <FolderIcon className="w-5 h-5" /> },
    { name: "Departments", icon: <AcademicCapIcon className="w-5 h-5" /> },
    { name: "Users", icon: <UserIcon className="w-5 h-5" /> },
    { name: "Settings", icon: <CogIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="h-screen w-72 bg-white shadow-xl flex flex-col justify-between">
      {/* Top Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Placeholder Logo */}
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-lg">
              L
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">Buchhaltung</div>
              <div className="text-xs text-gray-500">12 members</div>
            </div>
          </div>
          <ChevronUpDownIcon className="w-5 h-5 text-gray-500" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-6 pb-2 space-y-1">
        <div className="text-xs font-semibold uppercase text-gray-500 px-3 pt-2 pb-2">
          GENERAL
        </div>
        {generalNav.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`flex items-center space-x-3 p-2 rounded-lg ${
              item.active
                ? "bg-indigo-100 text-indigo-800 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span
              className={`flex-shrink-0 ${
                item.active ? "text-indigo-600" : "text-gray-400"
              }`}
            >
              {item.icon}
            </span>
            <span className="text-sm">{item.name}</span>
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200">
        <a
          href="#"
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50"
        >
          {/* Placeholder Flowbit AI Logo */}
          <div className="w-6 h-6 bg-purple-600 rounded-md flex items-center justify-center text-white font-bold text-xs">
            A
          </div>
          <span className="text-sm font-semibold text-gray-800">Flowbit AI</span>
        </a>
      </div>
    </div>
  );
};
