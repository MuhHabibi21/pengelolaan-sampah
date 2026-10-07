# BUKU PANDUAN PENGGUNA (USER MANUAL)
## SISTEM INFORMASI PENGELOLAAN & BANK SAMPAH BERBASIS WEB (PEDULI SAMPAH)

---

### **INFORMASI DOKUMEN & IDENTITAS MAHASISWA**
* **Mata Kuliah** : Pemrograman Web / Web Application Development
* **Tugas** : Ujian Tengah Semester (UTS)
* **Nama Mahasiswa** : Muhammad Habibi El Islami
* **Nama Aplikasi** : Peduli Sampah (*Eco-Green Waste Management System*)
* **Teknologi** : Next.js 15 (App Router, Server Actions), PostgreSQL, Prisma ORM, Tailwind CSS, Lucide Icons, Jose (JWT Session).
* **Link Repository GitHub** : [https://github.com/MuhHabibi21/pengelolaan-sampah](https://github.com/MuhHabibi21/pengelolaan-sampah)
* **Link Live Deployment (Vercel)** : [https://pengelolaan-sampah-beta.vercel.app](https://pengelolaan-sampah-beta.vercel.app)

---

## DAFTAR ISI

1. **BAB I: PENDAHULUAN**
   - 1.1 Latar Belakang Sistem
   - 1.2 Tujuan & Manfaat
   - 1.3 Arsitektur & Teknologi Pendukung
2. **BAB II: MATRIKS HAK AKSES PENGGUNA (ROLE MATRIX)**
   - 2.1 Peran Warga (*Citizen/User*)
   - 2.2 Peran Administrator Pengelola (*Admin*)
3. **BAB III: PANDUAN LENGKAP PENGGUNA: ROLE WARGA (USER)**
   - 3.1 Pendaftaran Akun Baru (*Registration*)
   - 3.2 Masuk ke Sistem (*Login*)
   - 3.3 Menjelajahi Beranda Publik & Statistik Wilayah
   - 3.4 Mengakses Dashboard & Ringkasan Kontribusi
   - 3.5 Pengajuan Laporan Pengaduan Sampah Baru (+ Unggah Foto Bukti)
   - 3.6 Transaksi Penyetoran Sampah & Estimasi Saldo/Poin
   - 3.7 Memantau Riwayat Laporan & Status Transaksi
   - 3.8 Manajemen Profil & Pengaturan Kata Sandi
4. **BAB IV: PANDUAN LENGKAP PENGGUNA: ROLE ADMINISTRATOR**
   - 4.1 Akses Panel Admin (*Admin Dashboard*)
   - 4.2 Validasi & Verifikasi Transaksi Setor Sampah Warga
   - 4.3 Monitoring & Manajemen Seluruh Laporan Pengaduan
   - 4.4 Manajemen Pengguna & Delegasi Role (User ⇄ Admin)
   - 4.5 Manajemen Master Data Kategori Jenis Sampah
   - 4.6 Manajemen Master Data Wilayah Kecamatan
   - 4.7 Manajemen Fasilitas Daur Ulang (Relasi *Many-to-Many*)
5. **BAB V: RELASI DATABASE & ARSITEKTUR DATA**
   - 5.1 Relasi *One-to-One* (1-to-1)
   - 5.2 Relasi *One-to-Many* (1-to-N)
   - 5.3 Relasi *Many-to-Many* (N-to-N)
   - 5.4 Skema Transaksi Finansial & Poin
6. **BAB VI: FAQ & PANDUAN TROUBLESHOOTING**

---

## BAB I: PENDAHULUAN

### 1.1 Latar Belakang Sistem
**Peduli Sampah** adalah platform digital berbasis web yang dirancang khusus untuk memfasilitasi pelaporan tumpukan sampah liar oleh warga kota, digitalisasi bank sampah terintegrasi, serta pengelolaan logistik fasilitas pembuangan dan daur ulang sampah tingkat kotamadya/kecamatan.

Platform ini mengusung antarmuka modern **Eco-Green Aesthetic** (kombinasi warna Putih Bersih dan Hijau Emerald berpadu Teal), memberikan visual dengan kontras tinggi, keterbacaan data optimal, serta performa aplikasi yang sangat cepat dengan dukungan arsitektur Next.js Server Components.

### 1.2 Tujuan & Manfaat
* **Meningkatkan Partisipasi Warga**: Memberikan kemudahan bagi warga dalam mendokumentasikan dan melaporkan titik sampah secara langsung disertai bukti foto autentik.
* **Insentif Berkelanjutan (Circular Economy)**: Mengonversi sampah daur ulang menjadi nilai rupiah dan poin reward warga melalui sistem transaksi bank sampah digital.
* **Efisiensi Kerja Petugas/Admin**: Memusatkan verifikasi setoran sampah, pemantauan volume timbulan sampah per wilayah, dan pengawasan kapasitas fasilitas akhir secara *real-time*.

---

## BAB II: MATRIKS HAK AKSES PENGGUNA (ROLE MATRIX)

Aplikasi memiliki pembagian peran yang ketat dengan autentikasi berbasis JWT Token tersimpan di HTTP-Only Cookie yang aman:

| Modul / Fitur | Warga (USER) | Administrator (ADMIN) |
| :--- | :---: | :---: |
| **Melihat Halaman Landing & Statistik Publik** | ✅ | ✅ |
| **Registrasi Akun Baru Warga** | ✅ | ❌ |
| **Login Akun** | ✅ | ✅ |
| **Dashboard Ringkasan Pribadi (Laporan & Poin)** | ✅ | ❌ |
| **Buat Laporan Sampah + Upload Foto (1-to-1)** | ✅ | ❌ |
| **Lihat Riwayat Laporan Pribadi** | ✅ | ❌ |
| **Setor Sampah & Hitung Poin/Harga Otomatis** | ✅ | ❌ |
| **Edit Profil & Ubah Password Sendiri** | ✅ | ❌ |
| **Dashboard Statistik Kota (Admin Panel)** | ❌ | ✅ |
| **Validasi / Ubah Status Transaksi Setor Sampah** | ❌ | ✅ |
| **Melihat & Memverifikasi Semua Laporan Warga** | ❌ | ✅ |
| **Kelola Pengguna (Ubah Role Warga ⇄ Admin)** | ❌ | ✅ |
| **Kelola Master Kategori Sampah (Tambah/Hapus)** | ❌ | ✅ |
| **Kelola Master Wilayah (Tambah/Hapus)** | ❌ | ✅ |
| **Kelola Fasilitas Daur Ulang (Relasi N-to-N)** | ❌ | ✅ |

---

## BAB III: PANDUAN LENGKAP PENGGUNA: ROLE WARGA (USER)

### 3.1 Pendaftaran Akun Baru (*Registration*)
1. Akses alamat web [https://pengelolaan-sampah-beta.vercel.app](https://pengelolaan-sampah-beta.vercel.app).
2. Klik tombol **Daftar Warga** pada pojok kanan atas navbar atau pada tombol aksi utama.
3. Isi formulir pendaftaran dengan data lengkap:
   * **Nama Lengkap**: Masukkan nama asli Anda (minimal 3 karakter).
   * **Alamat Email**: Masukkan email aktif Anda.
   * **Nomor Handphone**: Masukkan nomor telepon yang valid (contoh: `081234567890`).
   * **Nomor Induk Kependudukan (NIK)**: Masukkan 16 digit NIK KTP Anda.
   * **Kata Sandi**: Masukkan password minimal 6 karakter.
4. Klik tombol **Daftar Akun Warga**. Sistem akan memvalidasi data dan mengarahkan Anda langsung ke Dashboard Warga.

```
+-----------------------------------------------------------------------+
| 📌 [TEMPATKAN SCREENSHOT 1: Halaman Registrasi Akun Warga (/register)] |
+-----------------------------------------------------------------------+
```

---

### 3.2 Masuk ke Sistem (*Login*)
1. Klik tombol **Masuk** di pojok kanan atas beranda, atau kunjungi URL `/login`.
2. Masukkan **Alamat Email** dan **Kata Sandi** yang telah didaftarkan.
   * *Akun Demo User*: Email `user@example.com` | Password: `password123`
3. Klik tombol **Masuk Sekarang**.
4. Sistem akan mendeteksi role akun Anda dan mengarahkan otomatis ke Dashboard Warga.

```
+-----------------------------------------------------------------------+
| 📌 [TEMPATKAN SCREENSHOT 2: Halaman Login Pengguna (/login)]           |
+-----------------------------------------------------------------------+
```

---

### 3.3 Menjelajahi Beranda Publik & Statistik Wilayah
Halaman utama menyajikan visualisasi data publik:
* **Statistik Real-Time**: Total laporan masuk, estimasi berat sampah terkelola, dan total transaksi setor.
* **Tabel Transparansi Laporan Publik**: Menampilkan daftar laporan terakhir dari warga dengan sensor privasi nama (contoh: `Bud***`), wilayah asal, jenis sampah, serta tautan foto bukti.

```
+-----------------------------------------------------------------------+
| 📌 [TEMPATKAN SCREENSHOT 3: Halaman Beranda / Landing Page (/)]       |
+-----------------------------------------------------------------------+
```

---

### 3.4 Mengakses Dashboard & Ringkasan Kontribusi
Setelah login sebagai warga, halaman Dashboard utama (`/dashboard`) menyajikan:
* **Kartu Ringkasan Pribadi**: Total Laporan Saya, Berat Sampah Dilaporkan, dan Total Poin Reward Daur Ulang.
* **Aksi Cepat (*Quick Actions*)**: Tombol pintas untuk langsung membuat laporan baru, melihat riwayat, maupun melakukan transaksi setor sampah.

```
+-----------------------------------------------------------------------+
| 📌 [TEMPATKAN SCREENSHOT 4: Halaman Dashboard Utama Warga (/dashboard)]|
+-----------------------------------------------------------------------+
```

---

### 3.5 Pengajuan Laporan Pengaduan Sampah Baru (+ Upload Foto)
Warga dapat melaporkan tumpukan sampah liar dengan langkah:
1. Klik menu **Kirim Laporan Baru** pada sidebar navigasi kiri atau tombol di dashboard.
2. Lengkapi formulir laporan:
   * **Pilih Jenis Sampah**: Pilih kategori (*Organik, Anorganik, atau B3*).
   * **Pilih Lokasi Wilayah**: Pilih wilayah tempat sampah ditemukan (*Kecamatan Menteng, Cilandak, dll.*).
   * **Estimasi Berat (Kg)**: Masukkan berat sampah (Wajib angka positif > 0 kg, divalidasi oleh Zod).
   * **Unggah Foto Bukti**: Pilih file gambar/foto autentik dari kamera atau galeri perangkat Anda.
3. Klik tombol **Kirim Laporan Sekarang**.
4. Data laporan dan file foto akan tersimpan ke dalam database via Prisma Transaction (Relasi 1-to-1).

```
+-----------------------------------------------------------------------+
| 📌 [TEMPATKAN SCREENSHOT 5: Formulir Kirim Laporan Baru (/dashboard/laporan/baru)] |
+-----------------------------------------------------------------------+
```

---

### 3.6 Transaksi Penyetoran Sampah & Estimasi Saldo/Poin
Warga yang menyetorkan sampah daur ulang ke bank sampah dapat mencatat transaksi:
1. Buka menu **Transaksi Setor** pada sidebar.
2. Pada form bagian atas, pilih **Kategori Jenis Sampah**, **Wilayah Bank Sampah**, dan ketikkan **Berat Sampah (kg)**.
3. Sistem secara otomatis menghitung secara real-time:
   * **Estimasi Nilai Rupiah**: Contoh Anorganik Rp 3.000 / kg.
   * **Estimasi Poin Reward**: 10 Poin per Kilogram.
4. Klik **Kirim Transaksi Setor**. Status awal transaksi adalah **PENDING** menunggu validasi petugas admin.

```
+-----------------------------------------------------------------------+
| 📌 [TEMPATKAN SCREENSHOT 6: Halaman Transaksi Bank Sampah Warga (/dashboard/transaksi)] |
+-----------------------------------------------------------------------+
```

---

### 3.7 Memantau Riwayat Laporan & Status Transaksi
* Buka menu **Riwayat Laporan** untuk melihat seluruh status dan histori laporan yang pernah Anda buat beserta tanggal submit dan lampiran fotonya.
* Buka menu **Transaksi Setor** bagian bawah untuk melihat status verifikasi (*PENDING, SELESAI, atau DITOLAK*) dan histori penambahan saldo rupiah serta akumulasi poin Anda.

```
+-----------------------------------------------------------------------+
| 📌 [TEMPATKAN SCREENSHOT 7: Halaman Riwayat Laporan Warga (/dashboard/laporan)] |
+-----------------------------------------------------------------------+
```

---

### 3.8 Manajemen Profil & Pengaturan Kata Sandi
1. Klik menu **Pengaturan Akun** pada sidebar.
2. Anda dapat memperbarui:
   * **Data Profil**: Nama Lengkap dan Nomor HP aktif.
   * **Keamanan Kata Sandi**: Masukkan kata sandi lama, kata sandi baru, dan konfirmasi kata sandi baru.
3. Klik tombol **Simpan Perubahan**.

```
+-----------------------------------------------------------------------+
| 📌 [TEMPATKAN SCREENSHOT 8: Halaman Pengaturan Akun Warga (/dashboard/settings)] |
+-----------------------------------------------------------------------+
```

---

## BAB IV: PANDUAN LENGKAP PENGGUNA: ROLE ADMINISTRATOR

### 4.1 Akses Panel Admin (*Admin Dashboard*)
1. Login menggunakan akun Administrator:
   * *Akun Demo Admin*: Email `admin@example.com` | Password: `password123` (atau `admin123`).
2. Masuk ke Panel Administrator (`/admin`) yang menampilkan ringkasan data kotamadya:
   * **Statistik Kota**: Total Laporan Masuk, Total Sampah Terkumpul (Kg), Total Transaksi, dan Jumlah Warga Terdaftar.
   * **Status Antrean**: Jumlah transaksi yang sedang menunggu validasi petugas.
   * **Navigasi Cepat**: Tautan pintas ke modul Transaksi, Laporan, dan Fasilitas.

```
+-----------------------------------------------------------------------+
| 📌 [TEMPATKAN SCREENSHOT 9: Halaman Dashboard Admin (/admin)]          |
+-----------------------------------------------------------------------+
```

---

### 4.2 Validasi & Verifikasi Transaksi Setor Sampah Warga
1. Klik menu **Kelola Transaksi** pada sidebar admin (`/admin/transaksi`).
2. Admin melihat tabel transaksi seluruh warga beserta berat aktual, nilai rupiah, dan poin.
3. Pada kolom **Aksi Verifikasi**:
   * Klik tombol **Selesai (Centang Hijau)** untuk menyetujui setoran sampah (saldo & poin resmi masuk ke akun warga).
   * Klik tombol **Tolak (Silang Merah)** apabila sampah tidak memenuhi standar pemilahan.

```
+-----------------------------------------------------------------------+
| 📌 [TEMPATKAN SCREENSHOT 10: Halaman Kelola Transaksi Admin (/admin/transaksi)] |
+-----------------------------------------------------------------------+
```

---

### 4.3 Monitoring & Manajemen Seluruh Laporan Pengaduan
1. Klik menu **Semua Laporan** (`/admin/laporan`).
2. Admin dapat memantau seluruh laporan yang dikirimkan oleh seluruh warga di berbagai wilayah kecamatan.
3. Tabel menyajikan tanggal laporan, nama & email pelapor, kategori sampah, lokasi wilayah, berat, serta pratinjau thumbnail foto bukti autentik.

```
+-----------------------------------------------------------------------+
| 📌 [TEMPATKAN SCREENSHOT 11: Halaman Semua Laporan Warga (/admin/laporan)] |
+-----------------------------------------------------------------------+
```

---

### 4.4 Manajemen Pengguna & Delegasi Role (User ⇄ Admin)
1. Klik menu **Kelola Pengguna** (`/admin/users`).
2. Admin dapat melihat daftar seluruh akun yang terdaftar dalam sistem (Nama, Email, No HP, NIK, dan Role aktif).
3. Untuk mengangkat warga menjadi admin atau menurunkan hak akses:
   * Klik tombol **Jadikan Admin** atau **Jadikan Warga**. Perubahan role akan langsung diterapkan secara instan (*Server Actions Revalidation*).

```
+-----------------------------------------------------------------------+
| 📌 [TEMPATKAN SCREENSHOT 12: Halaman Kelola Pengguna (/admin/users)]    |
+-----------------------------------------------------------------------+
```

---

### 4.5 Manajemen Master Data Kategori Jenis Sampah
1. Klik menu **Master Jenis Sampah** (`/admin/jenis-sampah`).
2. **Menambah Kategori**: Masukkan nama jenis sampah baru pada form sebelah kiri (misal: *Limbah Elektronik / E-Waste*), lalu klik **Simpan Data**.
3. **Menghapus Kategori**: Klik tombol ikon tempat sampah merah pada baris data yang ingin dihapus.

```
+-----------------------------------------------------------------------+
| 📌 [TEMPATKAN SCREENSHOT 13: Halaman Master Jenis Sampah (/admin/jenis-sampah)] |
+-----------------------------------------------------------------------+
```

---

### 4.6 Manajemen Master Data Wilayah Kecamatan
1. Klik menu **Master Wilayah** (`/admin/wilayah`).
2. **Menambah Wilayah**: Masukkan nama kecamatan baru (contoh: *Kecamatan Tebet*) lalu klik **Tambah Wilayah**.
3. **Menghapus Wilayah**: Klik tombol hapus merah pada wilayah yang sudah tidak aktif.

```
+-----------------------------------------------------------------------+
| 📌 [TEMPATKAN SCREENSHOT 14: Halaman Master Wilayah (/admin/wilayah)]   |
+-----------------------------------------------------------------------+
```

---

### 4.7 Manajemen Fasilitas Daur Ulang (Relasi *Many-to-Many*)
1. Klik menu **Fasilitas Daur Ulang** (`/admin/fasilitas`).
2. Halaman ini mendemonstrasikan implementasi relasi relasional **Many-to-Many** antara tabel `Fasilitas` dan `JenisSampah`.
3. Admin dapat melihat fasilitas pusat pengolahan beserta badge kategori jenis-jenis sampah spesifik yang dapat ditampung oleh fasilitas tersebut.

```
+-----------------------------------------------------------------------+
| 📌 [TEMPATKAN SCREENSHOT 15: Halaman Fasilitas Many-to-Many (/admin/fasilitas)] |
+-----------------------------------------------------------------------+
```

---

## BAB V: RELASI DATABASE & ARSITEKTUR DATA

Aplikasi dibangun menggunakan **PostgreSQL** dan dimodelkan melalui **Prisma ORM** (`prisma/schema.prisma`). Seluruh struktur relasi database telah memenuhi kriteria tugas UTS:

### 1. Diagram Relasi Entitas (ERD)
* **1-to-1 (One-to-One)**: `LaporanSampah` $\leftrightarrow$ `FotoSampah` (Tiap 1 laporan terikat tepat 1 file foto bukti via FK `laporanId`).
* **1-to-N (One-to-Many)**: `User` $\rightarrow$ `LaporanSampah` dan `User` $\rightarrow$ `TransaksiSampah`.
* **1-to-N (One-to-Many)**: `JenisSampah` $\rightarrow$ `LaporanSampah` & `Wilayah` $\rightarrow$ `LaporanSampah`.
* **N-to-N (Many-to-Many)**: `Fasilitas` $\leftrightarrow$ `JenisSampah` (Fasilitas dapat menampung banyak jenis sampah, dan jenis sampah dapat diterima di banyak fasilitas).

---

## BAB VI: FAQ & TROUBLESHOOTING

| Pertanyaan / Isu | Solusi & Penjelasan |
| :--- | :--- |
| **Gagal mengirim laporan sampah?** | Pastikan input **Berat** bernilai lebih dari 0 Kg dan Anda telah memilih file gambar bukti (.jpg, .png, .jpeg). |
| **Poin transaksi belum bertambah?** | Poin dan saldo rupiah hanya akan diakumulasikan ke akun warga setelah transaksi diverifikasi dengan status **SELESAI** oleh Petugas Admin. |
| **Bagaimana cara mengubah akun menjadi Admin?** | Login ke akun Admin utama, masuk ke menu **Kelola Pengguna**, lalu klik tombol **Jadikan Admin** pada baris akun yang dituju. |
| **Bagaimana cara keluar dari akun (*Logout*)?** | Klik tombol **Keluar** dengan ikon *LogOut* berwarna merah di bagian bawah menu sidebar navigasi. |

---
*Dokumen User Manual ini disusun sebagai kelengkapan Ujian Tengah Semester (UTS) Pemrograman Web.*  
*Pengembang: Muhammad Habibi El Islami*
