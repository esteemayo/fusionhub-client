import { ErrorMessageProps } from '../../types';
import ExclamationCircleIcon from '../icons/ExclamationCircleIcon';

import './ErrorMessage.scss';

const ErrorMessage = ({
  id,
  role = 'alert',
  message,
  ...ariaProps
}: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <p id={id} className='error-message' role={role} {...ariaProps}>
      <ExclamationCircleIcon />
      <span>{message}</span>
    </p>
  );
};

export default ErrorMessage;
