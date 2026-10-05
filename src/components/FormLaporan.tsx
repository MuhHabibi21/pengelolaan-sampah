"use client";

import { useActionState } from "react";
import { createLaporan } from "@/app/actions/laporan";
import { Leaf, MapPin, Scale, Image as ImageIcon } from "lucide-react";

export default function FormLaporan({ 
  jenisSampah, 
  wilayah
}: { 
  jenisSampah: any[]; 
  wilayah: any[]; 
}) {
  const [state, formAction, isPending] = useActionState(createLaporan, null);

  return (
    <form action={formAction} className="space-y-6 max-w-2xl bg-white dark:bg-emerald-900/40 p-8 rounded-3xl shadow-sm border border-emerald-100 dark:border-emerald-800">
      
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
          <Leaf className="w-4 h-4" /> Jenis Sampah
        </label>
        <select name="jenisSampahId" className="w-full px-4 py-3 rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/50 focus:ring-2 focus:ring-emerald-500 outline-none">
          <option value="">Pilih Jenis Sampah...</option>
          {jenisSampah.map(js => (
            <option key={js.id} value={js.id}>{js.namaJenis}</option>
          ))}
        </select>
        {state?.errors?.jenisSampahId && <p className="text-red-500 text-sm mt-1">{state.errors.jenisSampahId[0]}</p>}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
          <MapPin className="w-4 h-4" /> Wilayah Pengangkutan
        </label>
        <select name="wilayahId" className="w-full px-4 py-3 rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/50 focus:ring-2 focus:ring-emerald-500 outline-none">
          <option value="">Pilih Wilayah...</option>
          {wilayah.map(w => (
            <option key={w.id} value={w.id}>{w.namaWilayah}</option>
          ))}
        </select>
        {state?.errors?.wilayahId && <p className="text-red-500 text-sm mt-1">{state.errors.wilayahId[0]}</p>}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
          <Scale className="w-4 h-4" /> Berat Sampah (Kg)
        </label>
        <input type="number" step="0.1" name="berat" placeholder="Misal: 2.5 (Berat > 0)" className="w-full px-4 py-3 rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/50 focus:ring-2 focus:ring-emerald-500 outline-none" />
        {state?.errors?.berat && <p className="text-red-500 text-sm mt-1">{state.errors.berat[0]}</p>}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
          <ImageIcon className="w-4 h-4" /> Upload Bukti Foto
        </label>
        <input type="file" accept="image/*" name="imageFile" className="w-full px-4 py-3 rounded-xl border border-emerald-200 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/50 focus:ring-2 focus:ring-emerald-500 outline-none" />
        {state?.errors?.imageFile && <p className="text-red-500 text-sm mt-1">{state.errors.imageFile[0]}</p>}
      </div>
      
      {state?.message && <p className="text-red-500 font-medium">{state.message}</p>}

      <button disabled={isPending} type="submit" className="w-full px-6 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-md disabled:opacity-50">
        {isPending ? "Mengunggah & Menyimpan..." : "Kirim Laporan"}
      </button>

    </form>
  );
}
