import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, LogOut, FileText, Settings, Users, Database, ShieldAlert } from "lucide-react";
import { logout } from "@/app/actions/auth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>

        <div className="p-8 pb-4 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Admin Panel
            </h2>
          </div>
          <p className="text-slate-400 text-xs font-medium ml-13">System Management</p>
        </div>

        <nav className="flex-1 px-4 mt-6 space-y-2 relative z-10">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3.5 text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl font-medium shadow-[0_0_15px_rgba(99,102,241,0.05)]">
            <LayoutDashboard size={20} /> Dashboard Utama
          </Link>
          <Link href="/admin/laporan" className="flex items-center gap-3 px-4 py-3.5 text-slate-300 hover:text-indigo-300 hover:bg-white/5 rounded-2xl font-medium transition-all group">
            <FileText size={20} className="text-slate-400 group-hover:text-indigo-400 transition-colors" /> Semua Laporan
          </Link>
          <Link href="/admin/transaksi" className="flex items-center gap-3 px-4 py-3.5 text-slate-300 hover:text-indigo-300 hover:bg-white/5 rounded-2xl font-medium transition-all group">
            <FileText size={20} className="text-slate-400 group-hover:text-indigo-400 transition-colors" /> Kelola Transaksi
          </Link>
          <Link href="/admin/jenis-sampah" className="flex items-center gap-3 px-4 py-3.5 text-slate-300 hover:text-indigo-300 hover:bg-white/5 rounded-2xl font-medium transition-all group">
            <Database size={20} className="text-slate-400 group-hover:text-indigo-400 transition-colors" /> Jenis Sampah
          </Link>
          <Link href="/admin/wilayah" className="flex items-center gap-3 px-4 py-3.5 text-slate-300 hover:text-indigo-300 hover:bg-white/5 rounded-2xl font-medium transition-all group">
            <Database size={20} className="text-slate-400 group-hover:text-indigo-400 transition-colors" /> Wilayah
          </Link>
          <Link href="/admin/fasilitas" className="flex items-center gap-3 px-4 py-3.5 text-slate-300 hover:text-indigo-300 hover:bg-white/5 rounded-2xl font-medium transition-all group">
            <Database size={20} className="text-slate-400 group-hover:text-indigo-400 transition-colors" /> Fasilitas (M-to-M)
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3.5 text-slate-300 hover:text-indigo-300 hover:bg-white/5 rounded-2xl font-medium transition-all group">
            <Users size={20} className="text-slate-400 group-hover:text-indigo-400 transition-colors" /> Kelola Pengguna
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-800/50 relative z-10">
          <form action={logout}>
            <button type="submit" className="flex w-full items-center justify-center gap-2 px-4 py-3.5 text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:text-red-300 rounded-2xl font-medium transition-all">
              <LogOut size={18} /> Keluar Sistem
            </button>
          </form>
        </div>
      </aside>
      
      <main className="flex-1 overflow-y-auto p-10 bg-slate-50 dark:bg-slate-900/50 relative">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
