'use client';
import { trpc } from '@/utils/trpc';

export default function Dashboard() {
  const mutation = trpc.curriculum.createPath.useMutation();

  const handleGenerate = () => {
    mutation.mutate({ info: "A high school student struggling with Algebra II and quadratic equations." });
  };

  return (
    <div className="p-8">
      <button 
        onClick={handleGenerate}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? 'Generating Plan...' : 'Generate My Path'}
      </button>

      {mutation.data && (
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold">{mutation.data.overallGoal}</h2>
          {mutation.data.modules.map((module, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 bg-slate-50">
              <h3 className="font-semibold text-lg">{module.title}</h3>
              <p className="text-gray-600">{module.description}</p>
              <div className="flex gap-2 mt-2">
                {module.keyTopics.map(topic => (
                  <span key={topic} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}