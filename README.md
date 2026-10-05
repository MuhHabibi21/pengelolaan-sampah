# 🌿 Peduli Sampah - Sistem Pengelolaan Sampah Terintegrasi RDBMS & Transaksi Setor Sampah

![Peduli Sampah Logo](public/logo.jpg)

> **Proyek UTS Pemrograman Web - Sistem Informasi Pengelolaan Sampah**  
> Dibangun menggunakan **Next.js 15 (App Router)**, **Prisma ORM**, dan basis data relasional **PostgreSQL**.

---

## 🚀 Live Demo & Repository
- **Live Website Preview (Vercel):** [https://pengelolaan-sampah.vercel.app](https://pengelolaan-sampah.vercel.app) *(Ganti dengan link Vercel Anda)*
- **GitHub Repository:** [https://github.com/MuhammadHabibi/pengelolaan-sampah](https://github.com/MuhammadHabibi/pengelolaan-sampah) *(Ganti dengan link repo Anda)*
- **File Database SQL:** [database_pengelolaan_sampah.sql](./database_pengelolaan_sampah.sql)

---

## ✨ Fitur Utama Aplikasi

### 1. 👥 Multi-Role Authentication & Security
- **Role Warga / User:** Pendaftaran akun mandiri, login terenkripsi *bcrypt*, manajemen sesi berbasis *HTTP-only JWT Cookies*.
- **Role Admin / Petugas:** Akses panel kontrol terpusat untuk verifikasi laporan dan kelola transaksi.

### 2. 📝 Pelaporan Sampah Liar (One-to-One Image Proof)
- Pengiriman laporan sampah masyarakat dengan foto bukti visual langsung dari perangkat (disimpan di `/public/uploads/`).
- Anonimisasi nama pelapor pada tabel publik untuk menjaga privasi warga.

### 3. ♻️ Transaksi Setor Sampah / Bank Sampah (Proses Transaksi Real-Time)
- Warga mengajukan setor sampah dengan kalkulator estimasi nilai tukar (Rupiah) dan poin reward otomatis.
- Alur transaksi multi-status: `PENDING` ➔ `DIPROSES` ➔ `SELESAI` / `DIBATALKAN`.
- Admin dapat memvalidasi dan mengubah status transaksi secara langsung.

### 4. 🏢 Manajemen Master Data & Relasi Relasional
- **Relasi 1:1:** `LaporanSampah` ⟷ `FotoSampah` (Unique Foreign Key).
- **Relasi 1:N:** `User` ⟷ `LaporanSampah` & `TransaksiSampah` (Cascade Delete).
- **Relasi N:M:** `Fasilitas` ⟷ `JenisSampah` (Junction table `_FasilitasToJenisSampah`).

---

## 🛠️ Tech Stack
- **Frontend & Backend:** Next.js 15 (React 19, App Router, Server Actions)
- **Styling:** Tailwind CSS (Modern Glassmorphism & Dark Mode)
- **Database & ORM:** PostgreSQL & Prisma ORM
- **Authentication:** JWT Session via `jose` & Password Hashing via `bcryptjs`
- **Icons:** Lucide React

---

## 📂 Struktur Database Relasional (PostgreSQL)

```
[ User ] (1) ────< (N) [ LaporanSampah ] (1) ──── (1) [ FotoSampah ]
   │
   └─────────────< (N) [ TransaksiSampah ]
                              │
[ JenisSampah ] (1) ──────────┤
      │
     (N)
      │
[ _FasilitasToJenisSampah ]
      │
     (N)
      │
[ Fasilitas ]
```

---

## 🔑 Akun Uji Coba (Demo Credentials)

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin Pengelola** | `admin@example.com` | `12345678` |
| **Warga / User** | `user@example.com` | `12345678` |

---

## ⚙️ Cara Menjalankan Proyek Secara Lokal

1. **Clone repository:**
   ```bash
   git clone https://github.com/username/pengelolaan-sampah.git
   cd pengelolaan-sampah
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variable (`.env`):**
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/pengelolaan_sampah?schema=public"
   SESSION_SECRET="your-super-secret-key-32-chars-long"
   ```

4. **Migrasi & Generate Prisma:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Jalankan Aplikasi:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---
**Pengembang:** Muhammad Habibi • UTS Pemrograman Web
