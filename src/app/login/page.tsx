"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, ArrowRight, Loader2, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 font-sans text-slate-800">
      {/* Background Glow Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-300/30 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-teal-300/30 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 my-8">
        <div className="bg-white/95 backdrop-blur-xl border border-emerald-100 p-8 sm:p-10 rounded-3xl shadow-2xl shadow-emerald-900/10">
          {/* Logo Header */}
          <div className="flex flex-col items-center mb-6">
            <Link href="/" className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-emerald-500/20 border-2 border-emerald-500/20 mb-3 group-hover:scale-105 transition-transform">
                <Image src="/logo.jpg" alt="Logo Peduli Sampah" width={64} height={64} className="object-cover" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Peduli<span className="text-emerald-600">Sampah</span>
              </h2>
            </Link>
            <p className="text-center text-slate-500 text-xs mt-1">
              Masuk untuk mengakses layanan pelaporan & transaksi sampah
            </p>
          </div>

          <form action={formAction} className="space-y-4">
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
                  placeholder="••••••••"
                />
              </div>
              {state?.errors?.password && (
                <p className="text-red-500 text-xs font-semibold">{state.errors.password[0]}</p>
              )}
            </div>

            {state?.message && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 font-semibold text-center text-xs">{state.message}</p>
              </div>
            )}

            <button
              disabled={isPending}
              type="submit"
              className="w-full py-3.5 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md shadow-emerald-600/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed text-sm cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Memverifikasi Akun...
                </>
              ) : (
                <>
                  Masuk Sekarang <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 text-center space-y-3">
            <p className="text-slate-600 text-xs">
              Belum memiliki akun warga?{" "}
              <Link
                href="/register"
                className="text-emerald-600 font-bold hover:text-emerald-700 hover:underline transition-colors"
              >
                Daftar Akun Baru
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
