import { execSync } from "child_process";
import fs from "fs";

// 1. Get previous code from commit c424340
const prevCode = execSync("git show c424340:src/App.tsx", { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });

// 2. Get current code
const currCode = fs.readFileSync("src/App.tsx", "utf8");

// In prevCode, extract from "VIEW A: COMPREHENSIVE LANDING PAGE" up to right before "VIEW H: ADMIN AI STUDIO"
const viewAIndex = prevCode.indexOf("{/* VIEW A: COMPREHENSIVE LANDING PAGE (DEFAULT FOR GUESTS) */}");
const viewHIndex = prevCode.indexOf("{/* ============================================================== */}\n        {/* VIEW H: ADMIN AI STUDIO");

console.log("viewAIndex:", viewAIndex, "viewHIndex:", viewHIndex);

if (viewAIndex === -1 || viewHIndex === -1) {
  console.error("Markers not found in prevCode!");
  process.exit(1);
}

const publicAndUserViews = prevCode.substring(viewAIndex, viewHIndex);
console.log("Extracted public and user views length:", publicAndUserViews.length);

// In currCode, find where "{currentUser?.role === 'admin' ? (" starts
const adminMarker = "{currentUser?.role === \"admin\" ? (";
const adminStartIdx = currCode.indexOf(adminMarker);

// Find where the admin section finishes before modals:
const modalsMarker = "{/* ============================================================== */}\n      {/* 3. MODAL EDIT QUESTION";
const modalsIdx = currCode.indexOf(modalsMarker);

console.log("adminStartIdx:", adminStartIdx, "modalsIdx:", modalsIdx);

if (adminStartIdx === -1 || modalsIdx === -1) {
  console.error("Admin or modals markers not found in currCode!");
  process.exit(1);
}

// Current admin section without the trailing ": null}"
const adminSectionRaw = currCode.substring(adminStartIdx + adminMarker.length, modalsIdx);
// Let's trim trailing closing parens / whitespace
const lastParen = adminSectionRaw.lastIndexOf(")");
const adminJSX = adminSectionRaw.substring(0, lastParen);

// Now construct the merged App.tsx
// Header part (from top of currCode up to adminStartIdx)
const topPart = currCode.substring(0, adminStartIdx);

// Modals part (from modalsIdx to the end of currCode)
const modalsPart = currCode.substring(modalsIdx);

const mergedApp = `${topPart}
      {currentUser?.role === "admin" ? (
        ${adminJSX}
      ) : (
        <main className="flex-1">
          ${publicAndUserViews}
        </main>
      )}

      ${modalsPart}
`;

fs.writeFileSync("src/App.tsx", mergedApp, "utf8");
console.log("Successfully wrote merged src/App.tsx! Total bytes:", mergedApp.length);
