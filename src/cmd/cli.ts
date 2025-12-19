#!/usr/bin/env node
import "dotenv/config";

import { getFlag, hasFlag } from "../core/services/flags.js";
import { bugTarget } from "../core/target/bug.js";
import { createIssue } from "../core/services/github.js";

async function main() {
  const repoFull = getFlag("--repo");
  const title = getFlag("--title");
  const description = getFlag("--description") ?? "";

  if (!repoFull || !title) {
    console.error("Use --repo e --title");
    process.exit(1);
  }

  // Extraindo usuário e repositório
  const [owner, repo] = repoFull.split("/");

  let payload;

  if (hasFlag("--bug")) {
    payload = bugTarget({ title, description });
  } else {
    console.error("Nenhum target definido (ex: --bug)");
    process.exit(1);
  }

  const issue = await createIssue(owner, repo, payload);

  console.log("Issue criada com sucesso!");
  console.log(issue.html_url);
}

main();
