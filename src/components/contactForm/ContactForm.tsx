import { Value } from 'react-phone-number-input';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import ReactQuill from 'react-quill-new';

import TextQuill from '../textQuill/TextQuill';
import Input from '../input/Input';
import PhoneNumber from '../phoneNumber/PhoneNumber';
import Button from '../button/Button';
import ContactHeading from '../contactHeading/ContactHeading';

import { contactSchema } from '../../validations/contactSchema';
import { validateContactInputs } from '../../validations/contact';

import { ContactFormError } from '../../types';
import { createContact } from '../../services/contactService';

import './ContactForm.scss';

const createNewContact = async <T extends object>(contact: T) => {
  const { data } = await createContact(contact);
  return data;
};

type FormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const contactMutation = useMutation({
    mutationFn: (contact: object) => createNewContact(contact),
    onSuccess: () => {
      toast.success(
        'Thank you for reaching out! Your message has been sent successfully. We will get back to you soon.'
      );
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
        toast.error(
          'An error occurred while sending your message. Please try again.'
        );
      }
    },
  });

  const [error, setError] = useState<ContactFormError>({});
  const [phone, setPhone] = useState<Value | undefined>();
  const [message, setMessage] = useState<ReactQuill.Value | undefined>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
  });

  const handlePhoneChange = (value: Value | undefined) => {
    if (!value || value === undefined) {
      setError((prev) => ({ ...prev, phone: '' }));
      setPhone(value);
    }

    setPhone(value);
  };

  const handleChangeMessage = (value: ReactQuill.Value | undefined) => {
    if (
      (typeof message === 'string' && message.trim() !== '') ||
      message !== undefined
    ) {
      setError((prev) => ({ ...prev, message: '' }));
      setMessage(value);
    }

    setMessage(value);
  };

  const handleClear = () => {
    reset();
    setPhone(undefined);
    setMessage('');
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const inputs = { message, phone };
    const contact = { ...data, ...inputs };

    const errors = validateContactInputs(inputs);
    if (Object.keys(errors).length > 0) setError(errors);

    contactMutation.mutate(contact, {
      onSuccess: handleClear,
    });
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
              onChange={(value) => handlePhoneChange(value)}
              error={error.phone}
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
          <TextQuill
            id='message'
            value={message}
            placeholder='Message'
            onChange={(value) => handleChangeMessage(value)}
            error={error.message}
          />
          <div className='contact-form__wrapper--btn'>
            <Button
              type='submit'
              label='Send Message'
              color='primary'
              isLoading={contactMutation.isPending}
              disabled={contactMutation.isPending}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
