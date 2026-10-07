import { ReactNode } from "react";
import UserSidebar from "@/components/UserSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-100/70 text-slate-800 font-sans">
      <UserSidebar />
      <main className="flex-1 overflow-y-auto p-8 lg:p-10 bg-gradient-to-br from-emerald-50/40 via-white to-slate-50 relative">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
