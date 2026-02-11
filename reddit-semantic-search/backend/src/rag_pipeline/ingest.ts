import fetch from 'node-fetch';
import { setupCollection, generateCollectionName } from '../weaviateClient.js';
import { upsertPost } from './database.js';

export async function processJsonLink(url: string) {
  const collectionName = generateCollectionName(url);
  const { collection, newlyCreated } = await setupCollection(collectionName);

  if (!newlyCreated) {
    return { isDuplicate: true, collectionName };
  }

  const response = await fetch(url);
  const rawData: any = await response.json();
  
  let items = [];
  // Support for Reddit-style or generic JSON arrays
  if (rawData.data?.children) {
    items = rawData.data.children.map((c: any) => ({
      title: c.data.title,
      content: `${c.data.title}. ${c.data.selftext || ""}`,
      url: c.data.url
    }));
  } else if (Array.isArray(rawData)) {
    items = rawData.map((item: any) => ({
      title: item.title || item.name || "Untitled",
      content: item.body || item.content || item.description || JSON.stringify(item),
      url: item.url || url
    }));
  }

  for (const item of items) {
    await upsertPost(item.title, item.url);
    await collection.data.insert({
      properties: { content: item.content, title: item.title, url: item.url }
    });
  }

  return { isDuplicate: false, collectionName, count: items.length };
}