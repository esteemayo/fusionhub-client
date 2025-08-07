import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import { useQuery } from '@tanstack/react-query';

import { useQueryParams } from '../../utils';
import { confirmUnSubscription } from '../../services/newsletterService';

import errorAnimation from '../../animations/errorAnimation.json';
import successAnimation from '../../animations/successAnimation.json';

import './UnsubscribeConfirmation.scss';

const unsubscriptionConfirmation = async (token: string, email: string) => {
  const { data } = await confirmUnSubscription(token, email);
  return data;
};

const UnsubscribeConfirmation = () => {
  const query = useQueryParams();

  const token = query.get('token');
  const email = query.get('email');

  // console.log({ token, email });

  const { isPending, isSuccess, isError, error, data } = useQuery({
    queryKey: ['confirmUnsubscription'],
    queryFn: () => unsubscriptionConfirmation(token as string, email as string),
    enabled: !!email && !!token,
  });

  // console.log(isPending);
  // console.log(error);
  // console.log(data);

  return (
    <section className='unsubscribe-confirmation'>
      <div className='unsubscribe-confirmation__container'>
        {isPending && (
          <p className='unsubscribe-confirmation__loading'>
            Processing your request...
          </p>
        )}
        {isSuccess && data && (
          <div className='unsubscribe-confirmation__success'>
            <div className='unsubscribe-confirmation__success--wrapper'>
              <h1 className='unsubscribe-confirmation__success--title'>
                You've been unsubscribed
              </h1>
              <Lottie
                animationData={successAnimation}
                loop={true}
                style={{ width: '5rem', height: '5rem' }}
                className=''
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
        )}
        {isError && error && (
          <div className='unsubscribe-confirmation__error'>
            <div className='unsubscribe-confirmation__success--wrapper'>
              <h1 className='unsubscribe-confirmation__error--title'>
                Unsubscribe failed
              </h1>
              <Lottie
                animationData={errorAnimation}
                loop={true}
                style={{ width: '5rem', height: '5rem' }}
              />
            </div>
            <p className='unsubscribe-confirmation__error--message'>
              The unsubscribe link may be invalid or expired.
            </p>
            <Link to='/' className='unsubscribe-confirmation__error--btn'>
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default UnsubscribeConfirmation;
