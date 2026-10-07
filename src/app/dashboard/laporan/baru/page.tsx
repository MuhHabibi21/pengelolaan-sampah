export const dynamic = "force-dynamic";
import FormLaporan from "@/components/FormLaporan";
import { prisma } from "@/lib/prisma";
import { PlusCircle } from "lucide-react";

export default async function BuatLaporanPage() {
  let jenisSampah: any[] = [];
  let wilayah: any[] = [];

  try {
    const [dbJenis, dbWilayah] = await Promise.all([
      prisma.jenisSampah.findMany({ orderBy: { namaJenis: "asc" } }),
      prisma.wilayah.findMany({ orderBy: { namaWilayah: "asc" } }),
    ]);
    jenisSampah = dbJenis;
    wilayah = dbWilayah;
  } catch (error) {
    console.warn("Database offline, using fallback jenis & wilayah options");
    jenisSampah = [
      { id: "j-1", namaJenis: "Organik" },
      { id: "j-2", namaJenis: "Anorganik" },
      { id: "j-3", namaJenis: "B3 (Bahan Berbahaya)" },
    ];
    wilayah = [
      { id: "w-1", namaWilayah: "Kecamatan Menteng" },
      { id: "w-2", namaWilayah: "Kecamatan Kebayoran Baru" },
      { id: "w-3", namaWilayah: "Kecamatan Cilandak" },
    ];
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl">
            <PlusCircle size={26} />
          </div>
          Kirim Laporan Sampah Baru
        </h1>
        <p className="text-slate-500 mt-1 max-w-2xl">
          Silakan isi formulir di bawah ini dengan akurat. Pastikan berat lebih dari 0 Kg dan sertakan foto bukti autentik dari perangkat Anda.
        </p>
      </div>

      <FormLaporan jenisSampah={jenisSampah} wilayah={wilayah} />
    </div>
  );
}
