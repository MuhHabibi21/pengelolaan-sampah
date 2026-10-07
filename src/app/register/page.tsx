"use client";

import { useActionState } from "react";
import { register } from "@/app/actions/auth";
import Link from "next/link";
import Image from "next/image";
import { User, Mail, Phone, CreditCard, Lock, ArrowRight, Loader2, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(register, null);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 py-12 font-sans text-slate-800">
      {/* Background Glow Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-300/30 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-300/30 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-2xl relative z-10 my-4">
        <div className="bg-white/95 backdrop-blur-xl border border-emerald-100 p-8 sm:p-12 rounded-3xl shadow-2xl shadow-emerald-900/10">
          {/* Logo Header */}
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-emerald-500/20 border-2 border-emerald-500/20 mb-3 group-hover:scale-105 transition-transform">
                <Image src="/logo.jpg" alt="Logo Peduli Sampah" width={64} height={64} className="object-cover" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Daftar Akun<span className="text-emerald-600"> Warga</span>
              </h2>
            </Link>
            <p className="text-center text-slate-500 text-xs sm:text-sm mt-1 max-w-md">
              Bergabunglah bersama kami untuk menciptakan lingkungan yang lebih bersih, asri, dan terkelola dengan baik.
            </p>
          </div>

          <form action={formAction} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Nama Lengkap
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="nama"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm"
                  placeholder="Misal: Budi Santoso"
                />
              </div>
              {state?.errors?.nama && (
                <p className="text-red-500 text-xs font-semibold">{state.errors.nama[0]}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Alamat Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm"
                    placeholder="nama@email.com"
                  />
                </div>
                {state?.errors?.email && (
                  <p className="text-red-500 text-xs font-semibold">{state.errors.email[0]}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Nomor Handphone (WhatsApp)
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                    <Phone size={18} />
                  </div>
                  <input
                    type="text"
                    name="noHp"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm"
                    placeholder="081234567890"
                  />
                </div>
                {state?.errors?.noHp && (
                  <p className="text-red-500 text-xs font-semibold">{state.errors.noHp[0]}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Nomor Induk Kependudukan (NIK)
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                    <CreditCard size={18} />
                  </div>
                  <input
                    type="text"
                    name="nik"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm"
                    placeholder="16 Digit Angka NIK"
                  />
                </div>
                {state?.errors?.nik && (
                  <p className="text-red-500 text-xs font-semibold">{state.errors.nik[0]}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Kata Sandi
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-sm"
                    placeholder="Minimal 6 karakter"
                  />
                </div>
                {state?.errors?.password && (
                  <p className="text-red-500 text-xs font-semibold">{state.errors.password[0]}</p>
                )}
              </div>
            </div>

            {state?.message && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 font-semibold text-center text-xs">{state.message}</p>
              </div>
            )}

            <button
              disabled={isPending}
              type="submit"
              className="w-full py-4 mt-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md shadow-emerald-600/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed text-base cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Mendaftarkan Akun...
                </>
              ) : (
                <>
                  Daftar Sekarang <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center space-y-3">
            <p className="text-slate-600 text-xs">
              Sudah memiliki akun terdaftar?{" "}
              <Link
                href="/login"
                className="text-emerald-600 font-bold hover:text-emerald-700 hover:underline transition-colors"
              >
                Masuk di sini
              </Link>
            </p>
            <p>
              <Link
                href="/"
                className="text-slate-400 hover:text-emerald-600 text-xs transition-colors inline-flex items-center gap-1 font-medium"
              >
                <ArrowLeft size={13} /> Kembali ke Beranda
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
