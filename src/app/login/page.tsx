"use client";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Leaf } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      {/* Background Ornaments */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-2000"></div>
      
      <div className="w-full max-w-md relative z-10 p-4">
        <div className="bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/20 dark:border-white/10 p-10 rounded-[2rem] shadow-2xl">
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <Leaf className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-center text-white mb-2 tracking-tight">Selamat Datang</h1>
          <p className="text-center text-emerald-100/70 mb-8 text-sm">Masuk untuk mengelola dan memantau laporan persampahan di wilayah Anda.</p>
          
          <form action={formAction} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-emerald-100/80 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-100/50 group-focus-within:text-emerald-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input type="email" name="email" required className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/10 bg-black/20 text-white placeholder-emerald-100/30 focus:bg-black/40 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" placeholder="contoh@email.com" />
              </div>
              {state?.errors?.email && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{state.errors.email[0]}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-emerald-100/80 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-100/50 group-focus-within:text-emerald-400 transition-colors">
                  <Lock size={18} />
                </div>
                <input type="password" name="password" required className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/10 bg-black/20 text-white placeholder-emerald-100/30 focus:bg-black/40 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all" placeholder="••••••••" />
              </div>
              {state?.errors?.password && <p className="text-red-400 text-xs mt-1 ml-1 font-medium">{state.errors.password[0]}</p>}
            </div>

            {state?.message && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-400 font-medium text-center text-sm">{state.message}</p>
              </div>
            )}

            <button disabled={isPending} type="submit" className="w-full py-3.5 mt-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-xl font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
              {isPending ? "Memverifikasi..." : (
                <>Masuk Sekarang <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-emerald-100/60 text-sm">
              Belum punya akun? <Link href="/register" className="text-emerald-400 font-bold hover:text-emerald-300 hover:underline transition-colors">Daftar di sini</Link>
            </p>
            <p className="mt-4">
              <Link href="/" className="text-emerald-100/40 hover:text-emerald-100/80 text-xs transition-colors flex items-center justify-center gap-1">
                ← Kembali ke Beranda
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
