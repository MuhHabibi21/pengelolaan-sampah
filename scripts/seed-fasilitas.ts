import { prisma } from "../src/lib/prisma";

async function main() {
  console.log("Seeding Fasilitas data...");

  // Ensure JenisSampah exists
  const organik = await prisma.jenisSampah.upsert({
    where: { namaJenis: "Organik" },
    update: {},
    create: { namaJenis: "Organik" }
  });
  const anorganik = await prisma.jenisSampah.upsert({
    where: { namaJenis: "Anorganik" },
    update: {},
    create: { namaJenis: "Anorganik" }
  });
  const b3 = await prisma.jenisSampah.upsert({
    where: { namaJenis: "B3 (Berbahaya)" },
    update: {},
    create: { namaJenis: "B3 (Berbahaya)" }
  });

  // Create Fasilitas 1 that accepts Organik & Anorganik
  await prisma.fasilitas.upsert({
    where: { namaFasilitas: "TPST Bantar Gebang" },
    update: {},
    create: {
      namaFasilitas: "TPST Bantar Gebang",
      lokasi: "Bekasi, Jawa Barat",
      jenisSampahDiterima: {
        connect: [{ id: organik.id }, { id: anorganik.id }]
      }
    }
  });

  // Create Fasilitas 2 that accepts Anorganik & B3
  await prisma.fasilitas.upsert({
    where: { namaFasilitas: "Fasilitas Pengolahan Limbah PPLI" },
    update: {},
    create: {
      namaFasilitas: "Fasilitas Pengolahan Limbah PPLI",
      lokasi: "Bogor, Jawa Barat",
      jenisSampahDiterima: {
        connect: [{ id: anorganik.id }, { id: b3.id }]
      }
    }
  });

  console.log("Seeding Fasilitas finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
