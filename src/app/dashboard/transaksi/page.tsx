export const dynamic = "force-dynamic";
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
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl">
            <ArrowLeftRight size={26} />
          </div>
          Transaksi Setor Sampah
        </h1>
        <p className="text-slate-500 mt-1">
          Setor sampah daur ulang Anda dan dapatkan poin serta konversi rupiah secara langsung.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Transaksi</p>
          <p className="text-3xl font-black text-slate-800 mt-2">{transaksiList.length} <span className="text-sm font-semibold text-slate-400">Transaksi</span></p>
        </div>
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Saldo Terkumpul</p>
          <p className="text-3xl font-black text-emerald-700 mt-2">
            Rp {totalSaldo.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-wider">Poin Penghargaan</p>
          <p className="text-3xl font-black text-teal-700 mt-2">{totalPoin} <span className="text-sm font-semibold text-slate-400">Pts</span></p>
        </div>
      </div>

      {/* Grid: Form & List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Setor */}
        <div className="lg:col-span-1 bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Pengajuan Setor Sampah</h2>
          <FormTransaksi jenisList={jenisList} wilayahList={wilayahList} />
        </div>

        {/* Tabel Riwayat Transaksi */}
        <div className="lg:col-span-2 bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Riwayat Transaksi Anda</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-emerald-50/60 text-emerald-950 text-xs font-semibold uppercase border-b border-emerald-100">
                <tr>
                  <th className="py-3.5 px-4">Kode Transaksi</th>
                  <th className="py-3.5 px-4">Jenis & Berat</th>
                  <th className="py-3.5 px-4">Estimasi Nilai</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transaksiList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-slate-400">
                      Belum ada riwayat transaksi setor sampah.
                    </td>
                  </tr>
                ) : (
                  transaksiList.map((t) => (
                    <tr key={t.id} className="hover:bg-emerald-50/30 transition-colors">
                      <td className="py-3.5 px-4">
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
                        <span className="font-bold text-emerald-700">{t.jenisSampah.namaJenis}</span>
                        <p className="text-xs text-slate-500">{t.berat} kg • {t.wilayah.namaWilayah}</p>
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
