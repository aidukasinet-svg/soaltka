# Peta Arsitektur & Strategi Produk: CBT TKA Online Individual

> **Status:** Blueprint & Architecture Map (Versi 2.0 - Lengkap dengan Skema Langganan & Gamifikasi Gen Z)  
> **Target Pengguna:** Siswa Mandiri (SD, SMP, SMA), Lembaga Bimbingan Belajar / Agency Reseller, dan Admin / Content Master  
> **Basis Soal:** Standar Kerangka Asesmen TKA Kemendikdasmen (BSKAP No. 047/H/AN/2025 dan 045/H/AN/2025) diproduksi dengan AI Question Engine  

---

## 1. Visi Produk & Diferensiasi Pasar

### 1.1 Visi Utama
Membangun platform Computer Based Test (CBT) mandiri untuk persiapan Tes Kemampuan Akademik (TKA) yang tercepat, paling akurat secara diagnostik, dan ramah smartphone di Indonesia. Platform ini memadukan kekuatan produksi bank soal terstandar berbasis kecerdasan buatan (AI) di sisi internal dengan pengalaman ujian yang tangguh tanpa lag, serta model kemitraan reseller/agency untuk penetrasi bimbingan belajar lokal di seluruh Indonesia.

### 1.2 Masalah Pasar (Problem Statement)
1. **Siswa & Orang Tua:**
   - Mayoritas platform CBT hanya memberikan skor mentah (contoh: 70/100) tanpa diagnosa akar kelemahan spesifik per subtopik.
   - Tampilan CBT kompetitor sering kali berat, lambat dibuka di HP, dan tata letak berantakan ketika menampilkan stimulus berupa tabel, grafik, atau rumus matematika.
   - Siswa cepat bosan dan kehilangan motivasi belajar mandiri jika formatnya hanya latihan monoton tanpa apresiasi pencapaian harian.
2. **Agency & Bimbingan Belajar (Bimbel):**
   - Bimbel lokal kesulitan membuat sistem CBT sendiri yang canggih dan sesuai standar resmi Kemendikdasmen.
   - Platform tryout yang ada hanya menjual paket eceran ke siswa langsung (B2C murni) tanpa memberdayakan bimbel lokal sebagai mitra bisnis berlisensi grosir dengan dasbor analitik kelas.
3. **Pengelola Platform (Admin):**
   - Pembuatan soal TKA HOTS (Higher Order Thinking Skills) dengan stimulus kontekstual memakan waktu mingguan jika disusun manual satu per satu.
   - Belum adanya sistem terpadu untuk mengatur langganan siswa retail dan alokasi lisensi mitra agency dari satu tempat.

---

## 2. Analisis Kompetitor & Unique Selling Proposition (USP)

### 2.1 Matriks Komparasi Kompetitor

| Aspek Evaluasi | PakarTKA | Pusmendik (Simulasi) | TryoutNasional.id | BuatSoal Online (Ref) | Platform CBT TKA Kami |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Fokus Utama** | Latihan TKA B2C | Simulasi ANBK Negara | Tryout massal berkala | Tool guru bikin soal | CBT TKA Siswa + Agency + AI Factory |
| **Model Pengguna** | Siswa Retail | Publik Anonim | Siswa Umum | Guru & Sekolah | Siswa, Agency/Bimbel, Admin |
| **Engine Soal** | Bank Soal Terbatas | Statis Resmi | Campuran Guru | AI Topic & Kisi-kisi | AI Engine BSKAP 047/045 + Manual Review |
| **Diagnostik Hasil** | Skor + Subtopik | Tidak Ada (Hanya Skor) | Ranking Nasional Global | Analisis Butir Soal | Spider Chart + AI Misconception Diagnostic |
| **Tindak Lanjut** | Paket Latihan Tambahan | Tidak Ada | Tidak Ada | Guru remedi manual | AI Adaptive Remedial Drill 1-Klik |
| **Gamifikasi Siswa** | Tidak Ada | Tidak Ada | Tidak Ada | Tidak Ada | Gen Z Streak, XP, Liga Mingguan, Koin |
| **Model Langganan** | Paket 60 Hari Retail | Gratis Negara | Eceran / Iklan | Langganan Guru | Bulanan, Semester, Grosir Bimbel, SaaS Agency |
| **B2B / Reseller** | Tidak Ada | Tidak Ada | Tidak Ada | Paket Kuota Guru | Dasbor Agency, Co-branding, Rapor Kelas |
| **Mobile UX** | Standar Responsive | Kurang Optimal di HP | Berat, Banyak Banner | Cukup Baik di Web | Mobile-First Thumb Zone + Offline Resilient |

### 2.2 Unique Selling Proposition (USP) Kami

#### A. USP Antarmuka (UI / UX Excellence)
1. **Mode Ganda Tampilan CBT (Dual Interface Mode):**
   - **Mode Simulasi Resmi Pusmendik:** Tampilan 100% identik dengan aplikasi ANBK/TKA resmi Kemendikdasmen (header identitas siswa, navigasi nomor atas/samping, tombol warna resmi biru-kuning-merah) untuk melatih mental dan familiaritas siswa.
   - **Mode Modern Thumb-Friendly (Default Mobile):** Didesain khusus untuk jempol satu tangan di HP. Navigasi soal berupa bottom-sheet drawer yang gesit, kontrol ukuran font instan (A- / A+), dan pemisah stimulus-pertanyaan yang ergonomis tanpa scrolling tanpa henti.
2. **Formula & Stimulus Reader Tanpa Pecah:**
   - Rendering rumus matematika dan sains menggunakan KaTeX teroptimasi (bukan gambar raster buram).
   - Diagram, tabel data numerasi, dan infografis teks literasi responsif dengan fitur pinch-to-zoom dan full-preview modal.
3. **Desain Anti-AI Slop:**
   - Menghindari gradien ungu klise, kartu 3-kolom seragam, dan teks buatan mesin yang canggung. Menggunakan palet profesional deep navy, slate, aksen emerald/amber yang tegas, serta tipografi proporsional untuk fokus konsentrasi belajar.

#### B. USP Fungsional & Gamifikasi Gen Z
1. **Gamifikasi Belajar ala Gen Z (Daily Streak & TikTok-Style Habit):**
   - **Api Belajar (Daily Streak):** Menjaga nyala api belajar harian dengan menyelesaikan minimal 1 mikro-latihan (3-5 soal) per hari. Fitur *Streak Shield* (Pelindung Api) melindungi streak saat berhalangan.
   - **XP & Leveling System:** Naik pangkat dari Murid Magang hingga Legenda Nasional TKA.
   - **Liga Peringkat Mingguan (Weekly League):** Sistem divisi kompetitif (Perunggu, Perak, Emas, Berlian, Mitos) dengan sistem promosi top 5 dan degradasi bottom 3 setiap Senin jam 00:00 WIB.
   - **TKA Coins & Reward Vault:** Koin virtual hasil misi harian dapat ditukar untuk membuka tryout rahasia, avatar frame khusus, atau diskon langganan.
2. **AI Misconception Diagnostic (Diagnosa Mengapa Salah):**
   - Sistem tidak hanya memberi tahu jawaban benar, tetapi menganalisis alasan di balik opsi salah yang dipilih siswa: apakah karena jebakan rumus (konseptual), salah operasi hitung (kalkulasi), atau salah membaca grafik stimulus.
3. **AI Adaptive Remedial Drill (Paket Obat Seketika):**
   - Tepat di bawah grafik laba-laba kelemahan, terdapat tombol: *"Latih Kelemahan Ini (5 Soal Kilat)"*. Sistem langsung menyusun latihan fokus berdurasi 10 menit dengan variasi soal setara pada subtopik yang belum tuntas.
4. **Agency / Bimbel Collaborative Command Center:**
   - Agency/Bimbel dapat membeli token lisensi secara grosir (diskon bertingkat), membagikan link khusus dengan logo bimbel mereka (co-branded), dan melihat **Peta Kelemahan Kolektif Murid**. Guru bimbel tahu materi apa yang harus diajarkan di kelas minggu ini berdasarkan data tryout.
5. **Offline-Resilient Attempt Engine (Jaminan Aman Koneksi Lemah):**
   - Ujian tetap berjalan mulus meskipun sinyal internet siswa putus selama 5 hingga 10 menit. Seluruh jawaban di-cache di IndexedDB per detik dan tersinkronisasi otomatis dengan server saat koneksi kembali normal. Waktu ujian dihitung dari otoritas server sehingga adil dan tidak dapat dimanipulasi jam lokal HP.

---

## 3. Skema Penetapan Harga & Model Langganan

### 3.1 Skema Siswa (Student Retail Plans)

| Nama Paket | Biaya / Durasi | Fitur & Batasan | Target Siswa |
| :--- | :--- | :--- | :--- |
| **Uji Coba Gratis (Free Tier)** | Rp0 (Selamanya) | 1 paket simulasi gratis per mata pelajaran, skor mentah akhir, tanpa pembahasan detail dan tanpa AI remedial drill. | Eksplorasi format awal |
| **Pejuang Bulanan (Monthly Pass)** | Rp39.000 / 30 Hari | Akses tak terbatas semua paket latihan jenjang aktif, pembahasan lengkap step-by-step, radar diagnostik kelemahan, 10 sesi AI Remedial Drill per bulan, akses penuh Arena Gamifikasi & Liga Mingguan. | Latihan intensif harian |
| **Musim Ujian (Exam Pass 90 Hari)** | Rp89.000 / 90 Hari *(Rekomendasi Utama)* | Seluruh fitur bulanan, hemat lebih dari 25% (setara Rp980/hari), bonus 2x Streak Shield gratis, prioritas server tryout nasional berkala, dan rapor komprehensif siap cetak PDF. | Persiapan tuntas TKA |
| **Tiket Eceran (Single Tryout Token)** | Rp15.000 / Tiket | 1 tiket pengerjaan Tryout Akbar Nasional resmi berperingkat nasional dengan pembahasan lengkap (sekali pakai). | Siswa yang hanya ingin ikut tryout berkala |

### 3.2 Skema Kemitraan Agency / Reseller (B2B Bimbel Plans)

Tersedia dua opsi skema bisnis bagi mitra:

#### A. Pembelian Kuota Lisensi Grosir (Tiered Wholesale Tokens)
Mitra membeli saldo token siswa tanpa biaya langganan bulanan. Token tidak memiliki masa kedaluwarsa sebelum diaktifkan siswa:
- **Tier 1 (Bimbel Starter - 50 Siswa):** Rp750.000 (Rp15.000 per siswa, diskon 40% dari harga ecer).
- **Tier 2 (Bimbel Pro - 150 Siswa):** Rp1.800.000 (Rp12.000 per siswa, diskon 52% dari harga ecer).
- **Tier 3 (Yayasan / Bimbel Utama - 500 Siswa):** Rp4.500.000 (Rp9.000 per siswa, diskon 64% dari harga ecer).

#### B. Langganan Platform Agency SaaS (Dedicated Bimbel CBT Portal)
Biaya langganan bulanan untuk bimbel yang ingin menggunakan ekosistem penuh:
- **Biaya Langganan:** Rp299.000 / bulan.
- **Benefit Langganan:**
  - Subdomain & Portal Co-branded eksklusif (`cbt-tka.id/b/nama-bimbel`).
  - Watermark logo bimbel di halaman ujian dan kop laporan hasil siswa.
  - Dasbor Pemantauan Live Ujian Kelas.
  - Peta Kelemahan Kolektif Murid (Analitik materi kelas).
  - Ekspor Nilai ke Excel siap olah rapor.
  - Termasuk gratis 30 token siswa per bulan (tambahan siswa hanya Rp8.000 per token).

---

## 4. Struktur Peran & Hak Akses (RBAC)

```
[ PLATFORM CBT TKA ]
       |
       +---> [ 1. SUPER ADMIN / CONTENT MASTER ]
       |        |-- AI Question Production Studio (Replikasi BuatSoal)
       |        |-- Kurasi & Validasi Bank Soal TKA
       |        |-- Manajemen Paket Tryout & Blueprint Ujian
       |        |-- Manajemen Pelanggan Siswa (Langganan, Masa Aktif, Refund)
       |        |-- Manajemen Pelanggan Agency (SaaS, Kuota, Status Mitra)
       |        |-- Pengaturan Skema Harga & Kupon Diskon
       |        |-- Approval Tarik Komisi / Payout Agency
       |        \-- Master Keuangan & Audit Log Sistem
       |
       +---> [ 2. AGENCY / RESELLER (BIMBEL / MITRA) ]
       |        |-- Dasbor Kemitraan & Status Langganan SaaS
       |        |-- Pembelian Kuota Lisensi Grosir via QRIS/VA Otomatis
       |        |-- Generator Kode Akses & Link Ujian Co-branded
       |        |-- Live Monitoring Ujian Siswa Bimbingan
       |        |-- Analitik Kelas & Rekap Nilai Kolektif (Download Excel/PDF)
       |        |-- Dompet Saldo & Riwayat Komisi Afiliasi
       |        \-- Pengaturan Profil Bimbel & Logo Watermark
       |
       \---> [ 3. SISWA / PESERTA (STUDENT) ]
                |-- Registrasi / Login Praktis (No HP / Google)
                |-- Aktivasi Kode Voucher (dari Agency) atau Beli Langganan via QRIS
                |-- Ruang Ujian CBT (Server Timer, Anti-cheat, Autosave)
                |-- Laporan Diagnostik Interaktif (Radar Chart & Analisis)
                |-- Pembahasan Lengkap & AI Misconception Notes
                |-- AI Remedial Drill (Latihan Fokus Subtopik Lemah)
                \-- Arena Gamifikasi Gen Z (Streak Api, XP, Liga Mingguan, Target Impian)
```

---

## 5. Arsitektur Informasi (Sitemap)

### 5.1 Rute Publik (Landing & Marketing)
- `/` : Landing Page Utama (Katalog Jenjang, Simulasi Demo, Fitur Unggulan, Program Agency)
- `/pricing` : Halaman Detail Skema Harga Langganan Siswa & Grosir Agency
- `/jenjang/sd` : Info Kisi-kisi Kerangka Asesmen TKA SD / MI (Matematika, Bahasa Indonesia)
- `/jenjang/smp` : Info Kisi-kisi Kerangka Asesmen TKA SMP / MTs (Matematika, Bahasa Indonesia)
- `/jenjang/sma` : Info Kisi-kisi Kerangka Asesmen TKA SMA / MA / SMK (Wajib & Pilihan)
- `/simulasi-gratis` : Demo Tes 10 Soal Tanpa Login (Pengenalan CBT)
- `/agency` : Halaman Penawaran Kemitraan Bimbel & Reseller
- `/masuk` & `/daftar` : Rute Autentikasi Pengguna
- `/b/<agency_slug>` : Rute Khusus Portal Co-Branded Bimbel Mitra

### 5.2 Portal Siswa (`/app/student/...`)
- `/app/student/dashboard` : Ringkasan Progres, Status Langganan, Tryout Aktif, Rekomendasi Latihan
- `/app/student/arena` : **Dasbor Gamifikasi Gen Z** (Daily Streak Api, Level XP, Liga Mingguan, Daily Quests, Target Impian)
- `/app/student/katalog` : Daftar Paket Tryout (Gratis vs Premium)
- `/app/student/langganan` : Menu Pembelian Paket Langganan Siswa (Bulanan, 90 Hari, Eceran)
- `/app/student/redeem` : Form Input Kode Akses / Token Voucher Agency
- `/app/student/pembayaran/:order_id` : Checkout Invoice QRIS / VA
- `/app/student/exam/:attempt_id` : Ruang Ujian CBT Utama (Full Screen Lock)
- `/app/student/result/:attempt_id` : Halaman Skor, Radar Kelemahan, & Review Kunci
- `/app/student/solution/:attempt_id/:question_no` : Lembar Pembahasan & AI Diagnosa
- `/app/student/remedial/:subtopic_id` : Ruang Latihan Remedial 5-10 Soal
- `/app/student/riwayat` : Arsip Tryout & Grafik Perkembangan Skor dari Waktu ke Waktu

### 5.3 Dasbor Agency / Reseller (`/app/agency/...`)
- `/app/agency/dashboard` : Ringkasan Kuota Token, Siswa Aktif, Status SaaS Bimbel, Saldo Komisi
- `/app/agency/langganan` : Pengaturan Langganan Portal SaaS Bimbel (Aktif/Perpanjang)
- `/app/agency/kuota` : Beli Paket Lisensi Grosir (Tier 50, 150, 500 siswa)
- `/app/agency/voucher` : Pembuatan & Manajemen Kode Voucher (Filter: Terpakai / Belum)
- `/app/agency/monitoring` : Live Monitoring Ujian Siswa Bimbingan
- `/app/agency/kelas-analitik` : Peta Kelemahan Kolektif Murid Bimbel & Ekspor Rapor
- `/app/agency/dompet` : Riwayat Pendapatan, Penarikan Dana (Payout), Rekening Bank
- `/app/agency/branding` : Pengaturan Nama Bimbel, Logo, Kontak Admin Bimbel

### 5.4 Admin Command Center (`/app/admin/...`)
- `/app/admin/dashboard` : Metrik Operasional, Total Pendapatan, Attempt Aktif, Status Server
- `/app/admin/ai-studio` : Studio Pembuatan Soal AI (Input Topik / Kisi-kisi BSKAP)
- `/app/admin/bank-soal` : Repositori Soal, Filter Jenjang, Topik, Level L1-L3, Status Kurasi
- `/app/admin/kurasi/:question_id` : Reviewer Soal, Edit LaTeX, Cek Rubrik Pembahasan
- `/app/admin/paket-ujian` : Konfigurasi Paket CBT, Blueprint Komposisi Soal, Jadwal & Bobot
- `/app/admin/pelanggan/siswa` : **Manajemen Pelanggan Siswa** (Status Langganan, Masa Aktif, Upgrade/Extend Manual, Riwayat Beli)
- `/app/admin/pelanggan/agency` : **Manajemen Pelanggan Agency** (Status Mitra, Sisa Kuota Token, Portal SaaS, Riwayat Beli Grosir)
- `/app/admin/skema-harga` : **Pengaturan Skema Harga & Promo** (Konfigurasi Harga Paket Siswa, Grosir Token, Diskon & Kupon)
- `/app/admin/gamifikasi` : Pengaturan Poin XP, Misi Harian, Parameter Liga, dan Event Boss Raid
- `/app/admin/transaksi` : Log Transaksi Gateway Pembayaran & Rekonsiliasi Voucher
- `/app/admin/pengaturan` : Parameter AI (Model, Temperature), Prompt Presets, Master Kurikulum

---

## 6. Alur Pengguna Utama (User Journey Maps)

### 6.1 Alur Siswa Retail & Gamifikasi (Student Journey)
```
[Buka Web / Link Siswa] 
       |
[Daftar / Masuk] 
       |
[Pilih Paket Langganan di /langganan (Bulanan / 90 Hari) ATAU Masukkan Voucher Bimbel]
       |
[Bayar Otomatis via QRIS / VA] ---> [Akses Premium Aktif + Bonus 100 XP Onboarding]
       |
[Masuk Ruang Ujian CBT / Daily Quest]
       |
[Mengerjakan Soal (Autosave per klik + Timer Server)]
       |
[Submit Ujian]
       |
[Layar Perayaan & Diagnostik]:
  |-- Reward: +150 XP, +10 Koin, Streak Belajar Naik 1 Hari (Api Membara)
  |-- Skor Total & Persentil
  |-- Radar Chart Kelemahan per Subtopik
  \-- Diagnosa Miskonsepsi AI
       |
[Aksi Lanjutan]:
  +---> [Baca Pembahasan Step-by-Step]
  +---> [Klik "AI Remedial Drill" untuk Latihan 5 Soal Lemah]
  \---> [Buka "Arena Gamifikasi" untuk Pantau Posisi Liga Mingguan]
```

### 6.2 Alur Agency / Bimbel (Reseller Journey)
```
[Daftar Mitra Agency di /agency]
       |
[Verifikasi Data Lembaga & Pilih Skema (Grosir Token ATAU Portal SaaS Bulanan)]
       |
[Bayar Kuota Grosir via QRIS/VA] ---> [Kuota Token Masuk ke Saldo]
       |
[Generate Batch Voucher (Misal: 100 Kode untuk Siswa Kelas 9)]
       |
[Bagikan Link Khusus: cbt-tka.id/b/bimbel-prestasi]
       |
[Murid Aktivasi & Mengerjakan CBT]
       |
[Dasbor Agency Update Real-time]:
  |-- Pantau Siapa yang Sedang / Selesai Ujian
  |-- Rekap Nilai Satu Kelas (Download Excel Rapor)
  \-- Rekomendasi Kurikulum Bimbel berdasarkan Materi Terlemah Murid
```

### 6.3 Alur Admin: Manajemen Pelanggan & Penetapan Harga
```
[Admin Buka Dasbor Admin]
       |
+---> [Menu /pelanggan/siswa] ---> [Cari Siswa, Cek Masa Aktif, Beri Kompensasi Ekstra Hari jika Ada Kendala]
+---> [Menu /pelanggan/agency] --> [Verifikasi Bimbel, Tambah Kuota Khusus, Aktifkan Status Mitra Resmi]
+---> [Menu /skema-harga] -------> [Ubah Tarif Bulanan/Semester, Buat Kode Promo Diskon Ujian]
\---> [Menu /ai-studio] ---------> [Produksi & Kurasi Soal Standar BSKAP Kemendikdasmen]
```

---

## 7. Arsitektur Teknologi & Infrastruktur

### 7.1 Frontend
- **Framework:** React 19 / Next.js (App Router) atau Vite SPA dengan SSR untuk Landing.
- **Styling:** Tailwind CSS v4 dengan token variabel CSS semantik.
- **Icon Library:** `@phosphor-icons/react` untuk seluruh antarmuka (konsisten stroke 1.5).
- **Gamifikasi FX:** CSS keyframes ringan untuk nyala api streak, confetti partikel saat submit nilai tinggi.
- **Matematika & Rumus:** KaTeX untuk render rumus ultra-cepat dan ringan.
- **Komponen UI:** Radix Primitives + Headless Components kustom (tanpa dependensi berat).
- **Grafik:** Recharts / SVG Radar Engine kustom yang responsif di viewport mobile.

### 7.2 Backend & Data
- **Database:** PostgreSQL (Neon / Supabase) dengan Row-Level Security (RLS) ketat.
- **State & Cache Klien:** IndexedDB (melalui pustaka Dexie.js / idb) untuk penyimpanan jawaban ujian offline-first.
- **Otentikasi:** JWT aman dengan HTTP-Only Cookie dan role claim (admin, agency, student).
- **Cron Jobs & Leaderboard Engine:** Scheduled job setiap Minggu tengah malam untuk kalkulasi promosi/degradasi Liga Mingguan dan reset Daily Streak bagi yang tidak aktif.
- **Penyedia Pembayaran:** Midtrans / DOKU / Xendit (QRIS Otomatis, Virtual Account).

### 7.3 AI Question Generation Engine
- **LLM Backbone:** Google Gemini API (Gemini 2.5 Pro / Flash) dengan JSON mode ketat (`responseSchema`).
- **Prompt Architecture:** Mengadopsi arsitektur prompt BuatSoal Online dengan penyempurnaan taksonomi Kemendikdasmen:
  - Input: Tingkat Jenjang, Domain Konten, Subdomain, Level Kognitif (L1/L2/L3), Format Soal, Konteks Stimulus Indonesia.
  - Output: JSON terstruktur berisi Stimulus, Pertanyaan, Pilihan Jawaban, Kunci Jawaban Valid, Penjelasan Lengkap Langkah Demi Langkah, dan Tag Jebakan Konsepsi.
