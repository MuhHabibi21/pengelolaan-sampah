export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { Building2, MapPin } from "lucide-react";

export default async function FasilitasPage() {
  const fasilitas = await prisma.fasilitas.findMany({
    include: {
      jenisSampahDiterima: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <div className="p-2.5 bg-teal-100 text-teal-700 rounded-2xl">
            <Building2 size={26} />
          </div>
          Kelola Fasilitas Pengolahan
        </h1>
        <p className="text-slate-500 mt-1">
          Data fasilitas tempat pengolahan akhir dan kategori sampah yang mereka terima (Relasi Many-to-Many).
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-teal-100 shadow-sm p-6 sm:p-8">
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse text-sm text-slate-700">
            <thead>
              <tr className="bg-teal-50/60 border-b border-teal-100 text-teal-950 font-semibold">
                <th className="py-4 px-5 pl-6">Nama Fasilitas</th>
                <th className="py-4 px-5">Lokasi Pengolahan</th>
                <th className="py-4 px-5 pr-6">Jenis Sampah Diterima (N to N)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fasilitas.map((f) => (
                <tr key={f.id} className="hover:bg-teal-50/30 transition-colors">
                  <td className="py-4 px-5 pl-6 font-bold text-slate-900 flex items-center gap-2">
                    <Building2 size={16} className="text-teal-600" /> {f.namaFasilitas}
                  </td>
                  <td className="py-4 px-5 text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={14} className="text-teal-500" /> {f.lokasi}
                    </span>
                  </td>
                  <td className="py-4 px-5 pr-6">
                    <div className="flex flex-wrap gap-2">
                      {f.jenisSampahDiterima.map((js) => (
                        <span
                          key={js.id}
                          className="px-3 py-1 text-xs font-bold bg-teal-100 text-teal-800 rounded-lg border border-teal-200"
                        >
                          {js.namaJenis}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {fasilitas.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-slate-400">
                    Belum ada data fasilitas pengolahan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
