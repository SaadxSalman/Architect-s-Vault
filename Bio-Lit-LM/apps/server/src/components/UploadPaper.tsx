'use client';
import { trpc } from '@/utils/trpc';

export const UploadPaper = () => {
  // Typesafe mutation hook
  const mutation = trpc.ingestPaper.useMutation({
    onSuccess: () => alert('Paper processed by Rust engine!'),
  });

  const handleUpload = async () => {
    // In a real app, you'd handle the file upload to a temp path first
    mutation.mutate({ filePath: '/tmp/nature_paper_v1.pdf' });
  };

  return (
    <div className="p-4 border-2 border-dashed border-indigo-200 rounded-lg text-center">
      <button 
        onClick={handleUpload}
        disabled={mutation.isLoading}
        className="bg-indigo-600 text-white px-6 py-2 rounded-md font-medium"
      >
        {mutation.isLoading ? 'Rust Engine Processing...' : 'Upload Scientific PDF'}
      </button>
    </div>
  );
};