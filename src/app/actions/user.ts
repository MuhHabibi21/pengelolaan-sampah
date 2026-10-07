"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateProfile(prevState: any, formData: FormData) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return { message: "Anda harus login terlebih dahulu" };
    }

    const nama = (formData.get("nama") as string)?.trim();
    const noHp = (formData.get("noHp") as string)?.trim();

    if (!nama || !noHp) {
      return { message: "Nama dan Nomor HP tidak boleh kosong." };
    }

    // Cek apakah noHp sudah digunakan user lain
    const existingNoHp = await prisma.user.findFirst({
      where: {
        noHp,
        NOT: { id: session.userId as string },
      },
    });

    if (existingNoHp) {
      return { message: "Nomor HP sudah terdaftar pada akun lain." };
    }

    await prisma.user.update({
      where: { id: session.userId as string },
      data: { nama, noHp },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/settings");
    return { success: true, message: "Profil berhasil diperbarui!" };
  } catch (error) {
    console.error("Gagal update profil:", error);
    return { message: "Terjadi kesalahan saat menyimpan perubahan profil." };
  }
}

export async function updatePassword(prevState: any, formData: FormData) {
  try {
    const session = await getSession();
    if (!session?.userId) {
      return { message: "Anda harus login terlebih dahulu" };
    }

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return { message: "Semua kolom password wajib diisi." };
    }

    if (newPassword.length < 6) {
      return { message: "Password baru minimal 6 karakter." };
    }

    if (newPassword !== confirmPassword) {
      return { message: "Konfirmasi password baru tidak cocok." };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId as string },
    });

    if (!user) {
      return { message: "User tidak ditemukan." };
    }

    // Verifikasi password lama
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return { message: "Password saat ini salah." };
    }

    // Hash password baru
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    revalidatePath("/dashboard/settings");
    return { success: true, message: "Password berhasil diganti!" };
  } catch (error) {
    console.error("Gagal update password:", error);
    return { message: "Terjadi kesalahan saat mengganti password." };
  }
}
