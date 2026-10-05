"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import fs from "fs/promises";
import path from "path";

// Soal 5: Validasi Zod (Berat > 0)
const LaporanSchema = z.object({
  jenisSampahId: z.string().min(1, "Jenis sampah wajib dipilih"),
  wilayahId: z.string().min(1, "Wilayah wajib dipilih"),
  berat: z.coerce.number().positive("Berat sampah harus lebih dari 0 kg"),
});

export async function createLaporan(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    return { success: false, message: "Sesi telah berakhir, silakan login kembali." };
  }

  const data = {
    jenisSampahId: formData.get("jenisSampahId"),
    wilayahId: formData.get("wilayahId"),
    berat: formData.get("berat"),
  };

  const imageFile = formData.get("imageFile") as File;
  
  if (!imageFile || imageFile.size === 0) {
    return { success: false, errors: { imageFile: ["File foto bukti wajib diunggah"] } };
  }

  const validatedData = LaporanSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      errors: validatedData.error.flatten().fieldErrors,
    };
  }

  try {
    // Proses Upload File ke public/uploads
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Buat nama file unik
    const uniqueFilename = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filepath = path.join(uploadDir, uniqueFilename);
    
    await fs.writeFile(filepath, buffer);
    const imageUrl = `/uploads/${uniqueFilename}`;

    // Soal 4: Transaksi pembuatan laporan & foto (1-to-1)
    await prisma.$transaction(async (tx) => {
      const laporan = await tx.laporanSampah.create({
        data: {
          berat: validatedData.data.berat,
          userId: session.userId as string,
          jenisSampahId: validatedData.data.jenisSampahId,
          wilayahId: validatedData.data.wilayahId,
        },
      });

      await tx.fotoSampah.create({
        data: {
          imageUrl: imageUrl,
          laporanId: laporan.id,
        },
      });
    });
  } catch (error) {
    console.error(error);
    return { success: false, message: "Terjadi kesalahan sistem saat menyimpan laporan." };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
