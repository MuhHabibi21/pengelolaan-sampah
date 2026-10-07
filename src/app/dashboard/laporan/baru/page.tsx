import FormLaporan from "@/components/FormLaporan";
import { prisma } from "@/lib/prisma";
import { PlusCircle } from "lucide-react";

export default async function BuatLaporanPage() {
  const jenisSampah = await prisma.jenisSampah.findMany({ orderBy: { namaJenis: "asc" } });
  const wilayah = await prisma.wilayah.findMany({ orderBy: { namaWilayah: "asc" } });

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
