"use client";
import React, { useState } from 'react';

export default function ResearchForm() {
  const [query, setQuery] = useState("");

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:8080/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    if (res.ok) alert("Agent is on the job!");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <textarea 
        className="w-full p-2 border rounded"
        placeholder="e.g., How did vaccination rates impact ICU admissions in 2023?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button 
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Launch Agent
      </button>
    </div>
  );
}