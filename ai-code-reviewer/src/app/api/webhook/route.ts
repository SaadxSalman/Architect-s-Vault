import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";
import { GoogleGenAI } from "@google/genai";

// Debug: Let's log these to make sure they exist
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  console.log("🚀 TRIGGERED: Webhook hit the endpoint!");

  try {
    const payload = await req.json();
    
    // Check if this is actually a PR event
    if (!payload.pull_request) {
      console.log("⚠️ Not a PR event (likely a ping or push).");
      return NextResponse.json({ message: "Not a PR" });
    }

    const owner = payload.repository.owner.login;
    const repo = payload.repository.name;
    const pull_number = payload.pull_request.number;

    console.log(`🔎 Target: ${owner}/${repo} PR #${pull_number}`);

    // 1. Fetch Diff
    const { data: diff } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number,
      headers: { accept: "application/vnd.github.v3.diff" },
    });

    console.log("🤖 Calling Gemini 3 Flash...");

    // 2. Call Gemini
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: "Review this briefly:\n\n" + diff }] }],
    });

    console.log("✍️ AI Response received. Posting to GitHub...");

    // 3. Post Comment
    const githubResponse = await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: pull_number,
      body: `### 🤖 AI Code Review\n\n${response.text}`
    });

    console.log("✅ SUCCESS: Comment posted at " + githubResponse.data.html_url);
    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("❌ ERROR LOG:", error.message);
    // This will tell us if the Token is the problem
    if (error.status === 401 || error.status === 403) {
      console.error("🔑 AUTH ERROR: Check your GITHUB_TOKEN permissions!");
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}