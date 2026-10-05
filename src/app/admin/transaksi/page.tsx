import { prisma } from "@/lib/prisma";
import { updateStatusTransaksi } from "@/app/actions/transaksi";
import { ArrowLeftRight, CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";

export default async function AdminTransaksiPage() {
  const transaksiList = await prisma.transaksiSampah.findMany({
    include: {
      user: true,
      jenisSampah: true,
      wilayah: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const totalOmset = transaksiList.reduce((sum, t) => sum + t.totalHarga, 0);
  const totalBerat = transaksiList.reduce((sum, t) => sum + t.berat, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <ArrowLeftRight className="text-indigo-400" /> Kelola Transaksi Sampah
        </h1>
        <p className="text-slate-400 mt-1">
          Verifikasi dan kelola alur transaksi penjemputan/penyetoran sampah dari seluruh warga.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
          <p className="text-xs font-semibold text-slate-400 uppercase">Total Transaksi Masuk</p>
          <p className="text-2xl font-bold text-white mt-1">{transaksiList.length} Transaksi</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 backdrop-blur-md">
          <p className="text-xs font-semibold text-amber-400 uppercase">Menunggu Validasi</p>
          <p className="text-2xl font-bold text-amber-300 mt-1">
            {transaksiList.filter((t) => t.status === "PENDING").length} Transaksi
          </p>
        </div>
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5 backdrop-blur-md">
          <p className="text-xs font-semibold text-indigo-400 uppercase">Total Berat Sampah</p>
          <p className="text-2xl font-bold text-indigo-300 mt-1">{totalBerat.toFixed(1)} kg</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 backdrop-blur-md">
          <p className="text-xs font-semibold text-emerald-400 uppercase">Perputaran Nilai</p>
          <p className="text-2xl font-bold text-emerald-300 mt-1">
            Rp {totalOmset.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Tabel Transaksi */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-4">Daftar Seluruh Transaksi</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/5 text-slate-400 text-xs uppercase border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Kode & Tanggal</th>
                <th className="py-3 px-4">Nama Pelapor</th>
                <th className="py-3 px-4">Detail Sampah</th>
                <th className="py-3 px-4">Total Nilai</th>
                <th className="py-3 px-4">Status Saat Ini</th>
                <th className="py-3 px-4 text-center">Aksi Ubah Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transaksiList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    Belum ada transaksi di dalam sistem.
                  </td>
                </tr>
              ) : (
                transaksiList.map((t) => (
                  <tr key={t.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-semibold text-white">{t.kodeTransaksi}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(t.tanggalTransaksi).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-white">{t.user.nama}</p>
                      <p className="text-xs text-slate-400">{t.user.email}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-indigo-400">{t.jenisSampah.namaJenis}</span>
                      <p className="text-xs text-slate-400">
                        {t.berat} kg • {t.wilayah.namaWilayah}
                      </p>
                      {t.catatan && (
                        <p className="text-[11px] text-slate-500 italic mt-0.5">&quot;{t.catatan}&quot;</p>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-white">Rp {t.totalHarga.toLocaleString("id-ID")}</p>
                      <p className="text-xs text-teal-400">+{t.totalPoin} Poin</p>
                    </td>
                    <td className="py-3 px-4">
                      {t.status === "PENDING" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          <Clock size={12} /> Menunggu
                        </span>
                      )}
                      {t.status === "DIPROSES" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          <AlertCircle size={12} /> Diproses
                        </span>
                      )}
                      {t.status === "SELESAI" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 size={12} /> Selesai
                        </span>
                      )}
                      {t.status === "DIBATALKAN" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
                          <XCircle size={12} /> Batal
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex gap-2">
                        {t.status === "PENDING" && (
                          <form action={updateStatusTransaksi}>
                            <input type="hidden" name="id" value={t.id} />
                            <input type="hidden" name="status" value="DIPROSES" />
                            <button
                              type="submit"
                              className="px-2.5 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                            >
                              Proses
                            </button>
                          </form>
                        )}
                        {t.status !== "SELESAI" && t.status !== "DIBATALKAN" && (
                          <form action={updateStatusTransaksi}>
                            <input type="hidden" name="id" value={t.id} />
                            <input type="hidden" name="status" value="SELESAI" />
                            <button
                              type="submit"
                              className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                            >
                              Selesaikan
                            </button>
                          </form>
                        )}
                        {t.status !== "DIBATALKAN" && t.status !== "SELESAI" && (
                          <form action={updateStatusTransaksi}>
                            <input type="hidden" name="id" value={t.id} />
                            <input type="hidden" name="status" value="DIBATALKAN" />
                            <button
                              type="submit"
                              className="px-2.5 py-1 text-xs font-semibold bg-red-600/40 hover:bg-red-600 text-red-200 rounded-lg transition-colors"
                            >
                              Batal
                            </button>
                          </form>
                        )}
                      </div>
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
