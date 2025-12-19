import { IssuePayload } from "../../types/issue.type";
import { execSync } from "child_process";

function getTokenGH(): string {
  try {
    const GITHUB_TOKEN = execSync(`gh auth token`, {
      encoding: "utf-8",
    }).trim();

    return GITHUB_TOKEN;
  } catch (err: any) {
    console.error("GitHub CLI não encontrado ou não autenticado.");
    console.error("Instale e rode: gh auth login");
    process.exit(1);
  }
}

export async function createIssue(
  owner: string,
  repo: string,
  payload: IssuePayload
) {
  const github_token = getTokenGH();

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/issues`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${github_token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "gh-bug-cli",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
}
