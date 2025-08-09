import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import Button from '../button/Button';
import Input from '../input/Input';
import ContactHeading from '../contactHeading/ContactHeading';

import { newsletterSchema } from '../../validations/newsletterSchema';
import { subscribeToNewsLetter } from '../../services/newsletterService';

import './Newsletter.scss';

const subscribe = async (email: string) => {
  const { data } = await subscribeToNewsLetter(email);
  return data;
};

type FormData = z.infer<typeof newsletterSchema>;

const Newsletter = () => {
  const newsletterMutation = useMutation({
    mutationFn: subscribe,
    onSuccess: () => {
      toast.success('Successfully sent subscription confirmation email.');
    },
    onError: (error: unknown) => {
      if (
        error instanceof Error &&
        (error as { response?: { data?: string } })?.response?.data
      ) {
        const errorMessage = (
          error as unknown as { response: { data: string } }
        ).response.data;
        toast.error(errorMessage);
      } else {
        toast.error(`Subscription failed: ${(error as Error).message}`);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    newsletterMutation.mutate(data.email, {
      onSuccess: () => reset(),
    });
  };

  return (
    <aside className='newsletter'>
      <div className='newsletter__container'>
        <ContactHeading
          title='Our newsletters'
          subtitle='Subscribe to our newsletter to get the latest updates directly to your inbox.'
          type='sm'
        />
        <form onSubmit={handleSubmit(onSubmit)} className='newsletter__wrapper'>
          <Input
            type='email'
            name='email'
            placeholder='Email address'
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            disabled={newsletterMutation.isPending}
          />
          <div className='newsletter__wrapper--btn'>
            <Button
              type='submit'
              label='Submit'
              color='dark'
              isLoading={newsletterMutation.isPending}
              disabled={newsletterMutation.isPending}
            />
          </div>
        </form>
      </div>
    </aside>
  );
};

export default Newsletter;
