import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function RiwayatLaporanPage() {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const user = await prisma.user.findUnique({ where: { id: session.userId as string } });
  
  if (!user) return <div className="p-8">User tidak ditemukan.</div>;

  const laporan = await prisma.laporanSampah.findMany({
    where: { userId: user.id },
    include: {
      jenisSampah: true,
      wilayah: true,
      fotoSampah: true,
    },
    orderBy: { tanggalLapor: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">Riwayat Laporan</h1>
      <p className="text-emerald-700 dark:text-emerald-400">Daftar semua laporan sampah yang telah Anda kirimkan.</p>
      
      <div className="bg-white dark:bg-emerald-900/50 rounded-2xl border border-emerald-100 dark:border-emerald-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-emerald-50 dark:bg-emerald-800/50 border-b border-emerald-100 dark:border-emerald-800">
                <th className="p-4 font-semibold text-emerald-900 dark:text-emerald-100">Tanggal</th>
                <th className="p-4 font-semibold text-emerald-900 dark:text-emerald-100">Jenis Sampah</th>
                <th className="p-4 font-semibold text-emerald-900 dark:text-emerald-100">Wilayah</th>
                <th className="p-4 font-semibold text-emerald-900 dark:text-emerald-100">Berat (kg)</th>
                <th className="p-4 font-semibold text-emerald-900 dark:text-emerald-100 text-center">Foto Bukti</th>
              </tr>
            </thead>
            <tbody>
              {laporan.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-emerald-600 dark:text-emerald-400">Belum ada riwayat laporan.</td>
                </tr>
              ) : (
                laporan.map((item) => (
                  <tr key={item.id} className="border-b border-emerald-100 dark:border-emerald-800/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-800/30 transition-colors">
                    <td className="p-4 text-emerald-800 dark:text-emerald-200">
                      {format(item.tanggalLapor, "dd MMMM yyyy", { locale: id })}
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium">
                        {item.jenisSampah.namaJenis}
                      </span>
                    </td>
                    <td className="p-4 text-emerald-800 dark:text-emerald-200">{item.wilayah.namaWilayah}</td>
                    <td className="p-4 text-emerald-800 dark:text-emerald-200 font-semibold">{item.berat} kg</td>
                    <td className="p-4 text-center">
                      {item.fotoSampah ? (
                        <a href={item.fotoSampah.imageUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-500 font-medium underline underline-offset-4">Lihat Foto</a>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
