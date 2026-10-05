import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default async function AdminSemuaLaporanPage() {
  const laporan = await prisma.laporanSampah.findMany({
    include: {
      jenisSampah: true,
      wilayah: true,
      fotoSampah: true,
      user: true,
    },
    orderBy: { tanggalLapor: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Manajemen Laporan Sampah</h1>
      <p className="text-slate-600 dark:text-slate-400">Pantau seluruh laporan masuk dari masyarakat.</p>
      
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Tanggal</th>
                <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Pelapor</th>
                <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Jenis</th>
                <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Wilayah</th>
                <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Berat</th>
                <th className="p-4 font-semibold text-slate-700 dark:text-slate-300 text-center">Foto</th>
              </tr>
            </thead>
            <tbody>
              {laporan.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">Belum ada laporan masuk.</td>
                </tr>
              ) : (
                laporan.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-4 text-slate-700 dark:text-slate-300">
                      {format(item.tanggalLapor, "dd MMM yyyy", { locale: id })}
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-slate-800 dark:text-slate-200">{item.user.nama}</p>
                      <p className="text-sm text-slate-500">{item.user.noHp}</p>
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">
                      <span className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md text-xs font-medium">{item.jenisSampah.namaJenis}</span>
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{item.wilayah.namaWilayah}</td>
                    <td className="p-4 font-semibold text-emerald-600 dark:text-emerald-400">{item.berat} kg</td>
                    <td className="p-4 text-center">
                      {item.fotoSampah ? (
                        <a href={item.fotoSampah.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm font-medium">Lihat</a>
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
