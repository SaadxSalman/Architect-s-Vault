import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { WeaviateStore } from "@langchain/weaviate";
import weaviate from "weaviate-client";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
  // 1. Initialize Weaviate Client
  const client = weaviate.connectToWeaviateCloud(
    process.env.WEAVIATE_URL!,
    { authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!) }
  );

  // 2. Load all JS/TS files from a target directory
  const loader = new DirectoryLoader("./src", {
    ".ts": (path) => new TextLoader(path),
    ".js": (path) => new TextLoader(path),
  });

  console.log("📂 Loading documents...");
  const docs = await loader.load();

  // 3. Split code into meaningful chunks
  const splitter = RecursiveCharacterTextSplitter.fromLanguage("js", {
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const finalDocs = await splitter.splitDocuments(docs);
  console.log(`✂️ Split into ${finalDocs.length} chunks.`);

  // 4. Create Embeddings and Store in Weaviate
  console.log("🧠 Generating embeddings and uploading to Weaviate...");
  await WeaviateStore.fromDocuments(finalDocs, new OpenAIEmbeddings(), {
    client,
    indexName: "Codebase",
    textKey: "content",
  });

  console.log("✅ Ingestion complete!");
};

run();