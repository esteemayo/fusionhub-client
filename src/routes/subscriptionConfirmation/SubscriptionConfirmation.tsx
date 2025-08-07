import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import { useQuery } from '@tanstack/react-query';

import { useQueryParams } from '../../utils';
import { confirmSubscription } from '../../services/newsletterService';

import errorAnimation from '../../animations/errorAnimation.json';
import successAnimation from '../../animations/successAnimation.json';

import './SubscriptionConfirmation.scss';

const subscriptionConfirmation = async (token: string, email: string) => {
  const { data } = await confirmSubscription(token, email);
  return data;
};

const SubscriptionConfirmation = () => {
  const query = useQueryParams();

  const token = query.get('token');
  const email = query.get('email');

  console.log({ token, email });

  const { isPending, isSuccess, isError, error, data } = useQuery({
    queryKey: ['confirmSubscription'],
    queryFn: () => subscriptionConfirmation(token as string, email as string),
    enabled: !!email && !!token,
  });

  console.log(isPending);
  console.log('error: ', error);
  console.log('data: ', data);

  return (
    <section className='subscription-confirmation'>
      <div className='subscription-confirmation__container'>
        {isPending && (
          <p className='subscription-confirmation__loading'>
            Processing your request...
          </p>
        )}
        {isSuccess && data && (
          <div className='subscription-confirmation__success'>
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
        )}
        {isError && error && (
          <div className='subscription-confirmation__error'>
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
        )}
      </div>
    </section>
  );
};

export default SubscriptionConfirmation;
