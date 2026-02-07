import { generateEmbedding } from './index'; // Export your function from index

describe('Vector Math Logic', () => {
  it('should generate a vector of 1536 dimensions', async () => {
    const vector = await generateEmbedding("test product");
    expect(vector.length).toBe(1536);
  });

  it('should be a valid array of numbers', async () => {
    const vector = await generateEmbedding("blue shoes");
    expect(Array.isArray(vector)).toBe(true);
    expect(typeof vector[0]).toBe('number');
  });
});