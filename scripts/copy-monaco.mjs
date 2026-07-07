import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const src = join(rootDir, "node_modules/monaco-editor/min/vs");
const dest = join(rootDir, "public/monaco/vs");

if (!existsSync(src)) {
  console.error("Monaco editor not found in node_modules. Run `pnpm install` first.");
  process.exit(1);
}

mkdirSync(dirname(dest), { recursive: true });
cpSync(src, dest, { recursive: true });
console.log("Copied Monaco editor to public/monaco/vs");
