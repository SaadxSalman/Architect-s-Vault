"use client";
import { useState } from 'react';

export default function TopicForm() {
  const [topic, setTopic] = useState('');

  const handleSubmit = async () => {
    await fetch('/api/trigger-agent', {
      method: 'POST',
      body: JSON.stringify({ topic }),
    });
    alert("Research Agent Dispatched!");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Start New Content Campaign</h2>
      <input 
        className="border p-2 w-full mb-4 text-black"
        placeholder="Enter topic (e.g. The future of AI in 2025)"
        onChange={(e) => setTopic(e.target.value)}
      />
      <button 
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Launch Factory
      </button>
    </div>
  );
}