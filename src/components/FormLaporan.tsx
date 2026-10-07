"use client";

import { useActionState } from "react";
import { createLaporan } from "@/app/actions/laporan";
import { Leaf, MapPin, Scale, Image as ImageIcon, Send, Loader2 } from "lucide-react";

export default function FormLaporan({
  jenisSampah,
  wilayah,
}: {
  jenisSampah: any[];
  wilayah: any[];
}) {
  const [state, formAction, isPending] = useActionState(createLaporan, null);

  return (
    <form
      action={formAction}
      className="space-y-6 max-w-2xl bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-emerald-100 text-slate-800"
    >
      {state?.message && (
        <div className="p-4 rounded-2xl bg-red-100 border border-red-200 text-red-800 text-sm font-semibold">
          {state.message}
        </div>
      )}

      <div>
        <label className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase mb-2">
          <Leaf className="w-4 h-4 text-emerald-600" /> Kategori Jenis Sampah
        </label>
        <select
          name="jenisSampahId"
          required
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none text-sm transition-all"
        >
          <option value="">Pilih Jenis Sampah...</option>
          {jenisSampah.map((js) => (
            <option key={js.id} value={js.id}>
              {js.namaJenis}
            </option>
          ))}
        </select>
        {state?.errors?.jenisSampahId && (
          <p className="text-red-500 text-xs mt-1 font-medium">{state.errors.jenisSampahId[0]}</p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase mb-2">
          <MapPin className="w-4 h-4 text-emerald-600" /> Wilayah / Lokasi Penemuan
        </label>
        <select
          name="wilayahId"
          required
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none text-sm transition-all"
        >
          <option value="">Pilih Wilayah...</option>
          {wilayah.map((w) => (
            <option key={w.id} value={w.id}>
              {w.namaWilayah}
            </option>
          ))}
        </select>
        {state?.errors?.wilayahId && (
          <p className="text-red-500 text-xs mt-1 font-medium">{state.errors.wilayahId[0]}</p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase mb-2">
          <Scale className="w-4 h-4 text-emerald-600" /> Perkiraan Berat Sampah (Kilogram)
        </label>
        <input
          type="number"
          step="0.1"
          name="berat"
          min="0.1"
          required
          placeholder="Misal: 2.5 (Berat > 0)"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none text-sm transition-all"
        />
        {state?.errors?.berat && (
          <p className="text-red-500 text-xs mt-1 font-medium">{state.errors.berat[0]}</p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase mb-2">
          <ImageIcon className="w-4 h-4 text-emerald-600" /> Upload Foto Bukti Fisik
        </label>
        <input
          type="file"
          accept="image/*"
          name="imageFile"
          required
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 focus:ring-2 focus:ring-emerald-100 focus:border-emerald-500 outline-none text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 transition-all cursor-pointer"
        />
        {state?.errors?.imageFile && (
          <p className="text-red-500 text-xs mt-1 font-medium">{state.errors.imageFile[0]}</p>
        )}
      </div>

      <button
        disabled={isPending}
        type="submit"
        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm cursor-pointer"
      >
        {isPending ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Mengunggah & Menyimpan...
          </>
        ) : (
          <>
            <Send size={16} /> Kirim Laporan Sekarang
          </>
        )}
      </button>
    </form>
  );
}
