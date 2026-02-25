'use client';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';

export default function QuizView({ userId }: { userId: string }) {
  const { data: questions, isLoading } = trpc.quiz.getPersonalizedQuiz.useQuery({ userId });
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  if (isLoading) return <div className="animate-pulse">Loading your personalized quiz...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {questions?.map((q, idx) => (
        <div key={idx} className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold mb-4">{q.question}</h3>
          <div className="grid gap-3">
            {q.options.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedAnswers({ ...selectedAnswers, [idx]: opt })}
                className={`p-3 text-left rounded-lg border transition ${
                  selectedAnswers[idx] === opt ? 'bg-blue-600 text-white' : 'hover:bg-slate-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {selectedAnswers[idx] && (
            <div className={`mt-4 p-3 rounded text-sm ${
              selectedAnswers[idx] === q.correctAnswer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {selectedAnswers[idx] === q.correctAnswer ? '✅ Correct!' : `❌ Try again. Hint: ${q.explanation}`}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}