export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, Scale, PlusCircle, ArrowRight, ArrowLeftRight, CheckCircle2 } from "lucide-react";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const user = await prisma.user.findUnique({ where: { id: session.userId as string } });
  if (!user) return <div className="p-8">Akun tidak ditemukan.</div>;

  const [laporan, transaksi] = await Promise.all([
    prisma.laporanSampah.findMany({ where: { userId: user.id } }),
    prisma.transaksiSampah.findMany({ where: { userId: user.id } }),
  ]);

  const totalLaporan = laporan.length;
  const totalBerat = laporan.reduce((sum, lap) => sum + lap.berat, 0);
  const totalPoin = transaksi
    .filter((t) => t.status === "SELESAI")
    .reduce((sum, t) => sum + t.totalPoin, 0);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-900/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-emerald-100">
            Selamat Datang Kembali 👋
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {user.nama}
          </h1>
          <p className="text-emerald-100 text-sm leading-relaxed">
            Terima kasih telah berkontribusi dalam menjaga kebersihan lingkungan. Pantau riwayat laporan dan setor sampah daur ulang Anda di sini.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-4 hover:border-emerald-300 transition-all">
          <div className="p-4 bg-emerald-100 text-emerald-700 rounded-2xl">
            <FileText size={26} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Laporan Dikirim</p>
            <p className="text-3xl font-extrabold text-slate-800 mt-1">{totalLaporan}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-4 hover:border-emerald-300 transition-all">
          <div className="p-4 bg-teal-100 text-teal-700 rounded-2xl">
            <Scale size={26} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Berat Sampah</p>
            <p className="text-3xl font-extrabold text-slate-800 mt-1">{totalBerat.toFixed(1)} <span className="text-sm font-semibold text-slate-500">kg</span></p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-4 hover:border-emerald-300 transition-all">
          <div className="p-4 bg-amber-100 text-amber-700 rounded-2xl">
            <CheckCircle2 size={26} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Poin Penghargaan</p>
            <p className="text-3xl font-extrabold text-amber-600 mt-1">{totalPoin} <span className="text-sm font-semibold text-slate-500">Pts</span></p>
          </div>
        </div>
      </div>

      {/* Action Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-4 font-bold">
              <PlusCircle size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Lapor Sampah Liar</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Temukan tumpukan sampah liar di lingkungan Anda? Unggah foto bukti langsung dari perangkat agar segera dibersihkan petugas.
            </p>
          </div>
          <Link
            href="/dashboard/laporan/baru"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md shadow-emerald-600/20 transition-all text-sm"
          >
            Kirim Laporan Sekarang <ArrowRight size={16} />
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-teal-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-2xl flex items-center justify-center mb-4 font-bold">
              <ArrowLeftRight size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Transaksi Setor Sampah</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Pilah sampah daur ulang di rumah dan ajukan penjemputan untuk mendapatkan saldo rupiah dan poin reward bank sampah.
            </p>
          </div>
          <Link
            href="/dashboard/transaksi"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-md shadow-teal-600/20 transition-all text-sm"
          >
            Mulai Setor Sampah <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
