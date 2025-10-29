import http from './httpService';
import { MutePayload, UnmutePayload } from '../types';

const apiEndpoint = '/mutes';

export const getMutedEntities = () => http.get(apiEndpoint);

export const muteTarget = (payload: MutePayload) =>
  http.post(apiEndpoint, payload);

export const unmuteTarget = (payload: UnmutePayload) =>
  http.post(`${apiEndpoint}/unmute`, payload);
