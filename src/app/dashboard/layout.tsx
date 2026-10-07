import { ReactNode } from "react";
import UserSidebar from "@/components/UserSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <UserSidebar />
      <main className="flex-1 overflow-y-auto p-10 bg-slate-50 dark:bg-slate-900/50 relative">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
