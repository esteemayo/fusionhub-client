import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { toast } from 'react-toastify';

import UnsubscribeForm from '../../components/UnsubscribeForm';

import { newsletterSchema } from '../../validations/newsletterSchema';
import { unSubscribeFromNewsLetter } from '../../services/newsletterService';

import './NewsletterUnsubscribe.scss';

const unsubscribe = async (email: string) => {
  const { data } = await unSubscribeFromNewsLetter(email);
  return data;
};

type FormData = z.infer<typeof newsletterSchema>;

const NewsletterUnsubscribe = () => {
  const mutation = useMutation({
    mutationFn: (email: string) => unsubscribe(email),
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
        toast.error(`Unsubscribe failed: ${(error as Error).message}`);
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
    const { email } = data;

    mutation.mutate(email, {
      onSuccess: () => reset(),
    });
  };

  const successClasses = useMemo(() => {
    return mutation.isSuccess
      ? 'newsletter-unsubscribe__success show'
      : 'newsletter-unsubscribe__success hide';
  }, [mutation.isSuccess]);

  return (
    <section className='newsletter-unsubscribe'>
      <div className='newsletter-unsubscribe__container'>
        <div className='newsletter-unsubscribe__wrapper'>
          <h1 className='newsletter-unsubscribe__title'>
            Unsubscribe from Newsletter
          </h1>
          <p className={successClasses}>
            Unsubscribe confirmation email sent. Please check your inbox!
          </p>
          <div className='newsletter-unsubscribe__form'>
            <UnsubscribeForm
              register={register as unknown as UseFormRegister<FieldValues>}
              errors={errors}
              isLoading={mutation.isPending}
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterUnsubscribe;
