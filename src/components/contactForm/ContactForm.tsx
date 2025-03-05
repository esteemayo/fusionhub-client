import { useState } from 'react';
import { Value } from 'react-phone-number-input';

import Textarea from '../textarea/Textarea';
import Input from '../input/Input';
import PhoneNumber from '../phoneNumber/PhoneNumber';
import Button from '../button/Button';
import ContactHeading from '../contactHeading/ContactHeading';

import './ContactForm.scss';

const ContactForm = () => {
  const [value, setValue] = useState<Value | undefined>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <form onSubmit={handleSubmit} className='contact-form__wrapper'>
          <div className='contact-form__wrapper--email'>
            <Input type='email' name='email' placeholder='Email address' />
            <PhoneNumber
              value={value}
              placeholder='Phone number'
              onChange={setValue}
            />
          </div>
          <Input name='name' placeholder='Name' />
          <Input name='subject' placeholder='Subject' />
          <Textarea name='message' placeholder='Message' />
          <div className='contact-form__wrapper--btn'>
            <Button type='submit' label='Send Message' color='primary' />
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
