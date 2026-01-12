import express from 'express';
import dotenv from 'dotenv';
import { HfInference } from '@huggingface/inference';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const hf = new HfInference(process.env.HF_TOKEN);
const MODEL = "meta-llama/Llama-3.2-3B-Instruct";

app.use(express.json());
app.use(express.static('public'));

app.post('/api/translate', async (req, res) => {
    const { text, targetLang } = req.body;

    if (!text) return res.status(400).json({ error: "No text provided" });

    try {
        const response = await hf.chatCompletion({
            model: MODEL,
            messages: [
                {
                    role: "system",
                    content: `You are a translator. Detect the language and translate to ${targetLang}. 
                    Provide reasoning. You MUST respond with ONLY a JSON object:
                    {"detected": "Language", "translation": "Text", "reasoning": "Reason"}`
                },
                { role: "user", content: text }
            ],
            max_tokens: 500,
            temperature: 0.1
        });

        const content = response.choices[0].message.content;
        
        // Robust JSON extraction
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("Model did not return valid JSON");
        
        const parsedResult = JSON.parse(jsonMatch[0]);
        res.json({ success: true, ...parsedResult });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Translation failed. Is your HF_TOKEN correct?" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Translator live at http://localhost:${PORT}`);
});