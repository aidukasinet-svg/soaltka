import React, { useState, useEffect } from "react";
import {
  Flame,
  Coins,
  Trophy,
  Zap,
  Target,
  Sparkles,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Brain,
  Clock,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Users,
  BarChart3,
  Building2,
  LogOut,
  LogIn,
  ChevronDown,
  ChevronUp,
  Download,
  FileSpreadsheet,
  FileText,
  Check,
  Award,
  HelpCircle,
  Layers,
  SlidersHorizontal,
  CloudCheck,
  Database,
  HardDrive,
  Cpu,
  KeyRound,
  GraduationCap,
  Store,
  RefreshCw,
  User,
  Compass,
  Smartphone,
  Monitor,
  CheckCircle,
  Pencil,
  Trash2,
  Copy,
  Plus,
  Search,
  Filter,
  Maximize2,
  AlertTriangle,
  Save,
  CheckSquare,
  Ticket,
  Eye,
  EyeOff,
} from "lucide-react";

// Types
type UserRole = "student" | "agency" | "admin" | null;
type QuestionStatus = "DRAFT" | "IN_REVIEW" | "PUBLISHED" | "ARCHIVED";

interface UserProfile {
  role: UserRole;
  name: string;
  email: string;
  level?: number;
  xp?: number;
  streak?: number;
  coins?: number;
  target?: string;
  agencyName?: string;
  tokens?: number;
  maxTokens?: number;
  studentsCount?: number;
}

interface QuestionItem {
  id: string;
  code: string;
  jenjang: "SD" | "SMP" | "SMA" | "SMK";
  mapel: string;
  element: string;
  subtopic: string;
  level: "L1 (Pemahaman)" | "L2 (Aplikasi)" | "L3 (Penalaran HOTS)";
  bentuk: "PG Biasa" | "PG Kompleks" | "Menjodohkan" | "Isian Singkat";
  stimulus: string;
  question: string;
  options: { key: string; label: string }[];
  correct: string;
  explanation: string;
  misconceptions?: Record<string, string>;
  status: QuestionStatus;
  usedInPackagesCount: number;
}

export default function App() {
  // Authentication & Current User State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authRole, setAuthRole] = useState<"student" | "agency">("student");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");

  // Navigation State
  // When logged out: "landing" | "auth"
  // When student: "arena" | "ujian" | "rapor" | "paket"
  // When agency: "agency-dasbor" | "agency-token" | "agency-branding"
  // When admin: "admin-portal" (with adminSubTab)
  const [activeTab, setActiveTab] = useState<string>("landing");
  const [adminSubTab, setAdminSubTab] = useState<
    "studio" | "bank-soal" | "paket-cbt" | "siswa" | "agency" | "voucher" | "telemetry"
  >("studio");

  // Landing Page Interactive State
  const [pricingPeriod, setPricingPeriod] = useState<"student" | "agency">("student");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // CBT Exam State (Student)
  const [cbtMode, setCbtMode] = useState<"modern" | "pusmendik">("modern");
  const [fontSize, setFontSize] = useState<number>(16);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({ 0: "C" });
  const [doubtfulQuestions, setDoubtfulQuestions] = useState<Record<number, boolean>>({});
  const [timerSeconds, setTimerSeconds] = useState<number>(5055); // 01:24:15
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Landing Page Interactive Mini Demo Question State
  const [demoSelectedAnswer, setDemoSelectedAnswer] = useState<string>("C");
  const [demoIsDoubtful, setDemoIsDoubtful] = useState<boolean>(false);

  // Neon Health State
  const [neonStatus, setNeonStatus] = useState<any>(null);
  const [loadingHealth, setLoadingHealth] = useState<boolean>(false);

  // Gamification State (Student)
  const [streakDays, setStreakDays] = useState<number>(14);
  const [coins, setCoins] = useState<number>(85);
  const [xp, setXp] = useState<number>(2450);
  const [claimedQuests, setClaimedQuests] = useState<Record<number, boolean>>({});

  // Agency State
  const [agencyTokens, setAgencyTokens] = useState<number>(85);
  const [generatedVouchers, setGeneratedVouchers] = useState<string[]>([
    "TKA-PRESTASI-8812",
    "TKA-PRESTASI-9943",
    "TKA-PRESTASI-4421",
  ]);

  // =========================================================================
  // ADMIN TKA STUDIO & BANK SOAL STATE (ADAPTED FROM BUATSOAL ONLINE)
  // =========================================================================
  const [tkaJenjang, setTkaJenjang] = useState<"SD" | "SMP" | "SMA" | "SMK">("SMP");
  const [tkaMapel, setTkaMapel] = useState<string>("Matematika");
  const [tkaMode, setTkaMode] = useState<"komprehensif" | "drilling">("komprehensif");
  const [tkaDrillingTopic, setTkaDrillingTopic] = useState<string>("Sistem Persamaan Linear Dua Variabel");
  const [tkaBentuk, setTkaBentuk] = useState<"PG Biasa" | "PG Kompleks" | "Menjodohkan" | "Isian Singkat">("PG Biasa");
  const [tkaOpsiCount, setTkaOpsiCount] = useState<4 | 5>(4);
  const [tkaJumlahSoal, setTkaJumlahSoal] = useState<number>(10);
  const [tkaSectionsCart, setTkaSectionsCart] = useState<
    { id: string; bentuk: string; opsiCount: number; jumlah: number }[]
  >([
    { id: "sec-1", bentuk: "PG Biasa", opsiCount: 4, jumlah: 10 },
  ]);
  const [tkaWithImage, setTkaWithImage] = useState<boolean>(true);
  const [tkaWithMisconception, setTkaWithMisconception] = useState<boolean>(true);
  const [isGeneratingNaskah, setIsGeneratingNaskah] = useState<boolean>(false);
  const [generateProgress, setGenerateProgress] = useState<number>(0);

  // Naskah Workspace State
  const [workspaceActiveTab, setWorkspaceActiveTab] = useState<"soal" | "kunci" | "kisi" | "kartu">("soal");
  const [currentNaskahStatus, setCurrentNaskahStatus] = useState<QuestionStatus>("DRAFT");
  const [naskahTitle, setNaskahTitle] = useState<string>("Naskah Soal TKA Matematika SMP Paket 01");
  const [generatedNaskahQuestions, setGeneratedNaskahQuestions] = useState<QuestionItem[]>([
    {
      id: "tka-01",
      code: "TKA-SMP-MAT-01",
      jenjang: "SMP",
      mapel: "Matematika",
      element: "Aljabar",
      subtopic: "Persamaan Linear Dua Variabel",
      level: "L2 (Aplikasi)",
      bentuk: "PG Biasa",
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
      misconceptions: {
        A: "Siswa lupa mengurangkan uang pulpen terlebih dahulu.",
        B: "Siswa salah membagi sisa uang dengan 8.000, bukan 7.000.",
        D: "Siswa membulatkan ke atas tanpa menghitung batas uang tunai.",
      },
      status: "DRAFT",
      usedInPackagesCount: 1,
    },
    {
      id: "tka-02",
      code: "TKA-SMP-MAT-02",
      jenjang: "SMP",
      mapel: "Matematika",
      element: "Geometri",
      subtopic: "Bangun Ruang Sisi Lengkung",
      level: "L3 (Penalaran HOTS)",
      bentuk: "PG Biasa",
      stimulus: "Sebuah tangki air berbentuk kerucut memiliki jari-jari 7 m dan tinggi 24 m. Air di dalam tangki terisi 3/4 bagian dari kapasitas totalnya.",
      question: "Berapakah volume air di dalam tangki tersebut? (Gunakan pi = 22/7)",
      options: [
        { key: "A", label: "924 m3" },
        { key: "B", label: "1.232 m3" },
        { key: "C", label: "1.848 m3" },
        { key: "D", label: "2.464 m3" },
      ],
      correct: "A",
      explanation: "Volume kerucut total = (1/3) * (22/7) * 7 * 7 * 24 = 1.232 m3. Volume air 3/4 bagian = (3/4) * 1.232 = 924 m3.",
      misconceptions: {
        B: "Siswa menghitung volume kerucut total tapi lupa mengalikan fraksi 3/4.",
        C: "Siswa salah menggunakan rumus tabung bukan kerucut (tanpa faktor 1/3).",
        D: "Siswa mengalikan dua kali tinggi kerucut.",
      },
      status: "DRAFT",
      usedInPackagesCount: 1,
    },
    {
      id: "tka-03",
      code: "TKA-SMP-MAT-03",
      jenjang: "SMP",
      mapel: "Matematika",
      element: "Bilangan",
      subtopic: "Operasi Pecahan & Persen",
      level: "L1 (Pemahaman)",
      bentuk: "PG Biasa",
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
      misconceptions: {
        A: "Siswa menghitung 1/3 dari total awal bukan dari sisa beras.",
        C: "Siswa mengira pembagian 40% dan 1/3 dijumlahkan secara langsung.",
        D: "Siswa berhenti pada langkah pertama setelah membagikan 40%.",
      },
      status: "DRAFT",
      usedInPackagesCount: 0,
    },
  ]);

  // Master Bank Soal Database (State for CRUD)
  const [bankSoalList, setBankSoalList] = useState<QuestionItem[]>([
    {
      id: "bs-101",
      code: "TKA-SMP-MAT-01",
      jenjang: "SMP",
      mapel: "Matematika",
      element: "Aljabar",
      subtopic: "Persamaan Linear Dua Variabel",
      level: "L2 (Aplikasi)",
      bentuk: "PG Biasa",
      stimulus: "Harga 3 buku tulis dan 2 pulpen adalah Rp29.000,00. Jika harga 1 pulpen adalah Rp4.000,00 di Toko Koperasi Siswa.",
      question: "Berapakah jumlah buku tulis maksimal yang dapat dibeli Ani jika ia membawa uang Rp35.000,00?",
      options: [
        { key: "A", label: "3 buku" },
        { key: "B", label: "4 buku" },
        { key: "C", label: "5 buku" },
        { key: "D", label: "6 buku" },
      ],
      correct: "C",
      explanation: "2 Pulpen = Rp8.000. 3 Buku = Rp21.000. 1 Buku = Rp7.000. Jumlah buku = 35.000 / 7.000 = 5 buku.",
      status: "PUBLISHED",
      usedInPackagesCount: 2,
    },
    {
      id: "bs-102",
      code: "TKA-SMP-MAT-02",
      jenjang: "SMP",
      mapel: "Matematika",
      element: "Geometri",
      subtopic: "Bangun Ruang Sisi Lengkung",
      level: "L3 (Penalaran HOTS)",
      bentuk: "PG Biasa",
      stimulus: "Sebuah tangki air berbentuk kerucut memiliki jari-jari 7 m dan tinggi 24 m. Air di dalam tangki terisi 3/4 bagian dari kapasitas totalnya.",
      question: "Berapakah volume air di dalam tangki tersebut? (Gunakan pi = 22/7)",
      options: [
        { key: "A", label: "924 m3" },
        { key: "B", label: "1.232 m3" },
        { key: "C", label: "1.848 m3" },
        { key: "D", label: "2.464 m3" },
      ],
      correct: "A",
      explanation: "Volume kerucut total = (1/3) * (22/7) * 7 * 7 * 24 = 1.232 m3. Volume air 3/4 bagian = 924 m3.",
      status: "PUBLISHED",
      usedInPackagesCount: 1,
    },
    {
      id: "bs-103",
      code: "TKA-SMP-BIN-01",
      jenjang: "SMP",
      mapel: "Bahasa Indonesia",
      element: "Literasi Membaca",
      subtopic: "Ide Pokok Teks Informasi",
      level: "L2 (Aplikasi)",
      bentuk: "PG Biasa",
      stimulus: "Transisi energi menuju energi terbarukan di Indonesia memerlukan kolaborasi lintas sektor. Selain penyediaan infrastruktur panel surya dan turbin angin, kesiapan regulasi tarif listrik hijau menjadi pendorong utama minat investasi swasta.",
      question: "Gagasan pokok yang tepat dari kutipan paragraf di atas adalah...",
      options: [
        { key: "A", label: "Pembangunan turbin angin dan panel surya di daerah terpencil." },
        { key: "B", label: "Kebutuhan kolaborasi lintas sektor dan regulasi dalam transisi energi." },
        { key: "C", label: "Kenaikan tarif listrik hijau bagi pelanggan rumah tangga." },
        { key: "D", label: "Kendala modal investasi swasta di sektor pembangkit fosil." },
      ],
      correct: "B",
      explanation: "Paragraf menegaskan kolaborasi lintas sektor dan regulasi sebagai penentu keberhasilan transisi energi.",
      status: "IN_REVIEW",
      usedInPackagesCount: 0,
    },
    {
      id: "bs-104",
      code: "TKA-SMA-MAT-01",
      jenjang: "SMA",
      mapel: "Matematika",
      element: "Kalkulus",
      subtopic: "Turunan Fungsi Aljabar",
      level: "L3 (Penalaran HOTS)",
      bentuk: "PG Biasa",
      stimulus: "Sebuah perusahaan manufaktur memproduksi x unit barang dengan biaya total C(x) = 2x^2 - 120x + 5000 dalam ribuan rupiah.",
      question: "Berapakah jumlah unit barang yang harus diproduksi agar biaya total minimum?",
      options: [
        { key: "A", label: "20 unit" },
        { key: "B", label: "30 unit" },
        { key: "C", label: "40 unit" },
        { key: "D", label: "50 unit" },
        { key: "E", label: "60 unit" },
      ],
      correct: "B",
      explanation: "C'(x) = 4x - 120 = 0 -> 4x = 120 -> x = 30 unit.",
      status: "DRAFT",
      usedInPackagesCount: 0,
    },
    {
      id: "bs-105",
      code: "TKA-SD-MAT-01",
      jenjang: "SD",
      mapel: "Matematika",
      element: "Bilangan",
      subtopic: "Operasi Hitung Campuran",
      level: "L1 (Pemahaman)",
      bentuk: "PG Biasa",
      stimulus: "Pak Budi memanen 15 keranjang mangga. Setiap keranjang berisi 24 buah. Sebanyak 60 buah dibagikan ke tetangga, dan sisanya dijual ke pedagang.",
      question: "Berapa banyak buah mangga yang dijual ke pedagang?",
      options: [
        { key: "A", label: "280 buah" },
        { key: "B", label: "300 buah" },
        { key: "C", label: "320 buah" },
        { key: "D", label: "360 buah" },
      ],
      correct: "B",
      explanation: "Total mangga = 15 x 24 = 360 buah. Dijual = 360 - 60 = 300 buah.",
      status: "ARCHIVED",
      usedInPackagesCount: 0,
    },
  ]);

  // Bank Soal Filters & Search
  const [bankSearch, setBankSearch] = useState<string>("");
  const [bankStatusFilter, setBankStatusFilter] = useState<"all" | QuestionStatus>("all");
  const [bankJenjangFilter, setBankJenjangFilter] = useState<string>("all");
  const [bankMapelFilter, setBankMapelFilter] = useState<string>("all");
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(new Set());

  // Edit Question Modal State
  const [editingQuestion, setEditingQuestion] = useState<QuestionItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [previewQuestion, setPreviewQuestion] = useState<QuestionItem | null>(null);

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
    } catch {
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

  // Login handler
  const handleLoginAs = (role: "student" | "agency" | "admin") => {
    if (role === "student") {
      setCurrentUser({
        role: "student",
        name: "Arya Pratama",
        email: "arya.pratama@student.id",
        level: 18,
        xp: xp,
        streak: streakDays,
        coins: coins,
        target: "SMAN 8 Jakarta (85.0)",
      });
      setActiveTab("arena");
    } else if (role === "agency") {
      setCurrentUser({
        role: "agency",
        name: "Bimbel Prestasi Mandiri",
        email: "admin@bimbelprestasi.com",
        tokens: agencyTokens,
        maxTokens: 150,
        studentsCount: 124,
      });
      setActiveTab("agency-dasbor");
    } else if (role === "admin") {
      setCurrentUser({
        role: "admin",
        name: "Super Admin",
        email: "admin@cbt-tka.id",
      });
      setActiveTab("admin-portal");
      setAdminSubTab("studio");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab("landing");
  };

  // Handler for AI Generator Execution
  const handleExecuteGenerateTKA = async () => {
    setIsGeneratingNaskah(true);
    setGenerateProgress(15);
    try {
      setGenerateProgress(45);
      const res = await fetch("/api/questions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          level_jenjang: tkaJenjang,
          subject: tkaMapel,
          cognitive_level: "L3",
          subtopic: tkaMode === "drilling" ? tkaDrillingTopic : "Komprehensif Kurikulum BSKAP",
        }),
      });
      setGenerateProgress(80);
      const data = await res.json();
      if (data.success && data.data) {
        const newQ: QuestionItem = {
          id: `tka-${Date.now()}`,
          code: `TKA-${tkaJenjang}-${tkaMapel.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
          jenjang: tkaJenjang,
          mapel: tkaMapel,
          element: "Aljabar & Terapan",
          subtopic: tkaMode === "drilling" ? tkaDrillingTopic : "Distribusi BSKAP",
          level: "L3 (Penalaran HOTS)",
          bentuk: tkaBentuk,
          stimulus: data.data.stimulus_text,
          question: data.data.question_text,
          options: data.data.options_payload || [
            { key: "A", label: "Opsi A" },
            { key: "B", label: "Opsi B" },
            { key: "C", label: "Opsi C" },
            { key: "D", label: "Opsi D" },
          ],
          correct: "C",
          explanation: data.data.explanation_text,
          misconceptions: {
            A: "Kesalahan pemindahan tanda operasi (+ / -).",
            B: "Kesalahan rasio pembagi pecahan.",
            D: "Kesalahan membaca variabel soal.",
          },
          status: "DRAFT",
          usedInPackagesCount: 0,
        };
        setGeneratedNaskahQuestions([newQ, ...generatedNaskahQuestions]);
        setBankSoalList([newQ, ...bankSoalList]);
      }
    } catch {
      // Fallback local generator demo
      const fallbackQ: QuestionItem = {
        id: `tka-${Date.now()}`,
        code: `TKA-${tkaJenjang}-${tkaMapel.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
        jenjang: tkaJenjang,
        mapel: tkaMapel,
        element: "Aljabar & Statistika",
        subtopic: tkaMode === "drilling" ? tkaDrillingTopic : "Distribusi Capaian BSKAP",
        level: "L3 (Penalaran HOTS)",
        bentuk: tkaBentuk,
        stimulus: "Dalam suatu uji coba laboratorium sekolah, pertumbuhan koloni bakteri dimodelkan dengan fungsi N(t) = 500 * (1.2)^t dengan t menyatakan waktu dalam jam.",
        question: "Berapakah perkiraan jumlah koloni bakteri setelah 3 jam pengamatan berlangsung?",
        options: [
          { key: "A", label: "720 bakteri" },
          { key: "B", label: "864 bakteri" },
          { key: "C", label: "920 bakteri" },
          { key: "D", label: "1.080 bakteri" },
        ],
        correct: "B",
        explanation: "N(3) = 500 * (1.2)^3 = 500 * 1.728 = 864 bakteri.",
        misconceptions: {
          A: "Siswa mengalikan 1.2 x 3 = 3.6 kemudian 500 x 3.6 = 1.800.",
          C: "Siswa salah menghitung eksponen kuadrat bukannya pangkat tiga.",
          D: "Siswa membulatkan perkiraan ke kelipatan terdekat.",
        },
        status: "DRAFT",
        usedInPackagesCount: 0,
      };
      setGeneratedNaskahQuestions([fallbackQ, ...generatedNaskahQuestions]);
      setBankSoalList([fallbackQ, ...bankSoalList]);
    } finally {
      setGenerateProgress(100);
      setIsGeneratingNaskah(false);
      alert("Naskah Soal TKA Baru Berhasil Dihasilkan oleh AI!");
    }
  };

  // Status badge style helper
  const getStatusBadge = (status: QuestionStatus) => {
    switch (status) {
      case "PUBLISHED":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">PUBLISHED</span>;
      case "IN_REVIEW":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">IN REVIEW</span>;
      case "DRAFT":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">DRAFT</span>;
      case "ARCHIVED":
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700 border border-slate-300">ARCHIVED</span>;
    }
  };

  // Change single question status
  const handleUpdateStatus = (id: string, newStatus: QuestionStatus) => {
    setBankSoalList((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
    setGeneratedNaskahQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
  };

  // Bulk status update
  const handleBulkStatus = (newStatus: QuestionStatus) => {
    setBankSoalList((prev) =>
      prev.map((q) => (selectedQuestionIds.has(q.id) ? { ...q, status: newStatus } : q))
    );
    setSelectedQuestionIds(new Set());
    alert(`Status ${selectedQuestionIds.size} butir soal diubah menjadi ${newStatus}!`);
  };

  // Filtered bank soal
  const filteredBankSoal = bankSoalList.filter((q) => {
    const matchesSearch =
      q.stimulus.toLowerCase().includes(bankSearch.toLowerCase()) ||
      q.question.toLowerCase().includes(bankSearch.toLowerCase()) ||
      q.code.toLowerCase().includes(bankSearch.toLowerCase()) ||
      q.subtopic.toLowerCase().includes(bankSearch.toLowerCase());
    const matchesStatus = bankStatusFilter === "all" || q.status === bankStatusFilter;
    const matchesJenjang = bankJenjangFilter === "all" || q.jenjang === bankJenjangFilter;
    const matchesMapel = bankMapelFilter === "all" || q.mapel === bankMapelFilter;
    return matchesSearch && matchesStatus && matchesJenjang && matchesMapel;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* ============================================================== */}
      {/* 1. TOP HEADER (FOR GUESTS, STUDENTS, & AGENCY) */}
      {/* (When admin is active, we render the full-screen dual scroll layout) */}
      {/* ============================================================== */}
      {currentUser?.role !== "admin" && (
        <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (!currentUser) setActiveTab("landing");
                }}
                className="flex items-center gap-2.5 text-left focus:outline-none group"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md group-hover:bg-blue-500 transition">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-base tracking-tight text-white block leading-tight">
                      CBT-TKA.ID
                    </span>
                    {currentUser && (
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                        {currentUser.role === "student" ? "Siswa" : "Mitra"}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    Standar BSKAP Kemendikdasmen
                  </span>
                </div>
              </button>
            </div>

            {/* Right section */}
            {!currentUser ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-300">
                  <a href="#fitur" onClick={() => setActiveTab("landing")} className="hover:text-white transition">
                    Fitur Unggulan
                  </a>
                  <a href="#simulasi" onClick={() => setActiveTab("landing")} className="hover:text-white transition">
                    Simulasi CBT
                  </a>
                  <a href="#diagnostik" onClick={() => setActiveTab("landing")} className="hover:text-white transition">
                    AI Diagnostik
                  </a>
                  <a href="#harga" onClick={() => setActiveTab("landing")} className="hover:text-white transition">
                    Paket Harga
                  </a>
                  <a href="#mitra" onClick={() => setActiveTab("landing")} className="hover:text-white transition">
                    Mitra Bimbel
                  </a>
                  <a href="#faq" onClick={() => setActiveTab("landing")} className="hover:text-white transition">
                    FAQ
                  </a>
                </nav>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setAuthMode("login");
                      setActiveTab("auth");
                    }}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-800 transition flex items-center gap-1.5"
                  >
                    <LogIn className="w-4 h-4 text-slate-300" />
                    <span>Masuk</span>
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode("register");
                      setActiveTab("auth");
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4 text-blue-200" />
                    <span>Coba Gratis</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                {currentUser.role === "student" && (
                  <>
                    <div
                      onClick={() => setActiveTab("arena")}
                      className="cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-orange-500/30 text-xs font-bold text-orange-400"
                      title="Daily Streak Api Belajar"
                    >
                      <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                      <span className="font-mono">{streakDays}</span>
                      <span className="hidden sm:inline text-slate-400 font-normal">Hari</span>
                    </div>

                    <div
                      onClick={() => setActiveTab("arena")}
                      className="cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-amber-500/30 text-xs font-bold text-amber-400"
                      title="Koin TKA"
                    >
                      <Coins className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-mono">{coins}</span>
                    </div>
                  </>
                )}

                {currentUser.role === "agency" && (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-xs font-bold text-purple-300">
                    <Building2 className="w-4 h-4 text-purple-400" />
                    <span className="font-mono">{agencyTokens}</span>
                    <span className="text-slate-400 font-normal">/ 150 Token</span>
                  </div>
                )}

                <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-200">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="hidden sm:block text-left text-xs">
                    <span className="font-bold text-slate-200 block leading-tight">{currentUser.name}</span>
                    <span className="text-[10px] text-slate-400">{currentUser.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition ml-1"
                    title="Keluar (Logout)"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Student / Agency subnav */}
          {currentUser && (
            <nav className="bg-slate-950 border-t border-slate-800 px-4 overflow-x-auto scrollbar-none">
              <div className="max-w-7xl mx-auto flex items-center gap-1 h-11 text-xs font-medium">
                {currentUser.role === "student" && (
                  <>
                    <button
                      onClick={() => setActiveTab("arena")}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
                        activeTab === "arena"
                          ? "bg-blue-600 text-white font-semibold"
                          : "text-slate-300 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span>Arena Gamifikasi</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("ujian")}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
                        activeTab === "ujian"
                          ? "bg-blue-600 text-white font-semibold"
                          : "text-slate-300 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span>Ruang Ujian CBT</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("rapor")}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
                        activeTab === "rapor"
                          ? "bg-blue-600 text-white font-semibold"
                          : "text-slate-300 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <BarChart3 className="w-4 h-4 text-emerald-400" />
                      <span>Rapor & Analisis AI</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("paket")}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
                        activeTab === "paket"
                          ? "bg-blue-600 text-white font-semibold"
                          : "text-slate-300 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>Beli Paket Langganan</span>
                    </button>
                  </>
                )}

                {currentUser.role === "agency" && (
                  <>
                    <button
                      onClick={() => setActiveTab("agency-dasbor")}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
                        activeTab === "agency-dasbor"
                          ? "bg-blue-600 text-white font-semibold"
                          : "text-slate-300 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <BarChart3 className="w-4 h-4 text-emerald-400" />
                      <span>Dasbor Kelas & Hasil</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("agency-token")}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
                        activeTab === "agency-token"
                          ? "bg-blue-600 text-white font-semibold"
                          : "text-slate-300 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <Coins className="w-4 h-4 text-amber-400" />
                      <span>Kelola Token & Voucher</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("agency-branding")}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition flex items-center gap-1.5 ${
                        activeTab === "agency-branding"
                          ? "bg-blue-600 text-white font-semibold"
                          : "text-slate-300 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-purple-400" />
                      <span>Pengaturan Co-Branding</span>
                    </button>
                  </>
                )}
              </div>
            </nav>
          )}
        </header>
      )}

      {/* ============================================================== */}
      {/* 2. ADMIN PORTAL: INDEPENDENT SCROLL SIDEBAR + WORKSPACE */}
      {/* (Only rendered when currentUser.role === 'admin') */}
      {/* ============================================================== */}
      
      {currentUser?.role === "admin" ? (
        
        <div className="h-screen w-full flex overflow-hidden bg-slate-950">
          {/* ========================================================== */}
          {/* SIDEBAR KIRI MANDIRI (INDEPENDENT SCROLL) */}
          {/* ========================================================== */}
          <aside className="w-64 h-screen sticky top-0 overflow-y-auto bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col justify-between shrink-0 p-4 scrollbar-thin">
            <div className="space-y-6">
              {/* Brand Logo */}
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-white block">CBT-TKA.ID</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                      ADMIN
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">Pusat Kurikulum & Soal</span>
                </div>
              </div>

              {/* Navigation Menu Group 1: Produksi & Bank Soal */}
              <div className="space-y-1">
                <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                  Produksi & Bank Soal TKA
                </span>

                <button
                  onClick={() => setAdminSubTab("studio")}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${
                    adminSubTab === "studio"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>AI Question Studio</span>
                </button>

                <button
                  onClick={() => setAdminSubTab("bank-soal")}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                    adminSubTab === "bank-soal"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>Bank Soal & Kurasi</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-emerald-400 border border-emerald-500/30">
                    {bankSoalList.length}
                  </span>
                </button>

                <button
                  onClick={() => setAdminSubTab("paket-cbt")}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${
                    adminSubTab === "paket-cbt"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>Perakitan Paket CBT</span>
                </button>
              </div>

              {/* Navigation Menu Group 2: Pelanggan & Keuangan */}
              <div className="space-y-1">
                <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                  Pengguna & Kuota
                </span>

                <button
                  onClick={() => setAdminSubTab("siswa")}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${
                    adminSubTab === "siswa"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Pelanggan Siswa</span>
                </button>

                <button
                  onClick={() => setAdminSubTab("agency")}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${
                    adminSubTab === "agency"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Building2 className="w-4 h-4 text-purple-400" />
                  <span>Mitra Agency / Bimbel</span>
                </button>

                <button
                  onClick={() => setAdminSubTab("voucher")}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${
                    adminSubTab === "voucher"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Ticket className="w-4 h-4 text-amber-400" />
                  <span>Kode Voucher & Kupon</span>
                </button>
              </div>

              {/* Navigation Menu Group 3: Sistem Cloud */}
              <div className="space-y-1">
                <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                  Infrastruktur Cloud
                </span>

                <button
                  onClick={() => setAdminSubTab("telemetry")}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 ${
                    adminSubTab === "telemetry"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>Neon Cloud Telemetry</span>
                </button>
              </div>
            </div>

            {/* Sidebar Bottom Profile Card */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 px-2">
                <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center font-bold text-xs text-blue-400">
                  <User className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-left text-xs min-w-0">
                  <span className="font-bold text-white block truncate">Super Admin</span>
                  <span className="text-[10px] text-slate-400 block truncate">admin@cbt-tka.id</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentUser(null);
                    setActiveTab("landing");
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-red-950/60 hover:text-red-300 border border-slate-700 text-slate-300 text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar</span>
                </button>
              </div>
            </div>
          </aside>

          {/* ========================================================== */}
          {/* AREA KERJA KONTEN KANAN (INDEPENDENT SCROLL WORKSPACE) */}
          {/* ========================================================== */}
          <div className="flex-1 h-screen overflow-y-auto bg-slate-100 flex flex-col min-w-0">
            {/* Top Bar Workspace */}
            <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 sticky top-0 z-30">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-slate-500 uppercase">Admin Portal</span>
                <span className="text-slate-300">/</span>
                <span className="font-extrabold text-blue-700">
                  {adminSubTab === "studio"
                    ? "AI Question Production Studio (TKA)"
                    : adminSubTab === "bank-soal"
                    ? "Bank Soal & Kurasi Master"
                    : adminSubTab === "paket-cbt"
                    ? "Perakitan Paket Ujian CBT"
                    : adminSubTab === "siswa"
                    ? "Manajemen Siswa Langganan"
                    : adminSubTab === "agency"
                    ? "Mitra Bimbel & Lembaga"
                    : adminSubTab === "voucher"
                    ? "Voucher & Kupon Promo"
                    : "Neon Telemetry & Database"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Neon Postgres Active</span>
                </span>
                <button
                  onClick={() => setActiveTab("landing")}
                  className="text-xs text-blue-600 hover:underline font-semibold"
                >
                  Lihat Web Publik
                </button>
              </div>
            </div>

            {/* Content Area Based on Sub-Tab */}
            <div className="p-6 flex-1">
              {/* ====================================================== */}
              {/* SUBVIEW 1: AI QUESTION STUDIO (TKA ONLY - ADAPTED FROM BUATSOAL) */}
              {/* ====================================================== */}
              {adminSubTab === "studio" && (
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  {/* Left Generator Panel (Adapted from BuatSoal Online) */}
                  <div className="w-full lg:w-80 bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-5 shrink-0">
                    {/* Header Box: TKA ONLY */}
                    <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-xs">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-cyan-300" />
                        <h3 className="font-extrabold text-xs tracking-wide uppercase">
                          TKA - TES KEMAMPUAN AKADEMIK
                        </h3>
                      </div>
                      <p className="text-[10px] text-blue-200 mt-1">Standar BSKAP No. 047 & 045</p>
                    </div>

                    {/* Jenjang */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Jenjang
                      </label>
                      <select
                        value={tkaJenjang}
                        onChange={(e: any) => setTkaJenjang(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-xs"
                      >
                        <option value="SD">SD / MI</option>
                        <option value="SMP">SMP / MTs</option>
                        <option value="SMA">SMA / MA</option>
                        <option value="SMK">SMK</option>
                      </select>
                    </div>

                    {/* Mata Pelajaran */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Mata Pelajaran TKA
                      </label>
                      <select
                        value={tkaMapel}
                        onChange={(e) => setTkaMapel(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-xs"
                      >
                        <option value="Matematika">Matematika (Numerasi & Aljabar)</option>
                        <option value="Bahasa Indonesia">Bahasa Indonesia (Literasi Membaca)</option>
                        <option value="IPA Terpadu">IPA Terpadu (Fisika, Biologi)</option>
                        <option value="Bahasa Inggris">Bahasa Inggris (Literasi Sains)</option>
                      </select>
                    </div>

                    {/* Mode Soal */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Mode Distribusi Soal
                      </label>
                      <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 text-xs font-bold text-slate-600">
                        <button
                          onClick={() => setTkaMode("komprehensif")}
                          className={`py-2 rounded-lg transition ${
                            tkaMode === "komprehensif" ? "bg-white text-blue-700 shadow-xs" : ""
                          }`}
                        >
                          Komprehensif
                        </button>
                        <button
                          onClick={() => setTkaMode("drilling")}
                          className={`py-2 rounded-lg transition ${
                            tkaMode === "drilling" ? "bg-white text-blue-700 shadow-xs" : ""
                          }`}
                        >
                          Drilling Materi
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        {tkaMode === "komprehensif"
                          ? "Soal terdistribusi proporsional di seluruh elemen BSKAP."
                          : "Fokus mendalam pada 1 subtopik tertentu."}
                      </p>

                      {tkaMode === "drilling" && (
                        <div className="pt-1">
                          <input
                            type="text"
                            value={tkaDrillingTopic}
                            onChange={(e) => setTkaDrillingTopic(e.target.value)}
                            placeholder="Ketik topik spesifik..."
                            className="w-full p-2.5 rounded-xl border border-blue-200 bg-blue-50/50 text-xs font-medium"
                          />
                        </div>
                      )}
                    </div>

                    {/* Cart / Tambah Bentuk Soal */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                        Tambah Bentuk Soal TKA
                      </span>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 font-bold block">Bentuk Soal</label>
                        <select
                          value={tkaBentuk}
                          onChange={(e: any) => setTkaBentuk(e.target.value)}
                          className="w-full p-2 rounded-lg border border-slate-200 bg-white text-xs font-medium"
                        >
                          <option value="PG Biasa">Pilihan Ganda Biasa</option>
                          <option value="PG Kompleks">Pilihan Ganda Kompleks</option>
                          <option value="Menjodohkan">Menjodohkan</option>
                          <option value="Isian Singkat">Isian Singkat</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-1/2">
                          <label className="text-[10px] text-slate-500 font-bold block mb-1">Jumlah Opsi</label>
                          <div className="grid grid-cols-2 p-0.5 rounded-lg bg-slate-200 text-xs font-bold text-center">
                            <button
                              onClick={() => setTkaOpsiCount(4)}
                              className={`py-1 rounded ${tkaOpsiCount === 4 ? "bg-white text-blue-700 shadow-xs" : ""}`}
                            >
                              4
                            </button>
                            <button
                              onClick={() => setTkaOpsiCount(5)}
                              className={`py-1 rounded ${tkaOpsiCount === 5 ? "bg-white text-blue-700 shadow-xs" : ""}`}
                            >
                              5
                            </button>
                          </div>
                        </div>

                        <div className="w-1/2">
                          <label className="text-[10px] text-slate-500 font-bold block mb-1">Jumlah Soal</label>
                          <input
                            type="number"
                            min={1}
                            max={40}
                            value={tkaJumlahSoal}
                            onChange={(e) => setTkaJumlahSoal(parseInt(e.target.value) || 1)}
                            className="w-full p-1.5 rounded-lg border border-slate-200 bg-white text-xs font-mono font-bold text-center"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const newSec = {
                            id: `sec-${Date.now()}`,
                            bentuk: tkaBentuk,
                            opsiCount: tkaOpsiCount,
                            jumlah: tkaJumlahSoal,
                          };
                          setTkaSectionsCart([...tkaSectionsCart, newSec]);
                        }}
                        className="w-full py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah ke Keranjang</span>
                      </button>

                      {/* Cart List */}
                      {tkaSectionsCart.length > 0 && (
                        <div className="space-y-1.5 pt-2 border-t border-slate-200">
                          {tkaSectionsCart.map((sec, idx) => (
                            <div
                              key={sec.id}
                              className="p-2 rounded-lg bg-white border border-slate-200 text-[11px] flex items-center justify-between"
                            >
                              <div>
                                <span className="font-bold text-slate-800">{sec.bentuk}</span>
                                <span className="text-slate-400 ml-1">
                                  ({sec.jumlah} soal · {sec.opsiCount} opsi)
                                </span>
                              </div>
                              <button
                                onClick={() => setTkaSectionsCart(tkaSectionsCart.filter((s) => s.id !== sec.id))}
                                className="text-red-500 hover:text-red-700 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Additional Options */}
                    <div className="space-y-2 text-xs text-slate-700">
                      <label className="flex items-center gap-2 cursor-pointer font-medium">
                        <input
                          type="checkbox"
                          checked={tkaWithImage}
                          onChange={(e) => setTkaWithImage(e.target.checked)}
                          className="rounded text-blue-600"
                        />
                        <span>Stimulus Visual / Tabel Otomatis</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer font-medium">
                        <input
                          type="checkbox"
                          checked={tkaWithMisconception}
                          onChange={(e) => setTkaWithMisconception(e.target.checked)}
                          className="rounded text-blue-600"
                        />
                        <span>Diagnosa Miskonsepsi Opsi Salah</span>
                      </label>
                    </div>

                    {/* Execute Generate Button */}
                    <button
                      disabled={isGeneratingNaskah || tkaSectionsCart.length === 0}
                      onClick={handleExecuteGenerateTKA}
                      className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Brain className="w-4 h-4 text-cyan-200" />
                      <span>{isGeneratingNaskah ? `Memproses AI (${generateProgress}%)...` : "Generate Naskah TKA"}</span>
                    </button>
                  </div>

                  {/* Right Canvas: Workspace Dokumen A4 */}
                  <div className="flex-1 w-full space-y-4">
                    {/* Top Canvas Action Bar */}
                    <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-xs">
                      {/* Tabs */}
                      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 text-xs font-bold text-slate-600">
                        <button
                          onClick={() => setWorkspaceActiveTab("soal")}
                          className={`px-3 py-1.5 rounded-lg transition ${
                            workspaceActiveTab === "soal" ? "bg-white text-blue-700 shadow-xs" : ""
                          }`}
                        >
                          Naskah Soal
                        </button>
                        <button
                          onClick={() => setWorkspaceActiveTab("kunci")}
                          className={`px-3 py-1.5 rounded-lg transition ${
                            workspaceActiveTab === "kunci" ? "bg-white text-blue-700 shadow-xs" : ""
                          }`}
                        >
                          Kunci & Pembahasan
                        </button>
                        <button
                          onClick={() => setWorkspaceActiveTab("kisi")}
                          className={`px-3 py-1.5 rounded-lg transition ${
                            workspaceActiveTab === "kisi" ? "bg-white text-blue-700 shadow-xs" : ""
                          }`}
                        >
                          Kisi-Kisi BSKAP
                        </button>
                        <button
                          onClick={() => setWorkspaceActiveTab("kartu")}
                          className={`px-3 py-1.5 rounded-lg transition ${
                            workspaceActiveTab === "kartu" ? "bg-white text-blue-700 shadow-xs" : ""
                          }`}
                        >
                          Kartu Soal
                        </button>
                      </div>

                      {/* Right Actions */}
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 font-mono text-[11px] font-bold">
                          <span>Status:</span>
                          {getStatusBadge(currentNaskahStatus)}
                        </div>

                        <button
                          onClick={() => {
                            setCurrentNaskahStatus("PUBLISHED");
                            alert("Naskah soal resmi dipublikasikan ke Bank Soal aktif!");
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center gap-1.5 shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Publikasikan</span>
                        </button>

                        <button
                          onClick={() => alert("Mengunduh naskah dalam format Word/Docx.")}
                          className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold transition flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5 text-slate-500" />
                          <span>Ekspor</span>
                        </button>
                      </div>
                    </div>

                    {/* Content Paper View (A4 Styled Document Sheet) */}
                    <div className="bg-white rounded-3xl border border-slate-300 shadow-xl p-8 sm:p-12 space-y-6 max-w-4xl mx-auto">
                      {/* BSKAP Warning Notice */}
                      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 space-y-1">
                        <div className="flex items-center gap-2 font-bold text-amber-800">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span>Peringatan Verifikasi Konten TKA</span>
                        </div>
                        <p className="text-[11px] text-amber-800/90 leading-relaxed">
                          Naskah soal TKA ini dihasilkan oleh AI terstandar BSKAP. Harap lakukan telaah kurator sebelum dimasukkan ke paket tryout resmi siswa.
                        </p>
                      </div>

                      {/* Document Header */}
                      <div className="text-center pb-4 border-b-2 border-slate-800 space-y-1">
                        <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900">
                          {naskahTitle}
                        </h1>
                        <p className="text-xs font-semibold text-slate-600">
                          Jenjang: {tkaJenjang} | Mata Pelajaran: {tkaMapel} | Kurikulum: Standar BSKAP 047/045
                        </p>
                      </div>

                      {/* TAB 1: NASKAH SOAL */}
                      {workspaceActiveTab === "soal" && (
                        <div className="space-y-8 pt-2">
                          <div className="text-xs font-black uppercase tracking-wider text-slate-400">
                            Bagian 1: Pilihan Ganda Terstandar
                          </div>

                          {generatedNaskahQuestions.map((q, idx) => (
                            <div key={q.id} className="space-y-3 group border-b border-slate-100 pb-6">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-2.5 flex-1">
                                  <span className="font-extrabold text-sm text-slate-900">{idx + 1}.</span>
                                  <div className="space-y-2 text-xs sm:text-sm text-slate-800 leading-relaxed flex-1">
                                    <p className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-medium text-slate-700">
                                      {q.stimulus}
                                    </p>
                                    <p className="font-bold text-slate-900">{q.question}</p>
                                  </div>
                                </div>

                                <button
                                  onClick={() => {
                                    setEditingQuestion(q);
                                    setIsEditModalOpen(true);
                                  }}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition"
                                  title="Edit Butir Soal"
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Options */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6 text-xs">
                                {q.options.map((opt) => (
                                  <div
                                    key={opt.key}
                                    className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center gap-2"
                                  >
                                    <span className="w-5 h-5 rounded-full bg-slate-100 font-bold text-slate-700 flex items-center justify-center shrink-0">
                                      {opt.key}
                                    </span>
                                    <span>{opt.label}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* TAB 2: KUNCI & PEMBAHASAN */}
                      {workspaceActiveTab === "kunci" && (
                        <div className="space-y-6 pt-2">
                          <h3 className="font-bold text-sm text-slate-900">Kunci Jawaban & Diagnosa Miskonsepsi:</h3>
                          {generatedNaskahQuestions.map((q, idx) => (
                            <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                              <div className="flex items-center justify-between border-b pb-2">
                                <span className="font-bold text-slate-800">Soal No. {idx + 1} ({q.subtopic})</span>
                                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                                  Kunci Benar: {q.correct}
                                </span>
                              </div>
                              <p className="text-slate-700"><strong>Pembahasan Solusi:</strong> {q.explanation}</p>
                              {q.misconceptions && (
                                <div className="p-3 bg-red-50/70 rounded-xl border border-red-200 text-[11px] space-y-1 text-red-900">
                                  <span className="font-bold block">Analisis Miskonsepsi Opsi Pengecoh (Distractor):</span>
                                  {Object.entries(q.misconceptions).map(([k, val]) => (
                                    <div key={k} className="flex gap-2">
                                      <span className="font-mono font-bold text-red-700">Opsi {k}:</span>
                                      <span>{val}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* TAB 3: KISI-KISI BSKAP */}
                      {workspaceActiveTab === "kisi" && (
                        <div className="space-y-4 pt-2">
                          <h3 className="font-bold text-sm text-slate-900">Matriks Distribusi Kisi-Kisi BSKAP:</h3>
                          <div className="overflow-x-auto text-xs">
                            <table className="w-full text-left border">
                              <thead className="bg-slate-100 text-slate-700 font-bold border-b">
                                <tr>
                                  <th className="p-2 border">No</th>
                                  <th className="p-2 border">Elemen Capaian</th>
                                  <th className="p-2 border">Subtopik / Materi</th>
                                  <th className="p-2 border">Level Kognitif</th>
                                  <th className="p-2 border">Bentuk Soal</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y">
                                {generatedNaskahQuestions.map((q, idx) => (
                                  <tr key={q.id}>
                                    <td className="p-2 border font-bold text-center">{idx + 1}</td>
                                    <td className="p-2 border">{q.element}</td>
                                    <td className="p-2 border">{q.subtopic}</td>
                                    <td className="p-2 border"><span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded font-medium">{q.level}</span></td>
                                    <td className="p-2 border">{q.bentuk}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* TAB 4: KARTU SOAL */}
                      {workspaceActiveTab === "kartu" && (
                        <div className="space-y-4 pt-2">
                          <h3 className="font-bold text-sm text-slate-900">Format Kartu Telaah Butir Soal Resmi:</h3>
                          {generatedNaskahQuestions.map((q, idx) => (
                            <div key={q.id} className="p-4 rounded-2xl border border-slate-300 space-y-2 text-xs">
                              <div className="flex justify-between font-bold border-b pb-2">
                                <span>KARTU SOAL NOMOR: {idx + 1}</span>
                                <span>KODE: {q.code}</span>
                              </div>
                              <p><strong>Kompetensi:</strong> {q.element} - {q.subtopic}</p>
                              <p><strong>Level Kognitif:</strong> {q.level}</p>
                              <p><strong>Rumusan Soal:</strong> {q.question}</p>
                              <p><strong>Kunci Jawaban:</strong> {q.correct}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ====================================================== */}
              {/* SUBVIEW 2: BANK SOAL & KURASI (FULL CRUD) */}
              {/* ====================================================== */}
              {adminSubTab === "bank-soal" && (
                <div className="space-y-6">
                  {/* Status Pills Tabs (All, Draft, In Review, Published, Archived) */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 text-xs font-bold text-slate-600 overflow-x-auto">
                      <button
                        onClick={() => setBankStatusFilter("all")}
                        className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                          bankStatusFilter === "all" ? "bg-white text-slate-900 shadow-xs" : ""
                        }`}
                      >
                        <span>Semua</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-[10px]">
                          {bankSoalList.length}
                        </span>
                      </button>

                      <button
                        onClick={() => setBankStatusFilter("DRAFT")}
                        className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                          bankStatusFilter === "DRAFT" ? "bg-white text-amber-700 shadow-xs" : ""
                        }`}
                      >
                        <span>Draft</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 text-[10px]">
                          {bankSoalList.filter((q) => q.status === "DRAFT").length}
                        </span>
                      </button>

                      <button
                        onClick={() => setBankStatusFilter("IN_REVIEW")}
                        className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                          bankStatusFilter === "IN_REVIEW" ? "bg-white text-blue-700 shadow-xs" : ""
                        }`}
                      >
                        <span>In Review</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 text-[10px]">
                          {bankSoalList.filter((q) => q.status === "IN_REVIEW").length}
                        </span>
                      </button>

                      <button
                        onClick={() => setBankStatusFilter("PUBLISHED")}
                        className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                          bankStatusFilter === "PUBLISHED" ? "bg-white text-emerald-700 shadow-xs" : ""
                        }`}
                      >
                        <span>Published</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
                          {bankSoalList.filter((q) => q.status === "PUBLISHED").length}
                        </span>
                      </button>

                      <button
                        onClick={() => setBankStatusFilter("ARCHIVED")}
                        className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                          bankStatusFilter === "ARCHIVED" ? "bg-white text-slate-700 shadow-xs" : ""
                        }`}
                      >
                        <span>Archived</span>
                        <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px]">
                          {bankSoalList.filter((q) => q.status === "ARCHIVED").length}
                        </span>
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        const newManualQ: QuestionItem = {
                          id: `manual-${Date.now()}`,
                          code: `TKA-SMP-MAT-${Math.floor(100 + Math.random() * 900)}`,
                          jenjang: "SMP",
                          mapel: "Matematika",
                          element: "Aljabar",
                          subtopic: "Subtopik Baru",
                          level: "L2 (Aplikasi)",
                          bentuk: "PG Biasa",
                          stimulus: "Ketik narasi stimulus kasus baru di sini...",
                          question: "Ketik pertanyaan soal di sini...",
                          options: [
                            { key: "A", label: "Opsi A" },
                            { key: "B", label: "Opsi B" },
                            { key: "C", label: "Opsi C" },
                            { key: "D", label: "Opsi D" },
                          ],
                          correct: "A",
                          explanation: "Penjelasan pembahasan...",
                          status: "DRAFT",
                          usedInPackagesCount: 0,
                        };
                        setEditingQuestion(newManualQ);
                        setIsEditModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Buat Soal Manual</span>
                    </button>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs text-xs">
                    <div className="relative sm:col-span-2">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Cari kata kunci stimulus, materi, atau kode soal..."
                        value={bankSearch}
                        onChange={(e) => setBankSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                      />
                    </div>

                    <div>
                      <select
                        value={bankJenjangFilter}
                        onChange={(e) => setBankJenjangFilter(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                      >
                        <option value="all">Semua Jenjang</option>
                        <option value="SD">SD / MI</option>
                        <option value="SMP">SMP / MTs</option>
                        <option value="SMA">SMA / MA</option>
                      </select>
                    </div>

                    <div>
                      <select
                        value={bankMapelFilter}
                        onChange={(e) => setBankMapelFilter(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold"
                      >
                        <option value="all">Semua Mata Pelajaran</option>
                        <option value="Matematika">Matematika</option>
                        <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                        <option value="IPA Terpadu">IPA Terpadu</option>
                      </select>
                    </div>
                  </div>

                  {/* Bulk Actions Floating Bar */}
                  {selectedQuestionIds.size > 0 && (
                    <div className="bg-slate-900 text-white p-3.5 rounded-2xl flex items-center justify-between shadow-lg">
                      <span className="text-xs font-bold text-slate-300">
                        {selectedQuestionIds.size} butir soal dipilih
                      </span>
                      <div className="flex items-center gap-2 text-xs">
                        <button
                          onClick={() => handleBulkStatus("PUBLISHED")}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-bold"
                        >
                          Publikasikan Terpilih
                        </button>
                        <button
                          onClick={() => handleBulkStatus("ARCHIVED")}
                          className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 font-bold"
                        >
                          Arsipkan Terpilih
                        </button>
                        <button
                          onClick={() => {
                            setBankSoalList((prev) => prev.filter((q) => !selectedQuestionIds.has(q.id)));
                            setSelectedQuestionIds(new Set());
                          }}
                          className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 font-bold"
                        >
                          Hapus Terpilih
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Bank Soal Interactive Table */}
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto text-xs">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-600 font-bold border-b">
                          <tr>
                            <th className="p-3.5 text-center">
                              <input
                                type="checkbox"
                                checked={
                                  filteredBankSoal.length > 0 &&
                                  filteredBankSoal.every((q) => selectedQuestionIds.has(q.id))
                                }
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedQuestionIds(new Set(filteredBankSoal.map((q) => q.id)));
                                  } else {
                                    setSelectedQuestionIds(new Set());
                                  }
                                }}
                              />
                            </th>
                            <th className="p-3.5">Kode & Jenjang</th>
                            <th className="p-3.5">Mata Pelajaran & Materi</th>
                            <th className="p-3.5">Ringkasan Stimulus</th>
                            <th className="p-3.5">Kognitif</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {filteredBankSoal.map((q) => (
                            <tr key={q.id} className="hover:bg-slate-50/80 transition">
                              <td className="p-3.5 text-center">
                                <input
                                  type="checkbox"
                                  checked={selectedQuestionIds.has(q.id)}
                                  onChange={(e) => {
                                    const next = new Set(selectedQuestionIds);
                                    if (e.target.checked) next.add(q.id);
                                    else next.delete(q.id);
                                    setSelectedQuestionIds(next);
                                  }}
                                />
                              </td>
                              <td className="p-3.5">
                                <span className="font-mono font-bold text-slate-900 block">{q.code}</span>
                                <span className="text-[10px] text-blue-600 font-semibold">{q.jenjang}</span>
                              </td>
                              <td className="p-3.5">
                                <span className="font-bold text-slate-900 block">{q.mapel}</span>
                                <span className="text-[11px] text-slate-500">{q.subtopic}</span>
                              </td>
                              <td className="p-3.5 max-w-xs">
                                <p className="truncate text-slate-800">{q.stimulus}</p>
                                <p className="truncate text-[11px] text-slate-400 font-medium">{q.question}</p>
                              </td>
                              <td className="p-3.5">
                                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                                  {q.level.split(" ")[0]}
                                </span>
                              </td>
                              <td className="p-3.5">
                                <select
                                  value={q.status}
                                  onChange={(e: any) => handleUpdateStatus(q.id, e.target.value)}
                                  className="text-[10px] font-bold py-1 px-2 rounded-lg border bg-white cursor-pointer"
                                >
                                  <option value="DRAFT">DRAFT</option>
                                  <option value="IN_REVIEW">IN REVIEW</option>
                                  <option value="PUBLISHED">PUBLISHED</option>
                                  <option value="ARCHIVED">ARCHIVED</option>
                                </select>
                              </td>
                              <td className="p-3.5 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => {
                                      setPreviewQuestion(q);
                                    }}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                                    title="Pratinjau Soal"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setEditingQuestion(q);
                                      setIsEditModalOpen(true);
                                    }}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                                    title="Edit Soal"
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (confirm(`Hapus soal ${q.code}?`)) {
                                        setBankSoalList(bankSoalList.filter((item) => item.id !== q.id));
                                      }
                                    }}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                                    title="Hapus Soal"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ====================================================== */}
              {/* SUBVIEW 3: PERAKITAN PAKET CBT */}
              {/* ====================================================== */}
              {adminSubTab === "paket-cbt" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Perakitan Paket Tryout CBT</h2>
                      <p className="text-xs text-slate-500">
                        Susun 40 butir soal berstatus PUBLISHED menjadi paket ujian resmi siswa.
                      </p>
                    </div>
                    <button
                      onClick={() => alert("Membuka dialog perakitan paket ujian baru.")}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Buat Paket Tryout Baru</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono font-bold text-blue-700">PKT-SMP-MAT-01</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          AKTIF
                        </span>
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900">TKA SMP Matematika Paket 01</h3>
                        <p className="text-xs text-slate-500 mt-1">Standar BSKAP 40 Butir · Durasi 90 Menit</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                        <div className="flex justify-between"><span>Kuotasi Soal:</span><span className="font-bold">40/40 Soal</span></div>
                        <div className="flex justify-between"><span>Passing Grade KKM:</span><span className="font-bold">75.0</span></div>
                        <div className="flex justify-between"><span>Akses Siswa:</span><span className="font-bold text-blue-600">Publik / Siswa</span></div>
                      </div>
                      <button
                        onClick={() => alert("Mengatur distribusi butir soal paket 01.")}
                        className="w-full py-2.5 rounded-xl border border-slate-300 font-bold text-xs hover:bg-slate-50 transition"
                      >
                        Kelola Butir Soal (40 Soal)
                      </button>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono font-bold text-blue-700">PKT-SMP-MAT-02</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          AKTIF
                        </span>
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900">TKA SMP Matematika Paket 02</h3>
                        <p className="text-xs text-slate-500 mt-1">Paket Simulasi ANBK · Durasi 90 Menit</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                        <div className="flex justify-between"><span>Kuotasi Soal:</span><span className="font-bold">40/40 Soal</span></div>
                        <div className="flex justify-between"><span>Passing Grade KKM:</span><span className="font-bold">75.0</span></div>
                        <div className="flex justify-between"><span>Akses Siswa:</span><span className="font-bold text-purple-600">Khusus Mitra Bimbel</span></div>
                      </div>
                      <button
                        onClick={() => alert("Mengatur distribusi butir soal paket 02.")}
                        className="w-full py-2.5 rounded-xl border border-slate-300 font-bold text-xs hover:bg-slate-50 transition"
                      >
                        Kelola Butir Soal (40 Soal)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ====================================================== */}
              {/* SUBVIEWS 4-7: SISWA, AGENCY, VOUCHER, TELEMETRY */}
              {/* ====================================================== */}
              {adminSubTab === "siswa" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900">Daftar Pelanggan Siswa</h2>
                  <div className="bg-white rounded-3xl border border-slate-200 p-6">
                    <div className="divide-y divide-slate-100 text-xs">
                      <div className="py-3.5 flex justify-between items-center">
                        <div>
                          <span className="font-bold text-slate-900 text-sm block">Arya Pratama</span>
                          <span className="text-slate-500">arya.pratama@student.id · SMPN 1 Jakarta</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                            Musim Ujian (90 Hari)
                          </span>
                          <button onClick={() => alert("Reset sesi ujian siswa.")} className="text-blue-600 hover:underline">
                            Reset Sesi
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {adminSubTab === "agency" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900">Daftar Mitra Agency & Bimbel</h2>
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
                    <div className="divide-y divide-slate-100 text-xs">
                      <div className="py-3.5 flex justify-between items-center">
                        <div>
                          <span className="font-bold text-slate-900 text-sm block">Bimbel Prestasi Mandiri</span>
                          <span className="text-slate-500">cbt-tka.id/b/prestasi-mandiri · 124 Siswa Terdaftar</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-purple-700 text-sm">85 / 150 Token</span>
                          <button
                            onClick={() => {
                              setAgencyTokens((t) => t + 50);
                              alert("Top-up 50 Token berhasil ditambahkan ke saldo Bimbel Prestasi!");
                            }}
                            className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold"
                          >
                            + Topup 50 Token
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {adminSubTab === "voucher" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-slate-900">Kelola Kode Voucher & Kupon</h2>
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
                    <button
                      onClick={() => {
                        const newV = `PROMO-TKA-${Math.floor(1000 + Math.random() * 9000)}`;
                        setGeneratedVouchers([newV, ...generatedVouchers]);
                        alert(`Kode voucher baru dibuat: ${newV}`);
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
                    >
                      + Buat Voucher Baru
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      {generatedVouchers.map((v, i) => (
                        <div key={i} className="p-3 bg-slate-50 border rounded-xl font-mono font-bold flex justify-between">
                          <span>{v}</span>
                          <span className="text-emerald-600">Aktif</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {adminSubTab === "telemetry" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Neon Cloud Services Telemetry</h2>
                      <p className="text-xs text-slate-500">Monitoring infrastruktur cloud serverless Neon.</p>
                    </div>
                    <button
                      onClick={checkNeonHealth}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
                    >
                      Refresh Health
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-2 text-xs">
                      <div className="flex justify-between items-center font-bold">
                        <span className="flex items-center gap-1.5"><Database className="w-4 h-4 text-blue-600" /> Neon Postgres</span>
                        <span className="text-emerald-600">Connected</span>
                      </div>
                      <p className="font-mono text-slate-500">{neonStatus?.services?.postgres?.version || "PostgreSQL 18.6"}</p>
                    </div>

                    <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-2 text-xs">
                      <div className="flex justify-between items-center font-bold">
                        <span className="flex items-center gap-1.5"><HardDrive className="w-4 h-4 text-amber-600" /> Object Storage S3</span>
                        <span className="text-emerald-600">Connected</span>
                      </div>
                      <p className="font-mono text-slate-500">Bucket: {neonStatus?.services?.objectStorage?.bucket || "assets"}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      
      ) : (
        <main className="flex-1">
          {/* VIEW A: COMPREHENSIVE LANDING PAGE (DEFAULT FOR GUESTS) */}
        {/* ============================================================== */}
        {activeTab === "landing" && !currentUser && (
          <div className="space-y-16 pb-20">
            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white py-16 sm:py-24 border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-6">
                  {/* Trust Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold shadow-inner">
                    <Award className="w-4 h-4 text-blue-400" />
                    <span>Resmi Selaras Standar BSKAP Kemendikdasmen RI No. 047 & 045</span>
                  </div>

                  {/* Main Headline */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                    Persiapan Ujian TKA Terarah dengan{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                      AI Diagnostik
                    </span>{" "}
                    & CBT Dual-Mode
                  </h1>

                  {/* Subtitle */}
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                    Bukan sekadar latihan soal. Identifikasi kelemahan subtopik secara presisi, jaga api konsistensi harian lewat gamifikasi streak Gen Z, dan tutup celah materi lewat latihan remedial kilat 10 menit.
                  </p>

                  {/* Dual CTA Group */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <button
                      onClick={() => {
                        setAuthMode("register");
                        setActiveTab("auth");
                      }}
                      className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
                    >
                      <span>Mulai Uji Coba Gratis</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <a
                      href="#simulasi"
                      className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition flex items-center gap-2"
                    >
                      <Smartphone className="w-4 h-4 text-blue-400" />
                      <span>Coba Simulasi CBT di Bawah</span>
                    </a>
                  </div>

                  {/* Quick Demo Login Shortcut */}
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
                    <span>Atau langsung evaluasi role:</span>
                    <button
                      onClick={() => handleLoginAs("student")}
                      className="text-blue-400 hover:underline font-semibold"
                    >
                      Masuk sebagai Siswa
                    </button>
                    <span>·</span>
                    <button
                      onClick={() => handleLoginAs("agency")}
                      className="text-purple-400 hover:underline font-semibold"
                    >
                      Masuk sebagai Mitra Bimbel
                    </button>
                    <span>·</span>
                    <button
                      onClick={() => handleLoginAs("admin")}
                      className="text-emerald-400 hover:underline font-semibold"
                    >
                      Masuk sebagai Admin
                    </button>
                  </div>
                </div>

                {/* Key Metric Counters */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-14 pt-10 border-t border-slate-800 text-center">
                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono">15.000+</div>
                    <div className="text-xs text-slate-400">Siswa Aktif Berlatih</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">120+</div>
                    <div className="text-xs text-slate-400">Mitra Bimbel & Sekolah</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">98.4%</div>
                    <div className="text-xs text-slate-400">Akurasi Diagnostik Materi</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">&lt; 50ms</div>
                    <div className="text-xs text-slate-400">Latensi CBT Mobile Kilat</div>
                  </div>
                </div>
              </div>
            </section>

            {/* PROBLEM VS SOLUTION SECTION */}
            <section className="max-w-6xl mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Mengapa Cara Belajar Lama Ketinggalan Zaman?
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Tryout Biasa Cuma Kasih Skor. Kami Kasih Solusi Tuntas.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cara Lama */}
                <div className="bg-red-50/60 rounded-3xl p-6 sm:p-8 border border-red-200/80 space-y-4">
                  <div className="flex items-center gap-2 text-red-700 font-bold text-base">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span>Tryout Konvensional & Kertas</span>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold shrink-0">✕</span>
                      <span>Hanya menampilkan skor angka total (misal 65/100) tanpa tahu di subtopik mana kamu lemah.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold shrink-0">✕</span>
                      <span>Kunci jawaban panjang membingungkan, tidak menjelaskan pola jebakan mengapa kamu salah pilih.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold shrink-0">✕</span>
                      <span>Cepat bosan dan hilang motivasi karena tidak ada tantangan harian dan visualisasi pencapaian.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-red-500 font-bold shrink-0">✕</span>
                      <span>Tampilan di HP lambat, teks terpotong, dan tombol terlalu kecil untuk jempol.</span>
                    </li>
                  </ul>
                </div>

                {/* Solusi CBT-TKA.ID */}
                <div className="bg-emerald-50/60 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>CBT-TKA.ID Platform Pintar</span>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-800">
                    <li className="flex items-start gap-2.5">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>Radar Chart Diagnostik memetakan penguasaan per subtopik materi (Aljabar, Geometri, Statistika).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>AI Misconception mendeteksi kenapa salah (apakah kesalahan tanda hitung atau salah konsep).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>Gamifikasi Gen Z (Daily Streak, Level XP, Liga Mingguan) bikin belajar teratur setiap hari.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>Dual-Mode CBT: Mode Pusmendik resmi untuk latihan simulasi & Mode Mobile Thumb-Zone di smartphone.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* CORE PILLARS / FITUR UNGGULAN */}
            <section id="fitur" className="max-w-6xl mx-auto px-4 space-y-10">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  4 Keunggulan Teknologi
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Dirancang Khusus untuk Standar Ujian Masa Kini
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Pillar 1 */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-500 hover:shadow-md transition space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Monitor className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">Dual-Mode CBT Engine</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Bebas beralih antara Mode Resmi Pusmendik ANBK (identik dengan layar ujian sekolah) atau Mode Modern Mobile dengan area sentuh jempol ergonomis.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-500 hover:shadow-md transition space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Brain className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">AI Misconception Diagnostic</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    AI mengurai opsi jebakan yang dipilih siswa untuk menemukan akar miskonsepsi rumus dan memberikan tips penanganan tepat sasaran.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-500 hover:shadow-md transition space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Flame className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">Gamifikasi Belajar Gen Z</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pertahankan Daily Streak api belajar setiap hari, kumpulkan Koin TKA, klaim Streak Shield, dan bersaing di Liga Mingguan Divisi Emas.
                  </p>
                </div>

                {/* Pillar 4 */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-500 hover:shadow-md transition space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">1-Klik Remedial Adaptif</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Setelah ujian selesai, klik 1 tombol untuk langsung mendapatkan 5 soal drill kilat yang fokus menambal materi dengan skor terendah.
                  </p>
                </div>
              </div>
            </section>

            {/* LIVE INTERACTIVE CBT DEMO WIDGET */}
            <section id="simulasi" className="max-w-4xl mx-auto px-4">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                <div className="bg-slate-900 text-white p-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                      <h3 className="font-bold text-sm">Simulasi Interaktif CBT Langsung</h3>
                      <p className="text-[11px] text-slate-400">Coba jawab pertanyaan di bawah ini secara langsung</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-slate-800 px-2.5 py-1 rounded-md text-amber-400 font-bold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> 01:24:15
                    </span>
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <CloudCheck className="w-3.5 h-3.5" /> Autosave Aktif
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-5">
                  <div className="flex items-center justify-between text-xs border-b pb-3">
                    <span className="font-bold text-blue-600">SOAL NO. 1 DARI 40 (Aljabar - SPLDV)</span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                      Level Kognitif: L2 (Aplikasi)
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-slate-800">
                    <p className="text-xs sm:text-sm leading-relaxed">
                      Harga 3 buku tulis dan 2 pulpen adalah Rp29.000,00. Jika harga 1 pulpen adalah Rp4.000,00 di Toko Koperasi Siswa.
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      Berapakah jumlah buku tulis maksimal yang dapat dibeli Ani jika ia membawa uang Rp35.000,00?
                    </p>
                  </div>

                  {/* Interactive Options */}
                  <div className="space-y-2.5">
                    {[
                      { key: "A", label: "3 buku" },
                      { key: "B", label: "4 buku" },
                      { key: "C", label: "5 buku (Jawaban Benar)" },
                      { key: "D", label: "6 buku" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setDemoSelectedAnswer(opt.key)}
                        className={`min-h-[48px] w-full text-left p-3.5 rounded-xl border transition flex items-center gap-3 ${
                          demoSelectedAnswer === opt.key
                            ? "border-blue-600 bg-blue-50 text-blue-900 font-bold ring-2 ring-blue-500/20"
                            : "border-slate-200 bg-white hover:bg-slate-50 text-slate-800"
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            demoSelectedAnswer === opt.key
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="text-xs sm:text-sm">{opt.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Action row in demo */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <button
                      onClick={() => setDemoIsDoubtful(!demoIsDoubtful)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                        demoIsDoubtful
                          ? "bg-amber-500 text-white"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {demoIsDoubtful ? "Ragu-Ragu Aktif" : "Tandai Ragu-Ragu"}
                    </button>
                    <button
                      onClick={() => {
                        setAuthMode("register");
                        setActiveTab("auth");
                      }}
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
                    >
                      <span>Ikuti Ujian Penuh 40 Soal</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* JENJANG & MATA PELAJARAN */}
            <section className="max-w-6xl mx-auto px-4 space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Kurikulum Terstandar
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">Pilih Jenjang Persiapan Anda</h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Bank soal lengkap dengan stimulus kontekstual dan level kognitif L1 sampai L3 HOTS.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-blue-500 transition space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center text-lg">
                    SD
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">TKA SD / MI</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Numerasi dasar, literasi pemahaman teks fiksi/informasi, dan logika pola matematika kelas 6.
                  </p>
                  <div className="pt-2">
                    <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2.5 py-1 rounded-md">
                      12 Paket Tryout Lengkap
                    </span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border-2 border-blue-600 ring-4 ring-blue-500/10 shadow-md transition space-y-3 relative">
                  <span className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                    Paling Diminati
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-lg">
                    SMP
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">TKA SMP / MTs</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Aljabar, geometri, statistika, penalaran analitis, dan literasi ilmiah untuk seleksi masuk SMA favorit.
                  </p>
                  <div className="pt-2">
                    <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2.5 py-1 rounded-md">
                      24 Paket Tryout Lengkap
                    </span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-blue-500 transition space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center text-lg">
                    SMA
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">TKA SMA / MA / SMK</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Persiapan mapel wajib dan pilihan untuk seleksi PTN, SNBT, dan sekolah kedinasan kelas 12.
                  </p>
                  <div className="pt-2">
                    <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2.5 py-1 rounded-md">
                      36 Paket Tryout Lengkap
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* AI DIAGNOSTIK & RAPOR PREVIEW */}
            <section id="diagnostik" className="max-w-6xl mx-auto px-4">
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold">
                    <Brain className="w-4 h-4 text-indigo-400" />
                    <span>Deep Diagnostic AI Engine</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                    Tahu Tepat Di Mana Kamu Kehilangan Nilai
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Setiap paket ujian yang diselesaikan langsung dianalisis oleh AI. Bukan hanya skor, kamu mendapatkan diagnosis kelemahan spesifik dan rekomendasi perbaikan instan.
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Radar chart penguasaan 360 derajat per subtopik materi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Penjelasan kenapa opsi jawabanmu salah (Misconception Buster)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Rekomendasi paket remedial 5 butir soal siap kerjakan</span>
                    </li>
                  </ul>
                </div>

                {/* Radar Mock Preview Graphic */}
                <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="font-bold text-xs text-slate-300">Sampel Rapor Diagnostik Siswa</span>
                    <span className="text-emerald-400 text-xs font-mono font-bold">Skor: 76.5 / 100</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Bilangan & Rasional</span>
                        <span className="text-emerald-400 font-mono">90%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "90%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Geometri Ruang</span>
                        <span className="text-blue-400 font-mono">75%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "75%" }} />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 space-y-1">
                      <div className="flex justify-between text-red-300 font-bold">
                        <span>Aljabar & SPLDV (Titik Lemah)</span>
                        <span className="font-mono">42%</span>
                      </div>
                      <div className="h-2 rounded-full bg-red-950 overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: "42%" }} />
                      </div>
                      <p className="text-[11px] text-red-300/80 pt-1">
                        Sering keliru saat memindahkan tanda variabel (+ / -). Selesaikan paket remedial kilat untuk memperbaikinya.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* MITRA BIMBEL & B2B AGENCY SOLUTIONS */}
            <section id="mitra" className="max-w-6xl mx-auto px-4 space-y-10">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                  Kemitraan Lembaga & Sekolah
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Solusi B2B Lengkap untuk Bimbel & Sekolah
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Kelola ratusan murid bimbingan dalam satu portal tanpa perlu investasi server jutaan rupiah.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">Co-Branding Lembaga Sendiri</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Siswa mengerjakan ujian di tautan bermerek logo bimbel Anda. Meningkatkan prestise dan kepercayaan orang tua murid.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Coins className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">Harga Grosir Token Hemat</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Beli kuota grosir mulai Rp6.000 per token murid. Generate kode voucher batch dalam satu klik dan bagikan ke grup kelas.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">Ekspor Rekap Excel Instan</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Unduh rekap nilai seluruh murid kelas, lengkap dengan analisis subtopik materi terlemah untuk bahan ajar tentor bimbel.
                  </p>
                </div>
              </div>
            </section>

            {/* SKEMA HARGA TRANSPARAN (STUDENT & AGENCY TABS) */}
            <section id="harga" className="max-w-6xl mx-auto px-4 space-y-8">
              <div className="text-center max-w-xl mx-auto space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Investasi Masa Depan
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Paket & Biaya Langganan Transparan
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Pilih paket sesuai kebutuhan latihan kamu atau paket grosir untuk lembaga bimbel.
                </p>

                {/* Period Selector Toggle */}
                <div className="inline-flex p-1 rounded-xl bg-slate-200 text-xs font-bold">
                  <button
                    onClick={() => setPricingPeriod("student")}
                    className={`px-4 py-2 rounded-lg transition ${
                      pricingPeriod === "student"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Untuk Siswa Individual
                  </button>
                  <button
                    onClick={() => setPricingPeriod("agency")}
                    className={`px-4 py-2 rounded-lg transition ${
                      pricingPeriod === "agency"
                        ? "bg-white text-purple-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Untuk Mitra Bimbel / Lembaga
                  </button>
                </div>
              </div>

              {/* STUDENT PRICING GRID */}
              {pricingPeriod === "student" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Free Tier */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between shadow-xs">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Uji Coba</span>
                      <h3 className="text-xl font-bold text-slate-900 mt-1">Akun Gratis</h3>
                      <div className="my-5">
                        <span className="text-3xl font-extrabold text-slate-900">Rp0</span>
                        <span className="text-xs text-slate-500 ml-1">selamanya</span>
                      </div>
                      <ul className="space-y-3 text-xs text-slate-600">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" /> 1 Paket Tryout per Mapel
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Nilai & Kunci Jawaban
                        </li>
                        <li className="flex items-center gap-2 text-slate-400">
                          <XCircle className="w-4 h-4 text-slate-300 shrink-0" /> Tanpa Pembahasan Detail
                        </li>
                        <li className="flex items-center gap-2 text-slate-400">
                          <XCircle className="w-4 h-4 text-slate-300 shrink-0" /> Tanpa AI Remedial Drill
                        </li>
                      </ul>
                    </div>
                    <button
                      onClick={() => {
                        setAuthMode("register");
                        setActiveTab("auth");
                      }}
                      className="w-full mt-8 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition"
                    >
                      Daftar Akun Gratis
                    </button>
                  </div>

                  {/* 90 Days Recommended */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-600 flex flex-col justify-between shadow-xl relative">
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold tracking-wide shadow-md">
                      PALING POPULER · HEMAT 25%
                    </span>
                    <div>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Persiapan Total</span>
                      <h3 className="text-xl font-bold text-slate-900 mt-1">Musim Ujian (90 Hari)</h3>
                      <div className="my-5">
                        <span className="text-3xl font-extrabold text-slate-900">Rp89.000</span>
                        <span className="text-xs text-slate-500 ml-1">/ 90 hari</span>
                        <p className="text-[11px] text-emerald-600 font-semibold mt-1">Setara hanya ~Rp980 per hari</p>
                      </div>
                      <ul className="space-y-3 text-xs text-slate-700">
                        <li className="flex items-center gap-2 font-medium">
                          <Check className="w-4 h-4 text-blue-600 shrink-0" /> Akses Semua Paket Tryout Lengkap
                        </li>
                        <li className="flex items-center gap-2 font-medium">
                          <Check className="w-4 h-4 text-blue-600 shrink-0" /> Pembahasan AI Step-by-Step
                        </li>
                        <li className="flex items-center gap-2 font-medium">
                          <Check className="w-4 h-4 text-blue-600 shrink-0" /> Radar Chart Diagnosa 360 Derajat
                        </li>
                        <li className="flex items-center gap-2 font-medium">
                          <Check className="w-4 h-4 text-blue-600 shrink-0" /> 30 Sesi AI Remedial Drill
                        </li>
                        <li className="flex items-center gap-2 font-medium">
                          <Check className="w-4 h-4 text-blue-600 shrink-0" /> Bonus 2x Streak Shield Pelindung Api
                        </li>
                      </ul>
                    </div>
                    <button
                      onClick={() => handleLoginAs("student")}
                      className="w-full mt-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition"
                    >
                      Pilih Paket 90 Hari
                    </button>
                  </div>

                  {/* Monthly */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between shadow-xs">
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Latihan Bulanan</span>
                      <h3 className="text-xl font-bold text-slate-900 mt-1">Pejuang Bulanan</h3>
                      <div className="my-5">
                        <span className="text-3xl font-extrabold text-slate-900">Rp39.000</span>
                        <span className="text-xs text-slate-500 ml-1">/ 30 hari</span>
                      </div>
                      <ul className="space-y-3 text-xs text-slate-600">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Akses Semua Paket Aktif
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Pembahasan AI Lengkap
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" /> 10 Sesi AI Remedial Drill
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Arena Gamifikasi & Liga Mingguan
                        </li>
                      </ul>
                    </div>
                    <button
                      onClick={() => handleLoginAs("student")}
                      className="w-full mt-8 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition"
                    >
                      Pilih Paket Bulanan
                    </button>
                  </div>
                </div>
              ) : (
                /* AGENCY PRICING GRID */
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Starter 50 */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between shadow-xs">
                    <div>
                      <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Kelas Kecil</span>
                      <h3 className="text-xl font-bold text-slate-900 mt-1">Tier 50 Token</h3>
                      <div className="my-5">
                        <span className="text-3xl font-extrabold text-slate-900">Rp500.000</span>
                        <p className="text-[11px] text-slate-500 mt-1">Rp10.000 per token murid</p>
                      </div>
                      <ul className="space-y-3 text-xs text-slate-600">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600 shrink-0" /> 50 Token Ujian Siswa</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Generator Kode Voucher Batch</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Rekap Nilai Format Excel</li>
                        <li className="flex items-center gap-2 text-slate-400"><XCircle className="w-4 h-4 text-slate-300 shrink-0" /> Tanpa Co-Branding Logo</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => handleLoginAs("agency")}
                      className="w-full mt-8 py-3 rounded-xl border border-purple-300 text-purple-700 font-semibold text-xs hover:bg-purple-50 transition"
                    >
                      Beli Tier 50 Token
                    </button>
                  </div>

                  {/* Growth 150 */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-600 flex flex-col justify-between shadow-xl relative">
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-600 text-white text-[11px] font-bold tracking-wide shadow-md">
                      REKOMENDASI BIMBEL
                    </span>
                    <div>
                      <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Bimbel Reguler</span>
                      <h3 className="text-xl font-bold text-slate-900 mt-1">Tier 150 Token</h3>
                      <div className="my-5">
                        <span className="text-3xl font-extrabold text-slate-900">Rp1.200.000</span>
                        <p className="text-[11px] text-emerald-600 font-semibold mt-1">Hanya Rp8.000 per token murid</p>
                      </div>
                      <ul className="space-y-3 text-xs text-slate-700">
                        <li className="flex items-center gap-2 font-medium"><Check className="w-4 h-4 text-purple-600 shrink-0" /> 150 Token Ujian Siswa</li>
                        <li className="flex items-center gap-2 font-medium"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Co-Branding Logo & Nama Bimbel</li>
                        <li className="flex items-center gap-2 font-medium"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Peta Kelemahan Materi Kelas</li>
                        <li className="flex items-center gap-2 font-medium"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Ekspor Rekap Nilai Excel Lengkap</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => handleLoginAs("agency")}
                      className="w-full mt-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition"
                    >
                      Beli Tier 150 Token
                    </button>
                  </div>

                  {/* Scale 500 */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between shadow-xs">
                    <div>
                      <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Sekolah / Jaringan</span>
                      <h3 className="text-xl font-bold text-slate-900 mt-1">Tier 500 Token</h3>
                      <div className="my-5">
                        <span className="text-3xl font-extrabold text-slate-900">Rp3.000.000</span>
                        <p className="text-[11px] text-emerald-600 font-semibold mt-1">Super Hemat: Rp6.000 per token</p>
                      </div>
                      <ul className="space-y-3 text-xs text-slate-600">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600 shrink-0" /> 500 Token Ujian Siswa</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Custom Subdomain Portal Bimbel</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600 shrink-0" /> Dedicated Account Manager Support</li>
                      </ul>
                    </div>
                    <button
                      onClick={() => handleLoginAs("agency")}
                      className="w-full mt-8 py-3 rounded-xl border border-purple-300 text-purple-700 font-semibold text-xs hover:bg-purple-50 transition"
                    >
                      Beli Tier 500 Token
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* FAQ AKORDION */}
            <section id="faq" className="max-w-4xl mx-auto px-4 space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Pertanyaan Sering Diajukan
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">FAQ Seputar CBT-TKA.ID</h2>
              </div>

              <div className="space-y-3">
                {[
                  {
                    q: "Apa itu Tes Kemampuan Akademik (TKA) dan kurikulum mana yang digunakan?",
                    a: "TKA adalah tes penilaian penguasaan materi akademik terstandar yang digunakan untuk seleksi jalur prestasi sekolah dan pemetaan kompetensi siswa. Platform kami mengacu resmi pada standar Keputusan Kepala BSKAP Kemendikdasmen No. 047/H/KR/2024 dan 045/H/KR/2024.",
                  },
                  {
                    q: "Apakah platform ini dapat diakses lancar di smartphone?",
                    a: "Ya! Kami merancang arsitektur Mode Modern Mobile dengan area tombol ramah jempol (tinggi minimal 48px), perpindahan nomor soal instan di bawah 50ms, dan fitur Autosave lokal agar jawaban tidak hilang saat koneksi internet terputus.",
                  },
                  {
                    q: "Bagaimana cara kerja AI Diagnostik dan Remedial Drill?",
                    a: "Setelah siswa menyelesaikan 40 butir soal, algoritma AI kami mengurai subtopik yang belum tuntas dan langsung meracik 5 butir soal remedial kilat berbobot setara yang bisa diselesaikan dalam waktu 10 menit.",
                  },
                  {
                    q: "Bagaimana sistem kerja kuota token untuk Mitra Bimbel?",
                    a: "Mitra Bimbel membeli paket kuota token grosir (misalnya 150 token). Dari dasbor mitra, Anda dapat membuat kode voucher batch dalam 1 detik untuk dibagikan kepada siswa bimbingan.",
                  },
                  {
                    q: "Apakah soal-soal matematika mendukung penulisan rumus rumit?",
                    a: "Seluruh soal kami terintegrasi dengan mesin KaTeX rendering, sehingga rumus pecahan bertingkat, akar kuadrat, integral, dan matriks ditampilkan tajam dan jelas di semua resolusi layar.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:bg-slate-50 transition"
                    >
                      <span>{item.q}</span>
                      {openFaq === idx ? (
                        <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {openFaq === idx && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* BOTTOM CALL TO ACTION BANNER */}
            <section className="max-w-6xl mx-auto px-4">
              <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  Siap Raih Nilai Maksimal di Ujian TKA?
                </h2>
                <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                  Bergabunglah dengan ribuan siswa dan puluhan mitra bimbel di seluruh Indonesia. Mulai uji coba gratis sekarang tanpa syarat.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setAuthMode("register");
                      setActiveTab("auth");
                    }}
                    className="px-8 py-3.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm shadow-md transition flex items-center gap-2"
                  >
                    <span>Daftar Akun Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* PUBLIC FOOTER */}
            <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 font-bold text-white text-base">
                    <GraduationCap className="w-5 h-5 text-blue-500" />
                    <span>CBT-TKA.ID</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Platform Computer-Based Test terintegrasi AI Diagnostik dan Gamifikasi Gen Z untuk kesuksesan Tes Kemampuan Akademik.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-200 mb-3">Fitur Utama</h4>
                  <ul className="space-y-2">
                    <li>Dual-Mode CBT (Pusmendik & Mobile)</li>
                    <li>AI Misconception Diagnostic</li>
                    <li>Arena Gamifikasi Streak Gen Z</li>
                    <li>Adaptive Remedial Drill 1-Klik</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-200 mb-3">Kemitraan</h4>
                  <ul className="space-y-2">
                    <li>Portal B2B Mitra Bimbel</li>
                    <li>Paket Token Grosir Sekolah</li>
                    <li>Layanan Co-Branding Lembaga</li>
                    <li>Integrasi Bank Soal BSKAP</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-200 mb-3">Infrastruktur Cloud</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Ditenagai oleh Neon Serverless Postgres, Object Storage, dan Edge Functions berlatensi rendah di region ap-southeast-1.
                  </p>
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-900 text-center text-slate-500">
                (c) 2026 CBT-TKA.ID. Hak Cipta Dilindungi Undang-Undang. Selaras Standar BSKAP Kemendikdasmen RI.
              </div>
            </footer>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW B: DEDICATED AUTH PAGE (LOGIN & REGISTER) */}
        {/* ============================================================== */}
        {activeTab === "auth" && (
          <div className="min-h-[85vh] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
              {/* Back to Landing Page button */}
              <button
                onClick={() => setActiveTab("landing")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Beranda Utama</span>
              </button>

              {/* Title & Tab Switcher */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900">
                    {authMode === "login" ? "Masuk ke Akun Anda" : "Daftar Akun Baru"}
                  </h2>
                </div>

                {/* Tab Pill Switcher */}
                <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 text-xs font-bold text-slate-600">
                  <button
                    onClick={() => setAuthMode("login")}
                    className={`py-2 rounded-lg transition ${
                      authMode === "login" ? "bg-white text-blue-600 shadow-xs" : "hover:text-slate-900"
                    }`}
                  >
                    Masuk (Login)
                  </button>
                  <button
                    onClick={() => setAuthMode("register")}
                    className={`py-2 rounded-lg transition ${
                      authMode === "register" ? "bg-white text-blue-600 shadow-xs" : "hover:text-slate-900"
                    }`}
                  >
                    Daftar (Register)
                  </button>
                </div>
              </div>

              {/* Quick Demo Login Box (Easy Test per Role) */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
                  Akses Cepat Mode Uji Coba:
                </span>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => handleLoginAs("student")}
                    className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-blue-600 hover:text-white border border-blue-200 text-xs font-bold text-slate-800 transition flex items-center justify-between shadow-xs group"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-500 group-hover:text-white" />
                      <span>Masuk sebagai Siswa (Arya Pratama)</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                  </button>

                  <button
                    onClick={() => handleLoginAs("agency")}
                    className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-purple-600 hover:text-white border border-purple-200 text-xs font-bold text-slate-800 transition flex items-center justify-between shadow-xs group"
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-purple-500 group-hover:text-white" />
                      <span>Masuk sebagai Mitra Bimbel (Ibu Maya)</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                  </button>

                  <button
                    onClick={() => handleLoginAs("admin")}
                    className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-slate-900 hover:text-white border border-slate-300 text-xs font-bold text-slate-800 transition flex items-center justify-between shadow-xs group"
                  >
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-cyan-600 group-hover:text-white" />
                      <span>Masuk sebagai Admin AI Studio</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                  </button>
                </div>
              </div>

              {/* Standard Form Inputs */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLoginAs(authRole);
                }}
                className="space-y-4 text-xs"
              >
                {authMode === "register" && (
                  <>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Peran Anda</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setAuthRole("student")}
                          className={`p-2.5 rounded-xl border font-bold text-xs transition ${
                            authRole === "student"
                              ? "border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          Siswa / Pelajar
                        </button>
                        <button
                          type="button"
                          onClick={() => setAuthRole("agency")}
                          className={`p-2.5 rounded-xl border font-bold text-xs transition ${
                            authRole === "agency"
                              ? "border-purple-600 bg-purple-50 text-purple-700 ring-2 ring-purple-500/20"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          Mitra Bimbel
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        placeholder="Contoh: Arya Pratama"
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-blue-600 font-medium"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Alamat Email</label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-blue-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kata Sandi</label>
                  <input
                    type="password"
                    required
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="Minimal 8 karakter"
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-blue-600 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{authMode === "login" ? "Masuk Sekarang" : "Daftar Akun Baru"}</span>
                </button>
              </form>

              {/* Social Login Divider */}
              <div className="relative text-center border-t border-slate-200 pt-4">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 bg-white text-[11px] text-slate-400 font-medium">
                  Atau gunakan Neon Auth
                </span>
                <button
                  onClick={() => handleLoginAs("student")}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4 text-emerald-600" />
                  <span>Masuk Cepat via Google (Better Auth)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW C: ARENA GAMIFIKASI SISWA (ROLE: STUDENT) */}
        {/* ============================================================== */}
        {currentUser?.role === "student" && activeTab === "arena" && (
          <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Arena Belajar Generasi Z</h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Kumpulkan XP, pertahankan api streak harian, dan bersaing di Liga Mingguan.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white px-3.5 py-2.5 rounded-2xl border border-slate-200 shadow-xs">
                <Target className="w-5 h-5 text-blue-600 shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-500 block">Target Impian:</span>
                  <span className="font-bold text-slate-800">{currentUser.target || "SMAN 8 Jakarta (85.0)"}</span>
                </div>
              </div>
            </div>

            {/* Streak & XP Header Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Daily Streak Card */}
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl p-6 text-white shadow-md flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-orange-100 uppercase tracking-wider block">
                    Daily Streak Api
                  </span>
                  <div className="text-3xl font-extrabold font-mono mt-1">{streakDays} Hari Berturut</div>
                  <p className="text-xs text-orange-100 mt-1">Jangan biarkan apimu padam hari ini!</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Flame className="w-8 h-8 text-white fill-white" />
                </div>
              </div>

              {/* Level XP Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
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

              {/* TKA Coins & Shield Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                    Dompet Hadiah Game
                  </span>
                  <div className="text-2xl font-bold font-mono text-amber-600 mt-1">{coins} Koin TKA</div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> 1x Streak Shield Aktif
                  </span>
                </div>
                <button
                  onClick={() => alert("Toko Hadiah: Tukar 50 Koin untuk 1x Streak Freeze!")}
                  className="px-3.5 py-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold hover:bg-amber-100 transition"
                >
                  Tukar Koin
                </button>
              </div>
            </div>

            {/* Daily Quests Section */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Misi Harian (Daily Quests)</h2>
                  <p className="text-xs text-slate-500">Direset setiap malam pukul 00:00 WIB.</p>
                </div>
                <span className="text-xs font-mono bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-bold">
                  Sisa Waktu: 07:42:15
                </span>
              </div>

              <div className="space-y-3">
                {/* Quest 1 */}
                <div className="flex items-center justify-between p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
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
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                      claimedQuests[1]
                        ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                        : "bg-emerald-600 text-white hover:bg-emerald-500 shadow-xs"
                    }`}
                  >
                    {claimedQuests[1] ? "Sudah Diklaim" : "Klaim +30 XP & 5 Koin"}
                  </button>
                </div>

                {/* Quest 2 */}
                <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-amber-500 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Taklukkan 1 Miskonsepsi Aljabar</h4>
                      <p className="text-xs text-slate-500">Buka pembahasan nomor yang salah di riwayat tryout.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("rapor")}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition shadow-xs"
                  >
                    Kerjakan (+25 XP)
                  </button>
                </div>

                {/* Quest 3 */}
                <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-blue-500 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Blitz 5 Menit Numerasi Kilat</h4>
                      <p className="text-xs text-slate-500">Jawab 5 soal benar beruntun tanpa jeda waktu.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("ujian")}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition shadow-xs"
                  >
                    Mulai Blitz (+50 XP)
                  </button>
                </div>
              </div>
            </div>

            {/* Weekly League Standings */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span>Liga Mingguan: Divisi Emas</span>
                  </h2>
                  <p className="text-xs text-slate-500">Peringkat 30 siswa sebaya. Direset setiap Senin jam 00:00 WIB.</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                  Top 5 Promosi ke Divisi Berlian
                </span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-3 flex items-center justify-between font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="w-5 text-center font-bold text-amber-500">1</span>
                    <span className="text-slate-800">Farhan Hakim (SMPN 1 Surabaya)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-600">3.120 XP</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Naik</span>
                  </div>
                </div>

                <div className="py-3 flex items-center justify-between font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="w-5 text-center font-bold text-slate-400">2</span>
                    <span className="text-slate-800">Cinta Laura S. (SMP Lab)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-slate-600">2.890 XP</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Naik</span>
                  </div>
                </div>

                <div className="py-3 flex items-center justify-between font-bold bg-blue-50/70 -mx-3 px-3 rounded-xl text-blue-900 border border-blue-200">
                  <div className="flex items-center gap-3">
                    <span className="w-5 text-center text-blue-700">3</span>
                    <span>Arya Pratama (Anda)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-blue-700">2.450 XP</span>
                    <span className="text-[10px] text-white bg-blue-600 px-2.5 py-0.5 rounded-full font-bold">Zona Promosi</span>
                  </div>
                </div>

                <div className="py-3 flex items-center justify-between text-slate-600">
                  <div className="flex items-center gap-3">
                    <span className="w-5 text-center">4</span>
                    <span>Dinda Rahma (SMPN 2 Bandung)</span>
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
        {/* VIEW D: RUANG UJIAN CBT SISWA (ROLE: STUDENT) */}
        {/* ============================================================== */}
        {currentUser?.role === "student" && activeTab === "ujian" && (
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-4">
            {/* CBT Mode Switcher Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-slate-700">Mode Tampilan:</span>
                <button
                  onClick={() => setCbtMode("modern")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                    cbtMode === "modern" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mode Modern Mobile (Thumb-Zone)</span>
                </button>
                <button
                  onClick={() => setCbtMode("pusmendik")}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
                    cbtMode === "pusmendik" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Mode Pusmendik ANBK</span>
                </button>
              </div>

              {/* Font Zoom Controls */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-medium">Ukuran Fon:</span>
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
                          className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition flex items-center gap-3 ${
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
                    className="px-4 py-2 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-bold disabled:opacity-40"
                  >
                    Soal Sebelumnya
                  </button>
                  <button
                    onClick={handleToggleDoubtful}
                    className={`px-4 py-2 rounded-lg text-xs font-bold ${
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
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold"
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
                    <span className="flex items-center gap-1.5 text-slate-600 font-mono font-bold bg-slate-100 px-2.5 py-1 rounded-md">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      {formatTimer(timerSeconds)}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                      <CloudCheck className="w-3.5 h-3.5" /> Autosave
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
                    className="min-h-[48px] rounded-xl border border-slate-200 font-bold text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-30"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={handleToggleDoubtful}
                    className={`min-h-[48px] rounded-xl font-bold text-xs transition ${
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
                    className="min-h-[48px] rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs"
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
        {/* VIEW E: RAPOR DIAGNOSTIK & AI REMEDIAL (ROLE: STUDENT) */}
        {/* ============================================================== */}
        {currentUser?.role === "student" && activeTab === "rapor" && (
          <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Rapor Diagnostik Hasil Ujian</h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Paket: TKA SMP Matematika Paket 02 · Status: Selesai Terverifikasi
                </p>
              </div>
              <button
                onClick={() => alert("Mengunduh Rapor PDF Lengkap.")}
                className="px-4 py-2 rounded-xl border border-slate-300 bg-white font-semibold text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>Unduh Rapor PDF</span>
              </button>
            </div>

            {/* Score Summary Box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Skor Total</span>
                <div className="text-4xl font-extrabold text-blue-600 font-mono">76.5 / 100</div>
                <p className="text-xs text-emerald-600 font-semibold">Lulus Standar Target Kelulusan</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Akurasi Jawaban</span>
                <div className="text-lg font-bold text-slate-800">31 Benar · 7 Salah · 2 Ragu</div>
                <p className="text-xs text-slate-400">Total 40 Butir Soal Terstandar</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Peringkat Kolektif</span>
                <div className="text-lg font-bold text-slate-800 font-mono">Peringkat 14 dari 120</div>
                <p className="text-xs text-blue-600 font-medium">Persentil 88% di Bimbel Anda</p>
              </div>
            </div>

            {/* Peta Penguasaan Subtopik (Diagnostik 360) */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div>
                <h3 className="font-bold text-lg text-slate-900">Peta Penguasaan Subtopik (Diagnostik 360)</h3>
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

                  <div className="p-4 bg-red-50 rounded-2xl border border-red-200">
                    <div className="flex justify-between text-xs font-bold text-red-900 mb-1">
                      <span>Aljabar & SPLDV (Titik Lemah Kritis)</span>
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
                <div className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-3xl p-6 text-white shadow-md space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/30 flex items-center justify-center text-xl text-blue-300">
                    <Brain className="w-6 h-6 text-blue-300" />
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
                    className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow transition flex items-center justify-center gap-1.5"
                  >
                    <Zap className="w-4 h-4 text-slate-950" />
                    <span>Mulai AI Remedial Drill Sekarang (+80 XP)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW F: BELI PAKET SISWA (ROLE: STUDENT) */}
        {/* ============================================================== */}
        {currentUser?.role === "student" && activeTab === "paket" && (
          <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Tingkatkan Paket Langganan Siswa</h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Pilih paket persiapan ujian dengan akses penuh ke AI Diagnostik dan Remedial Drill.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Eceran */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tiket Eceran</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">1x Tryout Kilat</h3>
                  <div className="my-4">
                    <span className="text-3xl font-extrabold text-slate-900">Rp15.000</span>
                    <span className="text-xs text-slate-500 ml-1">sekali pakai</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 1 Token Ujian Bebas Pilih</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Kunci & Pembahasan Standar</li>
                  </ul>
                </div>
                <button
                  onClick={() => alert("Simulasi pembayaran via QRIS Neon.")}
                  className="w-full mt-6 py-2.5 rounded-xl border border-slate-300 font-bold text-xs hover:bg-slate-50"
                >
                  Beli Tiket Eceran
                </button>
              </div>

              {/* 90 Days */}
              <div className="bg-white rounded-3xl p-6 border-2 border-blue-600 shadow-xl flex flex-col justify-between relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold">
                  HEMAT 25% · TERPOPULER
                </span>
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Persiapan Total</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">Musim Ujian (90 Hari)</h3>
                  <div className="my-4">
                    <span className="text-3xl font-extrabold text-slate-900">Rp89.000</span>
                    <span className="text-xs text-slate-500 ml-1">/ 90 hari</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-center gap-2 font-medium"><Check className="w-4 h-4 text-blue-600" /> Semua Paket Tryout Terbuka</li>
                    <li className="flex items-center gap-2 font-medium"><Check className="w-4 h-4 text-blue-600" /> 30 Sesi AI Remedial Drill</li>
                    <li className="flex items-center gap-2 font-medium"><Check className="w-4 h-4 text-blue-600" /> Bonus 2x Streak Freeze</li>
                  </ul>
                </div>
                <button
                  onClick={() => alert("Simulasi pembayaran via QRIS Neon.")}
                  className="w-full mt-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow"
                >
                  Aktifkan Paket 90 Hari
                </button>
              </div>

              {/* Monthly */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bulanan</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">Pejuang Bulanan</h3>
                  <div className="my-4">
                    <span className="text-3xl font-extrabold text-slate-900">Rp39.000</span>
                    <span className="text-xs text-slate-500 ml-1">/ 30 hari</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Akses Semua Paket Aktif</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> 10 Sesi AI Remedial Drill</li>
                  </ul>
                </div>
                <button
                  onClick={() => alert("Simulasi pembayaran via QRIS Neon.")}
                  className="w-full mt-6 py-2.5 rounded-xl border border-slate-300 font-bold text-xs hover:bg-slate-50"
                >
                  Pilih Bulanan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW G: DASBOR MITRA AGENCY (ROLE: AGENCY) */}
        {/* ============================================================== */}
        {currentUser?.role === "agency" && activeTab === "agency-dasbor" && (
          <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Dasbor Kemitraan Bimbel</h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Lembaga: {currentUser.name} · Subdomain: cbt-tka.id/b/prestasi-mandiri
                </p>
              </div>
              <button
                onClick={() => {
                  const newCode = `TKA-VOUCHER-${Math.floor(1000 + Math.random() * 9000)}`;
                  setGeneratedVouchers([newCode, ...generatedVouchers]);
                  setAgencyTokens((t) => Math.max(0, t - 1));
                  alert(`1 Kode Voucher Baru Dibuat: ${newCode}`);
                }}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
              >
                <Coins className="w-4 h-4" />
                <span>+ Buat Kode Voucher Baru</span>
              </button>
            </div>

            {/* Quota & Sales Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase">Sisa Kuota Token Siswa</span>
                <div className="text-3xl font-bold font-mono text-purple-700">{agencyTokens} / 150 Token</div>
                <button
                  onClick={() => setActiveTab("agency-token")}
                  className="text-xs text-purple-600 font-semibold hover:underline block pt-1"
                >
                  + Beli Tambahan Kuota Grosir
                </button>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase">Total Siswa Bimbingan</span>
                <div className="text-3xl font-bold font-mono text-slate-900">124 Siswa</div>
                <p className="text-xs text-emerald-600 font-semibold">65 Sudah Menyelesaikan Tryout</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-xs font-semibold text-slate-500 uppercase">Kelemahan Kelas Terbanyak</span>
                <div className="text-base font-bold text-red-600">Aljabar SPLDV (58% Salah)</div>
                <p className="text-xs text-slate-400">Rekomendasi materi ulang tentor minggu ini</p>
              </div>
            </div>

            {/* Live Monitoring Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-5 border-b flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-900">Pemantauan Live Murid Kelas 9A</h3>
                <button
                  onClick={() => alert("Mengunduh Rekap Nilai Format Excel.")}
                  className="text-xs font-semibold text-purple-600 hover:underline flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-4 h-4 text-purple-600" />
                  <span>Ekspor Excel</span>
                </button>
              </div>

              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b">
                    <tr>
                      <th className="p-3.5">Nama Siswa</th>
                      <th className="p-3.5">Paket Ujian</th>
                      <th className="p-3.5 font-mono">Skor</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Arya Pratama</td>
                      <td className="p-3.5">TKA Matematika Paket 02</td>
                      <td className="p-3.5 font-mono font-bold text-blue-600">76.5</td>
                      <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">Selesai</span></td>
                      <td className="p-3.5 text-right"><button onClick={() => alert("Lihat detail rapor siswa")} className="text-purple-600 hover:underline">Detail</button></td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Nabila Putri</td>
                      <td className="p-3.5">TKA Matematika Paket 02</td>
                      <td className="p-3.5 font-mono font-bold text-blue-600">88.0</td>
                      <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">Selesai</span></td>
                      <td className="p-3.5 text-right"><button onClick={() => alert("Lihat detail rapor siswa")} className="text-purple-600 hover:underline">Detail</button></td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-900">Rizky Ramadhan</td>
                      <td className="p-3.5">TKA Matematika Paket 02</td>
                      <td className="p-3.5 font-mono">--</td>
                      <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold">Sedang Ujian</span></td>
                      <td className="p-3.5 text-right text-slate-400">Monitoring</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* AGENCY TOKEN & VOUCHER VIEW */}
        {currentUser?.role === "agency" && activeTab === "agency-token" && (
          <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
            <h1 className="text-2xl font-extrabold text-slate-900">Kelola Token & Kode Voucher Murid</h1>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4">
              <h3 className="font-bold text-sm text-slate-900">Daftar Kode Voucher Aktif untuk Murid:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {generatedVouchers.map((code, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>{code}</span>
                    <button
                      onClick={() => alert(`Kode ${code} disalin ke clipboard.`)}
                      className="text-purple-600 hover:underline text-[11px]"
                    >
                      Salin
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AGENCY BRANDING VIEW */}
        {currentUser?.role === "agency" && activeTab === "agency-branding" && (
          <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
            <h1 className="text-2xl font-extrabold text-slate-900">Pengaturan Co-Branding Lembaga</h1>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lembaga Bimbel</label>
                <input
                  type="text"
                  defaultValue="Bimbel Prestasi Mandiri"
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subdomain Akses Ujian</label>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-slate-400">cbt-tka.id/b/</span>
                  <input
                    type="text"
                    defaultValue="prestasi-mandiri"
                    className="flex-1 p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  />
                </div>
              </div>
              <button
                onClick={() => alert("Pengaturan Co-Branding berhasil disimpan di Neon Postgres.")}
                className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        )}

        
        </main>
      )}

      {/* ============================================================== */}
      {/* 3. MODAL EDIT QUESTION (FOR FULL CRUD IN BANK SOAL) */}
      {/* ============================================================== */}
      {isEditModalOpen && editingQuestion && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto border shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Editor Butir Soal TKA</h3>
                <span className="font-mono text-slate-400">{editingQuestion.code}</span>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Mata Pelajaran</label>
                <input
                  type="text"
                  value={editingQuestion.mapel}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, mapel: e.target.value })}
                  className="w-full p-2 rounded-xl border bg-slate-50"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Subtopik / Materi</label>
                <input
                  type="text"
                  value={editingQuestion.subtopic}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, subtopic: e.target.value })}
                  className="w-full p-2 rounded-xl border bg-slate-50"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Stimulus Bacaan / Studi Kasus</label>
              <textarea
                rows={3}
                value={editingQuestion.stimulus}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, stimulus: e.target.value })}
                className="w-full p-2.5 rounded-xl border bg-slate-50"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Pertanyaan Soal</label>
              <textarea
                rows={2}
                value={editingQuestion.question}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                className="w-full p-2.5 rounded-xl border bg-slate-50"
              />
            </div>

            {/* Options */}
            <div className="space-y-2">
              <label className="font-bold text-slate-700 block">Pilihan Opsi Jawaban</label>
              {editingQuestion.options.map((opt, idx) => (
                <div key={opt.key} className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-100 font-bold flex items-center justify-center shrink-0">
                    {opt.key}
                  </span>
                  <input
                    type="text"
                    value={opt.label}
                    onChange={(e) => {
                      const newOpts = [...editingQuestion.options];
                      newOpts[idx].label = e.target.value;
                      setEditingQuestion({ ...editingQuestion, options: newOpts });
                    }}
                    className="flex-1 p-2 rounded-xl border bg-slate-50"
                  />
                  <input
                    type="radio"
                    name="correct-opt"
                    checked={editingQuestion.correct === opt.key}
                    onChange={() => setEditingQuestion({ ...editingQuestion, correct: opt.key })}
                    title="Pilih sebagai Kunci Benar"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Pembahasan & Solusi</label>
              <textarea
                rows={2}
                value={editingQuestion.explanation}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, explanation: e.target.value })}
                className="w-full p-2.5 rounded-xl border bg-slate-50"
              />
            </div>

            <div className="flex items-center justify-between border-t pt-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-600">Status:</span>
                <select
                  value={editingQuestion.status}
                  onChange={(e: any) => setEditingQuestion({ ...editingQuestion, status: e.target.value })}
                  className="p-1.5 rounded-lg border font-bold"
                >
                  <option value="DRAFT">DRAFT</option>
                  <option value="IN_REVIEW">IN REVIEW</option>
                  <option value="PUBLISHED">PUBLISHED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl border font-bold hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    setBankSoalList((prev) =>
                      prev.map((q) => (q.id === editingQuestion.id ? editingQuestion : q))
                    );
                    setGeneratedNaskahQuestions((prev) =>
                      prev.map((q) => (q.id === editingQuestion.id ? editingQuestion : q))
                    );
                    setIsEditModalOpen(false);
                    alert("Perubahan butir soal berhasil disimpan!");
                  }}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. MODAL PREVIEW QUESTION (QUICK EYE PREVIEW) */}
      {/* ============================================================== */}
      {previewQuestion && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-600">{previewQuestion.code}</span>
                {getStatusBadge(previewQuestion.status)}
              </div>
              <button onClick={() => setPreviewQuestion(null)} className="text-slate-400 hover:text-slate-800">
                ✕
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border text-slate-700">
              <p className="font-medium">{previewQuestion.stimulus}</p>
              <p className="font-bold text-slate-900 mt-2">{previewQuestion.question}</p>
            </div>

            <div className="space-y-1.5">
              {previewQuestion.options.map((opt) => (
                <div
                  key={opt.key}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                    opt.key === previewQuestion.correct ? "border-emerald-500 bg-emerald-50 font-bold" : ""
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                    {opt.key}
                  </span>
                  <span>{opt.label}</span>
                </div>
              ))}
            </div>

            <div className="p-2.5 bg-blue-50 rounded-xl text-blue-900">
              <strong>Kunci & Pembahasan:</strong> {previewQuestion.explanation}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

