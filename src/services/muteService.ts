import http from './httpService';
import { MutePayload } from '../types';

const apiEndpoint = '/mutes';

export const getMutedEntity = () => http.get(apiEndpoint);

export const muteEntity = (payload: MutePayload) =>
  http.post(apiEndpoint, payload);
