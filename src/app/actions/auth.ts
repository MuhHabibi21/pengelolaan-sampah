"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

const LoginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

const RegisterSchema = z.object({
  nama: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  noHp: z.string().min(10, "No HP tidak valid"),
  nik: z.string().min(16, "NIK harus minimal 16 karakter"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export async function login(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const validated = LoginSchema.safeParse(data);

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const user = await prisma.user.findUnique({ where: { email: validated.data.email } });
  
  if (!user || !(await bcrypt.compare(validated.data.password, user.password))) {
    return { message: "Email atau password salah." };
  }

  await createSession(user.id, user.role);

  if (user.role === "ADMIN") {
    redirect("/admin");
  } else {
    redirect("/dashboard");
  }
}

export async function register(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const validated = RegisterSchema.safeParse(data);

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: validated.data.email },
        { noHp: validated.data.noHp },
        { nik: validated.data.nik },
      ]
    }
  });

  if (existingUser) {
    return { message: "Email, No HP, atau NIK sudah terdaftar." };
  }

  const hashedPassword = await bcrypt.hash(validated.data.password, 10);

  const newUser = await prisma.user.create({
    data: {
      nama: validated.data.nama,
      email: validated.data.email,
      noHp: validated.data.noHp,
      nik: validated.data.nik,
      password: hashedPassword,
      role: "USER"
    }
  });

  await createSession(newUser.id, newUser.role);
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
