import http from './httpService';

const apiEndpoint = '/contacts';

export const createContact = <T extends object>(data: T) =>
  http.post(apiEndpoint, data);
