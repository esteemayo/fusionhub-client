import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Lottie from 'lottie-react';

import errorAnimation from '../../animations/errorAnimation.json';
import successAnimation from '../../animations/successAnimation.json';

import { confirmSubscription } from '../../services/newsletterService';

import './SubscriptionConfirmation.scss';

const subscriptionConfirmation = async (token: string, email: string) => {
  const { data } = await confirmSubscription(token, email);
  return data;
};

const SubscriptionConfirmation = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const { isPending, isSuccess, isError, error, data } = useQuery({
    queryKey: ['confirmSubscription'],
    queryFn: () => subscriptionConfirmation(token as string, email as string),
    enabled: !!email && !!token,
  });

  const loadingClasses = useMemo(() => {
    return isPending
      ? 'subscription-confirmation__loading show'
      : 'subscription-confirmation__loading hide';
  }, [isPending]);

  const successClasses = useMemo(() => {
    return isSuccess && data
      ? 'subscription-confirmation__success show'
      : 'subscription-confirmation__success hide';
  }, [data, isSuccess]);

  const errorClasses = useMemo(() => {
    return isError && error
      ? 'subscription-confirmation__error show'
      : 'subscription-confirmation__error hide';
  }, [error, isError]);

  return (
    <section className='subscription-confirmation'>
      <div className='subscription-confirmation__container'>
        <p className={loadingClasses}>Processing your request...</p>
        <div className={successClasses}>
          <div className='subscription-confirmation__success--wrapper'>
            <h1 className='subscription-confirmation__success--title'>
              🎉 You're Subscribed!
            </h1>
            <Lottie
              animationData={successAnimation}
              loop={true}
              className='subscription-confirmation__success--animation'
            />
          </div>
          <p className='subscription-confirmation__success--message'>
            Thank you for confirming your subscription to our newsletter.
          </p>
          <p className='subscription-confirmation__success--message'>
            You'll now receive updates, tips, and exclusive content right in
            your inbox.
          </p>
          <Link to='/' className='subscription-confirmation__success--btn'>
            Back to Home
          </Link>
        </div>
        <div className={errorClasses}>
          <div className='subscription-confirmation__error--wrapper'>
            <h1 className='subscription-confirmation__error--title'>
              Subscription failed
            </h1>
            <Lottie
              animationData={errorAnimation}
              loop={true}
              className='subscription-confirmation__error--animation'
            />
          </div>
          <p className='subscription-confirmation__error--message'>
            The subscribe link may be invalid or expired.
          </p>
          <Link to='/' className='subscription-confirmation__error--btn'>
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionConfirmation;
