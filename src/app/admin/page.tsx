export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { Users, FileText, MapPin, Scale, ArrowLeftRight, CheckCircle2, AlertCircle } from "lucide-react";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const admin = await prisma.user.findUnique({ where: { id: session.userId as string } });
  if (!admin) return <div className="p-8">Akun Admin tidak ditemukan.</div>;

  const [totalLaporan, totalUser, totalWilayah, totalTransaksi, semuaLaporan, pendingTransaksi] =
    await Promise.all([
      prisma.laporanSampah.count(),
      prisma.user.count({ where: { role: "USER" } }),
      prisma.wilayah.count(),
      prisma.transaksiSampah.count(),
      prisma.laporanSampah.findMany({ select: { berat: true } }),
      prisma.transaksiSampah.count({ where: { status: "PENDING" } }),
    ]);

  const totalBerat = semuaLaporan.reduce((sum, lap) => sum + lap.berat, 0);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-700 rounded-3xl p-8 text-white shadow-xl shadow-teal-900/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-teal-100">
            Panel Administrator Pengelola
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ikhtisar Sistem Pengelolaan Sampah
          </h1>
          <p className="text-teal-100 text-sm leading-relaxed">
            Selamat datang, <b>{admin.nama}</b>. Pantau seluruh alur pengaduan sampah, verifikasi transaksi setor, dan manajemen fasilitas kota secara terpadu.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-teal-100 shadow-sm flex items-center gap-4 hover:border-teal-300 transition-all">
          <div className="p-4 bg-emerald-100 text-emerald-700 rounded-2xl">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Laporan</h3>
            <p className="text-2xl font-black text-slate-800 mt-1">{totalLaporan}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-teal-100 shadow-sm flex items-center gap-4 hover:border-teal-300 transition-all">
          <div className="p-4 bg-teal-100 text-teal-700 rounded-2xl">
            <Scale size={24} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sampah Terkumpul</h3>
            <p className="text-2xl font-black text-slate-800 mt-1">{totalBerat.toFixed(1)} <span className="text-sm font-semibold text-slate-400">kg</span></p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-teal-100 shadow-sm flex items-center gap-4 hover:border-teal-300 transition-all">
          <div className="p-4 bg-amber-100 text-amber-700 rounded-2xl">
            <ArrowLeftRight size={24} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Transaksi Masuk</h3>
            <p className="text-2xl font-black text-slate-800 mt-1">{totalTransaksi}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-teal-100 shadow-sm flex items-center gap-4 hover:border-teal-300 transition-all">
          <div className="p-4 bg-blue-100 text-blue-700 rounded-2xl">
            <Users size={24} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Warga Terdaftar</h3>
            <p className="text-2xl font-black text-slate-800 mt-1">{totalUser}</p>
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-teal-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold mb-3">
              {pendingTransaksi} Menunggu Validasi
            </span>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Verifikasi Transaksi Setor</h2>
            <p className="text-slate-600 text-xs leading-relaxed mb-6">
              Validasi sampah yang disetorkan warga dan ubah status transaksi menjadi selesai.
            </p>
          </div>
          <Link
            href="/admin/transaksi"
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-center text-xs transition-colors"
          >
            Buka Kelola Transaksi →
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-teal-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold mb-3">
              Monitoring Warga
            </span>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Daftar Semua Laporan</h2>
            <p className="text-slate-600 text-xs leading-relaxed mb-6">
              Lihat seluruh pengaduan tumpukan sampah beserta foto bukti autentik dari warga.
            </p>
          </div>
          <Link
            href="/admin/laporan"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center text-xs transition-colors"
          >
            Buka Semua Laporan →
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-teal-100 shadow-sm flex flex-col justify-between">
          <div>
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold mb-3">
              Relasi Many-to-Many
            </span>
            <h2 className="text-lg font-bold text-slate-900 mb-1">Fasilitas Daur Ulang</h2>
            <p className="text-slate-600 text-xs leading-relaxed mb-6">
              Kelola titik fasilitas pengolahan akhir dan kategori jenis sampah yang diterima.
            </p>
          </div>
          <Link
            href="/admin/fasilitas"
            className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-center text-xs transition-colors"
          >
            Buka Fasilitas (M-to-M) →
          </Link>
        </div>
      </div>
    </div>
  );
}
