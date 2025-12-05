import { Value } from 'react-phone-number-input';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactQuill from 'react-quill-new';
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form';

import TextQuill from '../textQuill/TextQuill';
import Input from '../input/Input';
import PhoneNumber from '../phoneNumber/PhoneNumber';
import Button from '../button/Button';
import ContactHeading from '../contactHeading/ContactHeading';

import { validateContactInputs } from '../../validations/contact';
import {
  ContactInputData,
  contactSchema,
} from '../../validations/contactSchema';

import { ContactFormError } from '../../types';
import { createContact } from '../../services/contactService';

import './ContactForm.scss';

const createNewContact = async <T extends object>(contact: T) => {
  const { data } = await createContact(contact);
  return data;
};

const ContactForm = () => {
  const contactMutation = useMutation({
    mutationFn: (contact: object) => createNewContact(contact),
    onSuccess: () => {
      toast.success(
        'Thank you for reaching out! Your message has been sent successfully. We will get back to you soon.',
        { role: 'alert' }
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
        toast.error(errorMessage, { role: 'alert' });
      } else {
        toast.error(
          'An error occurred while sending your message. Please try again.',
          { role: 'alert' }
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
  } = useForm<ContactInputData>({
    resolver: zodResolver(contactSchema),
  });

  const handlePhoneChange = (value: Value | undefined) => {
    if (contactMutation.isPending) return;

    if (!value || value === undefined) {
      setError((prev) => ({ ...prev, phone: '' }));
      setPhone(value);
    }

    setPhone(value);
  };

  const handleChangeMessage = (value: ReactQuill.Value | undefined) => {
    if (contactMutation.isPending) return;

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

  const onSubmit: SubmitHandler<ContactInputData> = (data) => {
    const inputs = { message, phone };
    const contact = { ...data, ...inputs };

    const errors = validateContactInputs(inputs);
    if (Object.keys(errors).length > 0) setError(errors);

    contactMutation.mutate(contact, { onSuccess: handleClear });
  };

  const titleId = 'contact-form-title';
  const describeId = 'contact-form-description';

  return (
    <div
      className='contact-form'
      role='form'
      aria-labelledby={titleId}
      aria-describedby={describeId}
    >
      <div className='contact-form__container'>
        <ContactHeading
          title='Get in touch !'
          subtitle="Feel free to reach out to us with any questions or inquiries. We're here to help and look forward to hearing from you!"
          titleId={titleId}
          subtitleId={describeId}
          text='sm'
          type='md'
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='contact-form__wrapper'
          noValidate
        >
          <div className='contact-form__wrapper--email'>
            <Input
              type='email'
              name='email'
              placeholder='Email address'
              register={register as unknown as UseFormRegister<FieldValues>}
              errors={errors}
              disabled={contactMutation.isPending}
              aria-label='Email address'
              aria-required='true'
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />

            <PhoneNumber
              value={phone}
              placeholder='Phone number'
              onChange={(value) => handlePhoneChange(value)}
              error={error.phone}
              aria-label='Phone number'
              aria-required='true'
              aria-invalid={!!error.phone}
              aria-describedby={error.phone ? 'phone-error' : undefined}
            />
          </div>

          <Input
            name='name'
            placeholder='Name'
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            disabled={contactMutation.isPending}
            aria-label='Your full name'
            aria-required='true'
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />

          <Input
            name='subject'
            placeholder='Subject'
            register={register as unknown as UseFormRegister<FieldValues>}
            errors={errors}
            disabled={contactMutation.isPending}
            aria-label='Subject'
            aria-required='true'
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          />

          <TextQuill
            id='message'
            value={message}
            placeholder='Message'
            onChange={(value) => handleChangeMessage(value)}
            error={error.message}
            readOnly={contactMutation.isPending}
            aria-label='Message'
            aria-required='true'
            aria-invalid={!!error.message}
            aria-describedby={error.message ? 'message-error' : undefined}
          />

          <div className='contact-form__wrapper--btn'>
            <Button
              type='submit'
              label='Send Message'
              isLoading={contactMutation.isPending}
              disabled={contactMutation.isPending}
              aria-label='Send message from button'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
