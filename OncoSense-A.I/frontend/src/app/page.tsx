// frontend/src/app/diagnosis/page.tsx
const mutation = trpc.analyzeSlide.useMutation();

const handleUpload = () => {
  mutation.mutate({ imageBase64: "...", history: "Patient smoker..." }, {
    onSuccess: (data) => console.log("AI Diagnosis:", data.analysis.vision_analysis),
  });
};