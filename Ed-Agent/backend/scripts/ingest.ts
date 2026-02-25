import { addDocumentsToStore } from "../src/services/vectorStore";

const data = [
  "Photosynthesis is the process by which green plants use sunlight to synthesize foods.",
  "Quadratic equations take the form ax^2 + bx + c = 0.",
  // Add more educational content here
];

const runInversion = async () => {
  console.log("Ingesting knowledge into Qdrant...");
  await addDocumentsToStore(data, data.map((_, i) => ({ id: i })));
  console.log("Ingestion complete!");
};

runInversion();s