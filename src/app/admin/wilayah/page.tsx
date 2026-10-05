import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { revalidatePath } from "next/cache";

async function addWilayah(formData: FormData) {
  "use server";
  const namaWilayah = formData.get("namaWilayah") as string;
  if (!namaWilayah) return;
  try {
    await prisma.wilayah.create({ data: { namaWilayah } });
    revalidatePath("/admin/wilayah");
  } catch (error) {}
}

async function deleteWilayah(formData: FormData) {
  "use server";
  const deleteId = formData.get("id") as string;
  try {
    await prisma.wilayah.delete({ where: { id: deleteId } });
    revalidatePath("/admin/wilayah");
  } catch (error) {
    console.error("Gagal menghapus, mungkin terikat laporan.");
  }
}

export default async function AdminWilayahPage() {
  const wilayah = await prisma.wilayah.findMany({
    include: { _count: { select: { laporanSampah: true } } }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Manajemen Wilayah</h1>
          <p className="text-slate-600 dark:text-slate-400">Kelola daftar wilayah yang tersedia di sistem pelaporan.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm max-w-xl">
        <h3 className="font-bold mb-4">Tambah Wilayah Baru</h3>
        <form action={addWilayah} className="flex gap-4">
          <input type="text" name="namaWilayah" placeholder="Nama Wilayah (Misal: Kelurahan Tebet)" required className="flex-1 px-4 py-2 border rounded-xl dark:bg-slate-950 dark:border-slate-800" />
          <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700">Tambah</button>
        </form>
      </div>
      
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Nama Wilayah</th>
              <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Total Digunakan</th>
              <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Dibuat Pada</th>
              <th className="p-4 font-semibold text-slate-700 dark:text-slate-300 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {wilayah.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-4 font-medium text-slate-800 dark:text-slate-200">{item.namaWilayah}</td>
                <td className="p-4 text-slate-600 dark:text-slate-400">{item._count.laporanSampah} Laporan</td>
                <td className="p-4 text-slate-600 dark:text-slate-400">{format(item.createdAt, "dd MMM yyyy", { locale: id })}</td>
                <td className="p-4 text-center">
                  <form action={deleteWilayah}>
                    <input type="hidden" name="id" value={item.id} />
                    <button type="submit" className="text-sm px-3 py-1 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg font-medium transition-colors">Hapus</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
