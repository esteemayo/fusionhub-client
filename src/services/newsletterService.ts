import http from './httpService';

const apiEndpoint = '/newsletter';

export const confirmSubscription = async () =>
  http.get(`${apiEndpoint}/subscribe/confirm`);

export const confirmUnSubscription = async () =>
  http.get(`${apiEndpoint}/unsubscribe/confirm`);

export const subscribeToNewsLetter = async (email: string) =>
  http.post(`${apiEndpoint}/subscribe/init`, { email });

export const unSubscribeFromNewsLetter = async (email: string) =>
  http.post(`${apiEndpoint}/unsubscribe/init`, { email });
