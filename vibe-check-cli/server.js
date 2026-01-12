import express from "express";
import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Initialize environment variables
dotenv.config();

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const hf = new HfInference(process.env.HF_TOKEN);

// --- 1. Token Validation Check ---
// This verifies your connection to Hugging Face before the server starts
async function validateHFToken() {
  console.log("--- 🛡️ Security Check ---");
  if (!process.env.HF_TOKEN) {
    console.error("❌ ERROR: HF_TOKEN is missing in your .env file.");
    process.exit(1);
  }

  try {
    const response = await fetch("https://huggingface.co/api/whoami-v2", {
      headers: { Authorization: `Bearer ${process.env.HF_TOKEN}` },
    });

    if (!response.ok) {
      throw new Error(`Invalid API Token (Status: ${response.status})`);
    }

    const user = await response.json();
    console.log(`✅ Token Authenticated: Connected as [${user.name}]`);
  } catch (error) {
    console.error("❌ Authentication Failed:", error.message);
    process.exit(1); // Stop the server if the token is invalid
  }
}

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// --- 2. Sentiment Analysis Route ---
app.post("/api/analyze", async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const result = await hf.textClassification({
      model: "distilbert-base-uncased-finetuned-sst-2-english",
      inputs: text,
    });

    console.log(`🔍 Vibe checking: "${text.substring(0, 30)}..." -> ${result[0].label}`);
    res.json(result[0]);
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).json({ error: "Failed to process vibe check." });
  }
});

// --- 3. Start Server ---
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await validateHFToken();
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log("-----------------------");
});