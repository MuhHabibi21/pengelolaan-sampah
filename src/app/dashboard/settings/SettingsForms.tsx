"use client";

import { useActionState } from "react";
import { updateProfile, updatePassword } from "@/app/actions/user";
import { User, Phone, Lock, Save, KeyRound, Loader2 } from "lucide-react";

export default function SettingsForms({ user }: { user: any }) {
  const [profileState, profileAction, isProfilePending] = useActionState(updateProfile, null);
  const [passwordState, passwordAction, isPasswordPending] = useActionState(updatePassword, null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 1. Form Edit Informasi Profil */}
      <div className="bg-white p-7 sm:p-8 rounded-3xl border border-emerald-100 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
              <User size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Informasi Pribadi</h2>
              <p className="text-slate-500 text-xs">Perbarui nama lengkap dan nomor telepon kontak Anda.</p>
            </div>
          </div>

          <form action={profileAction} className="space-y-4 text-slate-800">
            {profileState?.message && (
              <div
                className={`p-3.5 rounded-2xl text-xs font-semibold ${
                  profileState.success
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : "bg-red-100 text-red-800 border border-red-200"
                }`}
              >
                {profileState.message}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama"
                defaultValue={user.nama}
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                Nomor Handphone (WhatsApp)
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="noHp"
                  defaultValue={user.noHp}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                Email Terdaftar (Permanen)
              </label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                Nomor Induk Kependudukan (NIK)
              </label>
              <input
                type="text"
                disabled
                value={user.nik}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-500 text-sm cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={isProfilePending}
              className="w-full py-3.5 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm cursor-pointer"
            >
              {isProfilePending ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Menyimpan Perubahan...
                </>
              ) : (
                <>
                  <Save size={16} /> Simpan Perubahan Profil
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* 2. Form Ganti Password */}
      <div className="bg-white p-7 sm:p-8 rounded-3xl border border-emerald-100 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-teal-100 text-teal-700 rounded-2xl">
              <KeyRound size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Keamanan & Sandi</h2>
              <p className="text-slate-500 text-xs">Perbarui kata sandi akun Anda secara berkala.</p>
            </div>
          </div>

          <form action={passwordAction} className="space-y-4 text-slate-800">
            {passwordState?.message && (
              <div
                className={`p-3.5 rounded-2xl text-xs font-semibold ${
                  passwordState.success
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : "bg-red-100 text-red-800 border border-red-200"
                }`}
              >
                {passwordState.message}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                Password Saat Ini
              </label>
              <input
                type="password"
                name="currentPassword"
                placeholder="Masukkan password lama..."
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                Password Baru
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="Minimal 6 karakter..."
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Ulangi password baru..."
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isPasswordPending}
              className="w-full py-3.5 mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm cursor-pointer"
            >
              {isPasswordPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Mengganti Sandi...
                </>
              ) : (
                <>
                  <Lock size={16} /> Ganti Kata Sandi
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
