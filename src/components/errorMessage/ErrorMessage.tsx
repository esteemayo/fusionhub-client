import './ErrorMessage.scss';

const ErrorMessage = ({ message }: { message?: string }) => {
  return <span>{message}</span>;
};

export default ErrorMessage;
