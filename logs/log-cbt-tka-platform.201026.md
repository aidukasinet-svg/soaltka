# Log Perkembangan & Rencana Arsitektur Platform CBT-TKA.ID

Dokumen ini mencatat seluruh rencana, arsitektur sistem, keputusan desain, status implementasi kode, dan pembuktian pengujian platform **CBT-TKA.ID** per tanggal 20 Oktober 2026.

---

## 1. Ringkasan Metadata Proyek

- **Tanggal Pembaruan**: 20 Oktober 2026 (Format: `201026`)
- **Nama Aplikasi**: CBT-TKA.ID (Platform Latihan & Simulasi Tes Kemampuan Akademik Online Terstandar)
- **Dasar Regulasi**: Keputusan Kepala BSKAP Kemendikdasmen No. 047/H/KR/2024 dan 045/H/KR/2024
- **Stack Teknologi**:
  - Frontend: React 19, TypeScript, Tailwind v4, Lucide Icons, KaTeX Math Formula Rendering, Vite 8
  - Backend: Node.js, Express 5, CORS, Dotenv
  - Database & Cloud: Neon Serverless Postgres (`@neondatabase/serverless`), Neon Object Storage (AWS S3 Client), Neon Serverless Functions, Neon Auth (Better Auth JWKS)
- **Repositori Git**: [github.com/aidukasinet-svg/soaltka.git](https://github.com/aidukasinet-svg/soaltka.git) (Branch: `master`)
- **Lingkungan Lokal**: `http://localhost:3001`
- **Tautan Log**: [logs/log-cbt-tka-platform.201026.md](file:///e:/3.%20PRODUK%20DIGITAL/05%20-%20Aplikasi%20dan%20Pengembangan/App/47.%20SoalTKA/soaltkasourcode/logs/log-cbt-tka-platform.201026.md)

---

## 2. Latar Belakang & Kebutuhan Inti

1. **Fokus Murni TKA (Tes Kemampuan Akademik)**:
   - Berbeda dari generator soal umum, platform ini didedikasikan 100% untuk instrumen TKA jenjang SD, SMP, SMA, dan SMK.
   - Seluruh kategori asesmen non-TKA (seperti Ujian Biasa umum, Olimpiade, AKM umum) ditiadakan untuk menjaga ketajaman dan fokus produk.
2. **Dukungan 3 Peran Pengguna (Role-Based Architecture)**:
   - **Siswa (Student)**: Pembelajaran adaptif mandiri dengan gamifikasi Gen Z (Daily Streak Api Belajar, Level XP, Koin TKA, Liga Mingguan Emas, Target Impian Sekolah/Kampus).
   - **Mitra Agency / Bimbel**: Fasilitas B2B instan (pembelian kuota voucher grosir, co-branding logo & nama bimbel pada lembar ujian murid, dasbor live monitoring kelas, ekspor rekap nilai Excel).
   - **Super Admin**: Pusat kendali kurikulum, AI Question Studio berkanvas A4, Bank Soal Master dengan status lifecycle (*Draft, In Review, Published, Archived*), dan Perakitan Paket CBT.
3. **Kepatuhan Anti-Slop Design Rules**:
   - Zero em-dash (`—`) dan zero en-dash (`–`) di seluruh teks UI, kode, dan dokumentasi.
   - Bebas emoji playful berlebihan: 100% menggunakan stroke-based vector icons clean dari `lucide-react`.
   - Palet warna semantik berimbang (slate-900, slate-950, slate-50, blue-600, amber-500, emerald-600) tanpa gradien ungu generik.
   - Ukuran target sentuh mobile ramah jempol (tinggi tombol minimal 48px - 52px).

---

## 3. Dokumen Spesifikasi yang Tersedia di Repositori

1. [map.md](file:///e:/3.%20PRODUK%20DIGITAL/05%20-%20Aplikasi%20dan%20Pengembangan/App/47.%20SoalTKA/soaltkasourcode/map.md):
   - Pemetaan produk, benchmark kompetitor (PakarTKA, Pusmendik, TryoutNasional).
   - 4 Unique Selling Points (Dual-Mode CBT Engine, AI Misconception Diagnostic, Gamifikasi Gen Z, 1-Klik Remedial Adaptif).
   - Skema langganan siswa (Eceran Rp15k, Bulanan Rp39k, 90 Hari Rp89k) dan kuota grosir agency (50, 150, 500 token, SaaS Portal).
2. [PRD.md](file:///e:/3.%20PRODUK%20DIGITAL/05%20-%20Aplikasi%20dan%20Pengembangan/App/47.%20SoalTKA/soaltkasourcode/PRD.md):
   - Product Requirements Document lengkap dengan wireframe ASCII di setiap menu untuk Desktop dan Mobile.
3. [mermaid.md](file:///e:/3.%20PRODUK%20DIGITAL/05%20-%20Aplikasi%20dan%20Pengembangan/App/47.%20SoalTKA/soaltkasourcode/mermaid.md):
   - Entity Relationship Diagram (14 tabel terstruktur di Neon Postgres).
   - State machine ujian CBT, loop mesin gamifikasi streak/XP, dan flowchart AI Question Studio.
4. [DESIGN_SYSTEM.md](file:///e:/3.%20PRODUK%20DIGITAL/05%20-%20Aplikasi%20dan%20Pengembangan/App/47.%20SoalTKA/soaltkasourcode/DESIGN_SYSTEM.md):
   - Semantic tokens, aturan tipografi (Outfit & JetBrains Mono), dan spesifikasi Dual-Mode CBT (Pusmendik ANBK vs Modern Mobile).

---

## 4. Status Integrasi Cloud Neon

Provisi otomatis melalui Neon CLI dan file konfigurasi [neon.ts](file:///e:/3.%20PRODUK%20DIGITAL/05%20-%20Aplikasi%20dan%20Pengembangan/App/47.%20SoalTKA/soaltkasourcode/neon.ts) pada project `wandering-shadow-56131486`, branch `production` (`br-aged-morning-a1n4unxq`):

1. **Neon Serverless Postgres**:
   - `DATABASE_URL` (Connection pooler) & `DATABASE_URL_UNPOOLED`.
   - Driver: `@neondatabase/serverless` (koneksi instan dan query pooling).
   - Telah dieksekusi skrip migrasi [scripts/migrate.mjs](file:///e:/3.%20PRODUK%20DIGITAL/05%20-%20Aplikasi%20dan%20Pengembangan/App/47.%20SoalTKA/soaltkasourcode/scripts/migrate.mjs) membuat 14 tabel inti:
     `users`, `pricing_plans`, `student_subscriptions`, `student_gamification`, `student_daily_quests`, `agencies`, `questions`, `packages`, `package_questions`, `vouchers`, `exam_attempts`, `attempt_answers`, `diagnostic_reports`, `remedial_drills`.
2. **Neon Object Storage (S3 API)**:
   - Bucket: `assets` di region `ap-southeast-1`.
   - Akses melalui `@aws-sdk/client-s3` dengan kredensial aman di `.env.local`.
   - Siap menampung berkas stimulus visual, tabel gambar, dan logo bimbel mitra.
3. **Neon Serverless Functions**:
   - Endpoint: `https://br-aged-morning-a1n4unxq-hello.compute.ap-southeast-1.aws.neon.tech`.
   - Teruji menerima HTTP invoke untuk komputasi serverless tepi.
4. **Neon Auth (Better Auth Engine)**:
   - Base URL dan endpoint JWKS aktif untuk verifikasi token identitas pengguna.
5. **Catatan Penyesuaian AI Gateway**:
   - Fitur `aiGateway: false` diatur pada `neon.ts` karena organisasi berada pada paket Free. Fungsi AI Question Studio dialihkan melalui handler backend Express terintegrasi (`/api/questions/generate`) yang siap dihubungkan langsung ke API key Gemini / OpenAI.

---

## 5. Implementasi Modul Aplikasi Terkini

### A. Landing Page Publik Komprehensif
- **Hero Section**: Judul proposisi nilai, badge resmi BSKAP 047 & 045, CTA ganda (*Mulai Coba Gratis* & *Coba Simulasi CBT*), serta metrik sosial (15.000+ Siswa, 120+ Mitra Bimbel, 98.4% Akurasi, < 50ms Latensi CBT).
- **Problem vs Solution**: Komparasi kelemahan tryout kertas biasa dengan keunggulan analitis CBT-TKA.ID.
- **4 Pilar Keunggulan**: Dual-Mode CBT Engine, AI Misconception Diagnostic, Gamifikasi Gen Z, dan 1-Klik Remedial Adaptif.
- **Simulasi Interaktif CBT Langsung**: Calon siswa dapat mencoba menjawab soal sampel di landing page, memilih opsi A/B/C/D, menandai ragu-ragu, dan melihat timer berjalan tanpa login.
- **Katalog Jenjang**: SD/MI (12 paket), SMP/MTs (24 paket), SMA/MA/SMK (36 paket).
- **Showcase AI Diagnostik**: Visualisasi radar chart 360 derajat penguasaan subtopik.
- **Solusi Mitra Bimbel B2B**: Co-branding logo, kuota grosir hemat, ekspor Excel.
- **Katalog Harga Transparan**: Pilihan tab *Untuk Siswa Individual* dan *Untuk Mitra Bimbel*.
- **FAQ Akordion Interaktif & Footer Lengkap**.

### B. Halaman Autentikasi (Dedicated Auth Page)
- Tab Switcher: Beralih cepat antara *Masuk (Login)* dan *Daftar (Register)*.
- Role Selection: Siswa / Mitra Bimbel.
- Quick Demo Login: Akses instan 1-klik untuk evaluasi per peran (*Siswa Arya Pratama*, *Mitra Bimbel Ibu Maya*, *Super Admin*).
- Simulasi Google Better Auth via Neon Auth.

### C. Dashboard Siswa (Role: Student)
- **Arena Gamifikasi**: Daily Streak Api Belajar (14 Hari), Level 18 XP, Dompet Koin TKA (85 Koin), Streak Shield pelindung api, Misi Harian (Daily Quests), Liga Mingguan Divisi Emas, dan Target Impian SMAN 8 Jakarta.
- **Ruang Ujian CBT Dual-Mode**:
  - Mode Pusmendik ANBK Resmi: Tampilan identik layar ujian nasional, navigasi nomor palet 40 soal, timer, tombol ragu-ragu.
  - Mode Modern Mobile: Ergonomis jempol smartphone (tombol >= 48px), pergantian soal bebas lag, autosave lokal.
- **Rapor Diagnostik & AI Remedial**:
  - Skor total, akurasi jawaban, persentil peringkat kelas.
  - Radar chart penguasaan materi (Aljabar, Geometri, Statistika, Bilangan).
  - Tombol 1-klik *Mulai AI Adaptive Remedial Drill* (5 soal kilat penambal kelemahan).
- **Beli Paket Langganan Siswa**: Tiket Eceran Rp15k, Pejuang Bulanan Rp39k, Musim Ujian 90 Hari Rp89k.

### D. Dashboard Mitra Agency / Bimbel (Role: Agency)
- **Dasbor Kelas**: Pemantauan live progres pengerjaan tryout murid kelas 9A, rekap skor, identifikasi materi terlemah kelas serentak.
- **Kelola Token & Voucher**: Sisa saldo token (85/150 token), tombol generator kode voucher batch untuk murid, opsi beli tambahan kuota grosir.
- **Pengaturan Co-Branding**: Konfigurasi logo bimbel dan subdomain kustom (`cbt-tka.id/b/prestasi-mandiri`).

### E. Portal Admin Super (Role: Admin) - Adaptasi BuatSoal Online (Murni TKA)
- **Sidebar Navigasi Scroll Mandiri (Independent Scroll)**:
  - Sidebar kiri setinggi layar (`w-64 h-screen sticky top-0 overflow-y-auto bg-slate-900 border-r border-slate-800`).
  - Menggulir menu sidebar terisolasi penuh dari area kerja kanvas naskah di sebelah kanan.
- **AI Question Production Studio (Murni TKA)**:
  - Tanpa kategori umum (fokus 100% pada TKA).
  - Parameter BSKAP: Jenjang (SD/SMP/SMA/SMK), Mapel (Matematika, B. Indonesia, IPA, B. Inggris).
  - Mode Distribusi: *Komprehensif* (merata seluruh elemen) vs *Drilling Materi* (fokus 1 subtopik).
  - Keranjang Bentuk Soal: PG Biasa, PG Kompleks, Menjodohkan, Isian Singkat + Toggle Opsi 4 / 5 + Kuota butir.
  - Fitur Stimulus Visual & Diagnosa Miskonsepsi Opsi Salah.
  - Tombol *Generate Naskah TKA* dengan live progress bar.
- **Kanvas Workspace Dokumen A4**:
  - 4 Tab: *Naskah Soal*, *Kunci & Pembahasan*, *Kisi-Kisi BSKAP*, *Kartu Soal*.
  - Tampilan lembar kertas A4 bersih dengan nomor soal, stimulus, pertanyaan KaTeX, opsi, dan tombol pensil *inline edit*.
  - Tab Kunci menampilkan kunci benar hijau, solusi KaTeX, dan tabel analisis miskonsepsi per opsi pengecoh.
  - Status naskah (Draft, In Review, Published) dengan tombol 1-klik *Publikasikan ke Bank Soal* dan *Ekspor*.
- **Bank Soal & Kurasi Master (CRUD Komprehensif)**:
  - Tab Filter Status 1-Klik: *Semua*, *Draft* (Kuning), *In Review* (Biru), *Published* (Hijau), *Archived* (Abu-abu).
  - Pencarian cerdas, filter Jenjang, filter Mapel.
  - Tabel interaktif dengan checkbox seleksi massal (*Bulk Publish*, *Bulk Archive*, *Bulk Delete*).
  - Dropdown pengubah status langsung per baris.
  - Modal Editor Butir Soal lengkap (edit stimulus, pertanyaan, opsi A-E, kunci, pembahasan).
  - Modal Pratinjau Cepat (kartu soal seperti di layar siswa).
- **Perakitan Paket CBT**:
  - Exam package builder untuk menyusun 40 butir soal published menjadi paket tryout berdurasi 90 menit dan passing grade KKM.
- **Pelanggan Siswa, Mitra Agency, dan Neon Cloud Telemetry**.

---

## 6. Riwayat Commit Repositori Git

1. `33c0fd3`: Inisialisasi awal full-stack CBT TKA dengan backend Neon, gamifikasi Gen Z, dan AI Question Studio.
2. `c424340`: Implementasi Landing Page komprehensif, Auth Page khusus, menu kontekstual per role, dan penggantian seluruh emoji dengan Lucide clean vector icons.
3. `cbec6a5`: Implementasi Independent Scroll Admin Sidebar, AI Question Studio murni TKA adaptasi BuatSoal Online, kanvas dokumen A4, dan CRUD Bank Soal berstatus lifecycle.
4. `1b51529`: Pemulihan dan integrasi menyeluruh antara Landing Page, Auth Page, Student Dashboard, Agency Portal, dan Admin Portal.

---

## 7. Rencana Pengembangan Lanjutan (Next Priorities)

1. **Integrasi Payment Gateway**:
   - Menghubungkan Midtrans Snap atau Xendit Sandbox untuk pembayaran otomatis langganan siswa (QRIS, VA Bank) dan pembelian kuota grosir voucher mitra agency.
2. **Konektivitas Langsung API LLM**:
   - Menghubungkan API key Google Gemini atau OpenAI pada endpoint Express (`/api/questions/generate`) untuk pengujian pembuatan variasi stimulus matematika dan tabel data secara langsung.
3. **Proctoring Keamanan Ujian**:
   - Implementasi full-screen lockdown pada Mode Pusmendik ANBK, pelacak perpindahan tab (*tab switch detector*), dan pembatasan multi-login akun siswa saat ujian berlangsung.
4. **Penyempurnaan Ekspor Dokumen**:
   - Menambahkan utilitas pengonversi naskah soal A4 ke format Microsoft Word (`.docx`) dan PDF siap cetak dengan kop sekolah.

---

*Log ini diperbarui secara otomatis dan tersimpan di dalam repositori proyek.*
