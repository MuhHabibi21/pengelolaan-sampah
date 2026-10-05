import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Seeding data Transaksi...");

  const user = await prisma.user.findFirst({ where: { role: "USER" } });
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  const organik = await prisma.jenisSampah.findFirst({ where: { namaJenis: { contains: "Organik" } } });
  const anorganik = await prisma.jenisSampah.findFirst({ where: { namaJenis: { contains: "Anorganik" } } });
  const wilayah = await prisma.wilayah.findFirst();

  if (!user || !organik || !anorganik || !wilayah) {
    console.log("Pastikan user, jenisSampah, dan wilayah sudah tersedia.");
    return;
  }

  // Create sample transactions
  await prisma.transaksiSampah.upsert({
    where: { kodeTransaksi: "TRX-260901-101" },
    update: {},
    create: {
      kodeTransaksi: "TRX-260901-101",
      berat: 5.0,
      totalHarga: 15000,
      totalPoin: 50,
      status: "SELESAI",
      catatan: "Kardus bekas dan botol plastik bersih siap daur ulang",
      userId: user.id,
      jenisSampahId: anorganik.id,
      wilayahId: wilayah.id,
    },
  });

  await prisma.transaksiSampah.upsert({
    where: { kodeTransaksi: "TRX-260907-202" },
    update: {},
    create: {
      kodeTransaksi: "TRX-260907-202",
      berat: 8.5,
      totalHarga: 12750,
      totalPoin: 85,
      status: "DIPROSES",
      catatan: "Sisa limbah makanan rumah tangga untuk kompos",
      userId: user.id,
      jenisSampahId: organik.id,
      wilayahId: wilayah.id,
    },
  });

  await prisma.transaksiSampah.upsert({
    where: { kodeTransaksi: "TRX-260907-303" },
    update: {},
    create: {
      kodeTransaksi: "TRX-260907-303",
      berat: 3.0,
      totalHarga: 9000,
      totalPoin: 30,
      status: "PENDING",
      catatan: "Mohon jemput di depan pagar rumah nomor 12",
      userId: user.id,
      jenisSampahId: anorganik.id,
      wilayahId: wilayah.id,
    },
  });

  console.log("Seeding Transaksi berhasil!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
