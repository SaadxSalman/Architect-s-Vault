// client/src/hooks/useFileUpload.ts
import { useState, useCallback } from 'react';
import api from '@/services/api';

interface FileUploadOptions {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  onProgress?: (percent: number) => void;
}

const useFileUpload = (url: string, options?: FileUploadOptions) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
            options?.onProgress?.(percentCompleted);
          }
        },
      });
      options?.onSuccess?.(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'File upload failed');
      options?.onError?.(err);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, [url, options]);

  return { uploadFile, isUploading, uploadProgress, error };
};

export default useFileUpload;