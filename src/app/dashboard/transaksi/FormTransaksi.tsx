"use client";

import { useActionState, useState } from "react";
import { createTransaksi } from "@/app/actions/transaksi";
import { PlusCircle, Loader2 } from "lucide-react";

export default function FormTransaksi({
  jenisList,
  wilayahList,
}: {
  jenisList: any[];
  wilayahList: any[];
}) {
  const [state, formAction, isPending] = useActionState(createTransaksi, null);
  const [berat, setBerat] = useState<string>("");
  const [selectedJenis, setSelectedJenis] = useState<string>("");

  const getTarif = () => {
    const selected = jenisList.find((j) => j.id === selectedJenis);
    if (!selected) return 2000;
    const name = selected.namaJenis.toLowerCase();
    if (name.includes("organik")) return 1500;
    if (name.includes("anorganik")) return 3000;
    if (name.includes("b3") || name.includes("berbahaya")) return 5000;
    return 2000;
  };

  const beratNum = parseFloat(berat) || 0;
  const estimasiHarga = beratNum * getTarif();
  const estimasiPoin = Math.floor(beratNum * 10);

  return (
    <form action={formAction} className="space-y-4 text-slate-800">
      {state?.message && (
        <div
          className={`p-3.5 rounded-2xl text-xs font-semibold ${
            state.success
              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {state.message}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
          Kategori Sampah
        </label>
        <select
          name="jenisSampahId"
          required
          value={selectedJenis}
          onChange={(e) => setSelectedJenis(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
        >
          <option value="">-- Pilih Jenis Sampah --</option>
          {jenisList.map((j) => (
            <option key={j.id} value={j.id}>
              {j.namaJenis}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
          Wilayah Penjemputan / Setor
        </label>
        <select
          name="wilayahId"
          required
          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
        >
          <option value="">-- Pilih Wilayah --</option>
          {wilayahList.map((w) => (
            <option key={w.id} value={w.id}>
              {w.namaWilayah}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
          Berat Sampah (Kilogram)
        </label>
        <input
          type="number"
          step="0.1"
          name="berat"
          min="0.1"
          required
          value={berat}
          onChange={(e) => setBerat(e.target.value)}
          placeholder="Contoh: 3.5"
          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
          Catatan / Alamat Detail (Opsional)
        </label>
        <textarea
          name="catatan"
          rows={2}
          placeholder="Catatan penjemputan atau kondisi sampah..."
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-sm"
        ></textarea>
      </div>

      {/* Live Preview Estimasi */}
      {beratNum > 0 && (
        <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-100 text-xs space-y-1.5">
          <div className="flex justify-between text-slate-600">
            <span>Estimasi Nilai Tukar:</span>
            <span className="font-extrabold text-emerald-700 text-sm">
              Rp {estimasiHarga.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Estimasi Poin Reward:</span>
            <span className="font-extrabold text-teal-700 text-sm">+{estimasiPoin} Poin</span>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm cursor-pointer"
      >
        {isPending ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Memproses Transaksi...
          </>
        ) : (
          <>
            <PlusCircle size={16} /> Ajukan Transaksi Setor
          </>
        )}
      </button>
    </form>
  );
}
