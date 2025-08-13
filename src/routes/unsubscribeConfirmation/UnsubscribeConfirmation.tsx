import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Lottie from 'lottie-react';

import errorAnimation from '../../animations/errorAnimation.json';
import successAnimation from '../../animations/successAnimation.json';

import { confirmUnSubscription } from '../../services/newsletterService';

import './UnsubscribeConfirmation.scss';

const unsubscriptionConfirmation = async (token: string, email: string) => {
  const { data } = await confirmUnSubscription(token, email);
  return data;
};

const UnsubscribeConfirmation = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const { isPending, isSuccess, isError, error, data } = useQuery({
    queryKey: ['confirmUnsubscription'],
    queryFn: () => unsubscriptionConfirmation(token as string, email as string),
    enabled: !!email && !!token,
  });

  const loadingClasses = useMemo(() => {
    return isPending
      ? 'unsubscribe-confirmation__loading show'
      : 'unsubscribe-confirmation__loading hide';
  }, [isPending]);

  const successClasses = useMemo(() => {
    return isSuccess && data
      ? 'unsubscribe-confirmation__success show'
      : 'unsubscribe-confirmation__success hide';
  }, [data, isSuccess]);

  const errorClasses = useMemo(() => {
    return isError && error
      ? 'unsubscribe-confirmation__error show'
      : 'unsubscribe-confirmation__error hide';
  }, [error, isError]);

  return (
    <section className='unsubscribe-confirmation'>
      <div className='unsubscribe-confirmation__container'>
        <p className={loadingClasses}>Processing your request...</p>
        <div className={successClasses}>
          <div className='unsubscribe-confirmation__success--wrapper'>
            <h1 className='unsubscribe-confirmation__success--title'>
              You've been unsubscribed
            </h1>
            <Lottie
              animationData={successAnimation}
              loop={false}
              className='unsubscribe-confirmation__success--animation'
            />
          </div>
          <p className='unsubscribe-confirmation__success--message'>
            We're sorry to see you go. You will no longer receive our
            newsletters.
          </p>
          <Link to='/' className='unsubscribe-confirmation__success--btn'>
            Back to Home
          </Link>
        </div>
        <div className={errorClasses}>
          <div className='unsubscribe-confirmation__error--wrapper'>
            <h1 className='unsubscribe-confirmation__error--title'>
              Unsubscribe failed
            </h1>
            <Lottie
              animationData={errorAnimation}
              loop={false}
              className='unsubscribe-confirmation__error--animation'
            />
          </div>
          <p className='unsubscribe-confirmation__error--message'>
            The unsubscribe link may be invalid or expired.
          </p>
          <Link to='/' className='unsubscribe-confirmation__error--btn'>
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UnsubscribeConfirmation;
