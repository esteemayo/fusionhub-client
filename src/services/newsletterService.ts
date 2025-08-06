import http from './httpService';

const apiEndpoint = '/newsletter';

export const confirmSubscription = async (token: string, email: string) =>
  http.get(`${apiEndpoint}/subscribe/confirm?token=${token}&email=${email}`);

export const confirmUnSubscription = async (token: string, email: string) =>
  http.get(`${apiEndpoint}/unsubscribe/confirm?token=${token}&email=${email}`);

export const subscribeToNewsLetter = async (email: string) =>
  http.post(`${apiEndpoint}/subscribe/init`, { email });

export const unSubscribeFromNewsLetter = async (email: string) =>
  http.post(`${apiEndpoint}/unsubscribe/init`, { email });
