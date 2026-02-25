// Example frontend fetch call
const getStorefront = async (socialBio: string) => {
  const response = await fetch('/api/generate-storefront', {
    method: 'POST',
    body: JSON.stringify({ socialText: socialBio }),
    headers: { 'Content-Type': 'application/json' }
  });
  return response.json();
};