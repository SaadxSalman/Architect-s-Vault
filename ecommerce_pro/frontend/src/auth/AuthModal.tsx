"use client";
import { useState } from 'react';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (token: string) => void;
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLoginMode ? 'token/' : 'register/';
    const body = isLoginMode ? { username, password } : { username, password, email };

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (res.ok) {
        if (isLoginMode) {
          onSuccess(data.access);
        } else {
          alert("Success! Now please login.");
          setIsLoginMode(true);
        }
      } else { 
        alert(JSON.stringify(data)); 
      }
    } catch (err) {
      alert("Server error connecting to backend.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
      <form onSubmit={handleAuth} className="bg-white p-8 rounded-[2rem] w-full max-w-sm shadow-2xl">
        <h2 className="text-3xl font-black text-center mb-2 text-slate-800">
          {isLoginMode ? 'Login' : 'Join Us'}
        </h2>
        <p className="text-slate-500 text-center mb-6 text-sm">
          {isLoginMode ? 'Welcome back to your vault' : 'Create an account to start shopping'}
        </p>
        <div className="space-y-4">
          {!isLoginMode && (
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          )}
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
          <button className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:bg-indigo-700 transition mt-4">
            {isLoginMode ? 'Sign In' : 'Register Now'}
          </button>
        </div>
        <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} className="w-full mt-6 text-indigo-600 font-bold text-sm hover:underline">
          {isLoginMode ? "Need an account? Register" : "Already a member? Login"}
        </button>
        <button type="button" onClick={onClose} className="w-full mt-3 text-slate-400 text-xs font-semibold hover:text-slate-600">
          Maybe later
        </button>
      </form>
    </div>
  );
}