import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import { IReport, ReportPayload } from '../types';
import { createReport } from '../services/reportService';

const createNewReport = async (payload: ReportPayload) => {
  const { data } = await createReport(payload);
  return data;
};

export const useReport: IReport = () => {
  const reportMutation = useMutation({
    mutationFn: (payload: ReportPayload) => createNewReport(payload),
    onSuccess: () => {
      toast.success('Your report has been submitted successfully', {
        role: 'alert',
      });
    },
    onError: (error: unknown) => {
      if (
        error instanceof Error &&
        (error as { response?: { data?: string } })?.response?.data
      ) {
        const errorMessage = (
          error as unknown as { response: { data: string } }
        ).response.data;
        toast.error(errorMessage, { role: 'alert' });
      } else {
        toast.error('An error occurred', { role: 'alert' });
      }
    },
  });

  return {
    reportMutation,
  };
};
