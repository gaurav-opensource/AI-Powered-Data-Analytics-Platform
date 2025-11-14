import DashboardSidebar from "./dashboard/DashboardSidebar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex w-full min-h-screen bg-gray-50">
        
        {/* LEFT SIDEBAR */}
        <DashboardSidebar />

        {/* RIGHT CONTENT */}
        <main className="flex-1 ">
          {children}
        </main>

      </body>
    </html>
  );
}
