// client/src/components/PerceptionAgentUploader.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, XCircle } from 'lucide-react';
import useFileUpload from '@/hooks/useFileUpload';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

interface PerceptionAgentUploaderProps {
  onTranslationInitiated: (translationId: string, inputType: 'text' | 'audio' | 'video') => void;
}

const PerceptionAgentUploader: React.FC<PerceptionAgentUploaderProps> = ({ onTranslationInitiated }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState<string>('');

  // Hook for file uploads
  const { uploadFile, isUploading, uploadProgress, error } = useFileUpload('/api/translate/upload', {
    onSuccess: (response) => {
      alert('File uploaded successfully!');
      onTranslationInitiated(response.translationId, response.inputType);
      setSelectedFile(null);
      setTextInput('');
    },
    onError: (err) => {
      console.error('Upload Error:', err);
      alert('Error uploading file: ' + (error || 'Unknown error'));
    },
  });

  // Hook for text input (separate endpoint or combined)
  const { uploadFile: submitText, isUploading: isTextSubmitting } = useFileUpload('/api/translate/text', {
    onSuccess: (response) => {
      alert('Text submitted successfully!');
      onTranslationInitiated(response.translationId, 'text');
      setTextInput('');
    },
    onError: (err) => {
      console.error('Text Submission Error:', err);
      alert('Error submitting text: ' + (error || 'Unknown error'));
    },
  });


  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.ogg'],
      'video/*': ['.mp4', '.mov', '.avi'],
      'text/plain': ['.txt'], // Allow text file uploads if desired
    },
    maxFiles: 1,
    disabled: isUploading || isTextSubmitting,
  });

  const handleFileUpload = async () => {
    if (selectedFile) {
      await uploadFile(selectedFile);
    }
  };

  const handleTextSubmission = async () => {
    if (textInput.trim()) {
      // Create a dummy file-like object for the text submission hook
      const textBlob = new Blob([textInput], { type: 'text/plain' });
      const textFile = new File([textBlob], 'text_input.txt', { type: 'text/plain' });
      await submitText(textFile); // Reusing the file upload hook, but sending text content
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const isDisabled = isUploading || isTextSubmitting;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>OmniLingua Translator</CardTitle>
        <CardDescription>Upload audio/video, or type text for culturally-aware translation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Text Input Section */}
        <div className="space-y-2">
          <label htmlFor="textInput" className="block text-sm font-medium text-gray-700">
            Type Text for Translation
          </label>
          <textarea
            id="textInput"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter text here..."
            disabled={isDisabled}
          ></textarea>
          <Button
            onClick={handleTextSubmission}
            disabled={!textInput.trim() || isDisabled}
            variant="secondary"
          >
            {isTextSubmitting ? 'Submitting...' : 'Translate Text'}
          </Button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* File Dropzone Section */}
        <div
          {...getRootProps()}
          className={`
            flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer
            ${isDragActive ? 'border-primary-foreground bg-primary/10' : 'border-gray-300 bg-gray-50'}
            ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} disabled={isDisabled} />
          <UploadCloud className="w-12 h-12 text-gray-400 mb-3" />
          {isDragActive ? (
            <p className="text-gray-600">Drop the files here...</p>
          ) : (
            <p className="text-gray-600">Drag 'n' drop audio/video here, or click to select files</p>
          )}
          <em className="text-sm text-gray-500">(Only .mp3, .wav, .ogg, .mp4, .mov, .avi files will be accepted)</em>
        </div>

        {selectedFile && (
          <div className="flex items-center justify-between p-3 border rounded-md bg-gray-100">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <span>{selectedFile.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveFile}
              disabled={isDisabled}
            >
              <XCircle className="w-5 h-5 text-red-500" />
            </Button>
          </div>
        )}

        {isUploading && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Uploading: {uploadProgress}%</p>
            <Progress value={uploadProgress} />
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500 mt-2">Error: {error}</p>
        )}

        <Button
          onClick={handleFileUpload}
          disabled={!selectedFile || isDisabled}
          className="w-full"
        >
          {isUploading ? 'Processing...' : 'Upload & Translate'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PerceptionAgentUploader;