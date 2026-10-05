import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { logout } from "@/app/actions/auth";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const user = await prisma.user.findUnique({ where: { id: session.userId as string } });
  
  if (!user) return <div className="p-8">Akun tidak ditemukan.</div>;

  const laporan = await prisma.laporanSampah.findMany({
    where: { userId: user.id }
  });

  const totalLaporan = laporan.length;
  const totalBerat = laporan.reduce((sum, lap) => sum + lap.berat, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">Selamat Datang, {user.nama}!</h1>
          <p className="text-emerald-700 dark:text-emerald-400 mt-2">Ini adalah halaman dashboard Anda. Dari sini Anda bisa mengirimkan laporan sampah baru dan memantau status laporan Anda sebelumnya.</p>
        </div>
        <form action={logout}>
          <button type="submit" className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 font-medium rounded-lg transition-colors">Logout</button>
        </form>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-emerald-900/50 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800 shadow-sm">
          <h3 className="text-lg font-medium text-emerald-800 dark:text-emerald-200">Total Laporan</h3>
          <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{totalLaporan}</p>
        </div>
        <div className="bg-white dark:bg-emerald-900/50 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800 shadow-sm">
          <h3 className="text-lg font-medium text-emerald-800 dark:text-emerald-200">Total Berat (kg)</h3>
          <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{totalBerat.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="mt-8 bg-white dark:bg-emerald-900/50 rounded-2xl border border-emerald-100 dark:border-emerald-800 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 mb-4">Buat Laporan Baru</h2>
        <p className="text-emerald-600 dark:text-emerald-400 mb-6">Pilih fitur di bawah ini untuk memulai pengiriman laporan sampah Anda beserta bukti fotonya.</p>
        <a href="/dashboard/laporan/baru" className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-600/20">
          + Kirim Laporan Sekarang
        </a>
      </div>
    </div>
  );
}
