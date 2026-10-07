import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import SettingsForms from "./SettingsForms";
import { Settings, ShieldCheck, UserCheck } from "lucide-react";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId as string },
  });

  if (!user) redirect("/login");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl">
            <Settings size={26} />
          </div>
          Pengaturan Akun Warga
        </h1>
        <p className="text-slate-500 mt-1">
          Kelola data profil, nomor telepon aktif, dan keamanan kata sandi akun Peduli Sampah Anda.
        </p>
      </div>

      {/* Account Badge Info */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-6 text-white shadow-lg shadow-emerald-900/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center font-black text-2xl">
            {user.nama.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.nama}</h2>
            <p className="text-emerald-100 text-xs">{user.email} • Terdaftar sejak {new Date(user.createdAt).getFullYear()}</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/20">
          <ShieldCheck size={16} className="text-emerald-200" /> Akun Warga Terverifikasi
        </div>
      </div>

      {/* Forms Component */}
      <SettingsForms user={user} />
    </div>
  );
}
