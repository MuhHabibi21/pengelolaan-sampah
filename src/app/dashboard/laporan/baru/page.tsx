import FormLaporan from "@/components/FormLaporan";
import { prisma } from "@/lib/prisma";

export default async function BuatLaporanPage() {
  const jenisSampah = await prisma.jenisSampah.findMany();
  const wilayah = await prisma.wilayah.findMany();
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">Kirim Laporan Sampah Baru</h1>
      <p className="text-emerald-700 dark:text-emerald-400 max-w-2xl">Silakan isi formulir di bawah ini dengan akurat. Pastikan berat lebih dari 0 Kg dan lengkapi foto bukti fisik dari perangkat Anda.</p>
      
      <FormLaporan jenisSampah={jenisSampah} wilayah={wilayah} />
    </div>
  );
}
