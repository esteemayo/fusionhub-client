import { toast } from 'react-toastify';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
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

import './Newsletter.scss';

type FormData = z.infer<typeof newsletterSchema>;

const Newsletter = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsLoading(true);

    setTimeout(() => {
      console.log(data);
      toast.success('Successfully subscribed to our newsletter!');
      setIsLoading(false);
      reset();
    }, 1500);
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
          />
          <div className='newsletter__wrapper--btn'>
            <Button
              type='submit'
              label='Submit'
              color='dark'
              isLoading={isLoading}
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </aside>
  );
};

export default Newsletter;
