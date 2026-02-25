// server/src/routes/translationRoutes.ts
import { Router } from 'express';
import multer from 'multer';
import { processInput } from '../controllers/translationController';

const router = Router();
const upload = multer({ dest: 'uploads/' }); // Temporary storage for files

// Handles audio/video file uploads
router.post('/translate/upload', upload.single('file'), processInput);

// Handles direct text input
router.post('/translate/text', processInput);

router.get('/translate/status/:id', (req, res) => {
  const job = translationJobs.get(req.params.id);
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
});

export default router;