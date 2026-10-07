import { ReactNode } from "react";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-100/70 text-slate-800 font-sans">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8 lg:p-10 bg-gradient-to-br from-teal-50/40 via-white to-slate-50 relative">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
