import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

// 1. Initial configuration and Token Check
const token = process.env.HF_TOKEN;

if (!token) {
  console.error("❌ ERROR: HF_TOKEN is missing. Please check your .env file.");
  process.exit(1);
}

const hf = new HfInference(token);

/**
 * Validates the token with Hugging Face API before running analysis
 */
async function validateConnection() {
  try {
    const response = await fetch("https://huggingface.co/api/whoami-v2", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Unauthorized");
    return true;
  } catch (err) {
    console.error("❌ Auth Error: Your Hugging Face token is invalid or expired.");
    return false;
  }
}

/**
 * Main function to perform the Vibe Check
 */
async function vibeCheck(text) {
  if (!text) {
    console.error("⚠️  Usage: node index.js \"Your text here\"");
    return;
  }

  // Verify connection first
  const isConnected = await validateConnection();
  if (!isConnected) process.exit(1);

  console.log("⏳ Analyzing vibe...");

  try {
    const result = await hf.textClassification({
      model: "distilbert-base-uncased-finetuned-sst-2-english",
      inputs: text,
    });

    const topResult = result[0];
    const isPositive = topResult.label === "POSITIVE";
    const emoji = isPositive ? "✅" : "❌";
    const color = isPositive ? "\x1b[32m" : "\x1b[31m"; // Green or Red terminal text
    const reset = "\x1b[0m";

    console.log(`\n--- ${color}VIBE CHECK RESULT${reset} ---`);
    console.log(`Input: "${text}"`);
    console.log(`Vibe : ${color}${topResult.label}${reset} ${emoji}`);
    console.log(`Confidence: ${(topResult.score * 100).toFixed(2)}%`);
    console.log(`--------------------------\n`);

  } catch (error) {
    console.error("❌ Error fetching vibe:", error.message);
  }
}

// Capture input from command line arguments
const input = process.argv.slice(2).join(" ");

// Execute
vibeCheck(input);