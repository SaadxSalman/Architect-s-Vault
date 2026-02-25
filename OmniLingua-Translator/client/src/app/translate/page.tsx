// client/src/app/translate/page.tsx
'use client';

import { useState } from 'react';
import PerceptionAgentUploader from '@/components/PerceptionAgentUploader';

type TranslationState = {
  id: string;
  inputType: 'text' | 'audio' | 'video';
  status: 'processing' | 'completed' | 'failed';
  result?: string; // The final translated output
  culturalNotes?: string[];
};

export default function TranslatePage() {
  const [currentTranslation, setCurrentTranslation] = useState<TranslationState | null>(null);

  const handleTranslationInitiated = (translationId: string, inputType: 'text' | 'audio' | 'video') => {
    setCurrentTranslation({
      id: translationId,
      inputType: inputType,
      status: 'processing',
    });
    // In a real app, you'd start polling the backend for translation status here
    // For now, we'll just set the initial state.
    console.log(`Translation ${translationId} initiated for ${inputType} input.`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {!currentTranslation ? (
          <PerceptionAgentUploader onTranslationInitiated={handleTranslationInitiated} />
        ) : (
          <div className="text-center p-8 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-4">Translation in Progress...</h2>
            <p className="text-gray-700">
              Input type: <span className="font-medium capitalize">{currentTranslation.inputType}</span>
            </p>
            <p className="text-gray-700">Translation ID: <span className="font-mono">{currentTranslation.id}</span></p>
            <p className="mt-4 text-gray-600">
              Your request is being processed by the Perception, Context, Linguistic, and Refinement Agents.
              This may take a moment.
            </p>
            <div className="mt-6">
              <Progress value={20} className="w-full" /> {/* Placeholder progress */}
              <p className="text-sm text-gray-500 mt-2">Waiting for Perception Agent to finish...</p>
            </div>
            <Button onClick={() => setCurrentTranslation(null)} className="mt-8" variant="outline">
              Start New Translation
            </Button>
          </div>
        )}
      </div>
    </div>
  );

