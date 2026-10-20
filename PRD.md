# Dokumen Kebutuhan Produk (PRD): Platform CBT TKA Online Individual

> **Nama Proyek:** CBT TKA Online Mandiri & Kemitraan Agency  
> **Versi:** 2.0 (Pemutakhiran Skema Langganan, Manajemen Pelanggan Admin, dan Gamifikasi Gen Z)  
> **Fokus Utama:** Responsif Semua Ukuran Layar (Mobile-First Prioritas), Bank Soal AI, 3 Role Pengguna, Gamifikasi Gen Z, Diagnostik Kelemahan Terarah  

---

## 1. Ikhtisar Produk (Product Overview)

CBT TKA Online adalah sistem ujian terkomputerisasi yang dirancang khusus untuk memenuhi standar Asesmen Kemampuan Akademik (TKA) resmi Kemendikdasmen (sesuai BSKAP No. 047/H/AN/2025 untuk jenjang SD-SMP dan No. 045/H/AN/2025 untuk jenjang SMA/SMK).

Sistem ini melayani 3 aktor utama:
1. **Admin:** Mengoperasikan AI Question Production Studio untuk memproduksi, mengurasi, dan merilis paket soal TKA berkualitas tinggi dengan format stimulus kontekstual, serta mengelola skema langganan pelanggan siswa dan mitra agency.
2. **Agency / Reseller (Bimbel / Sekolah / Mitra):** Membeli kuota paket ujian dengan harga grosir atau berlangganan portal bimbel mandiri (SaaS), mendistribusikan kode voucher bermerek (co-branded), dan mengakses laporan analitik kelemahan kolektif murid bimbingannya.
3. **Siswa (Student):** Mengakses simulasi ujian di perangkat apa pun (terutama smartphone), merasakan simulasi dengan proteksi server, menerima analisis diagnostik radar kelemahan per subtopik, mendapatkan sesi remedial adaptif instan dari AI, serta termotivasi melalui Arena Gamifikasi Gen Z (Streak harian ala TikTok, XP, Liga Mingguan, dan Koin).

---

## 2. Sasaran & Metrik Keberhasilan (Goals & KPI)

1. **Efisiensi Produksi Soal:** Admin dapat memproduksi 1 paket ujian lengkap (40 soal HOTS dengan stimulus bacaan dan tabel) dalam waktu kurang dari 15 menit melalui AI Question Studio.
2. **Kinerja Mobile CBT:** Lolos tes kecepatan (LCP < 2.0 detik), pergantian nomor soal < 50ms tanpa reload, dan ukuran tombol minimal 48px untuk kenyamanan jempol.
3. **Retensi Belajar Siswa (Gamification Stickiness):** Tingkat retensi harian (Day-7 Retention) mencapai > 45% berkat sistem Daily Streak Api Belajar dan misi harian.
4. **Ketahanan Jaringan (Zero Data Loss):** 100% jawaban tersimpan di IndexedDB lokal secara instan sebelum dikirim ke server. Skenario internet terputus hingga 10 menit tidak menyebabkan data hilang.
5. **Konversi & Adopsi Agency:** Dasbor B2B yang siap pakai memungkinkan sebuah Bimbel mengelola 500 murid dalam satu klik tanpa beban teknis.

---

## 3. Persona Pengguna & User Stories

### 3.1 Persona Siswa: Arya (15 tahun, Siswa Kelas 9 SMP - Generasi Z)
- **Tujuan:** Ingin lolos ke SMA favorit melalui jalur prestasi TKA dan mengukur kemampuannya secara kompetitif.
- **Tantangan:** Belajar dari buku soal tebal sangat membosankan. Suka bermain game kompetitif dan scrolling media sosial (TikTok, Instagram). Cepat kehilangan motivasi jika tidak ada progres visual yang jelas.
- **Kebutuhan:** Tampilan HP yang asyik, adanya Daily Streak api belajar yang memicu rasa ingin mempertahankan kebiasaan belajar harian, naik level XP, papan peringkat liga mingguan bersama teman, serta pembahasan cepat mengapa jawabannya salah.

### 3.2 Persona Agency: Ibu Maya (38 tahun, Pemilik Bimbel Prestasi Mandiri)
- **Tujuan:** Memberikan fasilitas tryout TKA berkala untuk 120 murid bimbingannya tanpa perlu membangun aplikasi sendiri yang mahal.
- **Tantangan:** Sulit memetakan materi apa yang belum dikuasai oleh murid kelasnya secara serentak.
- **Kebutuhan:** Membeli kuota voucher grosir dengan harga terjangkau, membagikan link tryout berlogo bimbelnya sendiri, serta mengunduh rekap nilai dan peta materi lemah murid untuk bahan ajar tentor.

### 3.3 Persona Admin: Pak Budi (32 tahun, Kepala Akademik & Pengembang Platform)
- **Tujuan:** Menjaga ketersediaan paket tryout baru setiap minggu dengan kualitas soal HOTS standar nasional, serta mengatur pendapatan langganan retail dan kemitraan bimbel.
- **Tantangan:** Menulis stimulus naratif secara manual sangat melelahkan, dan mengelola ratusan data pelanggan siswa serta kuota bimbel secara manual rawan salah hitung.
- **Kebutuhan:** Engine AI pembuat soal standar kurikulum, menu manajemen pelanggan siswa (perpanjang masa aktif, cek transaksi), menu manajemen mitra agency (alokasi token grosir, status langganan SaaS portal), dan pengaturan skema harga dinamis.

---

## 4. Skema Penetapan Harga & Model Langganan (Pricing Models)

### 4.1 Skema Siswa (Student Retail Plans)

| Nama Paket | Biaya / Durasi | Fitur & Batasan | Target Pengguna |
| :--- | :--- | :--- | :--- |
| **Uji Coba Gratis (Free Tier)** | Rp0 (Selamanya) | 1 paket simulasi gratis per mapel, skor mentah akhir, tanpa pembahasan detail dan tanpa AI remedial drill. | Siswa coba-coba |
| **Pejuang Bulanan (Monthly Pass)** | Rp39.000 / 30 Hari | Akses tak terbatas semua paket latihan jenjang aktif, pembahasan lengkap step-by-step, radar diagnostik kelemahan, 10 sesi AI Remedial Drill per bulan, akses penuh Arena Gamifikasi & Liga Mingguan. | Latihan intensif bulanan |
| **Musim Ujian (Exam Pass 90 Hari)** | Rp89.000 / 90 Hari *(Rekomendasi Utama)* | Seluruh fitur bulanan, hemat lebih dari 25% (setara Rp980/hari), bonus 2x Streak Shield gratis, prioritas server tryout akbar nasional, dan rapor komprehensif siap cetak PDF. | Persiapan tuntas TKA |
| **Tiket Eceran (Single Tryout Token)** | Rp15.000 / Tiket | 1 tiket pengerjaan Tryout Akbar Nasional resmi berperingkat nasional dengan pembahasan lengkap (sekali pakai). | Siswa uji berkala |

### 4.2 Skema Kemitraan Agency / Reseller (B2B Bimbel Plans)

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

## 5. Spesifikasi Fungsional Rinci per Modul

### 5.1 Modul 1: AI Question Production Studio (Admin)
Mereplikasi dan meningkatkan kapabilitas engine BuatSoal Online:
- **Input Konfigurasi:** Jenjang (SD/SMP/SMA), Mata Pelajaran, Domain/Elemen, Subtopik, Level Kognitif (L1/L2/L3 HOTS), Format Soal (Pilihan Ganda, PGK MCMA, PGK Kategori, Menjodohkan, Isian Singkat), dan Bentuk Stimulus.
- **AI Processing:** Mengirim prompt terstruktur ke API Gemini dengan skema JSON ketat. Output: Stimulus, pertanyaan, opsi jawaban, kunci valid, pembahasan step-by-step, rumus format LaTeX (`$...$`), dan analisis distractor miskonsepsi.
- **Editor & Kurasi Human-in-the-Loop:** Pratinjau langsung KaTeX, editor teks instan, dan tombol persetujuan simpan ke Bank Soal Approved.

### 5.2 Modul 2: Manajemen Paket & Blueprint Ujian (Admin)
- Menentukan struktur paket (komposisi L1, L2, L3 dari berbagai subtopik).
- Pengaturan durasi timer (menit), jadwal pengerjaan, sistem penilaian, acak soal & opsi, serta passing grade.
- Penetapan tipe paket (Gratis, Langganan Bulanan, atau Tiket Eceran).

### 5.3 Modul 3: Manajemen Pelanggan Siswa (Admin Command Center)
- **Daftar & Filter Pelanggan Siswa:** Pencarian berdasarkan Nama, Email, Nomor WhatsApp, Jenjang, dan Status Langganan (Free, Active Monthly, Active 90-Hari, Expired).
- **Aksi Manajemen Akun:**
  - Perpanjangan manual masa aktif langganan (untuk kompensasi gangguan atau pembayaran transfer manual).
  - Upgrade paket langganan secara instan.
  - Reset kata sandi / sesi aktif perangkat jika terdeteksi penggunaan bersama ilegal.
- **Riwayat Transaksi & Invoice Siswa:** Daftar seluruh tagihan QRIS/VA, status lunas, nominal, dan tanggal kedaluwarsa.

### 5.4 Modul 4: Manajemen Pelanggan Agency / Mitra Bimbel (Admin)
- **Daftar Lembaga Mitra:** Nama Bimbel, Penanggung Jawab, Kontak WA, Subdomain Slug (`/b/slug`), Status Akun (Aktif, Menunggu Verifikasi, Ditangguhkan).
- **Pengaturan Saldo Kuota & Lisensi:** Penambahan saldo kuota token manual, histori pembelian grosir, dan pemantauan jumlah voucher yang telah diklaim murid.
- **Pengaturan Langganan Portal SaaS:** Tanggal jatuh tempo langganan bulanan bimbel, status aktif co-branding, dan pengaturan diskon khusus mitra VIP.
- **Approval Penarikan Komisi (Payout):** Verifikasi nomor rekening bank mitra dan persetujuan transfer komisi affiliate.

### 5.5 Modul 5: Pengaturan Skema Harga & Kupon Diskon (Admin)
- Form pengubahan harga paket siswa (Bulanan, 90 Hari, Eceran).
- Form konfigurasi tier diskon grosir kuota agency.
- Manajemen Kode Kupon / Promo: Persentase diskon, kuota pemakaian, tanggal berlaku, dan pembatasan jenjang.

### 5.6 Modul 6: Dasbor Agency & Reseller B2B
- Pembelian kuota lisensi grosir instan via QRIS / Virtual Account.
- Pembuatan batch voucher unik (contoh: 50 kode untuk kelas 9).
- Link Khusus Co-branded: `domain.com/b/nama-bimbel` dengan logo bimbel mitra.
- Live Monitoring Ujian Siswa dan Peta Kelemahan Kolektif Murid Bimbel.
- Ekspor Nilai ke Excel siap olah dan PDF Rapor Murid.
- Dompet Komisi dan riwayat penarikan dana.

### 5.7 Modul 7: Engine CBT Klien Tangguh (Student Exam Engine)
- Tampilan Dual Mode: Mode Pusmendik (Desktop resmi) dan Mode Modern Thumb-Zone (Mobile prioritas).
- Penyimpanan lokal instan di IndexedDB dan sinkronisasi berkala ke server per 10 detik.
- Waktu server terpusat (Server-Authoritative Timer) aman dari manipulasi jam lokal HP.
- Deteksi perpindahan tab browser dengan peringatan bertingkat.

### 5.8 Modul 8: Smart Diagnostic & AI Adaptive Remedial
- Skor total berskala 100, estimasi persentil nasional, dan Spider/Radar Chart 360 derajat penguasaan subtopik.
- AI Misconception Diagnostic: Ulasan personal alasan kekeliruan konsep siswa di tiap nomor salah.
- Tombol AI Remedial Drill: Memulai 5 soal kilat khusus subtopik terlemah berdurasi 10 menit.

### 5.9 Modul 9: Arena Gamifikasi Siswa ala Gen Z (Dedicated Student Hub)
- **Daily Streak (Api Belajar TikTok-Style):**
  - Mengerjakan minimal 1 sesi latihan mikro (3-5 soal) per hari mempertahankan api streak.
  - Visual api yang menyala terang dengan angka hari berturut-turut (misal: 14 Hari Api Belajar).
  - Fitur *Streak Shield* (Pelindung Api): Melindungi streak jika siswa terlewat 1 hari tanpa reset ke nol.
- **XP (Experience Points) & Level Rank:**
  - Jawab benar: +10 XP, Selesaikan Tryout: +150 XP, Tuntaskan Remedial AI: +80 XP.
  - Pangkat: Murid Magang (Lv 1-5), Pejuang TKA (Lv 6-15), Master Numerasi (Lv 16-30), Grandmaster (Lv 31-50), Legenda Nasional (Lv 50+).
- **TKA Coins & Reward Vault:**
  - Koin dikumpulkan dari streak mingguan, naik level, dan misi harian.
  - Dapat ditukar untuk membuka paket tryout rahasia, avatar frame profil, atau diskon langganan.
- **Daily Quests & Weekly Boss Raids:**
  - Misi Harian: "Pemanasan Pagi (Kerjakan 3 Soal)", "Koreksi 1 Miskonsepsi", "Blitz 5 Menit".
  - Weekly Boss Raid: Tantangan komunitas 20 soal HOTS akhir pekan berhadiah badge langka.
- **Liga Peringkat Mingguan (Weekly League):**
  - Papan peringkat 30 siswa sebaya di jenjang yang sama.
  - Divisi: Perunggu, Perak, Emas, Berlian, Mitos. Direset setiap Senin jam 00:00 WIB (Top 5 promosi, Bottom 3 degradasi).
- **Target Impian (Dream Target Tracker):**
  - Siswa menentukan sekolah/kampus target (misal: SMAN 8 Jakarta, target skor 85.0).
  - Progress bar kesiapan visual menuju target.

---

## 6. Kebutuhan Non-Fungsional (Non-Functional Requirements)

1. **Kecepatan & Responsivitas:** Waktu render pertama halaman soal < 300ms. Pustaka icon menggunakan SVG bawaan (@phosphor-icons/react).
2. **Kesesuaian Layar (Screen Breakpoints):** Mobile: 360px hingga 480px (Prioritas utama pengujian). Tablet: 768px hingga 1024px. Laptop / Desktop: 1280px hingga 1920px.
3. **Aksesibilitas & Anti-Slop Visual:** Mengikuti aturan Anti-AI Slop: Dilarang menggunakan tanda baca dash panjang (em-dash), dilarang memakai gradien ungu klise, dilarang memakai warna hitam pekat `#000000`, dan kontras teks memenuhi standar WCAG AA (minimal rasio 4.5:1). Fitur pembesar ukuran font teks soal (A- / A+) langsung di layar ujian.
4. **Keamanan Data:** Kunci jawaban tidak pernah dikirim ke browser siswa selama sesi ujian berlangsung.

---

## 7. Wireframe Lengkap Berbasis ASCII

Setiap menu disajikan dalam dua tampilan: **Desktop (>= 1024px)** dan **Mobile (Smartphone < 768px)**.

---

### 7.1 Landing Page Publik (`/`)

#### Tampilan Desktop (>= 1024px)
```
+----------------------------------------------------------------------------------------------------+
| [LOGO] CBT-TKA.ID    Jenjang SD    Jenjang SMP    Jenjang SMA    Paket Harga    Kemitraan   [Masuk] [Daftar]|
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|  [Tag: Resmi Sesuai BSKAP 047 & 045]                                                               |
|  Kuasai Tes Kemampuan Akademik (TKA)                                                               |
|  Dengan Diagnosa Presisi & Latihan Adaptif AI.                                                     |
|                                                                                                    |
|  Bukan sekadar tahu nilai akhir. Ketahui subtopik                                                  |
|  mana yang lemah dan perbaiki seketika dengan AI Drill.                                            |
|                                                                                                    |
|  [ Mulai Tes Demo Gratis ]    [ Lihat Paket Langganan ]                                            |
|                                                                                                    |
|  ------------------------------------------------------------------------------------------------  |
|  PILIH JENJANG PERSIAPANMU:                                                                        |
|                                                                                                    |
|  +---------------------------+  +---------------------------+  +--------------------------------+  |
|  | SD / MI                   |  | SMP / MTs                 |  | SMA / MA / SMK                 |  |
|  | Numerasi & Literasi Dasar |  | Aljabar, Geometri, Teks   |  | Sains, Soshum, Matematika Lanjut| |
|  | 12 Paket Simulasi Resmi   |  | 24 Paket Simulasi Resmi   |  | 36 Paket Simulasi Resmi        |  |
|  | [ Lihat Detail Jenjang ]  |  | [ Lihat Detail Jenjang ]  |  | [ Lihat Detail Jenjang ]       |  |
|  +---------------------------+  +---------------------------+  +--------------------------------+  |
|                                                                                                    |
|  KEUNGGULAN UTAMA DIBANDINGKAN CBT LAIN:                                                           |
|  * 100% Sesuai Format Asli Kemendikdasmen (PG, PG Kompleks, Menjodohkan, Isian)                    |
|  * Laporan Spider Chart Kelemahan per Subtopik Secara Rinci                                        |
|  * AI Adaptive Remedial Drill: 5 Soal Perbaikan Khusus Topik Lemah                                 |
|  * Arena Gamifikasi Gen Z: Daily Streak Api Belajar, XP, Liga Mingguan                             |
|  * Dasbor Khusus Mitra Bimbel & Reseller dengan Co-branding                                        |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
| (c) 2026 CBT-TKA.ID - Platform Ujian Akademik Terstandar Nasional. Hak Cipta Dilindungi.           |
+----------------------------------------------------------------------------------------------------+
```

#### Tampilan Mobile (Smartphone < 768px)
```
+-----------------------------------+
| [=] CBT-TKA.ID            [Masuk] |
+-----------------------------------+
| [Tag: Sesuai BSKAP 047 & 045]     |
| Kuasai Tes Kemampuan              |
| Akademik (TKA)                    |
|                                   |
| Diagnosa presisi kelemahan materi |
| dan perbaiki seketika via HP.     |
|                                   |
| [ Mulai Tes Demo Gratis (48px) ]  |
| [ Lihat Paket Langganan ]         |
|                                   |
| --------------------------------- |
| PILIH JENJANG:                    |
|                                   |
| +-------------------------------+ |
| | SD / MI                       | |
| | Numerasi & Literasi Dasar     | |
| | [ Buka Paket SD -> ]          | |
| +-------------------------------+ |
|                                   |
| +-------------------------------+ |
| | SMP / MTs                     | |
| | Aljabar, Geometri, Teks       | |
| | [ Buka Paket SMP -> ]         | |
| +-------------------------------+ |
|                                   |
| +-------------------------------+ |
| | SMA / MA / SMK                | |
| | Wajib & Pilihan Lengkap       | |
| | [ Buka Paket SMA -> ]         | |
| +-------------------------------+ |
|                                   |
| FITUR UNGGULAN:                   |
| [V] Tampilan Ramah Jempol         |
| [V] Daily Streak Api Belajar      |
| [V] Radar Kelemahan Subtopik      |
| [V] Latihan Remedial AI 1-Klik    |
+-----------------------------------+
| [ Beranda ]  [ Katalog ]  [ Akun ]|
+-----------------------------------+
```

---

### 7.2 Halaman Paket & Biaya Langganan Siswa (`/app/student/langganan`)

#### Tampilan Desktop (>= 1024px)
```
+----------------------------------------------------------------------------------------------------+
| [LOGO] CBT-TKA   [Ujian Saya] [Arena] [Katalog] [Rapor]            [Paket Aktif: Free] [Arya (v)]  |
+----------------------------------------------------------------------------------------------------+
| PILIH PAKET BELAJAR TKA: INVESTASI MASA DEPAN MENUJU SEKOLAH IMPIAN                                |
| Dapatkan akses penuh ke seluruh bank soal terstandar, pembahasan AI, dan radar diagnostik lengkap. |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|  +--------------------------+  +--------------------------+  +-----------------------------------+ |
|  | PEJUANG BULANAN          |  | MUSIM UJIAN (90 HARI)    |  | TIKET ECERAN TRYOUT               | |
|  | Akses Harian Intensif    |  | [ PALING POPULER ]       |  | Sekali Pengerjaan                 | |
|  |                          |  |                          |  |                                   | |
|  | Rp39.000                 |  | Rp89.000                 |  | Rp15.000                          | |
|  | per 30 hari              |  | per 90 hari (~Rp980/hari)|  | per 1 sesi tryout                 | |
|  |                          |  | (Hemat 25% + Bonus)      |  |                                   | |
|  | [V] Akses Semua Mapel    |  | [V] Semua Fitur Bulanan  |  | [V] 1 Tryout Nasional Resmi       | |
|  | [V] Pembahasan Lengkap AI|  | [V] 90 Hari Akses Penuh  |  | [V] Hasil Skor & Kunci            | |
|  | [V] Radar Diagnostik     |  | [V] Prioritas Server     |  | [V] Peringkat Nasional            | |
|  | [V] 10 Remedial Drill/bln|  | [V] 2x Streak Shield     |  | [-] Tanpa Remedial AI             | |
|  | [V] Arena Gamifikasi     |  | [V] Rapor Cetak PDF      |  | [-] Tanpa Akses Harian            | |
|  |                          |  |                          |  |                                   | |
|  | [ Pilih Paket Bulanan ]  |  | [ LANGGANAN SEKARANG ]   |  | [ Beli 1 Tiket ]                  | |
|  +--------------------------+  +--------------------------+  +-----------------------------------+ |
|                                                                                                    |
|  Punya Kode Voucher dari Bimbel Mitra? [ Masukkan Kode Voucher di Sini ]                           |
+----------------------------------------------------------------------------------------------------+
```

#### Tampilan Mobile (Smartphone < 768px)
```
+-----------------------------------+
| [<-] Pilih Paket Langganan        |
+-----------------------------------+
| Tingkatkan kemampuan TKA sekarang |
|                                   |
| +-------------------------------+ |
| | MUSIM UJIAN (90 HARI) [REKOM] | |
| | Rp89.000 / 90 Hari            | |
| | (Hanya ~Rp980 per hari!)      | |
| |                               | |
| | [V] Semua Paket Latihan       | |
| | [V] Pembahasan Lengkap AI     | |
| | [V] Radar Diagnostik Kelemahan| |
| | [V] Bonus 2x Streak Shield    | |
| |                               | |
| | [ PILIH PAKET 90 HARI (48PX) ]| |
| +-------------------------------+ |
|                                   |
| +-------------------------------+ |
| | PEJUANG BULANAN               | |
| | Rp39.000 / 30 Hari            | |
| | [V] Akses Penuh 1 Bulan       | |
| | [ Pilih Paket Bulanan ]       | |
| +-------------------------------+ |
|                                   |
| +-------------------------------+ |
| | TIKET ECERAN: Rp15.000        | |
| | 1x Tryout Nasional Resmi      | |
| | [ Beli Tiket ]                | |
| +-------------------------------+ |
|                                   |
| Ada Kode Voucher Bimbel?          |
| [+ Masukkan Kode Token di Sini ]  |
+-----------------------------------+
```

---

### 7.3 Arena Gamifikasi Siswa POV Gen Z (`/app/student/arena`)

#### Tampilan Desktop (>= 1024px)
```
+----------------------------------------------------------------------------------------------------+
| [LOGO] CBT-TKA   [Ujian Saya] [ARENA & MISI (v)] [Katalog] [Rapor]  [Api: 14 Hari] [XP: 2.450] [K:85] [Arya]|
+----------------------------------------------------------------------------------------------------+
| ARENA BELAJAR TKA: GENERASI JUARA                                Target: SMAN 8 JAKARTA (85.0)     |
+----------------------------------------------------------------------------------------------------+
| +-------------------------------------------------------+ +--------------------------------------+ |
| | STATUS STREAK & LEVEL SAYA                            | | LIGA MINGGUAN: DIVISI EMAS           | |
| |                                                       | | Sisa Waktu Liga: 2 Hari 14 Jam       | |
| | (API MEMBARA) 14 HARI STREAK BELAJAR BERTURUT-TURUT!  | | Peringkat Anda: #3 (Zona Promosi!)   | |
| | "Kerjakan 1 kuis kilat hari ini agar apimu tak padam!"| |                                      | |
| | [Status Streak Shield: Aktif (Tersisa 1 Pelindung)]   | | 1. Farhan Hakim     3.120 XP [Naik]  | |
| |                                                       | | 2. Cinta Laura S.   2.890 XP [Naik]  | |
| | LEVEL 18: MASTER NUMERASI TKA                         | |*3. Arya Pratama     2.450 XP [Naik]  | |
| | Progress XP: [====================--------] 2.450/3000| | 4. Dinda Rahma      2.210 XP         | |
| |                                                       | | ...                                  | |
| | [ +550 XP lagi untuk naik ke Level 19 ]               | | 28. Kevin Sanjaya   450 XP  [Turun]  | |
| +-------------------------------------------------------+ +--------------------------------------+ |
|                                                                                                    |
| MISI HARIAN (DAILY QUESTS):                                                                        |
| +------------------------------------+ +------------------------------------+ +--------------------+ |
| | [V] PEMANASAN PAGI                 | | [>] TAKLUKKAN MISKONSEPSI          | | [ ] BLITZ 5 MENIT  | |
| | Kerjakan 3 soal latihan numerasi   | | Baca 1 pembahasan soal salah       | | Jawab 5 soal benar | |
| | Hadiah: +30 XP, +5 Koin (SELESAI)  | | Hadiah: +25 XP, +5 Koin            | | Hadiah: +50 XP     | |
| | [ Klaim Hadiah ]                   | | [ Kerjakan Misi Ini -> ]           | | [ Mulai Blitz ]    | |
| +------------------------------------+ +------------------------------------+ +--------------------+ |
|                                                                                                    |
| TARGET IMPIAN SAYA (DREAM TRACKER): SMAN 8 JAKARTA (Passing Grade: 85.0)                           |
| Skor Terkini Anda: 76.5  |  Kesiapan Materi: [=======================-------] 76.5%                |
| Rekomendasi Hari Ini: Selesaikan 1 Sesi Remedial Aljabar untuk menambah +5 Poin Kesiapan!          |
+----------------------------------------------------------------------------------------------------+
```

#### Tampilan Mobile (Smartphone < 768px)
```
+-----------------------------------+
| [=] ARENA BELAJAR     [Koin: 85]  |
+-----------------------------------+
| (API) 14 HARI STREAK BELAJAR!     |
| Nyalakan terus sebelum jam 23:59! |
| [Shield: Aktif 1x]                |
|                                   |
| LEVEL 18: MASTER NUMERASI         |
| 2.450 / 3.000 XP [========--]     |
|                                   |
| --------------------------------- |
| LIGA MINGGUAN: DIVISI EMAS        |
| Posisi Anda: #3 DARI 30 (PROMOSI) |
| #1. Farhan (3.120 XP)             |
| #2. Cinta  (2.890 XP)             |
|*#3. Arya   (2.450 XP) [ZONA NAIK] |
|                                   |
| MISI HARI INI (DAILY QUESTS):     |
| +-------------------------------+ |
| | [V] Pemanasan Pagi (+30 XP)   | |
| | [KLAIM HADIAH +5 KOIN]        | |
| +-------------------------------+ |
| +-------------------------------+ |
| | [>] Review 1 Soal Salah       | |
| | [ Buka Pembahasan (+25 XP) ]  | |
| +-------------------------------+ |
| +-------------------------------+ |
| | [ ] Blitz 5 Menit Numerasi    | |
| | [ Mainkan Blitz (+50 XP) ]    | |
| +-------------------------------+ |
|                                   |
| TARGET SMAN 8 JAKARTA (85.0):     |
| Skor Anda: 76.5 [=======----]     |
| [ Latih Aljabar Hari Ini -> ]     |
+-----------------------------------+
| [ Beranda ]  [ Arena ]  [ Akun ]  |
+-----------------------------------+
```

---

### 7.4 Ruang Ujian CBT Siswa (`/app/student/exam/:attempt_id`)

#### Tampilan Desktop: Mode Pusmendik (>= 1024px)
```
+----------------------------------------------------------------------------------------------------+
| SIMULASI CBT TKA KEMENDIKDASMEN                                  Arya Pratama | SMPN 1 JAKARTA     |
| Mata Uji: Matematika SMP (Paket 02)                              Sisa Waktu: [ 01 : 24 : 15 ]      |
+----------------------------------------------------------------------------------------------------+
| Ukuran Font: [ A- ] [ A ] [ A+ ]                                            Status: [ Terhubung ]  |
+----------------------------------------------------+-----------------------------------------------+
| STIMULUS & SOAL NOMOR 14 DARI 40                   | DAFTAR NOMOR SOAL:                            |
|                                                    | +----+----+----+----+----+----+----+----+----+ |
| Stimulus Bacaan:                                   | | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09 | |
| Sebuah toko alat tulis mengadakan promo paket      | |[V] |[V] |[V] |[V] |[V] |[V] |[V] |[V] |[V] | |
| buku dan pulpen. Harga 3 buku dan 2 pulpen adalah  | +----+----+----+----+----+----+----+----+----+ |
| Rp29.000,00. Jika harga 1 pulpen adalah Rp4.000,00.| | 10 | 11 | 12 | 13 |*14*| 15 | 16 | 17 | 18 | |
|                                                    | |[V] |[V] |[V] |[V] |[?]| |    |    |    |    | |
| Pertanyaan:                                        | +----+----+----+----+----+----+----+----+----+ |
| Berapakah jumlah buku tulis maksimal yang dapat    | | 19 | 20 | 21 | 22 | 23 | 24 | 25 | ... | 40 | |
| dibeli Ani jika ia memiliki uang Rp35.000,00?      | +----+----+----+----+----+----+----+----+----+ |
|                                                    | Keterangan:                                   |
| ( ) A. 3 buku                                      | [V] Sudah Dijawab (Hijau)                     |
| ( ) B. 4 buku                                      | [?] Ragu-Ragu (Kuning)                        |
| (*) C. 5 buku                                      | [ ] Belum Dijawab (Abu-Abu)                   |
| ( ) D. 6 buku                                      |                                               |
+----------------------------------------------------+-----------------------------------------------+
| [ <- Soal Sebelumnya ]           [ [?] Ragu-Ragu ]                   [ Simpan & Lanjut -> ] [SUBMIT]|
+----------------------------------------------------------------------------------------------------+
```

#### Tampilan Mobile: Mode Modern Thumb-Zone (< 768px)
```
+-----------------------------------+
| TKA Matematika SMP   Waktu: 84:15 |
| Soal 14/40            [A-] [A+]   |
+-----------------------------------+
| [STIMULUS BACAAN] (Ketuk ringkas) |
| Promo Alat Tulis:                 |
| 3 Buku + 2 Pulpen = Rp29.000      |
| Harga 1 Pulpen = Rp4.000          |
|                                   |
| PERTANYAAN:                       |
| Berapa buku yang bisa dibeli      |
| dengan uang Rp35.000?             |
|                                   |
| [ OPSI JAWABAN - MIN TINGGI 48PX ]|
| +-------------------------------+ |
| | [ ] A. 3 buku                 | |
| +-------------------------------+ |
| | [ ] B. 4 buku                 | |
| +-------------------------------+ |
| | [*] C. 5 buku    (Terpilih)   | |
| +-------------------------------+ |
| | [ ] D. 6 buku                 | |
| +-------------------------------+ |
|                                   |
| [Status: Tersimpan ke Server]     |
+-----------------------------------+
| [<- Prev]   [ [?] Ragu ]   [Next->|
+-----------------------------------+
| [ ^ Buka Navigasi 40 Soal (Sheet)]|
+-----------------------------------+
```

---

### 7.5 Laporan Diagnostik & Spider Chart (`/app/student/result/:attempt_id`)

#### Tampilan Desktop (>= 1024px)
```
+----------------------------------------------------------------------------------------------------+
| HASIL TRYOUT: TKA SMP MATEMATIKA (PAKET 02)                                       [ Cetak Rapor ]  |
| Peserta: Arya Pratama | Status: Selesai | Reward: +150 XP, +10 Koin TKA | Waktu: 78 Menit          |
+----------------------------------------------------------------------------------------------------+
| +------------------------------+  +--------------------------------------------------------------+ |
| | SKOR KESELURUHAN             |  | PETA PENGUASAAN SUBTOPIK (RADAR CHART)                       | |
| |                              |  |                                                              | |
| |      76.5 / 100              |  |                       Bilangan (90%)                         | |
| |                              |  |                             /\                               | |
| | Status: Lulus Standar Target |  |                            /  \                              | |
| | Benar: 31 | Salah: 7 | Ragu: 2|  |              Geometri    /    \   Aljabar                    | |
| | Estimasi Peringkat: 14 / 120 |  |                (75%)    /      \  (42% - KRITIS)             | |
| +------------------------------+  |                         \      /                             | |
|                                   |                          \____/                              | |
|                                   |                      Statistika (88%)                        | |
|                                   +--------------------------------------------------------------+ |
| TEMUAN DIAGNOSTIK KUNCI DARI AI:                                                                   |
| 1. Kelemahan Kritis: Anda kehilangan 18 poin di materi Sistem Persamaan Linear dan Pecahan Aljabar.|
| 2. Analisis Miskonsepsi: Anda cenderung keliru saat memindahkan tanda variabel (+ / -) ruas kiri. |
| 3. Rekomendasi Tindakan:                                                                           |
|    [ Mulai AI Remedial Drill: 5 Soal Aljabar Kilat ]    [ Buka Pembahasan Lengkap Semua Nomor ]    |
+----------------------------------------------------------------------------------------------------+
```

#### Tampilan Mobile (Smartphone < 768px)
```
+-----------------------------------+
| [<-] Rapor Hasil Ujian            |
+-----------------------------------+
| TKA Matematika SMP (Paket 02)     |
| REWARD: +150 XP, STREAK +1 HARI   |
|                                   |
| SKOR AKHIR:                       |
| +-------------------------------+ |
| |         76.5 / 100            | |
| | Benar: 31 | Salah: 7 | Ragu: 2| |
| | Peringkat Bimbel: 14 dari 120 | |
| +-------------------------------+ |
|                                   |
| RADAR KELEMAHAN SUBTOPIK:         |
| 1. Bilangan Bulat      90% [OK]   |
| 2. Statistika & Data   88% [OK]   |
| 3. Bangun Ruang        75% [Cukup]|
| 4. Aljabar & SPLDV     42% [LEMAH]|
|                                   |
| DIAGNOSA AI:                      |
| "Kelemahan terbesar ada pada      |
| penyelesaian SPLDV eliminasi."    |
|                                   |
| TINDAK LANJUT SEKARANG:           |
| +-------------------------------+ |
| | [ Latih Kelemahan Ini (AI) ]  | |
| | (5 Soal Kilat | 10 Menit)     | |
| +-------------------------------+ |
|                                   |
| [ Lihat Pembahasan Detail (40) ]  |
+-----------------------------------+
```

---

### 7.6 Pembahasan Soal & AI Misconception (`/app/student/solution/:attempt_id/:no`)

#### Tampilan Desktop (>= 1024px)
```
+----------------------------------------------------------------------------------------------------+
| PEMBAHASAN TRYOUT: SOAL NO. 14 DARI 40                    [<- Sebelumnya] [Daftar Soal] [Berikutnya->|
+----------------------------------------------------------------------------------------------------+
| SOAL & STIMULUS:                                    | ANALISIS JAWABAN ANDA:                       |
| Harga 3 buku dan 2 pulpen Rp29.000.                 | Status: [ SALAH ]                            |
| Harga 1 pulpen Rp4.000.                             | Jawaban Anda: B (4 buku)                     |
| Berapa buku yang bisa dibeli dengan Rp35.000?       | Kunci Benar : C (5 buku)                     |
|                                                     |                                              |
| Opsi Pilihan:                                       | CATATAN DIAGNOSTIK AI:                       |
| A. 3 buku                                           | "Anda memilih 4 buku karena lupa mengurangkan|
| B. 4 buku (Jawaban Anda - Keliru)                   | total harga 2 pulpen (Rp8.000), melainkan    |
| C. 5 buku (Kunci Jawaban Benar)                     | hanya mengurangkan harga 1 pulpen (Rp4.000). |
| D. 6 buku                                           | Ini adalah jebakan distraktor umum."         |
|                                                     |                                              |
+-----------------------------------------------------+----------------------------------------------+
| LANGKAH PEMBAHASAN LENGKAP:                                                                        |
| 1. Cari total harga 2 pulpen: 2 x Rp4.000 = Rp8.000.                                               |
| 2. Cari harga 3 buku: Rp29.000 - Rp8.000 = Rp21.000.                                               |
| 3. Cari harga 1 buku: Rp21.000 / 3 = Rp7.000 per buku.                                             |
| 4. Hitung buku yang dapat dibeli dengan Rp35.000: Rp35.000 / Rp7.000 = 5 buku.                     |
|                                                                                                    |
| KESIMPULAN: Jawaban yang tepat adalah C (5 buku).                                                  |
+----------------------------------------------------------------------------------------------------+
```

#### Tampilan Mobile (Smartphone < 768px)
```
+-----------------------------------+
| [<-] Pembahasan Soal 14/40        |
+-----------------------------------+
| Status: [ SALAH ]                 |
| Jawaban Anda : B (4 buku)         |
| Kunci Resmi  : C (5 buku)         |
|                                   |
| DIAGNOSA KESALAHAN AI:            |
| "Anda hanya mengurangi 1 pulpen   |
| (Rp4.000), bukan 2 pulpen         |
| (Rp8.000). Selalu periksa jumlah  |
| item pada cerita soal."           |
|                                   |
| LANGKAH PENYELESAIAN:             |
| 1. 2 Pulpen = 2 x 4.000 = 8.000   |
| 2. 3 Buku = 29.000 - 8.000 = 21.000|
| 3. 1 Buku = 21.000 / 3 = 7.000    |
| 4. Buku = 35.000 / 7.000 = 5 buku |
|                                   |
| Opsi yang benar: C (5 buku)       |
|                                   |
| --------------------------------- |
| [ <- Soal Sebelumnya ] [ Lanjut ->|
+-----------------------------------+
```

---

### 7.7 Dasbor Agency: Overview & Kuota (`/app/agency/dashboard`)

#### Tampilan Desktop (>= 1024px)
```
+----------------------------------------------------------------------------------------------------+
| [LOGO] CBT-TKA MITRA AGENCY     [Dasbor] [Voucher] [Analitik Kelas] [Dompet]    [Bimbel Prestasi (v)|
+----------------------------------------------------------------------------------------------------+
| DASBOR KEMITRAAN: BIMBEL PRESTASI MANDIRI                  Link Siswa: cbt-tka.id/b/bimbel-prestasi|
+----------------------------------------------------------------------------------------------------+
| METRIK UTAMA:                                                                                      |
| +-------------------------+ +-------------------------+ +----------------------------------------+ |
| | SISA KUOTA SISWA        | | TOTAL SISWA TERDAFTAR   | | PETA MATERI PALING LEMAH KELAS         | |
| | 85 / 150 Token          | | 124 Siswa Aktif         | | 1. SPLDV Aljabar (Tingkat Salah: 58%)   | |
| | [ Beli Tambahan Kuota ] | | 65 Sudah Selesai Tryout | | 2. Bangun Ruang Kerucut (Salah: 42%)   | |
| +-------------------------+ +-------------------------+ +----------------------------------------+ |
|                                                                                                    |
| MONITORING AKTIVITAS KELAS TERBARU:                                                                |
| Nama Siswa           Kelas       Paket Ujian                Skor       Status     Aksi             |
| -------------------------------------------------------------------------------------------------- |
| Arya Pratama         SMP-9A      TKA Matematika Paket 02    76.5       Selesai    [ Lihat Rapor ]  |
| Nabila Putri         SMP-9A      TKA Matematika Paket 02    88.0       Selesai    [ Lihat Rapor ]  |
| Rizky Ramadhan       SMP-9B      TKA Matematika Paket 02    --         Sedang Uji [ Pantau ]       |
| Siti Nurhaliza       SMP-9B      TKA Matematika Paket 02    --         Belum Mulai[ Kirim WA ]     |
|                                                                                                    |
| [ Download Rekap Excel Nilai ]     [ Generate 50 Kode Voucher Baru ]                               |
+----------------------------------------------------------------------------------------------------+
```

#### Tampilan Mobile (Smartphone < 768px)
```
+-----------------------------------+
| [=] BIMBEL PRESTASI      [Agency] |
+-----------------------------------+
| Ringkasan Kuota:                  |
| Sisa Token: 85 dari 150 Siswa     |
| Total Siswa: 124 Terdaftar        |
|                                   |
| [ + Beli Tambah Kuota Grosir ]    |
| [ + Buat Batch Voucher Baru ]     |
|                                   |
| PERHATIAN KELAS INI:              |
| Materi Paling Lemah:              |
| 1. Aljabar SPLDV (58% Salah)      |
| 2. Bangun Ruang Kerucut (42%)     |
|                                   |
| AKTIVITAS TERKINI:                |
| +-------------------------------+ |
| | Arya Pratama (SMP-9A)         | |
| | Nilai: 76.5 | Selesai         | |
| | [ Detail Hasil ]              | |
| +-------------------------------+ |
| +-------------------------------+ |
| | Rizky Ramadhan (SMP-9B)       | |
| | Status: Sedang Ujian          | |
| +-------------------------------+ |
|                                   |
| [ Unduh Rekap Nilai (Excel) ]     |
+-----------------------------------+
| [ Dasbor ]  [ Voucher ]  [ Siswa ]|
+-----------------------------------+
```

---

### 7.8 Admin: AI Question Production Studio (`/app/admin/ai-studio`)

#### Tampilan Desktop (>= 1024px)
```
+----------------------------------------------------------------------------------------------------+
| [ADMIN] AI QUESTION PRODUCTION STUDIO                         [Bank Soal] [Paket] [Mitra] [Keluar] |
+----------------------------------------------------------------------------------------------------+
| KONFIGURASI PARAMETER ASESMEN:                                                                     |
| Jenjang : [ SMP / MTs        (v) ]   Mata Pelajaran : [ Matematika           (v) ]                 |
| Elemen  : [ Aljabar          (v) ]   Subtopik       : [ Sistem Persamaan Linear  ]                 |
| Level   : [ L3 - Penalaran   (v) ]   Bentuk Soal    : [ Pilihan Ganda Tunggal(v) ]                 |
| Konteks : [ Masalah Jual Beli Keseharian dengan Stimulus Narasi ]                                  |
| Model AI: [ Gemini 2.5 Flash (v) ]   Suhu Kognitif  : [ 0.3 - Presisi Tinggi ]                     |
|                                                                                                    |
| [ >>> GENERATE SOAL DENGAN AI <<< ]                                                                |
+----------------------------------------------------------------------------------------------------+
| HASIL GENERASI AI & LIVE PREVIEW:                                                                  |
|                                                                                                    |
| Stimulus (Markdown + LaTeX):                                                                       |
| Di koperasi sekolah, harga $2$ buku tulis dan $3$ pensil adalah $Rp17.000,00$.                     |
| Sedangkan harga $5$ buku tulis dan $2$ pensil adalah $Rp37.000,00$.                                |
|                                                                                                    |
| Pertanyaan:                                                                                        |
| Berapakah harga $1$ lusin ($12$ buah) buku tulis?                                                  |
|                                                                                                    |
| Pilihan Jawaban:                                                                                   |
| [ ] A. Rp72.000,00                                                                                 |
| [*] B. Rp84.000,00   (Kunci Jawaban Ditandai Benar)                                                |
| [ ] C. Rp96.000,00                                                                                 |
| [ ] D. Rp108.000,00                                                                                |
|                                                                                                    |
| Pembahasan Lengkap:                                                                                |
| Eliminasi $2x + 3y = 17000$ dan $5x + 2y = 37000$, didapat $x = 7000$.                             |
| Maka $12x = 12 \times 7000 = Rp84.000,00$.                                                        |
|                                                                                                    |
| Tag Miskonsepsi: Opsi A dipilih jika siswa lupa mengalikan lusin dan hanya mengalikan 10.          |
|                                                                                                    |
| [ Simpan ke Bank Soal (Approved) ]  [ Edit Teks / Formula ]  [ Buang & Generate Ulang ]            |
+----------------------------------------------------------------------------------------------------+
```

#### Tampilan Mobile (Smartphone < 768px)
```
+-----------------------------------+
| [=] AI Question Studio (Admin)    |
+-----------------------------------+
| PARAMETER SOAL:                   |
| Jenjang: [ SMP / MTs        ]     |
| Mapel  : [ Matematika       ]     |
| Subtopik: Aljabar SPLDV           |
| Level  : [ L3 - Penalaran   ]     |
| Format : [ Pilihan Ganda    ]     |
|                                   |
| [ > Generate Soal AI (48px) < ]   |
|                                   |
| HASIL SOAL:                       |
| +-------------------------------+ |
| | Stimulus:                     | |
| | 2 Buku + 3 Pensil = Rp17.000  | |
| | 5 Buku + 2 Pensil = Rp37.000  | |
| | Pertanyaan: Harga 1 lusin?    | |
| |                               | |
| | Opsi:                         | |
| | A. Rp72.000                   | |
| | B. Rp84.000 (Kunci)           | |
| | C. Rp96.000                   | |
| | D. Rp108.000                  | |
| |                               | |
| | Pembahasan: 12 x 7000 = 84.000| |
| +-------------------------------+ |
|                                   |
| [ Simpan Soal ]   [ Generate Lagi]|
+-----------------------------------+
```

---

### 7.9 Admin: Manajemen Pelanggan Siswa (`/app/admin/pelanggan/siswa`)

#### Tampilan Desktop (>= 1024px)
```
+----------------------------------------------------------------------------------------------------+
| [ADMIN] MANAJEMEN PELANGGAN SISWA             [Pelanggan Agency] [Skema Harga] [Bank Soal] [Logout]|
+----------------------------------------------------------------------------------------------------+
| PENCARIAN & FILTER:                                                                                |
| Cari Nama/WA/Email: [ Arya Pratama              ]  Paket: [ Semua Paket (v) ]  Status: [ Aktif (v)]|
+----------------------------------------------------------------------------------------------------+
| DAFTAR PELANGGAN SISWA (TOTAL: 1.420 SISWA):                                                       |
|                                                                                                    |
| Nama Siswa       Jenjang   Paket Aktif       Masa Berlaku       Total Ujian   Aksi                 |
| -------------------------------------------------------------------------------------------------- |
| Arya Pratama     SMP       Musim Ujian (90H) s/d 18 Jan 2027    14 Tryout     [ Kelola ] [ Perpanjang ]|
| Nabila Putri     SMA       Pejuang Bulanan   s/d 04 Nov 2026    8 Tryout      [ Kelola ] [ Perpanjang ]|
| Dimas Setiawan   SMP       Uji Coba Gratis   Kedaluwarsa        1 Tryout      [ Upgrade Manual ]   |
| Cinta Laura S.   SMA       Musim Ujian (90H) s/d 22 Des 2026    22 Tryout     [ Kelola ] [ Perpanjang ]|
|                                                                                                    |
| MODAL AKSI PELANGGAN SISWA (ARYA PRATAMA):                                                         |
| +------------------------------------------------------------------------------------------------+ |
| | Ubah Status Langganan: [ Musim Ujian (90 Hari) (v) ]                                           | |
| | Tambah Kompensasi Hari: [ +7 Hari (Kompensasi Gangguan Jaringan) ]                             | |
| | Riwayat Transaksi: Invoice #INV-2026-10-8812 (Rp89.000 - QRIS LUNAS)                           | |
| | [ Simpan Perubahan Akun Siswa ]                    [ Batalkan / Tutup ]                        | |
| +------------------------------------------------------------------------------------------------+ |
+----------------------------------------------------------------------------------------------------+
```

#### Tampilan Mobile (Smartphone < 768px)
```
+-----------------------------------+
| [=] Kelola Pelanggan Siswa        |
+-----------------------------------+
| Cari Siswa: [ Arya              ] |
| Filter: [ Aktif             (v) ] |
|                                   |
| HASIL PENCARIAN (1 Ditemukan):    |
| +-------------------------------+ |
| | Arya Pratama (SMP Kelas 9)    | |
| | Paket: Musim Ujian (90 Hari)  | |
| | Berlaku s/d: 18 Jan 2027      | |
| | Total Ujian Dikerjakan: 14    | |
| | Status: [ AKTIF ]             | |
| |                               | |
| | [ + Perpanjang 7/30 Hari ]    | |
| | [ Lihat Riwayat Invoice ]     | |
| +-------------------------------+ |
+-----------------------------------+
```

---

### 7.10 Admin: Manajemen Pelanggan Agency / Mitra Bimbel (`/app/admin/pelanggan/agency`)

#### Tampilan Desktop (>= 1024px)
```
+----------------------------------------------------------------------------------------------------+
| [ADMIN] MANAJEMEN PELANGGAN AGENCY / BIMBEL    [Pelanggan Siswa] [Skema Harga] [Bank Soal] [Logout]|
+----------------------------------------------------------------------------------------------------+
| FILTER MITRA: Cari Lembaga: [ Bimbel                      ]  Status: [ Semua (v) ]  [+ Tambah Mitra]|
+----------------------------------------------------------------------------------------------------+
| DAFTAR MITRA BIMBEL TERDAFTAR (TOTAL: 48 LEMBAGA):                                                 |
|                                                                                                    |
| Nama Bimbel        Slug Portal            Sisa Kuota   SaaS Portal      Status     Aksi            |
| -------------------------------------------------------------------------------------------------- |
| Bimbel Prestasi    /b/bimbel-prestasi     85 / 150     Aktif (Nov 2026) Terverifikasi [ Topup ] [Edit]|
| Ganesha Mandiri    /b/ganesha-mandiri     12 / 500     Aktif (Des 2026) Terverifikasi [ Topup ] [Edit]|
| Bintang Pelajar    /b/bintang-pelajar     0 / 50       Jatuh Tempo      Peringatan    [ Topup ] [Edit]|
| Cendekia Smart     /b/cendekia-smart      --           Non-Aktif        Menunggu Review [ Verifikasi ]|
|                                                                                                    |
| DETAIL KELOLA MITRA: BIMBEL PRESTASI MANDIRI                                                       |
| +------------------------------------------------------------------------------------------------+ |
| | Alokasi Kuota Token Tambahan : [ + 100 Token Siswa ]                                           | |
| | Status Co-Branded Portal     : [ Aktif ]  Subdomain: cbt-tka.id/b/bimbel-prestasi              | |
| | Tanggal Jatuh Tempo SaaS     : [ 25 November 2026 ]  Tarif Khusus: [ Standar Rp299.000 ]       | |
| | Total Komisi Affiliate Pending: Rp450.000   [ Setujui Payout Transfer Bank BCA ]               | |
| | [ Simpan Konfigurasi Mitra ]                         [ Suspend Akses Portal ]                  | |
| +------------------------------------------------------------------------------------------------+ |
+----------------------------------------------------------------------------------------------------+
```

#### Tampilan Mobile (Smartphone < 768px)
```
+-----------------------------------+
| [=] Kelola Mitra Bimbel (Admin)   |
+-----------------------------------+
| Cari Bimbel: [ Prestasi         ] |
|                                   |
| +-------------------------------+ |
| | Bimbel Prestasi Mandiri       | |
| | Portal: /b/bimbel-prestasi    | |
| | Sisa Token: 85 dari 150       | |
| | Status SaaS: Aktif (Nov 2026) | |
| | Status Mitra: Terverifikasi   | |
| |                               | |
| | [ + Tambah Kuota Token ]      | |
| | [ Edit Setting Portal ]       | |
| | [ Setujui Payout Rp450.000 ]  | |
| +-------------------------------+ |
+-----------------------------------+
```

---

### 7.11 Admin: Pengaturan Skema Harga & Kupon Diskon (`/app/admin/skema-harga`)

#### Tampilan Desktop (>= 1024px)
```
+----------------------------------------------------------------------------------------------------+
| [ADMIN] PENGATURAN SKEMA HARGA & KUPON DISKON   [Pelanggan Siswa] [Agency] [Bank Soal] [Logout]    |
+----------------------------------------------------------------------------------------------------+
| 1. KONFIGURASI HARGA PAKET SISWA (RETAIL):                                                         |
| +-------------------------------+ +-------------------------------+ +----------------------------+ |
| | PEJUANG BULANAN (30 HARI)     | | MUSIM UJIAN (90 HARI)         | | TIKET ECERAN PER TRYOUT    | |
| | Tarif IDR: [ 39000        ]   | | Tarif IDR: [ 89000        ]   | | Tarif IDR: [ 15000       ] | |
| | Limit Remedial/bln: [ 10  ]   | | Limit Remedial/bln: [ 30  ]   | | Akses Ujian: [ 1 Kali    ] | |
| | Status: [ Aktif           (v)]| | Status: [ Aktif           (v)]| | Status: [ Aktif          (v)]|
| +-------------------------------+ +-------------------------------+ +----------------------------+ |
|                                                                                                    |
| 2. KONFIGURASI HARGA GROSIR TOKEN AGENCY:                                                          |
| Tier 1 (50 Token) : Tarif IDR [ 750000  ] (Diskon 40%) -> Rp15.000/siswa                           |
| Tier 2 (150 Token): Tarif IDR [ 1800000 ] (Diskon 52%) -> Rp12.000/siswa                           |
| Tier 3 (500 Token): Tarif IDR [ 4500000 ] (Diskon 64%) -> Rp9.000/siswa                            |
| Langganan SaaS Portal Bimbel : Tarif IDR [ 299000 ] per bulan                                      |
|                                                                                                    |
| 3. KODE KUPON PROMO AKTIF:                                                                         |
| Kode Promo    Diskon (%)   Batas Pakai   Terpakai   Kadaluarsa     Status   Aksi                   |
| -------------------------------------------------------------------------------------------------- |
| TKAJUARA20    20%          500 Kuota     184        31 Des 2026    Aktif    [ Non-aktifkan ]       |
| BIMBELPROMO   30%          100 Kuota     45         15 Nov 2026    Aktif    [ Non-aktifkan ]       |
|                                                                                                    |
| [+ Buat Kode Kupon Diskon Baru]             [ Simpan Seluruh Pengaturan Harga ]                    |
+----------------------------------------------------------------------------------------------------+
```

#### Tampilan Mobile (Smartphone < 768px)
```
+-----------------------------------+
| [=] Setting Skema Harga (Admin)   |
+-----------------------------------+
| HARGA PAKET SISWA:                |
| 1. Bulanan: Rp [ 39.000     ]     |
| 2. 90 Hari: Rp [ 89.000     ]     |
| 3. Eceran : Rp [ 15.000     ]     |
|                                   |
| GROSIR TOKEN AGENCY:              |
| Tier 50  : Rp [ 750.000     ]     |
| Tier 150 : Rp [ 1.800.000   ]     |
| Tier 500 : Rp [ 4.500.000   ]     |
| SaaS Bimbel: Rp [ 299.000   ]     |
|                                   |
| KUPON DISKON:                     |
| TKAJUARA20 (20% - 184/500 Pakai)  |
|                                   |
| [ + Buat Kupon Baru ]             |
| [ Simpan Perubahan Harga ]        |
+-----------------------------------+
```

---

## 8. Model Data Database Lengkap (Skema PostgreSQL)

1. **`users`**: `id`, `email`, `phone`, `role` (admin / agency / student), `name`, `target_jenjang`, `created_at`.
2. **`student_subscriptions`**: `id`, `user_id`, `plan_type` (free / monthly / 90_days / single_token), `starts_at`, `expires_at`, `is_active`, `remedial_drills_quota`, `payment_reference`.
3. **`student_gamification`**: `id`, `user_id`, `streak_count`, `last_activity_date`, `streak_shields_count`, `xp_total`, `current_level`, `coins_balance`, `current_league` (bronze / silver / gold / diamond / mythic), `dream_school_target`, `target_score`.
4. **`student_daily_quests`**: `id`, `user_id`, `quest_date`, `quest_type` (warmup / review_error / blitz), `progress`, `target`, `is_claimed`, `xp_reward`, `coins_reward`.
5. **`agencies`**: `id`, `user_id`, `agency_name`, `slug`, `logo_url`, `quota_balance`, `saas_subscription_status` (active / expired), `saas_expires_at`, `commission_rate`.
6. **`pricing_plans`**: `id`, `plan_category` (student / agency_quota / agency_saas), `plan_code`, `title`, `duration_days`, `price_idr`, `token_count`, `is_active`.
7. **`discount_coupons`**: `id`, `code`, `discount_percent`, `max_usage`, `used_count`, `expires_at`, `is_active`.
8. **`questions`**: `id`, `level_jenjang`, `subject`, `element`, `subtopic`, `cognitive_level`, `format_type`, `stimulus_text`, `question_text`, `options_payload`, `correct_answer_payload`, `explanation_text`, `misconception_tags`, `status`.
9. **`packages`**: `id`, `title`, `level_jenjang`, `subject`, `duration_minutes`, `is_free`, `price_idr`, `blueprint_composition`.
10. **`vouchers`**: `id`, `agency_id`, `package_id`, `code`, `is_redeemed`, `redeemed_by_user_id`, `redeemed_at`.
11. **`exam_attempts`**: `id`, `user_id`, `package_id`, `server_started_at`, `server_expires_at`, `submitted_at`, `total_score`, `subtopic_scores`, `violation_count`, `status`.
12. **`diagnostic_reports`**: `id`, `attempt_id`, `user_id`, `radar_chart_points`, `primary_weakness_subtopic`, `ai_diagnostic_narrative`.
13. **`remedial_drills`**: `id`, `diagnostic_report_id`, `user_id`, `subtopic_target`, `drill_questions_payload`, `drill_answers_payload`, `drill_score`, `completed_at`.

---

## 9. Rencana Tahapan Rilis (Roadmap)

- **Fase 1 (Fondasi & AI Studio):** Implementasi engine produksi soal AI terstandar BSKAP dan database bank soal.
- **Fase 2 (CBT Core & Dual Mode):** Pengerjaan antarmuka CBT responsif mobile dengan sinkronisasi IndexedDB dan server timer.
- **Fase 3 (Smart Diagnostic & Remedial):** Spider chart, deteksi miskonsepsi AI, dan sesi latihan kilat 5 soal.
- **Fase 4 (Gamifikasi Siswa Gen Z):** Daily Streak TikTok style, XP & level, liga mingguan, dan daily quests.
- **Fase 5 (Langganan Siswa & Agency B2B):** Integrasi pembayaran QRIS/VA, manajemen pelanggan siswa dan agency di admin, skema harga grosir, dan co-branding.
- **Fase 6 (Testing & Hardening):** Pengujian beban server simulasi serentak dan verifikasi anti-cheat.
