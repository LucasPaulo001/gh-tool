import fs from "fs/promises";
import path from "path";

const TASK_FILE = "gh-tool-tasks.md";
const GITIGNORE = ".gitignore";

export async function generateArchiveLocal(content: string) {
  await ensureGitignore();
  await appendTask(content);
}

async function ensureGitignore() {
  let gitignoreContent = "";

  try {
    gitignoreContent = await fs.readFile(GITIGNORE, "utf8");
  } catch {

    await fs.writeFile(GITIGNORE, "");
    return ensureGitignore();
  }

  if (!gitignoreContent.includes(TASK_FILE)) {
    const updated = gitignoreContent.trimEnd() + `\n${TASK_FILE}\n`;
    await fs.writeFile(GITIGNORE, updated);
  }
}

async function appendTask(content: string) {
  try {
    const existing = await fs.readFile(TASK_FILE, "utf8");

    const updated =
      existing.trimEnd() +
      "\n\n" +
      content.trim() +
      "\n";

    await fs.writeFile(TASK_FILE, updated);
  } catch {
    // arquivo não existe
    await fs.writeFile(TASK_FILE, content.trim() + "\n");
  }
}
