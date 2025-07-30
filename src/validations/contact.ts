import { ContactFormData, ContactFormError } from '../types';

export const validateContactInputs = (data: ContactFormData) => {
  const errors: ContactFormError = {};
  const { phone, message } = data;

  if (!phone || phone === undefined) {
    errors.phone = 'Please enter your phone number';
  }

  if (
    (typeof message === 'string' && message.trim() === '') ||
    message === undefined
  ) {
    errors.message = 'Please enter your message before submitting';
  }

  return errors;
};
