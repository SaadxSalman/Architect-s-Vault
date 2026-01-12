import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";
import { GoogleGenerativeAI } from "@google/generative-ai";
import crypto from "crypto";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const signature = req.headers.get("x-hub-signature-256");

  // 1. Security: Validate Webhook Secret
  const hmac = crypto.createHmac("sha256", process.env.WEBHOOK_SECRET!);
  const digest = "sha256=" + hmac.update(JSON.stringify(payload)).digest("hex");
  
  if (signature !== digest) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // 2. Filter for Pull Request "opened" or "synchronize" events
  if (payload.action === "opened" || payload.action === "synchronize") {
    const owner = payload.repository.owner.login;
    const repo = payload.repository.name;
    const pull_number = payload.pull_request.number;

    // 3. Fetch the PR Diff
    const { data: diff } = await octokit.rest.pulls.get({
      owner, repo, pull_number,
      headers: { accept: "application/vnd.github.v3.diff" }
    });

    // 4. Gemini AI Review
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are an expert code reviewer. Review this git diff and suggest 3-5 specific improvements regarding performance, security, or readability. Keep it concise.\n\n${diff}`;
    
    const result = await model.generateContent(prompt);
    const reviewText = result.response.text();

    // 5. Post Review Comment to GitHub
    await octokit.rest.issues.createComment({
      owner, repo, issue_number: pull_number,
      body: `### 🤖 AI Code Review\n\n${reviewText}`
    });
  }

  return NextResponse.json({ received: true });
}