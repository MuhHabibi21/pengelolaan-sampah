import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { revalidatePath } from "next/cache";
import { Database, PlusCircle, Trash2 } from "lucide-react";

async function addJenisSampah(formData: FormData) {
  "use server";
  const namaJenis = (formData.get("namaJenis") as string)?.trim();
  if (!namaJenis) return;
  try {
    await prisma.jenisSampah.create({ data: { namaJenis } });
    revalidatePath("/admin/jenis-sampah");
  } catch (error) {
    console.error("Gagal menambah jenis sampah:", error);
  }
}

async function deleteJenisSampah(formData: FormData) {
  "use server";
  const deleteId = formData.get("id") as string;
  try {
    await prisma.jenisSampah.delete({ where: { id: deleteId } });
    revalidatePath("/admin/jenis-sampah");
  } catch (error) {
    console.error("Gagal menghapus, mungkin terikat laporan.");
  }
}

export default async function AdminJenisSampahPage() {
  const jenisSampah = await prisma.jenisSampah.findMany({
    include: { _count: { select: { laporanSampah: true, transaksiSampah: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 text-slate-800">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <div className="p-2.5 bg-teal-100 text-teal-700 rounded-2xl">
            <Database size={26} />
          </div>
          Manajemen Kategori Jenis Sampah
        </h1>
        <p className="text-slate-500 mt-1">
          Kelola daftar kategori jenis sampah yang dapat dipilih warga saat lapor atau setor sampah.
        </p>
      </div>

      {/* Form Tambah */}
      <div className="bg-white rounded-3xl border border-teal-100 p-6 sm:p-8 shadow-sm max-w-2xl">
        <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <PlusCircle size={20} className="text-teal-600" /> Tambah Kategori Baru
        </h2>
        <form action={addJenisSampah} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            name="namaJenis"
            placeholder="Nama Kategori (Contoh: Limbah Elektronik)"
            required
            className="flex-1 px-4 py-3 border border-slate-200 bg-slate-50 rounded-xl text-sm text-slate-800 focus:ring-2 focus:ring-teal-100 focus:border-teal-500 outline-none transition-all"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <PlusCircle size={16} /> Tambahkan
          </button>
        </form>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-teal-100 shadow-sm p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Daftar Kategori Tersedia</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse text-sm text-slate-700">
            <thead>
              <tr className="bg-teal-50/60 border-b border-teal-100 text-teal-950 font-semibold">
                <th className="py-4 px-5 pl-6">Nama Kategori</th>
                <th className="py-4 px-5">Penggunaan Laporan</th>
                <th className="py-4 px-5">Penggunaan Transaksi</th>
                <th className="py-4 px-5">Tanggal Dibuat</th>
                <th className="py-4 px-5 pr-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jenisSampah.map((item) => (
                <tr key={item.id} className="hover:bg-teal-50/30 transition-colors">
                  <td className="py-4 px-5 pl-6 font-bold text-slate-900">
                    <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-lg text-xs font-bold">
                      {item.namaJenis}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-slate-600 font-medium">
                    {item._count.laporanSampah} Laporan
                  </td>
                  <td className="py-4 px-5 text-slate-600 font-medium">
                    {item._count.transaksiSampah} Transaksi
                  </td>
                  <td className="py-4 px-5 text-slate-500 text-xs">
                    {format(item.createdAt, "dd MMMM yyyy", { locale: id })}
                  </td>
                  <td className="py-4 px-5 pr-6 text-center">
                    <form action={deleteJenisSampah}>
                      <input type="hidden" name="id" value={item.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-bold transition-colors cursor-pointer"
                      >
                        <Trash2 size={13} /> Hapus
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
