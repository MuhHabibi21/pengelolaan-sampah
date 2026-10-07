export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { updateStatusTransaksi } from "@/app/actions/transaksi";
import { ArrowLeftRight, CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";

export default async function AdminTransaksiPage() {
  let transaksiList: any[] = [];
  try {
    transaksiList = await prisma.transaksiSampah.findMany({
      include: {
        user: true,
        jenisSampah: true,
        wilayah: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("Database offline, using fallback transaksi list");
    transaksiList = [
      {
        id: "trx-1",
        createdAt: new Date(),
        user: { nama: "Budi Santoso", email: "user@example.com" },
        jenisSampah: { namaJenis: "Anorganik" },
        wilayah: { namaWilayah: "Kecamatan Menteng" },
        berat: 12.5,
        totalHarga: 37500,
        totalPoin: 125,
        status: "PENDING",
      },
      {
        id: "trx-2",
        createdAt: new Date(Date.now() - 86400000),
        user: { nama: "Siti Rahmawati", email: "siti@example.com" },
        jenisSampah: { namaJenis: "Organik" },
        wilayah: { namaWilayah: "Kecamatan Kebayoran Baru" },
        berat: 8.0,
        totalHarga: 16000,
        totalPoin: 80,
        status: "SELESAI",
      },
    ];
  }

  const totalOmset = transaksiList.reduce((sum, t) => sum + (t.totalHarga || 0), 0);
  const totalBerat = transaksiList.reduce((sum, t) => sum + (t.berat || 0), 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <div className="p-2.5 bg-teal-100 text-teal-700 rounded-2xl">
            <ArrowLeftRight size={26} />
          </div>
          Kelola Transaksi Sampah
        </h1>
        <p className="text-slate-500 mt-1">
          Verifikasi dan kelola alur transaksi penjemputan/penyetoran sampah dari seluruh warga.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-teal-100 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Transaksi</p>
          <p className="text-2xl font-black text-slate-800 mt-1">{transaksiList.length} <span className="text-xs font-normal text-slate-400">Trx</span></p>
        </div>
        <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-bold text-amber-600 uppercase">Menunggu Validasi</p>
          <p className="text-2xl font-black text-amber-600 mt-1">
            {transaksiList.filter((t) => t.status === "PENDING").length} <span className="text-xs font-normal text-slate-400">Trx</span>
          </p>
        </div>
        <div className="bg-white border border-teal-100 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-bold text-teal-600 uppercase">Total Berat</p>
          <p className="text-2xl font-black text-teal-700 mt-1">{totalBerat.toFixed(1)} <span className="text-xs font-normal text-slate-400">kg</span></p>
        </div>
        <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-sm">
          <p className="text-xs font-bold text-emerald-600 uppercase">Perputaran Nilai</p>
          <p className="text-2xl font-black text-emerald-700 mt-1">
            Rp {totalOmset.toLocaleString("id-ID")}
          </p>
        </div>
      </div>

      {/* Tabel Transaksi */}
      <div className="bg-white border border-teal-100 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Daftar Seluruh Transaksi</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-teal-50/60 text-teal-950 text-xs font-semibold uppercase border-b border-teal-100">
              <tr>
                <th className="py-3.5 px-4 pl-6">Kode & Tanggal</th>
                <th className="py-3.5 px-4">Nama Pelapor</th>
                <th className="py-3.5 px-4">Detail Sampah</th>
                <th className="py-3.5 px-4">Total Nilai</th>
                <th className="py-3.5 px-4">Status Saat Ini</th>
                <th className="py-3.5 px-4 pr-6 text-center">Aksi Ubah Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transaksiList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    Belum ada transaksi di dalam sistem.
                  </td>
                </tr>
              ) : (
                transaksiList.map((t) => (
                  <tr key={t.id} className="hover:bg-teal-50/30 transition-colors">
                    <td className="py-3.5 px-4 pl-6">
                      <p className="font-bold text-slate-900">{t.kodeTransaksi}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(t.tanggalTransaksi).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">{t.user.nama}</p>
                      <p className="text-xs text-slate-400">{t.user.email}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-teal-700">{t.jenisSampah.namaJenis}</span>
                      <p className="text-xs text-slate-500">
                        {t.berat} kg • {t.wilayah.namaWilayah}
                      </p>
                      {t.catatan && (
                        <p className="text-[11px] text-slate-400 italic mt-0.5">&quot;{t.catatan}&quot;</p>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">Rp {t.totalHarga.toLocaleString("id-ID")}</p>
                      <p className="text-xs font-semibold text-teal-600">+{t.totalPoin} Poin</p>
                    </td>
                    <td className="py-3.5 px-4">
                      {t.status === "PENDING" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          <Clock size={12} /> Menunggu
                        </span>
                      )}
                      {t.status === "DIPROSES" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                          <AlertCircle size={12} /> Diproses
                        </span>
                      )}
                      {t.status === "SELESAI" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 size={12} /> Selesai
                        </span>
                      )}
                      {t.status === "DIBATALKAN" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
                          <XCircle size={12} /> Batal
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 pr-6 text-center">
                      <div className="inline-flex gap-1.5">
                        {t.status === "PENDING" && (
                          <form action={updateStatusTransaksi}>
                            <input type="hidden" name="id" value={t.id} />
                            <input type="hidden" name="status" value="DIPROSES" />
                            <button
                              type="submit"
                              className="px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer shadow-sm"
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
                              className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer shadow-sm"
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
                              className="px-3 py-1.5 text-xs font-bold bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors cursor-pointer"
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
