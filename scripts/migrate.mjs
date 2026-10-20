import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log("Running database migrations on Neon Postgres...");

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) UNIQUE,
      phone VARCHAR(50),
      full_name VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'student',
      target_jenjang VARCHAR(50) DEFAULT 'SMP',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log("Created table: users");

  await sql`
    CREATE TABLE IF NOT EXISTS pricing_plans (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      plan_category VARCHAR(50) NOT NULL,
      plan_code VARCHAR(50) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      duration_days INT NOT NULL,
      price_idr DECIMAL(12, 2) NOT NULL,
      token_quota INT DEFAULT 0,
      features JSONB DEFAULT '[]'::jsonb,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log("Created table: pricing_plans");

  await sql`
    CREATE TABLE IF NOT EXISTS student_subscriptions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      pricing_plan_id UUID REFERENCES pricing_plans(id),
      plan_code VARCHAR(50) NOT NULL,
      starts_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      expires_at TIMESTAMP WITH TIME ZONE,
      is_active BOOLEAN DEFAULT TRUE,
      remedial_quota_left INT DEFAULT 10,
      amount_paid_idr DECIMAL(12, 2) DEFAULT 0,
      payment_status VARCHAR(50) DEFAULT 'paid',
      payment_ref VARCHAR(100),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log("Created table: student_subscriptions");

  await sql`
    CREATE TABLE IF NOT EXISTS student_gamification (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
      streak_count INT DEFAULT 1,
      last_activity_date DATE DEFAULT CURRENT_DATE,
      streak_shields_count INT DEFAULT 1,
      xp_total INT DEFAULT 150,
      current_level INT DEFAULT 1,
      rank_title VARCHAR(100) DEFAULT 'Murid Magang',
      coins_balance INT DEFAULT 25,
      current_league VARCHAR(50) DEFAULT 'bronze',
      weekly_xp INT DEFAULT 150,
      dream_school_target VARCHAR(255) DEFAULT 'SMAN 8 Jakarta',
      dream_target_score DECIMAL(5, 2) DEFAULT 85.00,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log("Created table: student_gamification");

  await sql`
    CREATE TABLE IF NOT EXISTS student_daily_quests (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      quest_date DATE DEFAULT CURRENT_DATE,
      quest_type VARCHAR(50) NOT NULL,
      quest_title VARCHAR(255) NOT NULL,
      current_progress INT DEFAULT 0,
      target_progress INT DEFAULT 1,
      is_completed BOOLEAN DEFAULT FALSE,
      is_claimed BOOLEAN DEFAULT FALSE,
      reward_xp INT DEFAULT 30,
      reward_coins INT DEFAULT 5
    );
  `;
  console.log("Created table: student_daily_quests");

  await sql`
    CREATE TABLE IF NOT EXISTS agencies (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      agency_name VARCHAR(255) NOT NULL,
      slug VARCHAR(100) UNIQUE NOT NULL,
      logo_url TEXT,
      phone_contact VARCHAR(50),
      quota_balance INT DEFAULT 50,
      saas_status VARCHAR(50) DEFAULT 'active',
      saas_expires_at TIMESTAMP WITH TIME ZONE,
      commission_rate DECIMAL(5, 2) DEFAULT 15.00,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log("Created table: agencies");

  await sql`
    CREATE TABLE IF NOT EXISTS questions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      level_jenjang VARCHAR(50) NOT NULL,
      subject VARCHAR(100) NOT NULL,
      element VARCHAR(100) NOT NULL,
      subtopic VARCHAR(150) NOT NULL,
      cognitive_level VARCHAR(50) NOT NULL,
      format_type VARCHAR(50) NOT NULL DEFAULT 'single_choice',
      stimulus_text TEXT,
      question_text TEXT NOT NULL,
      options_payload JSONB NOT NULL,
      correct_answer_payload JSONB NOT NULL,
      explanation_text TEXT NOT NULL,
      misconception_tags JSONB,
      status VARCHAR(50) DEFAULT 'approved',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log("Created table: questions");

  await sql`
    CREATE TABLE IF NOT EXISTS packages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title VARCHAR(255) NOT NULL,
      level_jenjang VARCHAR(50) NOT NULL,
      subject VARCHAR(100) NOT NULL,
      duration_minutes INT DEFAULT 90,
      total_questions INT DEFAULT 40,
      is_free BOOLEAN DEFAULT FALSE,
      price_idr DECIMAL(12, 2) DEFAULT 39000,
      blueprint_composition JSONB,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log("Created table: packages");

  await sql`
    CREATE TABLE IF NOT EXISTS package_questions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
      question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
      question_order INT NOT NULL,
      weight_score DECIMAL(5, 2) DEFAULT 2.50
    );
  `;
  console.log("Created table: package_questions");

  await sql`
    CREATE TABLE IF NOT EXISTS vouchers (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      agency_id UUID REFERENCES agencies(id) ON DELETE CASCADE,
      package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
      voucher_code VARCHAR(100) UNIQUE NOT NULL,
      batch_name VARCHAR(100),
      is_redeemed BOOLEAN DEFAULT FALSE,
      redeemed_by_user_id UUID REFERENCES users(id),
      redeemed_at TIMESTAMP WITH TIME ZONE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log("Created table: vouchers");

  await sql`
    CREATE TABLE IF NOT EXISTS exam_attempts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
      server_started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      server_expires_at TIMESTAMP WITH TIME ZONE,
      submitted_at TIMESTAMP WITH TIME ZONE,
      total_score DECIMAL(5, 2),
      violation_count INT DEFAULT 0,
      status VARCHAR(50) DEFAULT 'in_progress',
      subtopic_summary JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log("Created table: exam_attempts");

  await sql`
    CREATE TABLE IF NOT EXISTS attempt_answers (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      attempt_id UUID REFERENCES exam_attempts(id) ON DELETE CASCADE,
      question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
      student_answer JSONB,
      is_doubtful BOOLEAN DEFAULT FALSE,
      is_correct BOOLEAN,
      score_obtained DECIMAL(5, 2) DEFAULT 0,
      time_spent_seconds INT DEFAULT 0,
      last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log("Created table: attempt_answers");

  await sql`
    CREATE TABLE IF NOT EXISTS diagnostic_reports (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      attempt_id UUID REFERENCES exam_attempts(id) ON DELETE CASCADE,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      radar_chart_points JSONB NOT NULL,
      primary_weakness_subtopic VARCHAR(150),
      ai_diagnostic_narrative TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `;
  console.log("Created table: diagnostic_reports");

  await sql`
    CREATE TABLE IF NOT EXISTS remedial_drills (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      diagnostic_report_id UUID REFERENCES diagnostic_reports(id) ON DELETE CASCADE,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      subtopic_target VARCHAR(150) NOT NULL,
      drill_questions_payload JSONB NOT NULL,
      drill_score DECIMAL(5, 2),
      completed_at TIMESTAMP WITH TIME ZONE
    );
  `;
  console.log("Created table: remedial_drills");

  console.log("All tables created successfully!");

  // Seed default pricing plans
  await sql`
    INSERT INTO pricing_plans (plan_category, plan_code, title, duration_days, price_idr, token_quota, features)
    VALUES 
      ('student_retail', 'monthly', 'Pejuang Bulanan', 30, 39000, 0, '["Akses Semua Paket", "Pembahasan Lengkap AI", "Radar Diagnostik Kelemahan", "10 Sesi AI Remedial Drill", "Akses Penuh Arena Gamifikasi"]'::jsonb),
      ('student_retail', '90_days', 'Musim Ujian (90 Hari)', 90, 89000, 0, '["Semua Fitur Bulanan", "Hemat Lebih dari 25%", "Bonus 2x Streak Shield", "Prioritas Server Tryout Nasional", "Rapor Siap Cetak PDF"]'::jsonb),
      ('student_retail', 'single_token', 'Tiket Eceran Tryout', 7, 15000, 0, '["1x Tryout Akbar Nasional", "Hasil Skor & Peringkat Nasional", "Kunci & Pembahasan Standar"]'::jsonb),
      ('agency_wholesale', 'wholesale_50', 'Grosir 50 Token Siswa', 365, 750000, 50, '["50 Token Siswa", "Diskon 40% (Rp15.000/siswa)", "Generator Kode Voucher", "Berlaku 1 Tahun"]'::jsonb),
      ('agency_wholesale', 'wholesale_150', 'Grosir 150 Token Siswa', 365, 180000, 150, '["150 Token Siswa", "Diskon 52% (Rp12.000/siswa)", "Generator Kode Voucher", "Berlaku 1 Tahun"]'::jsonb),
      ('agency_wholesale', 'wholesale_500', 'Grosir 500 Token Siswa', 365, 4500000, 500, '["500 Token Siswa", "Diskon 64% (Rp9.000/siswa)", "Generator Kode Voucher", "Berlaku 1 Tahun"]'::jsonb),
      ('agency_saas', 'saas_monthly', 'Langganan Portal SaaS Bimbel', 30, 299000, 30, '["Subdomain /b/nama-bimbel", "Watermark Logo Bimbel", "Live Monitoring Kelas", "Peta Kelemahan Kolektif Murid", "Ekspor Nilai Excel", "Gratis 30 Token Siswa/Bulan"]'::jsonb)
    ON CONFLICT (plan_code) DO NOTHING;
  `;
  console.log("Seeded default pricing plans.");

  // Seed sample demo questions
  await sql`
    INSERT INTO questions (level_jenjang, subject, element, subtopic, cognitive_level, format_type, stimulus_text, question_text, options_payload, correct_answer_payload, explanation_text, misconception_tags, status)
    VALUES
      ('SMP', 'Matematika', 'Aljabar', 'Sistem Persamaan Linear Dua Variabel', 'L2', 'single_choice', 
       'Harga 3 buku tulis dan 2 pulpen adalah Rp29.000,00. Jika harga 1 pulpen adalah Rp4.000,00, berapakah harga 1 buku tulis?',
       'Berapa jumlah buku tulis maksimal yang dapat dibeli Ani jika ia memiliki uang Rp35.000,00?',
       '[{"key": "A", "label": "3 buku"}, {"key": "B", "label": "4 buku"}, {"key": "C", "label": "5 buku"}, {"key": "D", "label": "6 buku"}]'::jsonb,
       '{"correct_key": "C"}'::jsonb,
       'Harga 2 pulpen = 2 x 4.000 = Rp8.000. Harga 3 buku = Rp29.000 - Rp8.000 = Rp21.000. Harga 1 buku = 21.000 / 3 = Rp7.000. Jumlah buku yang dapat dibeli = 35.000 / 7.000 = 5 buku.',
       '["Siswa memilih 4 buku jika lupa mengurangkan 2 pulpen melainkan hanya 1 pulpen"]'::jsonb,
       'approved'),
      ('SMP', 'Matematika', 'Geometri', 'Bangun Ruang Sisi Lengkung', 'L3', 'single_choice',
       'Sebuah wadah berbentuk kerucut memiliki jari-jari alas 7 cm dan tinggi 24 cm. Wadah tersebut diisi air hingga 3/4 bagian.',
       'Berapakah volume air di dalam wadah tersebut? (Gunakan π = 22/7)',
       '[{"key": "A", "label": "924 cm³"}, {"key": "B", "label": "1.232 cm³"}, {"key": "C", "label": "1.848 cm³"}, {"key": "D", "label": "2.464 cm³"}]'::jsonb,
       '{"correct_key": "A"}'::jsonb,
       'Volume total kerucut = (1/3) * (22/7) * 7 * 7 * 24 = 1.232 cm³. Volume air 3/4 bagian = (3/4) * 1.232 = 924 cm³.',
       '["Siswa memilih B jika lupa mengalikan dengan faktor 3/4"]'::jsonb,
       'approved'),
      ('SMA', 'Matematika', 'Aljabar', 'Fungsi Kuadrat', 'L2', 'single_choice',
       'Fungsi kuadrat f(x) = -x² + 6x - 5 memodelkan ketinggian proyektil dalam meter setelah x detik.',
       'Berapakah ketinggian maksimum yang dapat dicapai proyektil tersebut?',
       '[{"key": "A", "label": "4 meter"}, {"key": "B", "label": "5 meter"}, {"key": "C", "label": "9 meter"}, {"key": "D", "label": "14 meter"}]'::jsonb,
       '{"correct_key": "A"}'::jsonb,
       'Sumbu simetri x = -b / (2a) = -6 / (2 * -1) = 3 detik. Nilai maksimum f(3) = -(3)² + 6(3) - 5 = -9 + 18 - 5 = 4 meter.',
       '["Siswa salah menghitung -3² menjadi (-3)² = +9"]'::jsonb,
       'approved')
    ON CONFLICT DO NOTHING;
  `;
  console.log("Seeded sample TKA questions.");

  console.log("Migration completed successfully!");
}

migrate().catch(console.error);
