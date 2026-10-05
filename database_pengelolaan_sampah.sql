-- =========================================================
-- DATABASE SCHEMA & SEED DATA: PENGELOLAAN SAMPAH TERINTEGRASI
-- Platform: PostgreSQL / Next.js / Prisma ORM
-- =========================================================

-- 1. Create Enums
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');
CREATE TYPE "StatusTransaksi" AS ENUM ('PENDING', 'DIPROSES', 'SELESAI', 'DIBATALKAN');

-- 2. Create Table: User
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "noHp" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- 3. Create Table: JenisSampah
CREATE TABLE "JenisSampah" (
    "id" TEXT NOT NULL,
    "namaJenis" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JenisSampah_pkey" PRIMARY KEY ("id")
);

-- 4. Create Table: Wilayah
CREATE TABLE "Wilayah" (
    "id" TEXT NOT NULL,
    "namaWilayah" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wilayah_pkey" PRIMARY KEY ("id")
);

-- 5. Create Table: Fasilitas (Many-to-Many with JenisSampah)
CREATE TABLE "Fasilitas" (
    "id" TEXT NOT NULL,
    "namaFasilitas" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fasilitas_pkey" PRIMARY KEY ("id")
);

-- 6. Create Table: LaporanSampah (One-to-Many from User, Jenis, Wilayah)
CREATE TABLE "LaporanSampah" (
    "id" TEXT NOT NULL,
    "berat" DOUBLE PRECISION NOT NULL,
    "tanggalLapor" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "jenisSampahId" TEXT NOT NULL,
    "wilayahId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LaporanSampah_pkey" PRIMARY KEY ("id")
);

-- 7. Create Table: FotoSampah (One-to-One with LaporanSampah)
CREATE TABLE "FotoSampah" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "laporanId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FotoSampah_pkey" PRIMARY KEY ("id")
);

-- 8. Create Table: TransaksiSampah (Proses Transaksi Setor Sampah)
CREATE TABLE "TransaksiSampah" (
    "id" TEXT NOT NULL,
    "kodeTransaksi" TEXT NOT NULL,
    "berat" DOUBLE PRECISION NOT NULL,
    "totalHarga" DOUBLE PRECISION NOT NULL,
    "totalPoin" INTEGER NOT NULL,
    "status" "StatusTransaksi" NOT NULL DEFAULT 'PENDING',
    "catatan" TEXT,
    "tanggalTransaksi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "jenisSampahId" TEXT NOT NULL,
    "wilayahId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TransaksiSampah_pkey" PRIMARY KEY ("id")
);

-- 9. Create Table: _FasilitasToJenisSampah (Junction Table for M-to-N)
CREATE TABLE "_FasilitasToJenisSampah" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- =========================================================
-- UNIQUE CONSTRAINTS & INDEXES
-- =========================================================
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_noHp_key" ON "User"("noHp");
CREATE UNIQUE INDEX "User_nik_key" ON "User"("nik");
CREATE UNIQUE INDEX "JenisSampah_namaJenis_key" ON "JenisSampah"("namaJenis");
CREATE UNIQUE INDEX "Wilayah_namaWilayah_key" ON "Wilayah"("namaWilayah");
CREATE UNIQUE INDEX "Fasilitas_namaFasilitas_key" ON "Fasilitas"("namaFasilitas");
CREATE UNIQUE INDEX "FotoSampah_laporanId_key" ON "FotoSampah"("laporanId");
CREATE UNIQUE INDEX "TransaksiSampah_kodeTransaksi_key" ON "TransaksiSampah"("kodeTransaksi");
CREATE UNIQUE INDEX "_FasilitasToJenisSampah_AB_unique" ON "_FasilitasToJenisSampah"("A", "B");
CREATE INDEX "_FasilitasToJenisSampah_B_index" ON "_FasilitasToJenisSampah"("B");

-- =========================================================
-- FOREIGN KEY CONSTRAINTS (ON DELETE CASCADE / RESTRICT)
-- =========================================================
ALTER TABLE "LaporanSampah" ADD CONSTRAINT "LaporanSampah_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LaporanSampah" ADD CONSTRAINT "LaporanSampah_jenisSampahId_fkey" FOREIGN KEY ("jenisSampahId") REFERENCES "JenisSampah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "LaporanSampah" ADD CONSTRAINT "LaporanSampah_wilayahId_fkey" FOREIGN KEY ("wilayahId") REFERENCES "Wilayah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "FotoSampah" ADD CONSTRAINT "FotoSampah_laporanId_fkey" FOREIGN KEY ("laporanId") REFERENCES "LaporanSampah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "TransaksiSampah" ADD CONSTRAINT "TransaksiSampah_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TransaksiSampah" ADD CONSTRAINT "TransaksiSampah_jenisSampahId_fkey" FOREIGN KEY ("jenisSampahId") REFERENCES "JenisSampah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "TransaksiSampah" ADD CONSTRAINT "TransaksiSampah_wilayahId_fkey" FOREIGN KEY ("wilayahId") REFERENCES "Wilayah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "_FasilitasToJenisSampah" ADD CONSTRAINT "_FasilitasToJenisSampah_A_fkey" FOREIGN KEY ("A") REFERENCES "Fasilitas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "_FasilitasToJenisSampah" ADD CONSTRAINT "_FasilitasToJenisSampah_B_fkey" FOREIGN KEY ("B") REFERENCES "JenisSampah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- =========================================================
-- SEED DATA INITIALIZATION
-- =========================================================

-- Insert Master Jenis Sampah
INSERT INTO "JenisSampah" ("id", "namaJenis") VALUES
('js-001', 'Organik'),
('js-002', 'Anorganik'),
('js-003', 'B3 (Bahan Berbahaya)')
ON CONFLICT ("namaJenis") DO NOTHING;

-- Insert Master Wilayah
INSERT INTO "Wilayah" ("id", "namaWilayah") VALUES
('wil-001', 'Kecamatan Menteng'),
('wil-002', 'Kecamatan Kebayoran Baru'),
('wil-003', 'Kecamatan Sunter Muara'),
('wil-004', 'Kecamatan Koja')
ON CONFLICT ("namaWilayah") DO NOTHING;

-- Insert Master Fasilitas
INSERT INTO "Fasilitas" ("id", "namaFasilitas", "lokasi") VALUES
('fas-001', 'TPST Bantar Gebang Terpadu', 'Bekasi, Jawa Barat'),
('fas-002', 'Fasilitas Daur Ulang PPLI Enviro', 'Bogor, Jawa Barat')
ON CONFLICT ("namaFasilitas") DO NOTHING;

-- Insert M-to-M Fasilitas <-> JenisSampah
INSERT INTO "_FasilitasToJenisSampah" ("A", "B") VALUES
('fas-001', 'js-001'),
('fas-001', 'js-002'),
('fas-002', 'js-002'),
('fas-002', 'js-003')
ON CONFLICT DO NOTHING;

-- Insert Users (Password: 12345678 hashed with bcrypt)
INSERT INTO "User" ("id", "nama", "email", "noHp", "nik", "password", "role") VALUES
('usr-admin-01', 'Admin Pengelola Sampah', 'admin@example.com', '081234567891', '3171234567890002', '$2a$10$wEkgK/Q0rY2x6oI4a1fJ9.YtQv0gG6/V0zQ0jFf9s6oI4a1fJ9.Yt', 'ADMIN'),
('usr-warga-01', 'Budi Santoso', 'user@example.com', '081234567890', '3171234567890001', '$2a$10$wEkgK/Q0rY2x6oI4a1fJ9.YtQv0gG6/V0zQ0jFf9s6oI4a1fJ9.Yt', 'USER')
ON CONFLICT ("email") DO NOTHING;

-- Insert Sample Transaksi
INSERT INTO "TransaksiSampah" ("id", "kodeTransaksi", "berat", "totalHarga", "totalPoin", "status", "catatan", "userId", "jenisSampahId", "wilayahId") VALUES
('trx-001', 'TRX-260901-101', 5.0, 15000, 50, 'SELESAI', 'Kardus dan botol plastik bersih', 'usr-warga-01', 'js-002', 'wil-001'),
('trx-002', 'TRX-260907-202', 8.5, 12750, 85, 'DIPROSES', 'Sampah sisa sayuran dan buah organik', 'usr-warga-01', 'js-001', 'wil-001'),
('trx-003', 'TRX-260907-303', 3.0, 9000, 30, 'PENDING', 'Penjemputan di depan gerbang utama', 'usr-warga-01', 'js-002', 'wil-002')
ON CONFLICT ("kodeTransaksi") DO NOTHING;
