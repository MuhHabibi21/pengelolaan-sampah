import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { revalidatePath } from "next/cache";
import { Users, Shield, User, Phone, Mail, IdCard } from "lucide-react";

async function toggleRole(formData: FormData) {
  "use server";
  const userId = formData.get("id") as string;
  const currentRole = formData.get("role") as string;
  const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole as any },
    });
    revalidatePath("/admin/users");
  } catch (error) {
    console.error("Gagal mengubah role user:", error);
  }
}

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          laporanSampah: true,
          transaksiSampah: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const totalAdmin = users.filter((u) => u.role === "ADMIN").length;
  const totalWarga = users.filter((u) => u.role === "USER").length;

  return (
    <div className="space-y-8 text-slate-800">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <div className="p-2.5 bg-teal-100 text-teal-700 rounded-2xl">
            <Users size={26} />
          </div>
          Kelola Pengguna Sistem
        </h1>
        <p className="text-slate-500 mt-1">
          Daftar seluruh akun warga dan pengelola sistem yang terdaftar di database Peduli Sampah.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-teal-100 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Akun Terdaftar</p>
          <p className="text-3xl font-black text-slate-800 mt-2">{users.length} <span className="text-sm font-normal text-slate-400">Akun</span></p>
        </div>
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Masyarakat / Warga</p>
          <p className="text-3xl font-black text-emerald-700 mt-2">{totalWarga} <span className="text-sm font-normal text-slate-400">Warga</span></p>
        </div>
        <div className="bg-white border border-teal-100 rounded-2xl p-6 shadow-sm">
          <p className="text-xs font-bold text-teal-600 uppercase tracking-wider">Pengelola / Admin</p>
          <p className="text-3xl font-black text-teal-700 mt-2">{totalAdmin} <span className="text-sm font-normal text-slate-400">Admin</span></p>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-teal-100 shadow-sm p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Daftar Seluruh Pengguna</h2>
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse text-sm text-slate-700">
            <thead>
              <tr className="bg-teal-50/60 border-b border-teal-100 text-teal-950 font-semibold">
                <th className="py-4 px-5 pl-6">Pengguna</th>
                <th className="py-4 px-5">Kontak & NIK</th>
                <th className="py-4 px-5">Hak Akses (Role)</th>
                <th className="py-4 px-5">Aktivitas</th>
                <th className="py-4 px-5">Tanggal Daftar</th>
                <th className="py-4 px-5 pr-6 text-center">Aksi Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-teal-50/30 transition-colors">
                  <td className="py-4 px-5 pl-6">
                    <p className="font-bold text-slate-900 flex items-center gap-2">
                      <User size={16} className="text-teal-600" /> {u.nama}
                    </p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Mail size={12} /> {u.email}
                    </p>
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <Phone size={12} className="text-slate-400" /> {u.noHp}
                    </p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <IdCard size={12} /> NIK: {u.nik}
                    </p>
                  </td>
                  <td className="py-4 px-5">
                    {u.role === "ADMIN" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
                        <Shield size={12} /> ADMIN
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                        <User size={12} /> WARGA (USER)
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5">
                    <p className="text-xs text-slate-600 font-semibold">{u._count.laporanSampah} Laporan</p>
                    <p className="text-xs text-teal-700 font-bold">{u._count.transaksiSampah} Transaksi</p>
                  </td>
                  <td className="py-4 px-5 text-slate-500 text-xs">
                    {format(u.createdAt, "dd MMM yyyy", { locale: id })}
                  </td>
                  <td className="py-4 px-5 pr-6 text-center">
                    <form action={toggleRole}>
                      <input type="hidden" name="id" value={u.id} />
                      <input type="hidden" name="role" value={u.role} />
                      <button
                        type="submit"
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                          u.role === "ADMIN"
                            ? "bg-amber-100 hover:bg-amber-200 text-amber-800"
                            : "bg-teal-100 hover:bg-teal-200 text-teal-800"
                        }`}
                      >
                        {u.role === "ADMIN" ? "Ubah jadi Warga" : "Jadikan Admin"}
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
