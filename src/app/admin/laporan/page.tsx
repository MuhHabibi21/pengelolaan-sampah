import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { FileText, Camera, MapPin, User } from "lucide-react";

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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl">
            <FileText size={26} />
          </div>
          Manajemen Semua Laporan Sampah
        </h1>
        <p className="text-slate-500 mt-1">
          Pantau dan verifikasi seluruh pengaduan tumpukan sampah dari masyarakat.
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-8">
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse text-sm text-slate-700">
            <thead>
              <tr className="bg-emerald-50/60 border-b border-emerald-100 text-emerald-950 font-semibold">
                <th className="py-4 px-5 pl-6">Tanggal</th>
                <th className="py-4 px-5">Data Pelapor</th>
                <th className="py-4 px-5">Jenis Sampah</th>
                <th className="py-4 px-5">Wilayah</th>
                <th className="py-4 px-5">Berat</th>
                <th className="py-4 px-5 pr-6 text-center">Foto Bukti</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {laporan.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    Belum ada laporan sampah masuk.
                  </td>
                </tr>
              ) : (
                laporan.map((item) => (
                  <tr key={item.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="py-4 px-5 pl-6 text-slate-600 font-medium">
                      {format(item.tanggalLapor, "dd MMM yyyy", { locale: id })}
                    </td>
                    <td className="py-4 px-5">
                      <p className="font-bold text-slate-900 flex items-center gap-1.5">
                        <User size={14} className="text-emerald-600" /> {item.user.nama}
                      </p>
                      <p className="text-xs text-slate-400">{item.user.noHp} • {item.user.email}</p>
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">
                        {item.jenisSampah.namaJenis}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-slate-600 flex items-center gap-1.5">
                      <MapPin size={14} className="text-emerald-500" />
                      {item.wilayah.namaWilayah}
                    </td>
                    <td className="py-4 px-5 font-bold text-emerald-700">{item.berat} kg</td>
                    <td className="py-4 px-5 pr-6 text-center">
                      {item.fotoSampah ? (
                        <a
                          href={item.fotoSampah.imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
                        >
                          <Camera size={13} /> Lihat Foto
                        </a>
                      ) : (
                        <span className="text-slate-400 text-xs">-</span>
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
