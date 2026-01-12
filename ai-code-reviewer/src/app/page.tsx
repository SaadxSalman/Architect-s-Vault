import { GoogleGenerativeAI } from "@google/generative-ai";
import { Octokit } from "octokit";

// 1. API Webhook Handler (The "Bot" Logic)
export async function POST(req: Request) {
  try {
    const payload = await req.json();
    
    // Only trigger on PR opened or synchronized (new commits)
    if (payload.action !== "opened" && payload.action !== "synchronize") {
      return new Response("Event ignored", { status: 200 });
    }

    const repo = payload.repository.name;
    const owner = payload.repository.owner.login;
    const pr_number = payload.pull_request.number;

    // Initialize Octokit & Gemini
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Fetch the PR Diff
    const { data: diff } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: pr_number,
      headers: { accept: "application/vnd.github.v3.diff" },
    });

    // Generate AI Review
    const prompt = `You are a Senior Software Engineer. Review this GitHub PR Diff and provide 3-5 concise, actionable improvement suggestions. Format as Markdown. Diff:\n\n${diff}`;
    const result = await model.generateContent(prompt);
    const reviewText = result.response.text();

    // Post comment to GitHub
    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: pr_number,
      body: `### 🤖 AI Code Review\n\n${reviewText}\n\n*Review generated for @${owner}*`,
    });

    return new Response("Review Posted", { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}

// 2. Dashboard UI
export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-8 py-20">
      <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 shadow-2xl">
        <header className="mb-10">
          <h2 className="text-4xl font-black mb-2 italic">DASHBOARD</h2>
          <p className="text-zinc-400">Monitoring GitHub Webhooks for <span className="text-blue-400 font-mono">saadxsalman</span></p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/40 p-6 rounded-xl border border-white/5">
            <h3 className="text-sm font-bold text-zinc-500 uppercase mb-4">Webhook Status</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-lg font-mono">LISTENING...</span>
            </div>
          </div>
          
          <div className="bg-black/40 p-6 rounded-xl border border-white/5">
            <h3 className="text-sm font-bold text-zinc-500 uppercase mb-4">Provider</h3>
            <span className="text-lg font-mono">GEMINI-1.5-FLASH</span>
          </div>
        </div>

        <section className="mt-12">
          <h3 className="text-xl font-bold mb-4">How to activate:</h3>
          <ol className="list-decimal list-inside space-y-3 text-zinc-400">
            <li>Go to your GitHub Repo <span className="text-zinc-200">Settings &gt; Webhooks</span>.</li>
            <li>Payload URL: <span className="text-blue-400 font-mono italic">{"[Your-URL]/api/webhook"}</span></li>
            <li>Content type: <span className="text-zinc-200">application/json</span>.</li>
            <li>Select <span className="text-zinc-200">"Let me select individual events"</span> and check <span className="text-blue-400">Pull Requests</span>.</li>
          </ol>
        </section>
      </div>
    </main>
  );
}