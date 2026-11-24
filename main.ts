// One Word, First Thought — entry program.
//
// The whole competition is a single word: the first one that comes to
// mind, with no topic, no explanation and no second draft. For this
// entrant that word is "Coffee" — the thought that arrives before any
// other thought has had time to form, usually somewhere around the
// moment the alarm goes off and the day has not yet made its demands.
//
// The program writes exactly that word, and nothing else, to
// <output>/entry.txt: six characters, no punctuation, no trailing
// newline. The output directory is a mount point in the grading
// sandbox, so we clear its contents but never delete the directory
// itself (deleting a mount point throws EBUSY).

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FIRST_THOUGHT = "Coffee";

function outputDir(): string {
  return process.env.OUTPUT_DIR ?? "/output";
}

function clearContents(dir: string): void {
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  clearContents(dir);
  writeFileSync(join(dir, "entry.txt"), FIRST_THOUGHT, "utf8");
}

main();
