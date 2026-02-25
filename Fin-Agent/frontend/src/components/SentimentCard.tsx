import { trpc } from '../utils/trpc';

export default function SentimentCard({ newsText }: { newsText: string }) {
  const mutation = trpc.sentiment.analyze.useMutation();

  return (
    <div className="p-6 border rounded-xl bg-slate-900 text-white">
      <h3 className="text-xl font-bold">Market Sentiment</h3>
      <button 
        onClick={() => mutation.mutate({ text: newsText })}
        className="mt-4 px-4 py-2 bg-blue-600 rounded"
      >
        {mutation.isLoading ? 'Analyzing...' : 'Run Analysis'}
      </button>

      {mutation.data && (
        <div className="mt-4 p-4 bg-slate-800 rounded">
          <p className="text-sm">{mutation.data.result}</p>
        </div>
      )}
    </div>
  );
}