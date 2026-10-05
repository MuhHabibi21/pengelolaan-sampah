import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import FormTransaksi from "./FormTransaksi";
import { ArrowLeftRight, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default async function TransaksiUserPage() {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const [jenisList, wilayahList, transaksiList] = await Promise.all([
    prisma.jenisSampah.findMany({ orderBy: { namaJenis: "asc" } }),
    prisma.wilayah.findMany({ orderBy: { namaWilayah: "asc" } }),
    prisma.transaksiSampah.findMany({
      where: { userId: session.userId as string },
      include: {
        jenisSampah: true,
        wilayah: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const totalPoin = transaksiList
    .filter((t) => t.status === "SELESAI")
    .reduce((sum, t) => sum + t.totalPoin, 0);

  const totalSaldo = transaksiList
    .filter((t) => t.status === "SELESAI")
    .reduce((sum, t) => sum + t.totalHarga, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <ArrowLeftRight className="text-emerald-400" /> Transaksi Setor Sampah
        </h1>
        <p className="text-slate-400 mt-1">
          Setor sampah daur ulang Anda dan dapatkan poin serta konversi rupiah secara langsung.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Total Transaksi</p>
          <p className="text-3xl font-bold text-white mt-2">{transaksiList.length} Transaksi</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-md">
          <p className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">Saldo Terkumpul</p>
          <p className="text-3xl font-bold text-emerald-300 mt-2">
            Rp {totalSaldo.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-6 backdrop-blur-md">
          <p className="text-sm font-semibold text-teal-400 uppercase tracking-wider">Poin Penghargaan</p>
          <p className="text-3xl font-bold text-teal-300 mt-2">{totalPoin} Pts</p>
        </div>
      </div>

      {/* Grid: Form & List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Setor */}
        <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white mb-4">Pengajuan Setor Sampah</h2>
          <FormTransaksi jenisList={jenisList} wilayahList={wilayahList} />
        </div>

        {/* Tabel Riwayat Transaksi */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white mb-4">Riwayat Transaksi Anda</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-white/5 text-slate-400 text-xs uppercase border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">Kode Transaksi</th>
                  <th className="py-3 px-4">Jenis & Berat</th>
                  <th className="py-3 px-4">Estimasi Nilai</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transaksiList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      Belum ada riwayat transaksi setor sampah.
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
                        <span className="font-medium text-emerald-400">{t.jenisSampah.namaJenis}</span>
                        <p className="text-xs text-slate-400">{t.berat} kg • {t.wilayah.namaWilayah}</p>
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
