import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default async function HomePage() {
  const laporanList = await prisma.laporanSampah.findMany({
    include: {
      jenisSampah: true,
      wilayah: true,
      user: {
        select: { nama: true }
      },
      fotoSampah: true,
    },
    orderBy: { tanggalLapor: "desc" },
    take: 50 // Batasi 50 laporan terakhir
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4 pt-12">
          <h1 className="text-5xl font-extrabold text-emerald-600 dark:text-emerald-400">Pengelolaan Sampah Bersama</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Platform digital terintegrasi untuk pelaporan dan pengelolaan sampah masyarakat. Mari berpartisipasi mewujudkan lingkungan yang lebih bersih.</p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/login" className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full transition-colors shadow-lg">Masuk / Daftar Akun</Link>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
          <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">Daftar Laporan Publik Terbaru</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Tanggal</th>
                  <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Pelapor</th>
                  <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Jenis</th>
                  <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Wilayah</th>
                  <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Berat</th>
                  <th className="p-4 font-semibold text-slate-700 dark:text-slate-300 text-center">Foto Bukti</th>
                </tr>
              </thead>
              <tbody>
                {laporanList.length === 0 ? (
                  <tr><td colSpan={6} className="text-center p-8">Belum ada laporan masuk.</td></tr>
                ) : (
                  laporanList.map(item => (
                    <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-4">{format(item.tanggalLapor, "dd MMM yyyy", { locale: id })}</td>
                      <td className="p-4 font-medium">{item.user.nama.substring(0, 3) + "***"}</td>
                      <td className="p-4"><span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-medium">{item.jenisSampah.namaJenis}</span></td>
                      <td className="p-4">{item.wilayah.namaWilayah}</td>
                      <td className="p-4 font-bold text-emerald-600">{item.berat} kg</td>
                      <td className="p-4 text-center">
                        {item.fotoSampah ? (
                          <a href={item.fotoSampah.imageUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline font-medium text-sm">Lihat Foto</a>
                        ) : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
