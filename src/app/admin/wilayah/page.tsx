export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { revalidatePath } from "next/cache";
import { MapPin, PlusCircle, Trash2 } from "lucide-react";

async function addWilayah(formData: FormData) {
  "use server";
  const namaWilayah = (formData.get("namaWilayah") as string)?.trim();
  if (!namaWilayah) return;
  try {
    await prisma.wilayah.create({ data: { namaWilayah } });
    revalidatePath("/admin/wilayah");
  } catch (error) {
    console.error("Gagal menambah wilayah:", error);
  }
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
  let wilayah: any[] = [];
  try {
    wilayah = await prisma.wilayah.findMany({
      include: { _count: { select: { laporanSampah: true, transaksiSampah: true } } },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("Database offline, using fallback wilayah");
    wilayah = [
      { id: "w-1", namaWilayah: "Kecamatan Menteng", createdAt: new Date(), _count: { laporanSampah: 7, transaksiSampah: 4 } },
      { id: "w-2", namaWilayah: "Kecamatan Kebayoran Baru", createdAt: new Date(), _count: { laporanSampah: 4, transaksiSampah: 3 } },
      { id: "w-3", namaWilayah: "Kecamatan Cilandak", createdAt: new Date(), _count: { laporanSampah: 3, transaksiSampah: 2 } },
    ];
  }

  return (
    <div className="space-y-8 text-slate-800">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <div className="p-2.5 bg-teal-100 text-teal-700 rounded-2xl">
            <MapPin size={26} />
          </div>
          Manajemen Wilayah & Kecamatan
        </h1>
        <p className="text-slate-500 mt-1">
          Kelola daftar wilayah atau kecamatan yang tercakup dalam layanan kebersihan dan penjemputan sampah.
        </p>
      </div>

      {/* Form Tambah */}
      <div className="bg-white rounded-3xl border border-teal-100 p-6 sm:p-8 shadow-sm max-w-2xl">
        <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <PlusCircle size={20} className="text-teal-600" /> Tambah Wilayah Baru
        </h2>
        <form action={addWilayah} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            name="namaWilayah"
            placeholder="Nama Wilayah (Contoh: Kecamatan Tebet)"
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
        <h2 className="text-xl font-bold text-slate-900 mb-4">Daftar Wilayah Tercakup</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse text-sm text-slate-700">
            <thead>
              <tr className="bg-teal-50/60 border-b border-teal-100 text-teal-950 font-semibold">
                <th className="py-4 px-5 pl-6">Nama Wilayah</th>
                <th className="py-4 px-5">Total Laporan</th>
                <th className="py-4 px-5">Total Transaksi</th>
                <th className="py-4 px-5">Tanggal Didaftarkan</th>
                <th className="py-4 px-5 pr-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {wilayah.map((item) => (
                <tr key={item.id} className="hover:bg-teal-50/30 transition-colors">
                  <td className="py-4 px-5 pl-6 font-bold text-slate-900 flex items-center gap-2">
                    <MapPin size={16} className="text-teal-600" /> {item.namaWilayah}
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
                    <form action={deleteWilayah}>
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
