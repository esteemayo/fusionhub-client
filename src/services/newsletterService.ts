import http from './httpService';

const apiEndpoint = '/newsletter';

export const subscribeToNewsLetter = async (email: string) =>
  http.post(`${apiEndpoint}/subscribe`, { email });
