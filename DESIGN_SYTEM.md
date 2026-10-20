# Panduan Sistem Desain (Design System): CBT TKA Online

> **Design Read:** Modern EdTech Assessment & CBT Platform for Indonesian K-12 Students, Bimbel Agencies, and Academic Administrators, with an authoritative, high-clarity, tactile design language, leaning toward Tailwind v4 tokens, Phosphor Icons, and KaTeX math engine.  
> **Konfigurasi Dial:**  
> - `DESIGN_VARIANCE: 6` (Kerapian struktural ujian dengan tata letak split-view responsif)  
> - `MOTION_INTENSITY: 4` (Transisi taktil 150-250ms, fokus pada kecepatan dan tanpa animasi berlebih yang mengganggu konsentrasi)  
> - `VISUAL_DENSITY: 5` (Keseimbangan keterbacaan teks soal, rumus matematika, dan kenyamanan jempol mobile)  
> **Kepatuhan Anti-Slop:** Bebas em-dash, tanpa gradien ungu buatan mesin, tanpa hitam pekat `#000000`, rasio kontras WCAG AA minimal 4.5:1, target sentuh mobile minimal 48px.  

---

## 1. Fondasi Filosofi Desain

Sistem CBT TKA tidak boleh terasa seperti kuis hiburan santai, melainkan sebuah **lingkungan asesmen terstandar nasional yang kredibel, tenang, dan tidak menimbulkan kelelahan mata (cognitive fatigue)**. 

Prinsip utama:
1. **Kejelasan Maksimal (Clarity over Decoration):** Setiap milimeter layar diutamakan untuk teks stimulus, kejelasan rumus matematika/sains, dan pilihan jawaban.
2. **Ergonomi Jempol Mobile (Thumb-Zone Friendly):** Lebih dari 75% siswa di Indonesia mengerjakan latihan via smartphone. Seluruh tombol aksi utama (Navigasi Nomor, Ragu-ragu, Simpan & Lanjut) berada pada jangkauan jempol bawah layar.
3. **Resiliensi Visual Dual-Mode:** Memfasilitasi siswa yang membutuhkan latihan dengan format resmi pemerintah (Mode Pusmendik) maupun format modern responsif (Mode Modern Default).
4. **Sentuhan Gamifikasi Gen Z yang Berkelas:** Visualisasi api streak, perolehan XP, dan liga mingguan dirancang menggunakan aksen oranye menyala dan emas yang terkalibrasi, tanpa elemen kartun berlebihan yang merusak wibawa akademik.

---

## 2. Palet Warna & Token Semantik

Menghindari penggunaan warna hitam pekat `#000000` dan gradien ungu kecerdasan buatan. Menggunakan varian slate dingin berkelas yang dipadukan dengan biru navy terstandar dan aksen status fungsional.

### 2.1 Palet Utama (Primary & Neutrals)

| Token Semantik | Nilai Hex Light | Nilai Hex Dark | Deskripsi & Peruntukan |
| :--- | :--- | :--- | :--- |
| `--color-brand-primary` | `#1d4ed8` (Blue 700) | `#3b82f6` (Blue 500) | Tombol utama, tab aktif, identitas brand |
| `--color-brand-deep` | `#0f2347` (Navy 950) | `#0a1529` (Navy Dark) | Header resmi, sidebar navigasi desktop |
| `--color-brand-soft` | `#eff6ff` (Blue 50) | `#1e293b` (Slate 800) | Latar belakang opsi terpilih, highlight teks |
| `--color-surface-bg` | `#f8fafc` (Slate 50) | `#0b1120` (Slate 950) | Latar belakang kanvas aplikasi |
| `--color-surface-card` | `#ffffff` (White) | `#131d33` (Card Dark) | Kontainer soal, kartu rapor, panel navigasi |
| `--color-surface-muted` | `#f1f5f9` (Slate 100) | `#1e293b` (Slate 800) | Opsi netral belum dipilih, pembatas nomor |
| `--color-text-main` | `#0f172a` (Slate 900) | `#f8fafc` (Slate 50) | Teks soal utama, judul, angka skor |
| `--color-text-muted` | `#64748b` (Slate 500) | `#94a3b8` (Slate 400) | Sub-teks, petunjuk pengerjaan, metadata |
| `--color-border-subtle`| `#e2e8f0` (Slate 200) | `#334155` (Slate 700) | Garis pemisah panel, border kartu |

### 2.2 Warna Status Asesmen & Gamifikasi

Warna status memiliki arti semantik yang sangat ketat:

| Status Ujian & Game | Token | Hex Light | Hex Dark | Fungsi di CBT & Arena |
| :--- | :--- | :--- | :--- | :--- |
| **Terjawab (Answered)** | `--status-success` | `#059669` (Emerald 600) | `#10b981` (Emerald 500) | Nomor soal sudah dijawab, indikator online |
| **Ragu-Ragu (Doubtful)** | `--status-warning` | `#d97706` (Amber 600) | `#f59e0b` (Amber 500) | Nomor ditandai ragu-ragu oleh siswa |
| **Kosong (Unanswered)** | `--status-empty` | `#94a3b8` (Slate 400) | `#475569` (Slate 600) | Nomor belum dijawab sama sekali |
| **Kritis / Bahaya** | `--status-danger` | `#dc2626` (Red 600) | `#ef4444` (Red 500) | Peringatan pindah tab, subtopik lemah |
| **Daily Streak Flame** | `--gamify-streak` | `#ea580c` (Orange 600) | `#fb923c` (Orange 400) | Ikon nyala api belajar harian |
| **XP Progress & Level** | `--gamify-xp` | `#2563eb` (Blue 600) | `#60a5fa` (Blue 400) | Bar progres level pengalaman |
| **TKA Coins / Reward** | `--gamify-coin` | `#d97706` (Amber 600) | `#fcd34d` (Amber 300) | Koin virtual hasil misi dan reward |
| **Divisi Liga Emas** | `--gamify-gold` | `#ca8a04` (Yellow 600) | `#facc15` (Yellow 400) | Badge Liga Divisi Emas |

---

## 3. Tipografi & Hierarki Font

Menggunakan kombinasi font modern yang bersih, netral, dan mudah dibaca pada layar kecil:
- **Font Utama (Display & Body):** `Outfit` atau `Satoshi` (Bebas dari kebiasaan klise Inter bawaan).
- **Font Data, Angka & Timer:** `JetBrains Mono` (Tampilan angka tabular sejajar sehingga timer tidak bergeser setiap detik).

### 3.1 Skala Ukuran Tipografi (Typography Scale)

| Level Hierarki | Ukuran Font / Leading | Berat (Weight) | Tracking | Penggunaan |
| :--- | :--- | :--- | :--- | :--- |
| `display-timer` | `28px / 32px` | 700 (Bold, Mono) | `tracking-tight` | Hitungan mundur sisa waktu ujian |
| `heading-page` | `24px / 30px` (Desktop: `32px`) | 700 (Bold) | `tracking-tight` | Judul modul, nama paket ujian, skor |
| `heading-section`| `18px / 24px` (Desktop: `20px`) | 600 (Semibold) | Normal | Label nomor soal, nama subtopik |
| `body-question` | `16px / 26px` (Bisa Zoom A+) | 400 atau 500 | Normal | Teks stimulus narasi dan kalimat soal |
| `body-option` | `15px / 22px` | 500 (Medium) | Normal | Teks opsi jawaban pilihan A-E |
| `caption-meta` | `13px / 18px` | 400 (Regular) | Normal | NISN, instruksi kecil, label status |
| `badge-number` | `14px / 16px` | 700 (Bold, Mono) | Normal | Angka pada kotak palet nomor soal |
| `gamify-streak` | `20px / 24px` | 800 (Extra Bold, Mono) | `tracking-tighter` | Angka streak api di navbar dan arena |

### 3.2 Dukungan Pembesar Teks Soal (Accessibility Zoom)
Sistem menyediakan kontrol font `[ A- ] [ A ] [ A+ ]`:
- Ukuran Normal: 16px font-size dengan line-height 1.65.
- Ukuran Sedang: 18px font-size dengan line-height 1.7.
- Ukuran Besar: 20px font-size dengan line-height 1.8 (Membantu siswa dengan keterbatasan visual).

---

## 4. Spasi, Elevasi, dan Radius Sudut

### 4.1 Skala Spasi (Grid 4px/8px)
- `space-xs`: 4px
- `space-sm`: 8px
- `space-md`: 16px (Padding standar kartu mobile)
- `space-lg`: 24px (Pemisah antar blok stimulus dan pertanyaan)
- `space-xl`: 32px (Margin kontainer desktop)

### 4.2 Radius Sudut Terpadu (Consistent Radii Rule)
Menjaga konsistensi geometris agar tidak terjadi benturan bentuk:
- **Kotak Nomor Soal:** `rounded-lg` (8px).
- **Tombol & Kotak Input:** `rounded-xl` (12px).
- **Kartu Soal & Kontainer Konten:** `rounded-2xl` (16px).
- **Badge Status, Streak Pill, & Koin:** `rounded-full` (9999px).

### 4.3 Elevasi & Bayangan (Shadows)
- Menggunakan bayangan lembut yang diwarnai sesuai latar belakang (tidak menggunakan drop-shadow hitam pekat).
- `shadow-sm`: `0 1px 2px 0 rgba(15, 23, 42, 0.05)`
- `shadow-card`: `0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`
- `shadow-elevated`: `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)`

---

## 5. Ergonomi Antarmuka Layar Sentuh (Mobile Touch Targets)

Untuk memastikan kelancaran pengerjaan di smartphone:
1. **Ketinggian Tombol Minimum 48px:**
   - Seluruh baris opsi pilihan jawaban (A, B, C, D, E) memiliki tinggi minimal 52px dengan padding vertikal yang lega. Siswa dapat mengetuk di mana saja pada area kartu pilihan tanpa harus tepat di lingkaran radio.
2. **Jarak Aman Antara Tombol Navigasi:**
   - Tombol `[ <- Soal Sebelumnya ]`, `[ Ragu-ragu ]`, dan `[ Simpan & Lanjut -> ]` memiliki jarak celah (gap) minimal 12px untuk mencegah salah pencet secara tidak sengaja.
3. **Bottom-Sheet Palet Nomor:**
   - Di perangkat layar < 768px, daftar 40 nomor soal tidak disembunyikan di menu samping yang sulit dijangkau, melainkan dapat ditarik naik dari laci bawah (bottom drawer) dengan gestur usap ke atas.
4. **Viewport Stability:**
   - Menggunakan `min-h-[100dvh]` sebagai pengganti `100vh` untuk mencegah pergeseran tata letak (layout shift) saat address bar browser mobile muncul atau menghilang.

---

## 6. Anatomi Komponen Kunci CBT & Gamifikasi

### 6.1 Opsi Pilihan Jawaban (Answer Option Row)
Struktur fisik komponen opsi:
```
+------------------------------------------------------------------------+
|  [ A ]   Sebuah toko buku menjual 3 lusin buku seharga Rp108.000,00    |
+------------------------------------------------------------------------+
  (1)       (2) Teks Pilihan Jawaban
```
- **State Normal:** Background `bg-surface-card`, border 1.5px `border-slate-200`, teks Slate 800.
- **State Hover:** Border `border-blue-400`, background `bg-blue-50/50`.
- **State Active/Pressed:** Skala `scale-[0.99]`, transisi 100ms.
- **State Selected:** Border 2px `border-blue-600`, background `bg-blue-50`, lingkaran label `[ A ]` berwarna solid `bg-blue-600 text-white`.

### 6.2 Kotak Indikator Nomor (Number Palette Cell)
Ukuran baku: 42px x 42px di mobile, 44px x 44px di desktop.
- **Belum Dijawab:** Background `bg-slate-100`, teks `text-slate-700`, border `border-slate-200`.
- **Sudah Terjawab:** Background `bg-emerald-600`, teks `text-white`, ikon centang mikro di pojok.
- **Ragu-Ragu:** Background `bg-amber-500`, teks `text-white`, ikon tanya di pojok.
- **Nomor Aktif Saat Ini:** Ring fokus 3px `ring-blue-600 ring-offset-2`.

### 6.3 Wadah Rumus Matematika (KaTeX Math Container)
- Rumus matematika inline (`$...$`) dan display block (`$$...$$`) di-render dengan KaTeX CSS terisolasi.
- Memiliki fitur scroll horizontal mandiri (`overflow-x-auto`) jika persamaan matematika melebihi lebar layar mobile, sehingga tidak merusak lebar keseluruhan halaman.

### 6.4 Komponen Radar Kelemahan (Spider Chart)
- Dibuat menggunakan SVG responsif atau Canvas Recharts dengan rasio aspek 1:1.
- Sumbu poligon menampilkan 4 hingga 6 elemen kerangka resmi (contoh: Bilangan, Aljabar, Geometri, Data & Ketidakpastian).
- Area yang diarsir menggunakan warna biru brand dengan transparansi 20% dan garis batas 2px. Subtopik dengan nilai < 50% otomatis ditandai dengan titik merah berkedip lembut.

### 6.5 Komponen Gamifikasi Siswa (Gen Z Gamification Elements)
1. **Daily Streak Flame Pill:**
   - Pill berbentuk kapsul berisi ikon api `Fire` berwarna oranye `#ea580c` dan angka streak tebal font mono (`14`).
   - Efek mikro-animasi bernapas lembut (*subtle breathing pulse*) pada ikon api ketika streak masih aktif hari ini.
2. **XP Bar & Rank Progress:**
   - Kontainer bar tinggi 8px dengan latar `bg-slate-200`, diisi indikator biru `bg-blue-600` dengan sudut membulat penuh (`rounded-full`).
   - Teks penjelas di bawah bar: `Level 18: Master Numerasi · 2.450 / 3.000 XP`.
3. **Daily Quest Card:**
   - Kartu setinggi 64px dengan ikon centang status, judul misi ("Pemanasan Pagi"), dan tombol aksi/klaim berwarna hijau saat selesai.
4. **League Division Badge:**
   - Badge dengan latar belakang bergradasi halus sesuai divisi:
     - Perunggu: `#78350f` (Bronze)
     - Perak: `#64748b` (Silver)
     - Emas: `#ca8a04` (Gold)
     - Berlian: `#0284c7` (Diamond)
     - Mitos: `#7c3aed` (Mythic)

### 6.6 Kartu Langganan & Penetapan Harga (Subscription Plan Card)
- **Kartu Paling Populer (90 Hari):** Memiliki ring sorot tebal 2px `ring-blue-600` dengan badge label di bagian atas `[ PALING POPULER · HEMAT 25% ]`.
- **Informasi Harga Bersih:** Angka nominal besar tebal (`Rp89.000`) dengan label durasi jelas di bawahnya, serta rincian per hari (`setara Rp980/hari`) untuk memperjelas efisiensi nilai.

---

## 7. Sistem Ikonografi

- **Pustaka Tunggal:** Menggunakan `@phosphor-icons/react` secara konsisten di seluruh aplikasi (dilarang mencampur dengan pustaka lain).
- **Ketebalan Garis (Stroke Weight):** Baku `regular` (stroke width setara 1.5) untuk menjaga tampilan tetap elegan dan rapi.
- **Daftar Ikon Terstandar:**
  - Timer / Waktu: `Clock`
  - Simpan / Autosave: `CloudCheck` / `FloppyDisk`
  - Ragu-ragu: `Question`
  - Soal Berikutnya / Sebelumnya: `ArrowRight` / `ArrowLeft`
  - Pembesar Font: `TextAa`
  - Filter Jenjang: `GraduationCap`
  - Laporan & Rapor: `ChartPolar` / `ChartBar`
  - Voucher / Token: `Ticket`
  - Agency / Reseller: `Storefront` / `UsersThree`
  - AI Production Studio: `Sparkle`
  - Daily Streak Api: `Fire`
  - XP & Energi: `Lightning`
  - Liga & Peringkat: `Trophy`
  - Koin Hadiah: `Coins`
  - Pelindung Api: `ShieldCheck`
  - Target Impian: `Target`

---

## 8. Mode Simulasi Resmi Pusmendik vs Mode Modern

Sistem menyediakan opsi beralih gaya antarmuka:

### 8.1 Mode Simulasi Resmi Pusmendik (Official Replica)
- Latar header warna biru dongker gelap dengan logo resmi Kemendikdasmen di kiri atas.
- Kotak biodata peserta di kanan atas (Nama Siswa, NISN, Ruang Ujian, Sisa Waktu dengan kotak kuning kontras).
- Tombol aksi menggunakan palet resmi:
  - Tombol Sebelumnya: Merah bata tua (`#b91c1c`)
  - Tombol Ragu-ragu: Kuning oranye (`#d97706`)
  - Tombol Berikutnya: Biru laut (`#1d4ed8`)
- Panel daftar nomor soal berada di sisi kanan tetap (desktop) dengan kotak warna-warni resmi.

### 8.2 Mode Modern (Default Mobile-Optimized)
- Tampilan bersih, minimalis, dan berfokus pada ruang baca.
- Header ramping (hanya menampilkan mata pelajaran, nomor soal aktif, dan sisa waktu).
- Tombol navigasi berada di bagian bawah jempol dengan teks ramah pengguna.
- Cocok untuk latihan harian mandiri tanpa intimidasi antarmuka ujian kaku.

---

## 9. Aturan Kepatuhan Aksesibilitas & Performa

1. **Rasio Kontras Warna:** Seluruh pasangan warna teks dan latar belakang diuji dengan kalkulator WCAG. Teks hitam-slate pada latar putih memiliki rasio > 11:1 (Lolos AAA). Teks putih di atas tombol biru primer memiliki rasio > 5.5:1 (Lolos AA).
2. **Dukungan Pengurangan Gerakan (Reduced Motion):** Jika sistem operasi pengguna mengaktifkan `prefers-reduced-motion: reduce`, seluruh animasi geser drawer, nyala api streak, dan transisi nomor soal dihentikan dan digantikan dengan perubahan seketika (instant swap).
3. **Penyajian Data Angka:** Seluruh angka persentase, skor ujian, XP, saldo koin, dan waktu hitung mundur wajib menggunakan properti CSS `font-variant-numeric: tabular-nums` agar lebar karakter seragam dan tidak bergoyang saat diperbarui.
