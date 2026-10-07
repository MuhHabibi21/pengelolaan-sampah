"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  FileText,
  Settings,
  Leaf,
  ArrowLeftRight,
} from "lucide-react";
import { logout } from "@/app/actions/auth";

export default function UserSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard Utama",
      href: "/dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: "Transaksi Setor Sampah",
      href: "/dashboard/transaksi",
      icon: ArrowLeftRight,
      exact: false,
    },
    {
      name: "Riwayat Laporan",
      href: "/dashboard/laporan",
      icon: FileText,
      exact: false,
    },
    {
      name: "Pengaturan Akun",
      href: "/dashboard/settings",
      icon: Settings,
      exact: false,
    },
  ];

  const isActive = (item: { href: string; exact: boolean }) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col relative overflow-hidden flex-shrink-0">
      {/* Glow effect */}
      <div className="absolute top-0 left-0 w-full h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="p-8 pb-4 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            Peduli Sampah
          </h2>
        </div>
        <p className="text-slate-400 text-xs font-medium ml-1">User Panel</p>
      </div>

      <nav className="flex-1 px-4 mt-6 space-y-1.5 relative z-10 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all group ${
                active
                  ? "text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                  : "text-slate-300 hover:text-emerald-300 hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon
                size={20}
                className={
                  active
                    ? "text-emerald-400"
                    : "text-slate-400 group-hover:text-emerald-400 transition-colors"
                }
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800/50 relative z-10">
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 px-4 py-3.5 text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:text-red-300 rounded-2xl font-medium transition-all cursor-pointer"
          >
            <LogOut size={18} /> Keluar Akun
          </button>
        </form>
      </div>
    </aside>
  );
}
