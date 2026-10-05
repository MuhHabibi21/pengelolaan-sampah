import { prisma } from "@/lib/prisma";

export default async function FasilitasPage() {
  const fasilitas = await prisma.fasilitas.findMany({
    include: {
      jenisSampahDiterima: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Kelola Fasilitas Pengolahan</h1>
        <p className="text-slate-500 dark:text-slate-400">Data fasilitas tempat pengolahan akhir dan kategori sampah yang mereka terima.</p>
      </div>

      <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Nama Fasilitas</th>
                <th className="px-6 py-4 font-semibold">Lokasi</th>
                <th className="px-6 py-4 font-semibold">Jenis Sampah Diterima (N to N)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {fasilitas.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{f.namaFasilitas}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{f.lokasi}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {f.jenisSampahDiterima.map(js => (
                        <span key={js.id} className="px-2.5 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300 rounded-lg">
                          {js.namaJenis}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {fasilitas.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-slate-500">Belum ada data fasilitas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
