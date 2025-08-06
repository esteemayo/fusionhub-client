import { useQuery } from '@tanstack/react-query';

import { useQueryParams } from '../../utils';
import { confirmSubscription } from '../../services/newsletterService';

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

  const { isPending, error, data } = useQuery({
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
        <h1 className='subscription-confirmation__title'>
          Subscription confirmation
        </h1>
        <p className='subscription-confirmation__text'>
          Your subscription is confirmed, Thank you!
        </p>
      </div>
    </section>
  );
};

export default SubscriptionConfirmation;
