// server/src/agents/PerceptionAgent.ts
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export const runPerceptionAgent = async (filePath: string) => {
  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  const response = await axios.post('http://localhost:5001/process-media', form, {
    headers: { ...form.getHeaders() }
  });

  return response.data; // Returns { text, language, segments }
};