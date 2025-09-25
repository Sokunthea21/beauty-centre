import type { Metadata } from "next";

import "../../globals.css";
import Sidebar from "../dashboard/components/Sidebar";
import Header from "../dashboard/components/Header";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main area */}
        <div className="flex-1 flex flex-col ml-64">
          {/* Header */}
          <Header />

          {/* Page Content */}
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
