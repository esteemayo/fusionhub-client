import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ErrorState from '../components/errorState/ErrorState';

const LoadingToRedirect = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCount((value) => {
        return --value;
      });
    }, 1000);

    if (count === 0) {
      navigate('/login');
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [count, navigate]);

  return (
    <ErrorState
      title='Unauthorized Access‼'
      subtitle={`You are not authorized to access this page. Redirecting you to the login page in ${count} seconds. Please log in to continue.`}
      imgSrc='/page-eaten.svg'
      alt='unauthorized'
      center
    />
  );
};

export default LoadingToRedirect;
