/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Using the string name is fine, but ensure you ran 
    // 'npm install @tailwindcss/postcss tailwindcss' 
    // INSIDE the frontend folder.
    "@tailwindcss/postcss": {},
  },
};

export default config;