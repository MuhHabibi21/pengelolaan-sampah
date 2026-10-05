import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Mulai seeding data dasar...");

  // Seed Wilayah
  const wilayah1 = await prisma.wilayah.upsert({
    where: { namaWilayah: "Kecamatan Menteng" },
    update: {},
    create: { namaWilayah: "Kecamatan Menteng" },
  });
  const wilayah2 = await prisma.wilayah.upsert({
    where: { namaWilayah: "Kecamatan Kebayoran Baru" },
    update: {},
    create: { namaWilayah: "Kecamatan Kebayoran Baru" },
  });
  const wilayah3 = await prisma.wilayah.upsert({
    where: { namaWilayah: "Kecamatan Cilandak" },
    update: {},
    create: { namaWilayah: "Kecamatan Cilandak" },
  });

  // Seed Jenis Sampah
  const jenis1 = await prisma.jenisSampah.upsert({
    where: { namaJenis: "Organik" },
    update: {},
    create: { namaJenis: "Organik" },
  });
  const jenis2 = await prisma.jenisSampah.upsert({
    where: { namaJenis: "Anorganik" },
    update: {},
    create: { namaJenis: "Anorganik" },
  });
  const jenis3 = await prisma.jenisSampah.upsert({
    where: { namaJenis: "B3 (Bahan Berbahaya)" },
    update: {},
    create: { namaJenis: "B3 (Bahan Berbahaya)" },
  });

  // Seed User
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      nama: "Budi Santoso",
      email: "user@example.com",
      noHp: "081234567890",
      nik: "3171234567890001",
      password: "password123", // Di real app, gunakan bcrypt
      role: "USER",
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      nama: "Admin Pengelola",
      email: "admin@example.com",
      noHp: "081234567891",
      nik: "3171234567890002",
      password: "password123",
      role: "ADMIN",
    },
  });

  console.log("Seeding selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
