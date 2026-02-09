// components/Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Semantic Search Project by saadxsalman. 
        Powered by Supabase & OpenAI.
      </div>
    </footer>
  );
};

export default Footer;