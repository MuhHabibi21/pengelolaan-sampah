import { prisma } from "@/lib/prisma";
import { Users, FileText, MapPin, Scale } from "lucide-react";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const admin = await prisma.user.findUnique({ where: { id: session.userId as string } });
  
  if (!admin) return <div className="p-8">Akun Admin tidak ditemukan.</div>;

  const totalLaporan = await prisma.laporanSampah.count();
  const totalUser = await prisma.user.count({ where: { role: "USER" } });
  const totalWilayah = await prisma.wilayah.count();
  
  const semuaLaporan = await prisma.laporanSampah.findMany();
  const totalBerat = semuaLaporan.reduce((sum, lap) => sum + lap.berat, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Ikhtisar Sistem</h1>
      <p className="text-slate-600 dark:text-slate-400">Selamat datang di Panel Admin, {admin.nama}.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl text-emerald-600 dark:text-emerald-400"><FileText size={24} /></div>
          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Laporan</h3>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{totalLaporan}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-xl text-blue-600 dark:text-blue-400"><Scale size={24} /></div>
          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Berat (kg)</h3>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{totalBerat.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-orange-100 dark:bg-orange-900/50 rounded-xl text-orange-600 dark:text-orange-400"><Users size={24} /></div>
          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Pengguna</h3>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{totalUser}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-purple-100 dark:bg-purple-900/50 rounded-xl text-purple-600 dark:text-purple-400"><MapPin size={24} /></div>
          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Wilayah Tercakup</h3>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{totalWilayah}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
