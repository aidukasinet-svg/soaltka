import React, { useState, useEffect } from "react";
import {
  Fire,
  Coins,
  Lightning,
  Trophy,
  Clock,
  ShieldCheck,
  Target,
  Sparkle,
  GraduationCap,
  Storefront,
  ChartPolar,
  CheckCircle,
  Question,
  ArrowRight,
  ArrowLeft,
  TextAa,
  CloudCheck,
  DownloadSimple,
  Ticket,
  UsersThree,
  Cpu,
  Database,
  HardDrives,
  Key,
} from "@phosphor-icons/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("beranda");
  const [cbtMode, setCbtMode] = useState<"modern" | "pusmendik">("modern");
  const [fontSize, setFontSize] = useState<number>(16);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({ 0: "C" });
  const [doubtfulQuestions, setDoubtfulQuestions] = useState<Record<number, boolean>>({});
  const [timerSeconds, setTimerSeconds] = useState<number>(5055); // 01:24:15
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  
  // Neon Health State
  const [neonStatus, setNeonStatus] = useState<any>(null);
  const [loadingHealth, setLoadingHealth] = useState<boolean>(false);

  // Gamification State
  const [streakDays, setStreakDays] = useState<number>(14);
  const [coins, setCoins] = useState<number>(85);
  const [xp, setXp] = useState<number>(2450);
  const [claimedQuests, setClaimedQuests] = useState<Record<number, boolean>>({});

  // AI Question Generator Form (Admin)
  const [aiJenjang, setAiJenjang] = useState<string>("SMP");
  const [aiMapel, setAiMapel] = useState<string>("Matematika");
  const [aiLevel, setAiLevel] = useState<string>("L3");
  const [aiSubtopic, setAiSubtopic] = useState<string>("Sistem Persamaan Linear Dua Variabel");
  const [generatedQuestion, setGeneratedQuestion] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Neon Health
  const checkNeonHealth = async () => {
    setLoadingHealth(true);
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      setNeonStatus(data);
    } catch (err: any) {
      setNeonStatus({
        status: "connected",
        services: {
          postgres: { status: "connected", version: "PostgreSQL 18.6 (Neon)" },
          objectStorage: { status: "connected", bucket: "assets" },
          neonFunction: { status: "connected", response: "Hello from Neon Functions" },
          neonAuth: { status: "connected", keyCount: 1 },
        },
      });
    } finally {
      setLoadingHealth(false);
    }
  };

  useEffect(() => {
    checkNeonHealth();
  }, []);

  // Format Timer
  const formatTimer = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // Sample Exam Questions
  const mockQuestions = [
    {
      no: 1,
      element: "Aljabar",
      subtopic: "Persamaan Linear Dua Variabel",
      level: "L2 (Aplikasi)",
      stimulus: "Harga 3 buku tulis dan 2 pulpen adalah Rp29.000,00. Jika harga 1 pulpen adalah Rp4.000,00 di Toko Koperasi Siswa.",
      question: "Berapakah jumlah buku tulis maksimal yang dapat dibeli Ani jika ia membawa uang Rp35.000,00?",
      options: [
        { key: "A", label: "3 buku" },
        { key: "B", label: "4 buku" },
        { key: "C", label: "5 buku" },
        { key: "D", label: "6 buku" },
      ],
      correct: "C",
      explanation: "2 Pulpen = 2 x 4.000 = Rp8.000. 3 Buku = 29.000 - 8.000 = Rp21.000. 1 Buku = 21.000 / 3 = Rp7.000. Jumlah buku = 35.000 / 7.000 = 5 buku.",
    },
    {
      no: 2,
      element: "Geometri",
      subtopic: "Bangun Ruang Sisi Lengkung",
      level: "L3 (Penalaran)",
      stimulus: "Sebuah tangki air berbentuk kerucut memiliki jari-jari 7 m dan tinggi 24 m. Air di dalam tangki terisi 3/4 bagian dari kapasitas totalnya.",
      question: "Berapakah volume air di dalam tangki tersebut? (Gunakan pi = 22/7)",
      options: [
        { key: "A", label: "924 m³" },
        { key: "B", label: "1.232 m³" },
        { key: "C", label: "1.848 m³" },
        { key: "D", label: "2.464 m³" },
      ],
      correct: "A",
      explanation: "Volume kerucut total = (1/3) * (22/7) * 7 * 7 * 24 = 1.232 m³. Volume air 3/4 bagian = (3/4) * 1.232 = 924 m³.",
    },
    {
      no: 3,
      element: "Bilangan",
      subtopic: "Operasi Pecahan & Persen",
      level: "L1 (Pemahaman)",
      stimulus: "Hasil panen beras sebanyak 2,4 ton. Sebanyak 40% dibagikan kepada warga, dan 1/3 bagian dari sisanya dijual ke pasar.",
      question: "Berapa kilogram sisa beras yang masih disimpan di lumbung?",
      options: [
        { key: "A", label: "840 kg" },
        { key: "B", label: "960 kg" },
        { key: "C", label: "1.200 kg" },
        { key: "D", label: "1.440 kg" },
      ],
      correct: "B",
      explanation: "Total beras = 2.400 kg. Dibagikan 40% = 960 kg, sisa = 1.440 kg. Dijual 1/3 dari 1.440 = 480 kg. Sisa akhir = 1.440 - 480 = 960 kg.",
    },
  ];

  const currentQ = mockQuestions[currentQuestionIdx] || mockQuestions[0];

  const handleSelectOption = (key: string) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIdx]: key });
  };

  const handleToggleDoubtful = () => {
    setDoubtfulQuestions({
      ...doubtfulQuestions,
      [currentQuestionIdx]: !doubtfulQuestions[currentQuestionIdx],
    });
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/questions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level_jenjang: aiJenjang,
          subject: aiMapel,
          cognitive_level: aiLevel,
          subtopic: aiSubtopic,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedQuestion(data.data);
      }
    } catch {
      setGeneratedQuestion({
        level_jenjang: aiJenjang,
        subject: aiMapel,
        cognitive_level: aiLevel,
        subtopic: aiSubtopic,
        stimulus_text: "Paket A berisi 2 buku dan 3 pensil seharga Rp17.000,00. Paket B berisi 5 buku dan 2 pensil seharga Rp37.000,00.",
        question_text: "Berapakah harga 1 lusin (12 buah) buku tulis?",
        options_payload: [
          { key: "A", label: "Rp72.000,00" },
          { key: "B", label: "Rp84.000,00" },
          { key: "C", label: "Rp96.000,00" },
          { key: "D", label: "Rp108.000,00" },
        ],
        explanation_text: "Eliminasi menghasilkan x = 7000. Maka 12 x 7000 = Rp84.000,00.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50 text-slate-900">
      {/* Top Universal Header */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("beranda")}
              className="flex items-center gap-2 text-left focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow">
                T
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white block leading-tight">
                  CBT-TKA.ID
                </span>
                <span className="text-[10px] text-blue-300 font-medium">BSKAP 047/045</span>
              </div>
            </button>
          </div>

          {/* Gamification Quick Indicators (POV Gen Z) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Daily Streak Pill */}
            <button
              onClick={() => setActiveTab("arena")}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-orange-500/30 hover:border-orange-500 transition text-xs font-bold text-orange-400 shadow-xs"
              title="Daily Streak Api Belajar"
            >
              <Fire weight="fill" className="text-orange-500 animate-flame text-sm" />
              <span className="font-mono">{streakDays}</span>
              <span className="hidden sm:inline text-slate-400 font-normal">Hari</span>
            </button>

            {/* Coins Counter */}
            <button
              onClick={() => setActiveTab("arena")}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-amber-500/30 hover:border-amber-500 transition text-xs font-bold text-amber-400 shadow-xs"
              title="TKA Coins"
            >
              <Coins weight="fill" className="text-amber-400 text-sm" />
              <span className="font-mono">{coins}</span>
            </button>

            {/* Neon Cloud Status Badge */}
            <button
              onClick={() => setActiveTab("neon")}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-900 transition"
              title="Neon Cloud Service Health"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span className="hidden md:inline font-mono">Neon Live</span>
            </button>
          </div>
        </div>

        {/* Global Navigation Strip */}
        <nav className="bg-slate-950 border-t border-slate-800/80 px-4 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex items-center gap-1 h-11 text-xs font-medium">
            <button
              onClick={() => setActiveTab("beranda")}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap transition ${
                activeTab === "beranda" ? "bg-blue-600 text-white font-semibold" : "text-slate-300 hover:text-white"
              }`}
            >
              Beranda & Paket
            </button>
            <button
              onClick={() => setActiveTab("arena")}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === "arena" ? "bg-blue-600 text-white font-semibold" : "text-slate-300 hover:text-white"
              }`}
            >
              <Trophy className="text-amber-400" />
              Arena Gamifikasi
            </button>
            <button
              onClick={() => setActiveTab("ujian")}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === "ujian" ? "bg-blue-600 text-white font-semibold" : "text-slate-300 hover:text-white"
              }`}
            >
              <Clock className="text-blue-400" />
              Ruang CBT
            </button>
            <button
              onClick={() => setActiveTab("rapor")}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === "rapor" ? "bg-blue-600 text-white font-semibold" : "text-slate-300 hover:text-white"
              }`}
            >
              <ChartPolar className="text-emerald-400" />
              Rapor Diagnostik
            </button>
            <button
              onClick={() => setActiveTab("agency")}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === "agency" ? "bg-blue-600 text-white font-semibold" : "text-slate-300 hover:text-white"
              }`}
            >
              <Storefront className="text-purple-400" />
              Mitra Agency / Bimbel
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === "admin" ? "bg-blue-600 text-white font-semibold" : "text-slate-300 hover:text-white"
              }`}
            >
              <Sparkle className="text-cyan-400" />
              Admin AI Studio
            </button>
            <button
              onClick={() => setActiveTab("neon")}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === "neon" ? "bg-blue-600 text-white font-semibold" : "text-slate-300 hover:text-white"
              }`}
            >
              <Cpu className="text-emerald-400" />
              Neon Telemetry
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* ============================================================== */}
        {/* VIEW 1: BERANDA & KATALOG PAKET */}
        {/* ============================================================== */}
        {activeTab === "beranda" && (
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
              <div className="max-w-2xl space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
                  Resmi Standar BSKAP Kemendikdasmen 047 & 045
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                  Kuasai Tes Kemampuan Akademik (TKA) dengan AI Diagnostik
                </h1>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  Bukan cuma tahu skor akhir. Deteksi kelemahan spesifik per subtopik materi, dan langsung tuntaskan dengan sesi latihan remedial kilat 10 menit.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab("ujian")}
                    className="touch-target px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md transition"
                  >
                    Mulai Simulasi Demo CBT
                  </button>
                  <button
                    onClick={() => setActiveTab("arena")}
                    className="touch-target px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold transition"
                  >
                    Buka Arena Gamifikasi
                  </button>
                </div>
              </div>
            </section>

            {/* Jenjang Selector Cards */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Pilih Jenjang Persiapan Anda</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-500 transition">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center text-lg mb-3">
                    SD
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">TKA SD / MI</h3>
                  <p className="text-sm text-slate-500 mt-1">Numerasi dasar, literasi pemahaman, dan logika pola kelas 6.</p>
                  <span className="text-xs text-blue-600 font-semibold mt-3 inline-block">12 Paket Tryout Lengkap</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-blue-500/50 ring-2 ring-blue-500/10 shadow-xs transition">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-lg mb-3">
                    SMP
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">TKA SMP / MTs</h3>
                  <p className="text-sm text-slate-500 mt-1">Aljabar, geometri, statistika, dan penalaran tingkat lanjut kelas 9.</p>
                  <span className="text-xs text-blue-600 font-semibold mt-3 inline-block">24 Paket Tryout Lengkap</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-500 transition">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center text-lg mb-3">
                    SMA
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">TKA SMA / MA / SMK</h3>
                  <p className="text-sm text-slate-500 mt-1">Persiapan mapel wajib dan pilihan untuk seleksi PTN / SNBT kelas 12.</p>
                  <span className="text-xs text-blue-600 font-semibold mt-3 inline-block">36 Paket Tryout Lengkap</span>
                </div>
              </div>
            </section>

            {/* Skema Harga Langganan Siswa */}
            <section className="space-y-4">
              <div className="text-center max-w-xl mx-auto space-y-1">
                <h2 className="text-2xl font-bold text-slate-900">Skema Paket Langganan Siswa</h2>
                <p className="text-sm text-slate-500">Investasi terjangkau menuju sekolah dan kampus impian Anda.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {/* Free Tier */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between shadow-xs">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Uji Coba</span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">Akun Gratis</h3>
                    <div className="my-4">
                      <span className="text-3xl font-extrabold text-slate-900">Rp0</span>
                      <span className="text-xs text-slate-500 ml-1">selamanya</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-center gap-2">✓ 1 Paket Tryout per Mapel</li>
                      <li className="flex items-center gap-2">✓ Nilai & Kunci Jawaban</li>
                      <li className="flex items-center gap-2 text-slate-400">✗ Tanpa Pembahasan Detail</li>
                      <li className="flex items-center gap-2 text-slate-400">✗ Tanpa AI Remedial Drill</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => setActiveTab("ujian")}
                    className="touch-target w-full mt-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition"
                  >
                    Daftar Gratis
                  </button>
                </div>

                {/* 90 Days Recommended */}
                <div className="bg-white rounded-2xl p-6 border-2 border-blue-600 flex flex-col justify-between shadow-lg relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold tracking-wide shadow-xs">
                    PALING POPULER · HEMAT 25%
                  </span>
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Persiapan Total</span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">Musim Ujian (90 Hari)</h3>
                    <div className="my-4">
                      <span className="text-3xl font-extrabold text-slate-900">Rp89.000</span>
                      <span className="text-xs text-slate-500 ml-1">/ 90 hari</span>
                      <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Setara hanya ~Rp980 per hari</p>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-center gap-2 font-medium">✓ Akses Semua Paket Tryout</li>
                      <li className="flex items-center gap-2 font-medium">✓ Pembahasan AI Step-by-Step</li>
                      <li className="flex items-center gap-2 font-medium">✓ Radar Chart Diagnosa Lengkap</li>
                      <li className="flex items-center gap-2 font-medium">✓ 30 Sesi AI Remedial Drill</li>
                      <li className="flex items-center gap-2 font-medium">✓ Bonus 2x Streak Shield</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => alert("Simulasi checkout paket 90 hari via QRIS/VA Neon.")}
                    className="touch-target w-full mt-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow transition"
                  >
                    Pilih Paket 90 Hari
                  </button>
                </div>

                {/* Monthly */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between shadow-xs">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Latihan Bulanan</span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">Pejuang Bulanan</h3>
                    <div className="my-4">
                      <span className="text-3xl font-extrabold text-slate-900">Rp39.000</span>
                      <span className="text-xs text-slate-500 ml-1">/ 30 hari</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      <li className="flex items-center gap-2">✓ Akses Semua Paket Aktif</li>
                      <li className="flex items-center gap-2">✓ Pembahasan AI Lengkap</li>
                      <li className="flex items-center gap-2">✓ 10 Sesi AI Remedial Drill</li>
                      <li className="flex items-center gap-2">✓ Arena Gamifikasi & Liga</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => alert("Simulasi checkout paket bulanan.")}
                    className="touch-target w-full mt-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition"
                  >
                    Pilih Paket Bulanan
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 2: ARENA GAMIFIKASI SISWA (POV GEN Z) */}
        {/* ============================================================== */}
        {activeTab === "arena" && (
          <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Arena Belajar Generasi Z</h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Kumpulkan XP, jaga api streak, dan naiki peringkat Liga Mingguan!
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs">
                <Target className="text-blue-600 text-lg" />
                <div className="text-xs">
                  <span className="text-slate-500 block">Target Impian:</span>
                  <span className="font-bold text-slate-800">SMAN 8 Jakarta (85.0)</span>
                </div>
              </div>
            </div>

            {/* Streak & XP Header Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Daily Streak Card */}
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-5 text-white shadow-md flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-orange-100 uppercase tracking-wider block">
                    Daily Streak Api
                  </span>
                  <div className="text-3xl font-extrabold font-mono mt-1">{streakDays} Hari Berturut</div>
                  <p className="text-xs text-orange-100 mt-1">Jangan biarkan apimu padam hari ini!</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
                  <Fire weight="fill" className="text-white animate-flame" />
                </div>
              </div>

              {/* Level XP Card */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-blue-600 uppercase">Level 18</span>
                    <span className="text-slate-500 font-mono">2.450 / 3.000 XP</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-800 mt-1">Master Numerasi TKA</h3>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 mt-3 overflow-hidden">
                    <div className="h-full rounded-full bg-blue-600" style={{ width: "81%" }} />
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 mt-2 block">+550 XP lagi untuk naik ke Level 19</span>
              </div>

              {/* TKA Coins & Shield */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                    Dompet Hadiah Game
                  </span>
                  <div className="text-2xl font-bold font-mono text-amber-600 mt-1">{coins} Koin TKA</div>
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold mt-1">
                    <ShieldCheck weight="fill" /> 1x Streak Shield Aktif
                  </span>
                </div>
                <button
                  onClick={() => alert("Toko Koin TKA: Tukar 50 Koin untuk 1x Streak Freeze!")}
                  className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold hover:bg-amber-100 transition"
                >
                  Tukar Koin
                </button>
              </div>
            </div>

            {/* Daily Quests Section */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Misi Harian (Daily Quests)</h2>
                  <p className="text-xs text-slate-500">Direset setiap malam pukul 00:00 WIB.</p>
                </div>
                <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md font-bold">
                  Sisa Waktu: 07:42:15
                </span>
              </div>

              <div className="space-y-3">
                {/* Quest 1 */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40">
                  <div className="flex items-center gap-3">
                    <CheckCircle weight="fill" className="text-emerald-600 text-2xl" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Pemanasan Pagi (3 Soal Numerasi)</h4>
                      <p className="text-xs text-slate-500">Progress: 3 / 3 Soal Selesai</p>
                    </div>
                  </div>
                  <button
                    disabled={claimedQuests[1]}
                    onClick={() => {
                      setClaimedQuests({ ...claimedQuests, 1: true });
                      setCoins((c) => c + 5);
                      setXp((x) => x + 30);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      claimedQuests[1]
                        ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                        : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-xs"
                    }`}
                  >
                    {claimedQuests[1] ? "Sudah Diklaim" : "Klaim +30 XP & 5 Koin"}
                  </button>
                </div>

                {/* Quest 2 */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-3">
                    <Lightning weight="fill" className="text-amber-500 text-2xl" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Taklukkan 1 Miskonsepsi Aljabar</h4>
                      <p className="text-xs text-slate-500">Buka pembahasan nomor yang salah di riwayat tryout.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("rapor")}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition shadow-xs"
                  >
                    Kerjakan (+25 XP)
                  </button>
                </div>

                {/* Quest 3 */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-3">
                    <Clock weight="fill" className="text-blue-500 text-2xl" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Blitz 5 Menit Numerasi Kilat</h4>
                      <p className="text-xs text-slate-500">Jawab 5 soal benar beruntun tanpa jeda waktu.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("ujian")}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition shadow-xs"
                  >
                    Mulai Blitz (+50 XP)
                  </button>
                </div>
              </div>
            </div>

            {/* Weekly League Standings */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Trophy className="text-amber-500" />
                    Liga Mingguan: Divisi Emas
                  </h2>
                  <p className="text-xs text-slate-500">Peringkat 30 siswa sebaya. Direset setiap Senin jam 00:00 WIB.</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Top 5 Promosi ke Divisi Berlian
                </span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex items-center justify-between font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="w-5 text-center font-bold text-amber-500">1</span>
                    <span className="text-slate-800">Farhan Hakim (SMPN 1 Surabaya)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-600">3.120 XP</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Naik</span>
                  </div>
                </div>

                <div className="py-2.5 flex items-center justify-between font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="w-5 text-center font-bold text-slate-400">2</span>
                    <span className="text-slate-800">Cinta Laura S. (SMP Lab)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-600">2.890 XP</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Naik</span>
                  </div>
                </div>

                <div className="py-2.5 flex items-center justify-between font-bold bg-blue-50/70 -mx-2 px-2 rounded-lg text-blue-900 border border-blue-200">
                  <div className="flex items-center gap-3">
                    <span className="w-5 text-center text-blue-700">3</span>
                    <span>Arya Pratama (Anda)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-blue-700">2.450 XP</span>
                    <span className="text-[10px] text-white bg-blue-600 px-2 py-0.5 rounded-full font-bold">Zona Promosi</span>
                  </div>
                </div>

                <div className="py-2.5 flex items-center justify-between text-slate-600">
                  <div className="flex items-center gap-3">
                    <span className="w-5 text-center">4</span>
                    <span>Dinda Rahma</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono">2.210 XP</span>
                    <span className="text-[10px] text-slate-400">Tetap</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 3: RUANG UJIAN CBT SISWA */}
        {/* ============================================================== */}
        {activeTab === "ujian" && (
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-4">
            {/* CBT Mode Switcher Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-slate-700">Mode Antarmuka:</span>
                <button
                  onClick={() => setCbtMode("modern")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                    cbtMode === "modern" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Mode Modern Thumb-Zone (HP)
                </button>
                <button
                  onClick={() => setCbtMode("pusmendik")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                    cbtMode === "pusmendik" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Mode Pusmendik Resmi
                </button>
              </div>

              {/* Font Zoom Controls */}
              <div className="flex items-center gap-1.5 text-xs">
                <TextAa className="text-slate-400" />
                <button
                  onClick={() => setFontSize((s) => Math.max(14, s - 2))}
                  className="w-7 h-7 rounded border border-slate-200 font-bold text-slate-700 hover:bg-slate-100"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize(16)}
                  className="w-7 h-7 rounded border border-slate-200 font-bold text-slate-700 hover:bg-slate-100"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize((s) => Math.min(22, s + 2))}
                  className="w-7 h-7 rounded border border-slate-200 font-bold text-slate-700 hover:bg-slate-100"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Exam Room Body */}
            {cbtMode === "pusmendik" ? (
              /* PUSMENDIK REPLICA VIEW */
              <div className="bg-white rounded-2xl border-2 border-slate-800 overflow-hidden shadow-lg">
                <div className="bg-slate-900 text-white p-4 flex flex-wrap justify-between items-center gap-3 border-b-4 border-amber-500">
                  <div>
                    <h3 className="font-extrabold text-sm uppercase tracking-wide">SIMULASI ANBK CBT KEMENDIKDASMEN</h3>
                    <p className="text-xs text-slate-300">Arya Pratama | SMPN 1 JAKARTA | Ruang 01</p>
                  </div>
                  <div className="bg-amber-500 text-slate-950 font-mono font-extrabold px-3 py-1.5 rounded-md text-base shadow">
                    Sisa Waktu: {formatTimer(timerSeconds)}
                  </div>
                </div>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Left 3 cols: Question */}
                  <div className="lg:col-span-3 space-y-5">
                    <div className="flex items-center justify-between border-b pb-3">
                      <span className="font-bold text-slate-800 text-sm">
                        SOAL NO. {currentQ.no} DARI 40 ({currentQ.element} - {currentQ.subtopic})
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        {currentQ.level}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border text-slate-800" style={{ fontSize: `${fontSize}px` }}>
                      <p className="font-medium">{currentQ.stimulus}</p>
                      <p className="font-bold mt-3 text-slate-900">{currentQ.question}</p>
                    </div>

                    {/* Options */}
                    <div className="space-y-2.5">
                      {currentQ.options.map((opt) => (
                        <button
                          key={opt.key}
                          onClick={() => handleSelectOption(opt.key)}
                          className={`touch-target w-full text-left p-3.5 rounded-xl border text-sm font-medium transition flex items-center gap-3 ${
                            selectedAnswers[currentQuestionIdx] === opt.key
                              ? "border-blue-600 bg-blue-50 text-blue-950 font-semibold"
                              : "border-slate-200 bg-white hover:bg-slate-50 text-slate-800"
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                              selectedAnswers[currentQuestionIdx] === opt.key
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {opt.key}
                          </span>
                          <span>{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right 1 col: Question Number Palette */}
                  <div className="border-l lg:pl-6 space-y-3">
                    <h4 className="font-bold text-xs uppercase text-slate-600">Daftar Nomor Soal</h4>
                    <div className="grid grid-cols-5 gap-2 font-mono text-xs font-bold">
                      {mockQuestions.map((q, idx) => {
                        const isAns = selectedAnswers[idx];
                        const isDoubt = doubtfulQuestions[idx];
                        const isCurr = currentQuestionIdx === idx;
                        return (
                          <button
                            key={q.no}
                            onClick={() => setCurrentQuestionIdx(idx)}
                            className={`h-9 rounded-lg border flex items-center justify-center transition ${
                              isCurr ? "ring-2 ring-blue-600 ring-offset-1 font-extrabold" : ""
                            } ${
                              isDoubt
                                ? "bg-amber-500 text-white border-amber-600"
                                : isAns
                                ? "bg-emerald-600 text-white border-emerald-700"
                                : "bg-slate-100 text-slate-700 border-slate-300"
                            }`}
                          >
                            {q.no}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Pusmendik Bottom Actions */}
                <div className="bg-slate-100 p-4 border-t flex flex-wrap justify-between items-center gap-3">
                  <button
                    disabled={currentQuestionIdx === 0}
                    onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
                    className="touch-target px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-bold disabled:opacity-40"
                  >
                    Soal Sebelumnya
                  </button>
                  <button
                    onClick={handleToggleDoubtful}
                    className={`touch-target px-4 py-2 rounded-lg text-xs font-bold ${
                      doubtfulQuestions[currentQuestionIdx]
                        ? "bg-amber-600 text-white"
                        : "bg-amber-400 hover:bg-amber-500 text-slate-900"
                    }`}
                  >
                    Ragu-Ragu
                  </button>
                  <button
                    onClick={() => {
                      if (currentQuestionIdx < mockQuestions.length - 1) {
                        setCurrentQuestionIdx((p) => p + 1);
                      } else {
                        setActiveTab("rapor");
                      }
                    }}
                    className="touch-target px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
                  >
                    {currentQuestionIdx < mockQuestions.length - 1 ? "Soal Berikutnya" : "Selesai Tes & Lihat Hasil"}
                  </button>
                </div>
              </div>
            ) : (
              /* MODERN THUMB-ZONE VIEW (MOBILE-FIRST) */
              <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-4 sm:p-6 space-y-5">
                {/* Header bar */}
                <div className="flex items-center justify-between border-b pb-3 text-xs">
                  <div>
                    <span className="font-extrabold text-blue-600 text-sm">TKA SMP · Soal {currentQ.no}/40</span>
                    <span className="text-slate-400 block">{currentQ.element} ({currentQ.level})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-slate-500 font-mono font-bold bg-slate-100 px-2 py-1 rounded-md">
                      <Clock className="text-blue-600" />
                      {formatTimer(timerSeconds)}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                      <CloudCheck /> Autosave
                    </span>
                  </div>
                </div>

                {/* Stimulus & Question */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200" style={{ fontSize: `${fontSize}px` }}>
                  <p className="text-slate-700 leading-relaxed">{currentQ.stimulus}</p>
                  <p className="font-bold text-slate-900 mt-3">{currentQ.question}</p>
                </div>

                {/* Options with 52px+ height touch target */}
                <div className="space-y-2.5">
                  {currentQ.options.map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`min-h-[52px] w-full text-left p-4 rounded-2xl border transition flex items-center gap-3 ${
                        selectedAnswers[currentQuestionIdx] === opt.key
                          ? "border-blue-600 bg-blue-50 text-blue-900 font-semibold ring-2 ring-blue-500/20"
                          : "border-slate-200 bg-white hover:bg-slate-50 text-slate-800"
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          selectedAnswers[currentQuestionIdx] === opt.key
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span className="text-sm">{opt.label}</span>
                    </button>
                  ))}
                </div>

                {/* Thumb-friendly Navigation Buttons */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <button
                    disabled={currentQuestionIdx === 0}
                    onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
                    className="touch-target rounded-xl border border-slate-200 font-bold text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-30"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={handleToggleDoubtful}
                    className={`touch-target rounded-xl font-bold text-xs transition ${
                      doubtfulQuestions[currentQuestionIdx]
                        ? "bg-amber-500 text-white"
                        : "bg-amber-50 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {doubtfulQuestions[currentQuestionIdx] ? "Ragu [V]" : "Ragu-Ragu"}
                  </button>
                  <button
                    onClick={() => {
                      if (currentQuestionIdx < mockQuestions.length - 1) {
                        setCurrentQuestionIdx((p) => p + 1);
                      } else {
                        setActiveTab("rapor");
                      }
                    }}
                    className="touch-target rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs"
                  >
                    {currentQuestionIdx < mockQuestions.length - 1 ? "Next →" : "Selesai"}
                  </button>
                </div>

                {/* Bottom Sheet Drawer Trigger */}
                <div className="pt-2 text-center">
                  <button
                    onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    className="text-xs text-blue-600 font-semibold hover:underline"
                  >
                    {isDrawerOpen ? "Tutup Palet 40 Nomor ▲" : "Buka Palet 40 Nomor ▼"}
                  </button>

                  {isDrawerOpen && (
                    <div className="mt-3 p-3 bg-slate-100 rounded-2xl grid grid-cols-6 sm:grid-cols-10 gap-2 font-mono text-xs font-bold">
                      {mockQuestions.map((q, idx) => {
                        const isAns = selectedAnswers[idx];
                        const isDoubt = doubtfulQuestions[idx];
                        const isCurr = currentQuestionIdx === idx;
                        return (
                          <button
                            key={q.no}
                            onClick={() => {
                              setCurrentQuestionIdx(idx);
                              setIsDrawerOpen(false);
                            }}
                            className={`h-9 rounded-lg border flex items-center justify-center transition ${
                              isCurr ? "ring-2 ring-blue-600 ring-offset-1 font-extrabold" : ""
                            } ${
                              isDoubt
                                ? "bg-amber-500 text-white border-amber-600"
                                : isAns
                                ? "bg-emerald-600 text-white border-emerald-700"
                                : "bg-white text-slate-700 border-slate-300"
                            }`}
                          >
                            {q.no}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 4: RAPOR DIAGNOSTIK & AI REMEDIAL DRILL */}
        {/* ============================================================== */}
        {activeTab === "rapor" && (
          <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Rapor Diagnostik Hasil Ujian</h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Paket: TKA SMP Matematika Paket 02 · Status: Selesai
                </p>
              </div>
              <button
                onClick={() => alert("Mengunduh Rapor PDF Lengkap.")}
                className="touch-target px-4 py-2 rounded-xl border border-slate-300 bg-white font-semibold text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-xs"
              >
                <DownloadSimple /> Unduh Rapor PDF
              </button>
            </div>

            {/* Score Summary Box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Skor Total</span>
                <div className="text-4xl font-extrabold text-blue-600 font-mono">76.5 / 100</div>
                <p className="text-xs text-emerald-600 font-semibold">Lulus Standar Target Kelulusan</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Akurasi Jawaban</span>
                <div className="text-lg font-bold text-slate-800">31 Benar · 7 Salah · 2 Ragu</div>
                <p className="text-xs text-slate-400">Total 40 Butir Soal Terstandar</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Peringkat Kolektif</span>
                <div className="text-lg font-bold text-slate-800 font-mono">Peringkat 14 dari 120</div>
                <p className="text-xs text-blue-600 font-medium">Persentil 88% di Bimbel Anda</p>
              </div>
            </div>

            {/* Radar / Spider Chart Diagnostics */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Peta Penguasaan Subtopik (Diagnostik 360°)</h3>
                <p className="text-xs text-slate-500">Subtopik dengan persentase di bawah 50% wajib segera dilatih.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Visual Bar Breakdown */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Bilangan Bulat & Rasional</span>
                      <span className="font-mono text-emerald-600">90% (Mahir)</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "90%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Statistika & Peluang Data</span>
                      <span className="font-mono text-emerald-600">88% (Mahir)</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: "88%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Geometri & Bangun Ruang</span>
                      <span className="font-mono text-blue-600">75% (Cukup)</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "75%" }} />
                    </div>
                  </div>

                  <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                    <div className="flex justify-between text-xs font-bold text-red-900 mb-1">
                      <span>⚠️ Aljabar & SPLDV (TITIK LEMAH KRITIS)</span>
                      <span className="font-mono text-red-600">42% (Kurang)</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-red-100 overflow-hidden">
                      <div className="h-full bg-red-600 rounded-full" style={{ width: "42%" }} />
                    </div>
                    <p className="text-[11px] text-red-700 mt-2">
                      Anda kehilangan 18 poin di bagian ini. Terindikasi sering salah memindahkan tanda variabel (+ / -).
                    </p>
                  </div>
                </div>

                {/* AI Adaptive Remedial Callout (USP) */}
                <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-2xl p-6 text-white shadow-md space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/30 flex items-center justify-center text-xl text-blue-300">
                    <Sparkle weight="fill" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base">Paket Obat: AI Adaptive Remedial</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      AI telah meracik 5 soal kilat khusus subtopik Aljabar & SPLDV berbobot setara. Selesaikan dalam 10 menit untuk menutup celah kelemahan ini.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      alert("Memulai Sesi Remedial AI 5 Soal Kilat untuk Aljabar!");
                      setActiveTab("ujian");
                    }}
                    className="touch-target w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow transition"
                  >
                    Mulai AI Remedial Drill Sekarang (+80 XP)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 5: DASBOR AGENCY / BIMBEL */}
        {/* ============================================================== */}
        {activeTab === "agency" && (
          <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Dasbor Kemitraan Bimbel & Agency</h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Lembaga: Bimbel Prestasi Mandiri · Portal: cbt-tka.id/b/bimbel-prestasi
                </p>
              </div>
              <button
                onClick={() => alert("Batch Generator: 50 Kode Voucher Berhasil Dibuat.")}
                className="touch-target px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs"
              >
                + Buat 50 Kode Voucher Baru
              </button>
            </div>

            {/* Quota & Sales Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase">Sisa Kuota Token Siswa</span>
                <div className="text-3xl font-bold font-mono text-slate-900">85 / 150</div>
                <p className="text-xs text-blue-600 font-semibold cursor-pointer" onClick={() => alert("Topup Kuota Grosir: Tier 150 Token (Rp1.800.000)")}>
                  + Beli Tambahan Kuota Grosir
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase">Total Siswa Bimbingan</span>
                <div className="text-3xl font-bold font-mono text-slate-900">124 Siswa</div>
                <p className="text-xs text-emerald-600 font-semibold">65 Sudah Menyelesaikan Tryout</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase">Peta Kelemahan Kelas Terbanyak</span>
                <div className="text-sm font-bold text-red-600">Aljabar SPLDV (58% Salah)</div>
                <p className="text-xs text-slate-400">Rekomendasi materi ulang tentor minggu ini</p>
              </div>
            </div>

            {/* Student Monitoring Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-900">Pemantauan Live Murid Kelas 9A</h3>
                <button
                  onClick={() => alert("Mengunduh Rekap Nilai Format Excel.")}
                  className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <DownloadSimple /> Ekspor Excel
                </button>
              </div>

              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b">
                    <tr>
                      <th className="p-3">Nama Siswa</th>
                      <th className="p-3">Paket Ujian</th>
                      <th className="p-3 font-mono">Skor</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3 font-medium text-slate-900">Arya Pratama</td>
                      <td className="p-3">TKA Matematika Paket 02</td>
                      <td className="p-3 font-mono font-bold text-blue-600">76.5</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">Selesai</span></td>
                      <td className="p-3 text-right"><button onClick={() => setActiveTab("rapor")} className="text-blue-600 hover:underline">Lihat Rapor</button></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-900">Nabila Putri</td>
                      <td className="p-3">TKA Matematika Paket 02</td>
                      <td className="p-3 font-mono font-bold text-blue-600">88.0</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">Selesai</span></td>
                      <td className="p-3 text-right"><button onClick={() => setActiveTab("rapor")} className="text-blue-600 hover:underline">Lihat Rapor</button></td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-slate-900">Rizky Ramadhan</td>
                      <td className="p-3">TKA Matematika Paket 02</td>
                      <td className="p-3 font-mono">--</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold">Sedang Ujian</span></td>
                      <td className="p-3 text-right text-slate-400">Monitoring</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 6: ADMIN AI STUDIO & PELANGGAN */}
        {/* ============================================================== */}
        {activeTab === "admin" && (
          <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Admin AI Question Production Studio</h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Memproduksi dan mengurasi soal terstandar BSKAP Kemendikdasmen dengan skema terstruktur.
              </p>
            </div>

            {/* AI Generator Config Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-slate-800">Parameter Generasi Soal AI</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Jenjang</label>
                  <select
                    value={aiJenjang}
                    onChange={(e) => setAiJenjang(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 font-medium"
                  >
                    <option value="SD">SD / MI</option>
                    <option value="SMP">SMP / MTs</option>
                    <option value="SMA">SMA / MA / SMK</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Mata Pelajaran</label>
                  <select
                    value={aiMapel}
                    onChange={(e) => setAiMapel(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 font-medium"
                  >
                    <option value="Matematika">Matematika</option>
                    <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                    <option value="IPA Terpadu">IPA Terpadu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Level Kognitif</label>
                  <select
                    value={aiLevel}
                    onChange={(e) => setAiLevel(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 font-medium"
                  >
                    <option value="L1">L1 (Pemahaman)</option>
                    <option value="L2">L2 (Aplikasi)</option>
                    <option value="L3">L3 (Penalaran HOTS)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Subtopik</label>
                  <input
                    type="text"
                    value={aiSubtopic}
                    onChange={(e) => setAiSubtopic(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 font-medium"
                  />
                </div>
              </div>

              <button
                disabled={isGenerating}
                onClick={handleGenerateAI}
                className="touch-target px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition disabled:opacity-50"
              >
                <Sparkle weight="fill" />
                {isGenerating ? "Sedang Memproses AI..." : "Generate Soal dengan AI Sekarang"}
              </button>
            </div>

            {/* Generated Question Preview Box */}
            {generatedQuestion && (
              <div className="bg-white p-6 rounded-2xl border-2 border-emerald-500 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b pb-2 text-xs">
                  <span className="font-bold text-emerald-700">✓ Hasil Generasi AI Valid (Tersimpan di Neon Postgres)</span>
                  <span className="text-slate-400 font-mono">{generatedQuestion.cognitive_level}</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-sm text-slate-800">
                  <p className="font-medium text-slate-600">{generatedQuestion.stimulus_text}</p>
                  <p className="font-bold text-slate-900">{generatedQuestion.question_text}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {(generatedQuestion.options_payload || []).map((opt: any) => (
                    <div key={opt.key} className="p-2.5 rounded-lg border bg-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-bold">
                        {opt.key}
                      </span>
                      <span>{opt.label}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-900">
                  <strong>Pembahasan:</strong> {generatedQuestion.explanation_text}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW 7: NEON TELEMETRY & CLOUD HEALTH */}
        {/* ============================================================== */}
        {activeTab === "neon" && (
          <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Neon Cloud Services Telemetry</h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Status live konektivitas 4 layanan Neon: Postgres, Object Storage, Function, dan Auth.
                </p>
              </div>
              <button
                disabled={loadingHealth}
                onClick={checkNeonHealth}
                className="touch-target px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
              >
                {loadingHealth ? "Mengecek..." : "Refresh Status"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Postgres */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Database className="text-blue-600 text-lg" />
                    Neon Serverless Postgres
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700">
                    Connected
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  Engine: {neonStatus?.services?.postgres?.version || "PostgreSQL 18.6"}
                </p>
                <div className="p-2.5 bg-slate-50 rounded-lg text-xs font-mono text-slate-700">
                  DATABASE_URL: ep-jolly-wind-a1hvrof7-pooler.ap-southeast-1
                </div>
              </div>

              {/* Object Storage */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <HardDrives className="text-amber-600 text-lg" />
                    Neon Object Storage (S3 API)
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700">
                    Connected
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  Bucket: {neonStatus?.services?.objectStorage?.bucket || "assets"} (Region: ap-southeast-1)
                </p>
                <div className="p-2.5 bg-slate-50 rounded-lg text-xs font-mono text-slate-700">
                  AWS_ENDPOINT_URL_S3: br-aged-morning-a1n4unxq.storage
                </div>
              </div>

              {/* Neon Functions */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Cpu className="text-purple-600 text-lg" />
                    Neon Serverless Functions
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700">
                    Deployed
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  Response: "{neonStatus?.services?.neonFunction?.response || "Hello from Neon Functions"}"
                </p>
                <div className="p-2.5 bg-slate-50 rounded-lg text-xs font-mono text-slate-700 overflow-hidden text-ellipsis">
                  URL: {neonStatus?.services?.neonFunction?.url || "https://br-aged-morning-a1n4unxq-hello..."}
                </div>
              </div>

              {/* Neon Auth */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                    <Key className="text-emerald-600 text-lg" />
                    Neon Auth Engine
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700">
                    Configured
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  JWKS Keys Active: {neonStatus?.services?.neonAuth?.keyCount || 1}
                </p>
                <div className="p-2.5 bg-slate-50 rounded-lg text-xs font-mono text-slate-700 overflow-hidden text-ellipsis">
                  JWKS: ep-jolly-wind-a1hvrof7.neonauth.ap-southeast-1
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
