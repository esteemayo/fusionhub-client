import './ErrorMessage.scss';

const ErrorMessage = ({ message }: { message?: string }) => {
  return (
    <div className='errorMessage'>
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
