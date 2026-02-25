'use client';
import { useState } from 'react';
import { trpc } from '@/utils/trpc';

export default function VisionUpload() {
  const [image, setImage] = useState<string | null>(null);
  const mutation = trpc.vision.analyzeWork.useMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Remove the data:image/jpeg;base64, prefix for the backend
        const base64String = (reader.result as string).split(',')[1];
        setImage(reader.result as string);
        mutation.mutate({ imageBase64: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 border-2 border-dashed rounded-xl border-gray-300">
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
      
      {image && <img src={image} alt="Handwritten work" className="w-64 h-auto rounded mb-4" />}

      {mutation.isLoading && <p className="text-blue-500 animate-pulse">Analyzing your work...</p>}
      
      {mutation.data && (
        <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
          <h4 className="font-bold">Agent Feedback:</h4>
          <p className="text-sm">{mutation.data}</p>
        </div>
      )}
    </div>
  );
}