// frontend/src/hooks/useDiagnosis.ts
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useDiagnosis = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await axios.post('/api/proxy/analyze', formData);
      return data;
    },
  });
};