"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  FileText,
  Settings,
  ArrowLeftRight,
  PlusCircle,
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
      exact: true,
    },
    {
      name: "Riwayat Laporan",
      href: "/dashboard/laporan",
      icon: FileText,
      exact: true,
    },
    {
      name: "Kirim Laporan Baru",
      href: "/dashboard/laporan/baru",
      icon: PlusCircle,
      exact: true,
    },
    {
      name: "Pengaturan Akun",
      href: "/dashboard/settings",
      icon: Settings,
      exact: true,
    },
  ];

  const isActive = (item: { href: string; exact: boolean }) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <aside className="w-72 bg-emerald-950 border-r border-emerald-900/60 flex flex-col relative overflow-hidden flex-shrink-0 text-white">
      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-full h-40 bg-emerald-500/15 blur-3xl rounded-full pointer-events-none"></div>

      {/* Brand Header */}
      <div className="p-7 pb-4 relative z-10 border-b border-emerald-900/40">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md shadow-emerald-500/20 border border-emerald-700/50 flex-shrink-0">
            <Image src="/logo.jpg" alt="Logo" width={40} height={40} className="object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Peduli<span className="text-emerald-400">Sampah</span>
            </h2>
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-emerald-800/80 text-emerald-200 rounded-full">
              Panel Warga
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 mt-6 space-y-1.5 relative z-10 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all group ${
                active
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 font-bold"
                  : "text-emerald-100/75 hover:text-white hover:bg-emerald-900/50"
              }`}
            >
              <Icon
                size={19}
                className={
                  active
                    ? "text-white"
                    : "text-emerald-400 group-hover:text-emerald-300 transition-colors"
                }
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Footer */}
      <div className="p-4 border-t border-emerald-900/40 relative z-10 bg-emerald-950/80">
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 px-4 py-3 text-red-300 bg-red-950/40 border border-red-800/40 hover:bg-red-900/60 hover:text-white rounded-xl text-sm font-semibold transition-all cursor-pointer"
          >
            <LogOut size={16} /> Keluar Akun
          </button>
        </form>
      </div>
    </aside>
  );
}
