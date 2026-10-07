export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, PlusCircle, MapPin, Camera } from "lucide-react";

export default async function RiwayatLaporanPage() {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  let laporan: any[] = [];
  try {
    laporan = await prisma.laporanSampah.findMany({
      where: { userId: session.userId as string },
      include: {
        jenisSampah: true,
        wilayah: true,
        fotoSampah: true,
      },
      orderBy: { tanggalLapor: "desc" },
    });
  } catch (error) {
    console.warn("Database offline, using fallback user laporan");
    laporan = [
      {
        id: "usr-lap-1",
        tanggalLapor: new Date(),
        jenisSampah: { namaJenis: "Anorganik" },
        wilayah: { namaWilayah: "Kecamatan Menteng" },
        berat: 12.0,
        fotoSampah: { imageUrl: "/logo.jpg" },
      },
      {
        id: "usr-lap-2",
        tanggalLapor: new Date(Date.now() - 86400000),
        jenisSampah: { namaJenis: "Organik" },
        wilayah: { namaWilayah: "Kecamatan Menteng" },
        berat: 3.5,
        fotoSampah: null,
      },
    ];
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl">
              <FileText size={26} />
            </div>
            Riwayat Laporan Sampah
          </h1>
          <p className="text-slate-500 mt-1">
            Daftar seluruh laporan pengaduan sampah yang telah Anda kirimkan ke sistem.
          </p>
        </div>
        <Link
          href="/dashboard/laporan/baru"
          className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md shadow-emerald-600/20 transition-all text-sm self-start sm:self-auto"
        >
          <PlusCircle size={18} /> Kirim Laporan Baru
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-8">
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse text-sm text-slate-700">
            <thead>
              <tr className="bg-emerald-50/60 border-b border-emerald-100 text-emerald-950 font-semibold">
                <th className="py-4 px-5 pl-6">Tanggal Lapor</th>
                <th className="py-4 px-5">Jenis Sampah</th>
                <th className="py-4 px-5">Wilayah Pengangkutan</th>
                <th className="py-4 px-5">Berat Sampah</th>
                <th className="py-4 px-5 pr-6 text-center">Foto Bukti</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {laporan.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <p className="text-base font-semibold text-slate-500">Belum ada riwayat laporan.</p>
                    <p className="text-xs text-slate-400 mt-1">Anda belum pernah mengirimkan laporan sampah.</p>
                  </td>
                </tr>
              ) : (
                laporan.map((item) => (
                  <tr key={item.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="py-4 px-5 pl-6 text-slate-600 font-medium">
                      {format(item.tanggalLapor, "dd MMMM yyyy", { locale: id })}
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
                    <td className="py-4 px-5 font-bold text-slate-800">
                      {item.berat} <span className="text-xs font-normal text-slate-500">kg</span>
                    </td>
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
