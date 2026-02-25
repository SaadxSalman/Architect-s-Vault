import { useState, useEffect } from 'react';
import api from '@/services/api';

export const useTranslationStatus = (translationId: string | null) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!translationId) return;

    const checkStatus = async () => {
      try {
        const res = await api.get(`/api/translate/status/${translationId}`);
        setData(res.data);

        // Stop polling if completed or failed
        if (res.data.status === 'completed' || res.data.status === 'failed') {
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Polling error", err);
      }
    };

    const interval = setInterval(checkStatus, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, [translationId]);

  return data;
};