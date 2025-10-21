import http from './httpService';
import { ReportPayload, ReportResponse } from '../types';

const apiEndpoint = '/reports';

export const createReport = (payload: ReportPayload) =>
  http.post<ReportResponse>(apiEndpoint, payload);
