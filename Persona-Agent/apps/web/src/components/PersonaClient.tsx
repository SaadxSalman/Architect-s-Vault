import { trpc } from '../utils/trpc';
import { useRef } from 'react';

export function PersonaClient() {
  const mutation = trpc.syncPersonaState.useMutation();
  const videoRef = useRef<HTMLVideoElement>(null);

  const captureAndSync = async () => {
    if (!videoRef.current) return;

    // 1. Capture frame from video element
    const canvas = document.createElement('canvas');
    canvas.width = 224; // Standard for VideoMAE
    canvas.height = 224;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
    const base64Frame = canvas.toDataURL('image/jpeg');

    // 2. Send to backend
    const result = await mutation.mutateAsync({
      videoFrame: base64Frame,
      audioSegment: "...", // Add audio capture logic here
    });

    // 3. Update Avatar (e.g., via a global state or ref)
    console.log("Avatar should now act:", result.instructions.expression);
  };

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} autoPlay muted className="rounded-lg w-64 h-48" />
      <button 
        onClick={captureAndSync}
        className="mt-4 bg-blue-600 px-4 py-2 rounded"
      >
        Sync with Persona
      </button>
    </div>
  );
}