// frontend/src/app/chat/page.tsx
'use client';

import { useState } from 'react';
import { Upload, Send, FileText } from 'lucide-react';
import axios from 'axios';

export default function ChatPage() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSend = async () => {
    const response = await fetch('http://localhost:5000/api/agent/stream-draft', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = "";

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;

      const chunk = decoder.decode(value);
      // SSE sends data prefixed with "data: ", we clean it up:
      const token = chunk.replace(/data: /g, "").replace(/\n\n/g, "");
      
      accumulatedText += token;
      // Update the last message in the state with the new text
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].content = accumulatedText;
        return updated;
      });
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar for Legal Documents */}
      <aside className="w-64 bg-slate-900 text-white p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Lexi-Agent ⚖️</h2>
        <button className="flex items-center gap-2 bg-blue-600 p-2 rounded hover:bg-blue-700 mb-4">
          <Upload size={18} /> Upload Contract
        </button>
        <div className="flex-1 overflow-y-auto">
          <p className="text-xs uppercase text-slate-400 mb-2">Recent Research</p>
          <div className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded cursor-pointer">
            <FileText size={16} /> <span className="text-sm truncate">NDA_Template_v2.pdf</span>
          </div>
        </div>
      </aside>

      {/* Main Chat Interface */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-lg ${
                msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border text-slate-800 shadow-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t">
          <div className="max-w-4xl mx-auto flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask Lexi-Agent to draft a clause or analyze a case..."
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded-lg px-4">
              <Send size={20} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}s