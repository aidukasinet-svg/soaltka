import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";
import { S3Client, ListBucketsCommand, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

async function main() {
  console.log("=== Testing Neon Services End-to-End ===");
  
  // 1. Test Postgres
  console.log("\n[1] Testing Neon Postgres...");
  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`SELECT NOW() as current_time, version() as pg_version`;
    console.log("SUCCESS: Connected to Neon Postgres!");
    console.log("Current DB Time:", result[0].current_time);
    console.log("PG Version:", result[0].pg_version.substring(0, 50));
  } catch (err) {
    console.error("FAILED Postgres:", err.message);
  }

  // 2. Test Neon Function (Hello World)
  console.log("\n[2] Testing Neon Function (hello)...");
  try {
    const fnUrl = process.env.NEON_FUNCTION_HELLO_BASE_URL;
    console.log("Function URL:", fnUrl);
    const res = await fetch(fnUrl);
    const text = await res.text();
    console.log("SUCCESS: Neon Function response:", text.trim());
  } catch (err) {
    console.error("FAILED Neon Function:", err.message);
  }

  // 3. Test Object Storage (S3 API)
  console.log("\n[3] Testing Neon Object Storage (Bucket: assets)...");
  try {
    const s3 = new S3Client({
      endpoint: process.env.AWS_ENDPOINT_URL_S3,
      region: process.env.AWS_REGION || "ap-southeast-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      forcePathStyle: true,
    });

    const testKey = "healthcheck/ping.txt";
    const testContent = "Neon Object Storage is live at " + new Date().toISOString();

    await s3.send(new PutObjectCommand({
      Bucket: "assets",
      Key: testKey,
      Body: testContent,
      ContentType: "text/plain",
    }));
    console.log("SUCCESS: PutObject into bucket 'assets' (Key:", testKey + ")");

    const getRes = await s3.send(new GetObjectCommand({
      Bucket: "assets",
      Key: testKey,
    }));
    const bodyStr = await getRes.Body.transformToString();
    console.log("SUCCESS: GetObject content:", bodyStr);
  } catch (err) {
    console.error("FAILED Object Storage:", err.message);
  }

  // 4. Test Neon Auth
  console.log("\n[4] Testing Neon Auth Endpoints...");
  try {
    const jwksUrl = process.env.NEON_AUTH_JWKS_URL;
    console.log("JWKS URL:", jwksUrl);
    const res = await fetch(jwksUrl);
    const jwks = await res.json();
    console.log("SUCCESS: Neon Auth JWKS keys received! Count:", jwks.keys ? jwks.keys.length : 0);
  } catch (err) {
    console.error("FAILED Neon Auth:", err.message);
  }

  console.log("\n=== Test Complete ===");
}

main().catch(console.error);
