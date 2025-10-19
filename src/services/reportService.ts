import http from './httpService';
import { ReportPayload } from '../types';

const apiEndpoint = '/reports';

export const createReport = (payload: ReportPayload) =>
  http.post(apiEndpoint, payload);
