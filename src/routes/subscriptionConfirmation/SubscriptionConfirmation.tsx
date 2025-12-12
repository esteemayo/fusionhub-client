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

  const loadingClasses = useMemo(
    () =>
      isPending
        ? 'subscription-confirmation__loading show'
        : 'subscription-confirmation__loading hide',
    [isPending]
  );

  const successClasses = useMemo(
    () =>
      isSuccess && data
        ? 'subscription-confirmation__success show'
        : 'subscription-confirmation__success hide',
    [data, isSuccess]
  );

  const errorClasses = useMemo(
    () =>
      isError && error
        ? 'subscription-confirmation__error show'
        : 'subscription-confirmation__error hide',
    [error, isError]
  );

  return (
    <section
      className='subscription-confirmation'
      role='region'
      aria-labelledby='subscribe-confirmation-title'
    >
      <div className='subscription-confirmation__container'>
        <p
          className={loadingClasses}
          role='status'
          aria-live='assertive'
          aria-busy={isPending}
        >
          Processing your request...
        </p>

        <div
          className={successClasses}
          role={isSuccess ? 'status' : undefined}
          aria-live='polite'
        >
          <div className='subscription-confirmation__success--wrapper'>
            <h1
              id='subscribe-confirmation-title'
              className='subscription-confirmation__success--title'
              tabIndex={0}
            >
              🎉 You're Subscribed!
            </h1>

            <Lottie
              animationData={successAnimation}
              loop={false}
              className='subscription-confirmation__success--animation'
              aria-hidden='true'
            />
          </div>

          <p className='subscription-confirmation__success--message'>
            Thank you for confirming your subscription to our newsletter.
          </p>

          <p className='subscription-confirmation__success--message'>
            You'll now receive updates, tips, and exclusive content right in
            your inbox.
          </p>

          <Link
            to='/'
            className='subscription-confirmation__success--btn'
            aria-label='Return to home page'
          >
            Back to Home
          </Link>
        </div>

        <div
          className={errorClasses}
          role={isError ? 'alert' : undefined}
          aria-live='assertive'
        >
          <div className='subscription-confirmation__error--wrapper'>
            <h1
              className='subscription-confirmation__error--title'
              tabIndex={0}
            >
              Subscription failed
            </h1>

            <Lottie
              animationData={errorAnimation}
              loop={false}
              className='subscription-confirmation__error--animation'
              aria-hidden='true'
            />
          </div>

          <p className='subscription-confirmation__error--message'>
            The subscribe link may be invalid or expired.
          </p>

          <Link
            to='/'
            className='subscription-confirmation__error--btn'
            aria-label='Return to home page'
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionConfirmation;
