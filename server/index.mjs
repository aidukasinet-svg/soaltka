import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Neon Postgres
const sql = neon(process.env.DATABASE_URL);

// Initialize Neon Object Storage (S3)
const s3 = new S3Client({
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  region: process.env.AWS_REGION || "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

// 1. Healthcheck testing all 4 Neon services
app.get("/api/health", async (req, res) => {
  const status = {
    timestamp: new Date().toISOString(),
    postgres: { status: "unknown" },
    objectStorage: { status: "unknown" },
    neonFunction: { status: "unknown" },
    neonAuth: { status: "unknown" },
  };

  // Test Postgres
  try {
    const dbResult = await sql`SELECT NOW() as now, version() as version`;
    status.postgres = {
      status: "connected",
      dbTime: dbResult[0].now,
      version: dbResult[0].version.substring(0, 40),
    };
  } catch (err) {
    status.postgres = { status: "error", error: err.message };
  }

  // Test Object Storage
  try {
    const listResult = await s3.send(new ListObjectsV2Command({ Bucket: "assets", MaxKeys: 5 }));
    status.objectStorage = {
      status: "connected",
      bucket: "assets",
      objectCount: listResult.KeyCount || 0,
    };
  } catch (err) {
    status.objectStorage = { status: "error", error: err.message };
  }

  // Test Neon Function
  try {
    const fnUrl = process.env.NEON_FUNCTION_HELLO_BASE_URL;
    const fnRes = await fetch(fnUrl);
    const fnText = await fnRes.text();
    status.neonFunction = {
      status: "connected",
      url: fnUrl,
      response: fnText.trim(),
    };
  } catch (err) {
    status.neonFunction = { status: "error", error: err.message };
  }

  // Test Neon Auth
  try {
    const jwksUrl = process.env.NEON_AUTH_JWKS_URL;
    const authRes = await fetch(jwksUrl);
    const jwks = await authRes.json();
    status.neonAuth = {
      status: "connected",
      baseUrl: process.env.NEON_AUTH_BASE_URL,
      keyCount: jwks.keys ? jwks.keys.length : 0,
    };
  } catch (err) {
    status.neonAuth = { status: "error", error: err.message };
  }

  const allHealthy =
    status.postgres.status === "connected" &&
    status.objectStorage.status === "connected" &&
    status.neonFunction.status === "connected" &&
    status.neonAuth.status === "connected";

  res.status(allHealthy ? 200 : 500).json({
    status: allHealthy ? "healthy" : "degraded",
    services: status,
  });
});

// 2. Pricing Plans from Neon Postgres
app.get("/api/pricing-plans", async (req, res) => {
  try {
    const plans = await sql`SELECT * FROM pricing_plans WHERE is_active = TRUE ORDER BY price_idr ASC`;
    res.json({ success: true, data: plans });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Questions from Neon Postgres
app.get("/api/questions", async (req, res) => {
  try {
    const { jenjang, subject } = req.query;
    let questions;
    if (jenjang && subject) {
      questions = await sql`
        SELECT * FROM questions 
        WHERE level_jenjang = ${jenjang} AND subject = ${subject} AND status = 'approved'
        ORDER BY created_at DESC LIMIT 50
      `;
    } else {
      questions = await sql`SELECT * FROM questions WHERE status = 'approved' ORDER BY created_at DESC LIMIT 50`;
    }
    res.json({ success: true, data: questions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. AI Question Generator (Admin)
app.post("/api/questions/generate", async (req, res) => {
  try {
    const { level_jenjang, subject, element, subtopic, cognitive_level, format_type, context } = req.body;

    // Simulate AI synthesis following BSKAP Kemendikdasmen standards
    const newQuestion = {
      level_jenjang: level_jenjang || "SMP",
      subject: subject || "Matematika",
      element: element || "Aljabar",
      subtopic: subtopic || "Sistem Persamaan Linear Dua Variabel",
      cognitive_level: cognitive_level || "L3",
      format_type: format_type || "single_choice",
      stimulus_text: `Sebuah koperasi sekolah menjual paket alat tulis. Paket A berisi 2 buku tulis dan 3 pensil seharga Rp17.000,00. Paket B berisi 5 buku tulis dan 2 pensil seharga Rp37.000,00.`,
      question_text: `Jika Rani ingin membeli 1 lusin (12 buah) buku tulis yang sama, berapa uang yang harus ia bayarkan?`,
      options_payload: JSON.stringify([
        { key: "A", label: "Rp72.000,00" },
        { key: "B", label: "Rp84.000,00" },
        { key: "C", label: "Rp96.000,00" },
        { key: "D", label: "Rp108.000,00" }
      ]),
      correct_answer_payload: JSON.stringify({ correct_key: "B" }),
      explanation_text: `Misal buku = x, pensil = y. 2x + 3y = 17000 dan 5x + 2y = 37000. Eliminasi menghasilkan x = 7000 (harga 1 buku). Harga 12 buku = 12 * 7000 = Rp84.000,00.`,
      misconception_tags: JSON.stringify(["Jebakan lupa konversi lusin ke 12 item"]),
      status: "approved"
    };

    const inserted = await sql`
      INSERT INTO questions (
        level_jenjang, subject, element, subtopic, cognitive_level, format_type,
        stimulus_text, question_text, options_payload, correct_answer_payload,
        explanation_text, misconception_tags, status
      ) VALUES (
        ${newQuestion.level_jenjang}, ${newQuestion.subject}, ${newQuestion.element},
        ${newQuestion.subtopic}, ${newQuestion.cognitive_level}, ${newQuestion.format_type},
        ${newQuestion.stimulus_text}, ${newQuestion.question_text},
        ${newQuestion.options_payload}::jsonb, ${newQuestion.correct_answer_payload}::jsonb,
        ${newQuestion.explanation_text}, ${newQuestion.misconception_tags}::jsonb,
        ${newQuestion.status}
      ) RETURNING *
    `;

    res.json({ success: true, data: inserted[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Student Gamification State
app.get("/api/student/gamification", async (req, res) => {
  try {
    // Return mock or db student state
    const gamifyState = {
      streak_count: 14,
      streak_shields_count: 1,
      xp_total: 2450,
      current_level: 18,
      rank_title: "Master Numerasi TKA",
      coins_balance: 85,
      current_league: "gold",
      weekly_xp: 680,
      dream_school_target: "SMAN 8 Jakarta",
      dream_target_score: 85.0,
      daily_quests: [
        { id: 1, title: "Pemanasan Pagi (3 Soal Numerasi)", progress: 3, target: 3, completed: true, claimed: false, xp: 30, coins: 5 },
        { id: 2, title: "Taklukkan 1 Miskonsepsi Aljabar", progress: 0, target: 1, completed: false, claimed: false, xp: 25, coins: 5 },
        { id: 3, title: "Blitz 5 Menit Numerasi Kilat", progress: 0, target: 1, completed: false, claimed: false, xp: 50, coins: 10 },
      ],
      league_standings: [
        { rank: 1, name: "Farhan Hakim", xp: 3120, status: "promosi" },
        { rank: 2, name: "Cinta Laura S.", xp: 2890, status: "promosi" },
        { rank: 3, name: "Arya Pratama (Anda)", xp: 2450, status: "promosi" },
        { rank: 4, name: "Dinda Rahma", xp: 2210, status: "tetap" },
        { rank: 28, name: "Kevin Sanjaya", xp: 450, status: "degradasi" },
      ],
    };
    res.json({ success: true, data: gamifyState });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Object Storage: Upload asset (e.g. question diagram or avatar)
app.post("/api/storage/upload", async (req, res) => {
  try {
    const { key, content, contentType } = req.body;
    const fileKey = key || `uploads/${Date.now()}-asset.txt`;
    await s3.send(
      new PutObjectCommand({
        Bucket: "assets",
        Key: fileKey,
        Body: content || "Default asset content",
        ContentType: contentType || "text/plain",
      })
    );
    res.json({ success: true, key: fileKey, message: "Uploaded to Neon Object Storage" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Invoke Neon Function directly
app.get("/api/function/hello", async (req, res) => {
  try {
    const fnUrl = process.env.NEON_FUNCTION_HELLO_BASE_URL;
    const fnRes = await fetch(fnUrl);
    const text = await fnRes.text();
    res.json({ success: true, functionUrl: fnUrl, output: text.trim() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Serve frontend in production
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

app.use((req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) {
      res.send("API Server is running. Please run 'npm run dev' or 'npm run build' to compile the client.");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Backend server listening on http://localhost:${PORT}`);
  console.log(`Database connected via Neon Serverless Driver: ${process.env.NEON_BRANCH}`);
});
