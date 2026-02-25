// Import the compiled Rust module
const rustCore = require('../../rust-core');

export const handleAnalysis = async (req, res) => {
    const { documentText } = req.body;
    
    // Call the Rust function directly!
    const result = rustCore.analyzeLegalDocument(documentText);
    
    res.json({ success: true, analysis: result });
};

export const generateDraft = async (req: any, res: any) => {
    try {
        const { prompt } = req.body;
        
        // This calls the generate_legal_draft #[napi] function in rust-core/src/lib.rs
        const result = await rustCore.generateLegalDraft(prompt);
        
        res.status(200).json({
            success: true,
            analysis: result
        });
    } catch (error) {
        res.status(500).json({ error: "Sovereign Engine Error" });
    }
};

export const streamDraft = (req, res) => {
    const { prompt } = req.body;

    // SSE Headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Create the callback that Rust will trigger
    const callback = (err, token) => {
        if (err) {
            res.write(`data: [ERROR]\n\n`);
            return res.end();
        }
        // Send token to frontend in SSE format
        res.write(`data: ${token}\n\n`);
    };

    // Trigger the Rust streaming function
    rustCore.streamDraft(prompt, callback);
};