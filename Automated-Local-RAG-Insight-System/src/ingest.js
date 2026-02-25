import fs from 'fs';
import path from 'path';
import pdf from '@cedrugs/pdf-parse'; // Updated package
import { setupCollection } from './weaviateClient.js';

async function ingest() {
  const dataDir = path.join(process.cwd(), 'data');
  
  if (!fs.existsSync(dataDir)) {
    console.log('📁 Creating data directory...');
    fs.mkdirSync(dataDir);
  }

  const files = fs.readdirSync(dataDir);

  for (const file of files) {
    // Sanitize filename for Weaviate Collection Name (must be alphanumeric and start with uppercase)
    const sanitizedName = file.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "");
    const collectionName = sanitizedName.charAt(0).toUpperCase() + sanitizedName.slice(1);

    const filePath = path.join(dataDir, file);
    let text = '';

    console.log(`🔍 Processing: ${file}`);

    try {
      if (file.endsWith('.pdf')) {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        text = data.text.replace(/\s+/g, ' ').trim(); 
      } else {
        text = fs.readFileSync(filePath, 'utf8').trim();
      }

      if (!text || text.length < 20) {
        console.error(`⚠️ Warning: Insufficient text extracted from ${file}.`);
        continue;
      }

      // Initialize collection based on the filename
      const collection = await setupCollection(collectionName);

      console.log(`📄 Content Preview: "${text.substring(0, 100)}..."`);

      // Chunking logic
      const chunkSize = 2000;
      const overlap = 200;
      let chunks = [];
      
      for (let i = 0; i < text.length; i += chunkSize - overlap) {
        const chunk = text.substring(i, i + chunkSize);
        if (chunk.length > 0) chunks.push(chunk);
      }

      // Batching or sequential insertion
      for (const chunk of chunks) {
        await collection.data.insert({
          properties: { 
            content: chunk, 
            fileName: file 
          }
        });
      }
      
      console.log(`✅ Indexed ${chunks.length} chunks into collection: ${collectionName} for ${file}\n`);

    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
}

ingest().catch(console.error);