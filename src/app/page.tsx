export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Leaf,
  ArrowRight,
  ShieldCheck,
  Recycle,
  Building2,
  Camera,
  MapPin,
  TrendingUp,
} from "lucide-react";

export default async function HomePage() {
  let laporanList: any[] = [];
  let totalLaporan = 14;
  let totalTransaksi = 9;
  let totalBerat = 68.5;

  try {
    const [dbLaporan, dbTotalLaporan, dbTotalTransaksi, dbSemua] = await Promise.all([
      prisma.laporanSampah.findMany({
        include: {
          jenisSampah: true,
          wilayah: true,
          user: { select: { nama: true } },
          fotoSampah: true,
        },
        orderBy: { tanggalLapor: "desc" },
        take: 20,
      }),
      prisma.laporanSampah.count(),
      prisma.transaksiSampah.count(),
      prisma.laporanSampah.findMany({ select: { berat: true } }),
    ]);

    laporanList = dbLaporan;
    totalLaporan = dbTotalLaporan;
    totalTransaksi = dbTotalTransaksi;
    totalBerat = dbSemua.reduce((sum, lap) => sum + lap.berat, 0);
  } catch (error) {
    console.warn("Database offline or not reachable from cloud, using demo fallback data.");
    laporanList = [
      {
        id: "demo-1",
        tanggalLapor: new Date(),
        user: { nama: "Budi Santoso" },
        jenisSampah: { namaJenis: "Anorganik" },
        wilayah: { namaWilayah: "Kecamatan Menteng" },
        berat: 5.0,
        fotoSampah: { imageUrl: "/logo.jpg" },
      },
      {
        id: "demo-2",
        tanggalLapor: new Date(Date.now() - 86400000),
        user: { nama: "Siti Rahma" },
        jenisSampah: { namaJenis: "Organik" },
        wilayah: { namaWilayah: "Kecamatan Kebayoran Baru" },
        berat: 8.5,
        fotoSampah: { imageUrl: "/logo.jpg" },
      },
      {
        id: "demo-3",
        tanggalLapor: new Date(Date.now() - 172800000),
        user: { nama: "Ahmad Fauzi" },
        jenisSampah: { namaJenis: "B3 (Bahan Berbahaya)" },
        wilayah: { namaWilayah: "Kecamatan Sunter Muara" },
        berat: 3.2,
        fotoSampah: null,
      },
    ];
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-white to-emerald-50/40 text-slate-800 font-sans">
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/20 overflow-hidden">
              <Image src="/logo.jpg" alt="Logo" width={44} height={44} className="object-cover" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-emerald-800">
                Peduli<span className="text-emerald-500">Sampah</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded-full">
                Platform Digital
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-all"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              Daftar Warga <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <Leaf size={14} className="text-emerald-600" /> Gerakan Bersih Lingkungan Berbasis Digital
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Kelola & Setor Sampah, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  Wujudkan Lingkungan Asri.
                </span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Laporkan timbunan sampah liar di lingkungan Anda dengan bukti foto, atau setorkan sampah daur ulang untuk mendapatkan konversi saldo rupiah dan poin penghargaan secara instan.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/login"
                  className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30 hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  <Recycle size={20} /> Mulai Lapor / Setor Sampah
                </Link>
                <Link
                  href="#tabel-laporan"
                  className="px-7 py-3.5 bg-white hover:bg-emerald-50 text-emerald-800 font-bold rounded-2xl border border-emerald-200 shadow-sm transition-all"
                >
                  Lihat Data Publik
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-emerald-100/80">
                <div>
                  <p className="text-2xl lg:text-3xl font-black text-emerald-700">{totalLaporan}</p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Laporan Masuk</p>
                </div>
                <div>
                  <p className="text-2xl lg:text-3xl font-black text-teal-700">{totalBerat.toFixed(1)} kg</p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sampah Terkelola</p>
                </div>
                <div>
                  <p className="text-2xl lg:text-3xl font-black text-emerald-700">{totalTransaksi}</p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Transaksi Setor</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white shadow-2xl shadow-emerald-700/20 overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>
                
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                    <Leaf size={28} className="text-emerald-200" />
                  </div>
                  <span className="px-3 py-1 bg-emerald-400/20 border border-emerald-300/30 rounded-full text-xs font-bold text-emerald-100">
                    Sistem RDBMS Aktif
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3">Integrasi 3 Alur Pengelolaan</h3>
                <div className="space-y-4 text-sm text-emerald-100/90">
                  <div className="flex items-start gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Camera size={18} className="text-emerald-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white">1. Foto Bukti One-to-One</p>
                      <p className="text-xs text-emerald-100/80">Laporan diverifikasi dengan foto asli dari kamera.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <TrendingUp size={18} className="text-emerald-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white">2. Transaksi Bank Sampah</p>
                      <p className="text-xs text-emerald-100/80">Konversi sampah bernilai saldo & poin reward.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <Building2 size={18} className="text-emerald-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white">3. Fasilitas Daur Ulang M-to-N</p>
                      <p className="text-xs text-emerald-100/80">Terdistribusi ke fasilitas daur ulang terpadu.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Public Table Section */}
      <section id="tabel-laporan" className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-100 p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
                <ShieldCheck size={16} /> Data Transparan Masyarakat
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Daftar Laporan Publik Terbaru
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Rekapitulasi pengaduan sampah terkini dari warga dengan proteksi anonimisasi identitas.
              </p>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-200 self-start sm:self-auto"
            >
              + Kirim Laporan Baru
            </Link>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-emerald-50/60 border-b border-emerald-100 text-emerald-950 font-semibold">
                  <th className="p-4 pl-6">Tanggal Lapor</th>
                  <th className="p-4">Pelapor (Anonim)</th>
                  <th className="p-4">Jenis Sampah</th>
                  <th className="p-4">Wilayah</th>
                  <th className="p-4">Berat</th>
                  <th className="p-4 pr-6 text-center">Foto Bukti</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {laporanList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center p-10 text-slate-400">
                      Belum ada laporan sampah masuk.
                    </td>
                  </tr>
                ) : (
                  laporanList.map((item) => (
                    <tr key={item.id} className="hover:bg-emerald-50/30 transition-colors">
                      <td className="p-4 pl-6 text-slate-600 font-medium">
                        {format(item.tanggalLapor, "dd MMMM yyyy", { locale: id })}
                      </td>
                      <td className="p-4 font-semibold text-slate-800">
                        {item.user?.nama ? item.user.nama.substring(0, 3) + "***" : "Warga***"}
                      </td>
                      <td className="p-4">
                        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">
                          {item.jenisSampah?.namaJenis || "Organik"}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600 flex items-center gap-1.5">
                        <MapPin size={14} className="text-emerald-500" />
                        {item.wilayah?.namaWilayah || "Kecamatan Menteng"}
                      </td>
                      <td className="p-4 font-bold text-emerald-700">{item.berat} kg</td>
                      <td className="p-4 pr-6 text-center">
                        {item.fotoSampah ? (
                          <a
                            href={item.fotoSampah.imageUrl}
                            target="_blank"
                            rel="noreferrer"
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
      </section>

      {/* 4. Footer */}
      <footer className="border-t border-emerald-100 bg-white py-8 text-center text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-emerald-800">
            <Leaf size={16} className="text-emerald-600" /> Peduli Sampah © 2026
          </div>
          <p className="text-xs text-slate-400">
            Sistem Informasi Pengelolaan Sampah Terpadu • UTS Pemrograman Web
          </p>
        </div>
      </footer>
    </div>
  );
}
