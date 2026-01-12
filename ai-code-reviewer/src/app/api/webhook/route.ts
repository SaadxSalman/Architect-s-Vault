import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";
import { GoogleGenerativeAI } from "@google/generative-ai";
import crypto from "crypto";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    // We need the raw text to accurately verify the HMAC signature
    const rawBody = await req.text();
    const signature = req.headers.get("x-hub-signature-256");

    // 1. Security: Validate Webhook Secret using timingSafeEqual
    const hmac = crypto.createHmac("sha256", process.env.WEBHOOK_SECRET || "");
    const digest = Buffer.from("sha256=" + hmac.update(rawBody).digest("hex"), "utf8");
    const checksum = Buffer.from(signature || "", "utf8");

    if (checksum.length !== digest.length || !crypto.timingSafeEqual(digest, checksum)) {
      console.error("❌ Invalid Signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    // 2. Filter for Pull Request "opened" or "synchronize" (new commits) events
    if (payload.pull_request && (payload.action === "opened" || payload.action === "synchronize")) {
      const owner = payload.repository.owner.login;
      const repo = payload.repository.name;
      const pull_number = payload.pull_request.number;

      console.log(`Processing PR #${pull_number} for ${owner}/${repo}`);

      // 3. Fetch the PR Diff
      // Using 'vnd.github.v3.diff' tells GitHub to return the git diff text instead of JSON
      const { data: diff } = await octokit.rest.pulls.get({
        owner,
        repo,
        pull_number,
        headers: { accept: "application/vnd.github.v3.diff" },
      });

      // 4. Gemini AI Review
      // We cast 'diff' to string because the Octokit header returns string content
      const diffContent = diff as unknown as string;
      
      // Basic check: If diff is massive, truncate it or Gemini might throw an error
      const truncatedDiff = diffContent.slice(0, 15000); 

      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "You are a senior software engineer at a top tech company. Your code reviews are brief, helpful, and prioritize performance and security."
      });

      const prompt = `Review the following git diff for saasxsalman's project. 
      List 3-5 high-impact suggestions. Focus on:
      - Potential bugs
      - Security vulnerabilities
      - Readability
      
      Diff:
      ${truncatedDiff}`;

      const result = await model.generateContent(prompt);
      const reviewText = result.response.text();

      // 5. Post Review Comment as an Issue Comment
      await octokit.rest.issues.createComment({
        owner,
        repo,
        issue_number: pull_number,
        body: `## 🤖 AI Code Reviewer (Gemini 1.5 Flash)\n\n${reviewText}\n\n---\n*Verified Review for @saadxsalman*`
      });

      return NextResponse.json({ status: "Review posted successfully" });
    }

    return NextResponse.json({ status: "Event ignored" });

  } catch (error: any) {
    console.error("🧪 Webhook Error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}