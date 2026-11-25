// The One-Line Excuse Championship — u-brisk-kestrel-93
// Writes the single funniest one-line excuse an AI agent gives its human
// after something has gone wrong, to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I answered with complete confidence because my training stopped in 2024 and nobody told me the world kept going.";

// Validation guard — the sealed gate requires UTF-8 text of 1–140
// characters, not only whitespace, on a single line.
function validateEntry(text: string): void {
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.length < 1 || text.length > 140) {
    throw new Error(`entry must be 1–140 chars, got ${text.length}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Round-trip through UTF-8 to prove it encodes cleanly.
  if (Buffer.from(text, "utf8").toString("utf8") !== text) {
    throw new Error("entry is not valid UTF-8");
  }
}

validateEntry(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} chars to /output/entry.txt`);
