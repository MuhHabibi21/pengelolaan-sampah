"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function createTransaksi(prevState: any, formData: FormData) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return { message: "Anda harus login terlebih dahulu" };
    }

    const jenisSampahId = formData.get("jenisSampahId") as string;
    const wilayahId = formData.get("wilayahId") as string;
    const berat = parseFloat(formData.get("berat") as string);
    const catatan = (formData.get("catatan") as string) || "";

    if (!jenisSampahId || !wilayahId || isNaN(berat) || berat <= 0) {
      return { message: "Harap isi semua data dengan benar. Berat harus lebih dari 0." };
    }

    // Ambil jenis sampah untuk kalkulasi harga/poin
    const jenis = await prisma.jenisSampah.findUnique({
      where: { id: jenisSampahId },
    });

    let tarifPerKg = 2000;
    if (jenis?.namaJenis.toLowerCase().includes("organik")) {
      tarifPerKg = 1500;
    } else if (jenis?.namaJenis.toLowerCase().includes("anorganik")) {
      tarifPerKg = 3000;
    } else if (jenis?.namaJenis.toLowerCase().includes("b3") || jenis?.namaJenis.toLowerCase().includes("berbahaya")) {
      tarifPerKg = 5000;
    }

    const totalHarga = berat * tarifPerKg;
    const totalPoin = Math.floor(berat * 10); // 1 kg = 10 poin
    const kodeTransaksi = `TRX-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    await prisma.transaksiSampah.create({
      data: {
        kodeTransaksi,
        berat,
        totalHarga,
        totalPoin,
        status: "PENDING",
        catatan,
        userId: session.userId as string,
        jenisSampahId,
        wilayahId,
      },
    });

    revalidatePath("/dashboard/transaksi");
    revalidatePath("/admin/transaksi");
    return { success: true, message: "Transaksi setor sampah berhasil diajukan!" };
  } catch (error: any) {
    console.error("Gagal membuat transaksi:", error);
    return { message: "Terjadi kesalahan saat membuat transaksi." };
  }
}

export async function updateStatusTransaksi(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const status = formData.get("status") as any;

    if (!id || !status) return;

    await prisma.transaksiSampah.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/transaksi");
    revalidatePath("/dashboard/transaksi");
  } catch (error) {
    console.error("Gagal update status transaksi:", error);
  }
}
