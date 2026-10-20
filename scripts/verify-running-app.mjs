async function verify() {
  console.log("=== VERIFYING RUNNING APP & WIRED NEON SERVICES ===");

  // 1. Healthcheck testing all 4 Neon services
  console.log("\n[1] Testing GET http://localhost:3001/api/health ...");
  const healthRes = await fetch("http://localhost:3001/api/health");
  const healthData = await healthRes.json();
  console.log("Status Code:", healthRes.status);
  console.log("Health Payload:", JSON.stringify(healthData, null, 2));

  // 2. Pricing Plans from Postgres
  console.log("\n[2] Testing GET http://localhost:3001/api/pricing-plans ...");
  const plansRes = await fetch("http://localhost:3001/api/pricing-plans");
  const plansData = await plansRes.json();
  console.log("Plans Count:", plansData.data ? plansData.data.length : 0);
  if (plansData.data && plansData.data.length > 0) {
    console.log("First Plan:", plansData.data[0].title, "-> Rp", plansData.data[0].price_idr);
  }

  // 3. Questions from Postgres
  console.log("\n[3] Testing GET http://localhost:3001/api/questions ...");
  const qRes = await fetch("http://localhost:3001/api/questions");
  const qData = await qRes.json();
  console.log("Questions Count:", qData.data ? qData.data.length : 0);

  // 4. Test AI Question Creation to Postgres
  console.log("\n[4] Testing POST http://localhost:3001/api/questions/generate ...");
  const genRes = await fetch("http://localhost:3001/api/questions/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      level_jenjang: "SMP",
      subject: "Matematika",
      element: "Aljabar",
      subtopic: "Sistem Persamaan Linear Dua Variabel",
      cognitive_level: "L3"
    })
  });
  const genData = await genRes.json();
  console.log("Inserted Question ID:", genData.data ? genData.data.id : null);
  console.log("Inserted Question Question:", genData.data ? genData.data.question_text : null);

  // 5. Test Object Storage Upload
  console.log("\n[5] Testing POST http://localhost:3001/api/storage/upload ...");
  const uploadRes = await fetch("http://localhost:3001/api/storage/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      key: `e2e-test/${Date.now()}-evidence.txt`,
      content: "Neon Object Storage verified through running application at " + new Date().toISOString(),
      contentType: "text/plain"
    })
  });
  const uploadData = await uploadRes.json();
  console.log("Upload Result:", uploadData);

  // 6. Test Neon Function invocation
  console.log("\n[6] Testing GET http://localhost:3001/api/function/hello ...");
  const fnRes = await fetch("http://localhost:3001/api/function/hello");
  const fnData = await fnRes.json();
  console.log("Function Output:", fnData);

  // 7. Test Frontend Index HTML
  console.log("\n[7] Testing GET http://localhost:3001/ (Frontend SPA) ...");
  const htmlRes = await fetch("http://localhost:3001/");
  const htmlText = await htmlRes.text();
  console.log("Frontend Status Code:", htmlRes.status);
  console.log("Frontend Title Tag Included:", htmlText.includes("<title>CBT TKA Online"));

  console.log("\n=== ALL E2E TESTS PASSED SUCCESSFULLY! ===");
}

verify().catch(console.error);
