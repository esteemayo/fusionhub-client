import { Value } from 'react-phone-number-input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { toast } from 'react-toastify';

import Textarea from '../textarea/Textarea';
import Input from '../input/Input';
import PhoneNumber from '../phoneNumber/PhoneNumber';
import Button from '../button/Button';
import ContactHeading from '../contactHeading/ContactHeading';

import { contactSchema } from '../../validations/contactSchema';

import './ContactForm.scss';

type FormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState<Value | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsLoading(true);

    setTimeout(() => {
      console.log({ ...data, phone });
      toast.success('Message sent!');
      setIsLoading(false);
      reset();
    }, 1500);
  };

  return (
    <section className='contact-form'>
      <div className='contact-form__container'>
        <ContactHeading
          title='Get in touch !'
          subtitle="Feel free to reach out to us with any questions or inquiries. We're here to help and look forward to hearing from you!"
          text='sm'
          type='md'
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='contact-form__wrapper'
        >
          <div className='contact-form__wrapper--email'>
            <Input
              type='email'
              name='email'
              placeholder='Email address'
              register={register as unknown as UseFormRegister<FieldValues>}
              errors={errors}
            />
            <PhoneNumber
              value={phone}
              placeholder='Phone number'
              onChange={setPhone}
            />
          </div>
          <Input
            name='name'
            placeholder='Name'
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
          />
          <Input
            name='subject'
            placeholder='Subject'
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
          />
          <Textarea
            name='message'
            placeholder='Message'
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
          />
          <div className='contact-form__wrapper--btn'>
            <Button
              type='submit'
              label='Send Message'
              color='primary'
              isLoading={isLoading}
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
