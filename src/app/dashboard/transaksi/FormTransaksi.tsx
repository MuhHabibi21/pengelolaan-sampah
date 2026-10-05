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

  // Perkiraan tarif
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
    <form action={formAction} className="space-y-4">
      {state?.message && (
        <div
          className={`p-3 rounded-xl text-sm font-medium ${
            state.success
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
              : "bg-red-500/20 text-red-300 border border-red-500/30"
          }`}
        >
          {state.message}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
          Kategori Sampah
        </label>
        <select
          name="jenisSampahId"
          required
          value={selectedJenis}
          onChange={(e) => setSelectedJenis(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white outline-none focus:border-emerald-500 transition-colors"
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
        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
          Wilayah Penjemputan / Setor
        </label>
        <select
          name="wilayahId"
          required
          className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white outline-none focus:border-emerald-500 transition-colors"
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
        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
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
          className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
          Catatan / Alamat Detail (Opsional)
        </label>
        <textarea
          name="catatan"
          rows={2}
          placeholder="Catatan penjemputan atau kondisi sampah..."
          className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white outline-none focus:border-emerald-500 transition-colors text-sm"
        ></textarea>
      </div>

      {/* Live Preview Estimasi */}
      {beratNum > 0 && (
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs space-y-1">
          <div className="flex justify-between text-slate-300">
            <span>Estimasi Nilai Tukar:</span>
            <span className="font-bold text-emerald-400">
              Rp {estimasiHarga.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Estimasi Poin Reward:</span>
            <span className="font-bold text-teal-400">+{estimasiPoin} Poin</span>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Memproses Transaksi...
          </>
        ) : (
          <>
            <PlusCircle size={18} /> Ajukan Transaksi Setor
          </>
        )}
      </button>
    </form>
  );
}
