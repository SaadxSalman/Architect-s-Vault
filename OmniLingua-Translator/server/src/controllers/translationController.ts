// server/src/controllers/translationController.ts
import { Request, Response } from 'express';
import { orchestrateTranslation } from '../agents/orchestrator'; // Assume this exists

export const processInput = async (req: Request, res: Response) => {
  try {
    let inputContent: string | Buffer;
    let inputType: 'text' | 'audio' | 'video';
    let originalFileName: string | undefined; // For files

    if (req.file) { // File upload
      inputContent = req.file.path; // Path to the uploaded file
      originalFileName = req.file.originalname;
      const mimeType = req.file.mimetype;

      if (mimeType.startsWith('audio/')) {
        inputType = 'audio';
      } else if (mimeType.startsWith('video/')) {
        inputType = 'video';
      } else {
        // Handle unexpected file types or default to text if it's a text file
        inputType = 'text'; // Or throw an error for unsupported types
      }
      console.log(`Received ${inputType} file: ${originalFileName}`);
    } else if (req.body.text_input) { // Text input from the textarea
      inputContent = req.body.text_input;
      inputType = 'text';
      console.log(`Received text input: ${inputContent.substring(0, 50)}...`);
    } else {
      return res.status(400).json({ message: 'No input provided (file or text).' });
    }

    // Generate a unique ID for this translation request
    const translationId = `translation-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    // Pass to your agent orchestrator
    // The orchestrateTranslation function will trigger the Perception Agent
    // and subsequent agents. It might return immediately or wait.
    orchestrateTranslation(translationId, inputContent, inputType, originalFileName);

    res.status(202).json({
      message: 'Translation initiated.',
      translationId: translationId,
      inputType: inputType,
      status: 'accepted',
    });
  } catch (error) {
    console.error('Error in processInput:', error);
    res.status(500).json({ message: 'Internal server error during input processing.' });
  }
};