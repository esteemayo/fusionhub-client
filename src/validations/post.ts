import ReactQuill from 'react-quill-new';

import { PostErrorType } from '../types';

export const validateDescInput = (desc: ReactQuill.Value | undefined) => {
  const errors: PostErrorType = {};

  if ((typeof desc === 'string' && desc.trim() === '') || desc === undefined) {
    errors.desc = 'A product must have a description';
  }

  return errors;
};
