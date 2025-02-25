import Button from '../button/Button';
import Input from '../input/Input';
import Textarea from '../textarea/Textarea';

import './ContactForm.scss';

const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className='contact-form'>
      <div className='contact-form__container'>
        <h3 className='contact-form__container--heading'>Get in touch !</h3>
        <p className='contact-form__container--paragraph'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis labore
          blanditiis.
        </p>
        <form onSubmit={handleSubmit} className='contact-form__wrapper'>
          <div className='contact-form__wrapper--email'>
            <Input type='email' name='email' placeholder='Email address' />
            <Input type='phone' name='phone' placeholder='Phone number' />
          </div>
          <Input name='name' placeholder='Name' />
          <Input name='subject' placeholder='Subject' />
          <Textarea name='message' placeholder='Message' />
          <div className='contact-form__wrapper--btn'>
            <Button type='submit' label='Send Message' className='primary' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
